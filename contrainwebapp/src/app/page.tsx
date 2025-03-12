import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';


// ✅ Fetch home page data
const fetchHomePageData = async () => {
  const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);
  const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.hero][populate][TypewriterTexts][populate]=*`);
  const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);

  const [res, heroRes, sliderRes] = await Promise.all([
    fetch(apiUrl, { cache: 'no-store' }),
    fetch(heroDataUrl, { cache: 'no-store' }),
    fetch(sliderImagesUrl, { cache: 'no-store' }),
  ]);

  if (!res.ok || !heroRes.ok || !sliderRes.ok) return null;

  const data = await res.json();
  const heroData = await heroRes.json();
  const sliderData = await sliderRes.json();

  const pageData = data?.data?.length > 0 ? data.data[0] : null;
  if (!pageData) return null; // If no data is found, return null

  // Extract hero block data
  const heroPageData = heroData?.data?.length > 0 ? heroData.data[0] : null;

  // Merge hero-specific data **without overwriting other Blocks**
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

  // Extract and merge slider block data
  const sliderPageData = sliderData?.data?.length > 0 ? sliderData.data[0] : null;
  if (sliderPageData?.Blocks) {
    const sliderBlocks = sliderPageData.Blocks.filter(
      (block: any) => block.__component === "blocks.slider"
    );

    if (sliderBlocks.length > 0) {
      pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
        block.__component === "blocks.slider" ? sliderBlocks[0] : block
      );
    }
  }

  return pageData;
};


export default async function HomePage() {
  const pageData = await fetchHomePageData();

  if (!pageData) {
    return <div>Error: Home data not found.</div>;
  }

  return <BlockManager blocks={pageData.Blocks} />;
}
