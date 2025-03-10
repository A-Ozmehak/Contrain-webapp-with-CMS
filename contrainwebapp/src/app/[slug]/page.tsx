import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';

// ✅ Function to fetch page data
const fetchPageData = async (slug: string) => {
  try {
    // Ensure slug always has a leading "/"
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${formattedSlug}`);

    const res = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data.length > 0 ? data.data[0] : null;

  } catch (error) {
    return null;
  }
};

// ✅ Default export: Page Component
export default async function Page(props: { params: { slug?: string | string[] } }) {
  try {
    const { params } = await Promise.resolve(props); // ✅ Await params

    // Ensure `params.slug` is always an array
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
    const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';

    const pageData = await fetchPageData(slug);

    if (!pageData) {
      return <div>Error: Page not found.</div>;
    }

    return <BlockManager blocks={pageData.Blocks} />;
  } catch (error) {
    return <div>Something went wrong. Please try again later.</div>;
  }
}

// ✅ `generateStaticParams` for Pre-generating Static Paths
export async function generateStaticParams() {
  try {
    const res = await fetch(getStrapiURL('/api/pages?populate=*'));

    if (!res.ok) {
      throw new Error(`Failed to fetch static params: ${res.status}`);
    }

    const data = await res.json();

    return data.data
      .filter((page: any) => typeof page.Slug === 'string' && page.Slug.trim() !== '')
      .map((page: any) => {
        let slug = page.Slug.trim();

        return { params: { slug: slug === '/' ? [] : slug.split('/') } };
      });
  } catch (error) {
    return [];
  }
}

