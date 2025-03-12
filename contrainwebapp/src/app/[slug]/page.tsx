import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';

const fetchPageData = async (slug: string) => {
  try {
    // Ensure slug always has a leading "/"
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;

    // General page data URL (fetches everything)
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${formattedSlug}`);

    // Hero-specific deeply nested data URL
    const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.hero][populate][TypewriterTexts][populate]=*`);

    // Fetch both general page data and hero-specific data in parallel
    const [res, heroRes] = await Promise.all([
      fetch(apiUrl, { cache: 'no-store' }),
      fetch(heroDataUrl, { cache: 'no-store' })
    ]);

    if (!res.ok || !heroRes.ok) return null;

    const data = await res.json();
    const heroData = await heroRes.json();

    // Extract page data
    const pageData = data?.data?.length > 0 ? data.data[0] : null;
    if (!pageData) return null; // If no data is found, return null

    // Extract hero block data
    const heroPageData = heroData?.data?.length > 0 ? heroData.data[0] : null;

    if (heroPageData?.Blocks) {
      const heroBlocks = heroPageData.Blocks.filter(
        (block: any) => block.__component === "blocks.hero"
      );

      if (heroBlocks.length > 0) {
        // Maintain the original order of Blocks
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.hero" ? heroBlocks[0] : block
        );
      }
    }

    return pageData;

  } catch (error) {
    console.error("Error fetching page data:", error);
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

