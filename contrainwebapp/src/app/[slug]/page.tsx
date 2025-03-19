import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';

const fetchPageData = async (slug: string) => {
  try {
    // Ensure slug always has a leading "/"
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;

    // General page data URL (fetches everything)
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${formattedSlug}`);
    const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.hero][populate][TypewriterTexts][populate]=*`);
    const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
    const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);
    const aboutUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*`);
    const skillsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*`);

    // Fetch both general page data and hero-specific data in parallel
    const [res, heroRes, sliderRes, ourServicesRes, aboutRes, skillsRes] = await Promise.all([
      fetch(apiUrl, { cache: 'no-store' }),
      fetch(heroDataUrl, { cache: 'no-store' }),
      fetch(sliderImagesUrl, { cache: 'no-store' }),
      fetch(ourServicesUrl, { cache: 'no-store' }),
      fetch(aboutUrl, { cache: 'no-store' }),
      fetch(skillsUrl, { cache: 'no-store' }),
    ]);

    if (
      !res.ok || 
      !heroRes.ok || 
      !sliderRes.ok || 
      !ourServicesRes.ok || 
      !aboutRes.ok ||  
      !skillsRes.ok
    ) 
      return null;

    const data = await res.json();
    const heroData = await heroRes.json();
    const sliderData = await sliderRes.json();
    const ourServicesData = await ourServicesRes.json();
    const aboutData = await aboutRes.json();
    const skillsData = await skillsRes.json();

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

  const ourServicesPageData = ourServicesData?.data?.length > 0 ? ourServicesData.data[0] : null;
  if (ourServicesPageData?.Blocks) {
    const ourServicesBlocks = ourServicesPageData.Blocks.filter(
      (block: any) => block.__component === "blocks.our-services"
    );

    if (ourServicesBlocks.length > 0) {
      pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
        block.__component === "blocks.our-services" ? ourServicesBlocks[0] : block
      );
    }
  }

  const aboutPageData = aboutData?.data?.length > 0 ? aboutData.data[0] : null;
  if (aboutPageData?.Blocks) {
    const aboutBlocks = aboutPageData.Blocks.find((block:any) => block.__component === "blocks.about");
    
    if (aboutBlocks) {
      pageData.Blocks = (pageData.Blocks || []).map((block: any) => {
        if (block.__component === "blocks.about") {
          return {
            ...block,
            AboutKeyPoints: aboutBlocks.AboutKeyPoints || [],
            AboutImages: aboutBlocks.AboutImages || [],
          };
        }
        return block;
      });
    }
  }
  
  const skillsPageData = skillsData?.data?.length > 0 ? skillsData.data[0] : null;
    if (skillsPageData?.Blocks) {
      const skillsBlock = skillsPageData.Blocks.find((block: any) => block.__component === "blocks.skills");

      if (skillsBlock) {
        pageData.Blocks = (pageData.Blocks || []).map((block: any) => {
          if (block.__component === "blocks.skills") {
            return {
              ...block,
              Skills: skillsBlock.Skills || [],
              SkillImage: skillsBlock.SkillImage || [],
            };
          }
          return block;
        });
      }
    }

    return pageData;

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

