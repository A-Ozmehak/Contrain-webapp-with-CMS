import { getStrapiURL } from '@/utils';

// ✅ Fetch home page data
const fetchHomePageData = async () => {
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);
    const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.hero][populate][TypewriterTexts][populate]=*`);
    const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
    const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);
    const aboutUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*`);
    const skillsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*`);
    
    const [res, heroRes, sliderRes, ourServicesRes, aboutRes, skillsRes] = await Promise.all([
      fetch(apiUrl, { cache: 'no-store' }),
      fetch(heroDataUrl, { cache: 'no-store' }),
      fetch(sliderImagesUrl, { cache: 'no-store' }),
      fetch(ourServicesUrl, { cache: 'no-store' }),
      fetch(aboutUrl, { cache: 'no-store' }),
      fetch(skillsUrl, { cache: 'no-store' }),
    ]);
  
    if (!res.ok || 
      !heroRes.ok || 
      !sliderRes.ok || 
      !ourServicesRes.ok || 
      !aboutRes.ok || 
      !skillsRes.ok) 
      return null;
  
    const data = await res.json();
    const heroData = await heroRes.json();
    const sliderData = await sliderRes.json();
    const ourServicesData = await ourServicesRes.json();
    const aboutData = await aboutRes.json();
    const skillsData = await skillsRes.json();
  
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
          // 🔹 Find existing "blocks.skills" and merge Skills & SkillImage
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
  };

export default fetchHomePageData;