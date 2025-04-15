import { getStrapiURL, getStrapiMedia } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';
import fetchNormalizedPageData from '@/utils/fetchNormalizedPageData';

export async function generateMetadata({ params }: { params: { slug?: string | string[] } }) {
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
  const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';

  const res = await fetch(getStrapiURL(`/api/pages?filters[Slug][$eq]=${slug}&populate=Seo.MetaImage`), {
    cache: 'no-store',
  });

  const json = await res.json();
  const seo = json?.data?.[0]?.Seo;
  const metaImageUrl = seo?.MetaImage?.url ? getStrapiMedia(seo.MetaImage.url) : null;

  return {
    title: seo?.MetaTitle || 'Contrain – Prototyping Experts',
    description: seo?.MetaDescription || '',
    openGraph: {
      title: seo?.MetaTitle,
      description: seo?.MetaDescription,
      images: metaImageUrl ? [metaImageUrl] : [],
      url: `https://www.contrain.se${slug}`,
      type: 'website',
    },
    robots: seo?.PreventIndexing ? 'noindex, nofollow' : 'index, follow',
  };
}

const fetchPageData = async (slug: string) => {
  return await fetchNormalizedPageData(slug);
};

// ✅ Default export: Page Component
export default async function Page({ params }: { params: { slug?: string | string[] } }) {
  try {
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
    const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';

    const pageData = await fetchPageData(slug);

    if (!pageData) {
      return <div>Error: Page not found.</div>;
    }

    const slugId = `page-${slug.replace(/\//g, '-')}`;

    return (
      <div id={slugId}>
        <BlockManager blocks={pageData.Blocks} />
      </div>
    );
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

