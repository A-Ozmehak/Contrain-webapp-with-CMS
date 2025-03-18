import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';


// ✅ Fetch home page data
const fetchHomePageData = async () => {
  const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);
  const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.hero][populate][TypewriterTexts][populate]=*`);
  const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
  const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);

  const [res, heroRes, sliderRes, ourServicesRes] = await Promise.all([
    fetch(apiUrl, { cache: 'no-store' }),
    fetch(heroDataUrl, { cache: 'no-store' }),
    fetch(sliderImagesUrl, { cache: 'no-store' }),
    fetch(ourServicesUrl, { cache: 'no-store' }),
  ]);

  if (!res.ok || !heroRes.ok || !sliderRes.ok || !ourServicesRes.ok) return null;

  const data = await res.json();
  const heroData = await heroRes.json();
  const sliderData = await sliderRes.json();
  const ourServicesData = await ourServicesRes.json();

  const pageData = data?.data?.length > 0 ? data.data[0] : null;
  if (!pageData) return null;

  // Ensure Blocks exists
  pageData.Blocks = pageData.Blocks || [];

  // 🔹 Merge Hero Block in Correct Position
  const heroPageData = heroData?.data?.length > 0 ? heroData.data[0] : null;
  if (heroPageData?.Blocks) {
    const heroBlock = heroPageData.Blocks.find(
      (block: any) => block.__component === "blocks.hero"
    );

    if (heroBlock) {
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.hero" ? heroBlock : block
      );
    }
  }

  // 🔹 Merge Slider Block in Correct Position
  const sliderPageData = sliderData?.data?.length > 0 ? sliderData.data[0] : null;
  if (sliderPageData?.Blocks) {
    const sliderBlock = sliderPageData.Blocks.find(
      (block: any) => block.__component === "blocks.slider"
    );

    if (sliderBlock) {
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.slider" ? sliderBlock : block
      );
    }
  }

  // 🔹 Merge Our Services Block in Correct Position
  const ourServicesPageData = ourServicesData?.data?.length > 0 ? ourServicesData.data[0] : null;
  if (ourServicesPageData?.Blocks) {
    const ourServicesBlock = ourServicesPageData.Blocks.find(
      (block: any) => block.__component === "blocks.our-services"
    );

    if (ourServicesBlock) {
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.our-services" ? ourServicesBlock : block
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
