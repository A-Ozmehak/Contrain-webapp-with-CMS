import { getStrapiURL, getStrapiMedia } from '@/utils';

// ✅ Fetch home page data
const fetchHomePageData = async () => {
  const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);
  const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.hero][populate][BackgroundImage]=true&populate[Blocks][on][blocks.hero][populate][TypewriterTexts]=true`);
  const textWithBackgroundUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.text-with-background-image][populate][BackgroundImage]=true`);    
  const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
  const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);
  const aboutUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*`);
  const skillsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*`);
  const stackedSliderUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.stacked-slider][populate][Images][populate]=*`);
  const expandingCardsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate[Blocks][on][blocks.expanding-cards][populate][Content][populate][Image]=true`);
  
  const [
    res, 
    heroRes, 
    sliderRes, 
    ourServicesRes, 
    aboutRes, 
    skillsRes, 
    stackedSliderRes, 
    textWithBackgroundRes, 
    expandingCardsRes
    ] = await Promise.all([
    fetch(apiUrl, { cache: 'no-store' }),
    fetch(heroDataUrl, { cache: 'no-store' }),
    fetch(sliderImagesUrl, { cache: 'no-store' }),
    fetch(ourServicesUrl, { cache: 'no-store' }),
    fetch(aboutUrl, { cache: 'no-store' }),
    fetch(skillsUrl, { cache: 'no-store' }),
    fetch(stackedSliderUrl, { cache: 'no-store' }),
    fetch(textWithBackgroundUrl, { cache: 'no-store'}),
    fetch(expandingCardsUrl, { cache: 'no-store' }),
  ]);
  
  if (!res.ok || 
    !heroRes.ok || 
    !sliderRes.ok || 
    !ourServicesRes.ok || 
    !aboutRes.ok || 
    !skillsRes.ok ||
    !stackedSliderRes.ok ||
    !textWithBackgroundRes.ok ||
    !expandingCardsRes.ok   
  ) 
    return null;
  
  const data = await res.json();
  const heroData = await heroRes.json();
  const sliderData = await sliderRes.json();
  const ourServicesData = await ourServicesRes.json();
  const aboutData = await aboutRes.json();
  const skillsData = await skillsRes.json();
  const stackedSliderData = await stackedSliderRes.json();
  const textWithBackgroundData = await textWithBackgroundRes.json();
  const expandingCardData = await expandingCardsRes.json();
  
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
      const imageFile = heroBlock.BackgroundImage;
      const backgroundImageUrl = getStrapiMedia(
        imageFile?.formats?.medium?.url || imageFile?.url || "/fallback-hero.webp"
      );
    
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.hero"
          ? {
              ...heroBlock,
              BackgroundImage: backgroundImageUrl,
            }
          : block
      );
    }
  }

  // Extract textWithBg block data
  const textWithBgData = textWithBackgroundData?.data?.length > 0 ? textWithBackgroundData.data[0] : null;
  if (textWithBgData?.Blocks) {
    const textWithBgBlock = textWithBgData.Blocks.find(
      (block: any) => block.__component === "blocks.text-with-background-image"
    );
    
    if (textWithBgBlock?.BackgroundImage) {
      const imageFile = textWithBgBlock.BackgroundImage;
    
      const imageUrl = getStrapiMedia(
        imageFile?.formats?.medium?.url || imageFile?.url || "/fallback-section.webp"
      );
    
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.text-with-background-image"
          ? {
              ...textWithBgBlock,
              BackgroundImage: imageUrl,
            }
          : block
      );
    }
  }
    
  // Extract and merge slider block data
  const sliderPageData = sliderData?.data?.length > 0 ? sliderData.data[0] : null;
  if (sliderPageData?.Blocks) {
    const sliderBlock = sliderPageData.Blocks.find((block: any) => block.__component === "blocks.slider");
    if (sliderBlock?.Images) {
      const images = sliderBlock.Images.map((item: any) => {
        const imageFile = Array.isArray(item.Image) ? item.Image[0] : item.Image;
    
        const imageUrl = getStrapiMedia(
          imageFile?.formats?.medium?.url || imageFile?.url || '/microcontroller.webp'
        );
        
        return {
          id: item.id,
          Url: item.Url,
          Alt: item.Alt,
          HoverTitle: item.HoverTitle,
          HoverDescription: item.HoverDescription,
          Image: imageUrl,
        };
      });
    
      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === 'blocks.slider'
          ? { ...block, Images: images }
          : block
      );
    }
  }
   
     
  // 🔹 Merge Our Services Block with full image URLs
  const ourServicesPageData = ourServicesData?.data?.length > 0 ? ourServicesData.data[0] : null;
  if (ourServicesPageData?.Blocks) {
    const ourServicesBlock = ourServicesPageData.Blocks.find(
      (block: any) => block.__component === "blocks.our-services"
    );

    if (ourServicesBlock) {
      const enrichedServices = (ourServicesBlock.Service || []).map((service: any) => ({
        id: service.id,
        Text: service.Text,
        Icon: service.Icon || null,
        Url: service.Url,
        Image: {
          url: getStrapiMedia(
            service.Image?.formats?.medium?.url || service.Image?.url || "/fallback.webp"
          ),
        },
      }));

      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.our-services"
          ? {
              ...block,
              Title: ourServicesBlock.Title || "",
              SubText: ourServicesBlock.SubText || "",
              Service: enrichedServices,
            }
          : block
      );
    }
  }
  
  // ✅ Merge About Block with full image URLs
  const aboutPageData = aboutData?.data?.length > 0 ? aboutData.data[0] : null;
  if (aboutPageData?.Blocks) {
    const aboutBlock = aboutPageData.Blocks.find(
      (block: any) => block.__component === "blocks.about"
    );

    if (aboutBlock) {
      const enrichedImages = (aboutBlock.AboutImages || []).map((img: any) => ({
        id: img.id,
        ImageAltText: img.ImageAltText || "",
        Image: getStrapiMedia(
          img.Image?.formats?.medium?.url || img.Image?.url || "/fallback-image.webp"
        ),
      }));

      pageData.Blocks = pageData.Blocks.map((block: any) =>
        block.__component === "blocks.about"
          ? {
              ...block,
              Title: aboutBlock.Title || "",
              AboutText: aboutBlock.AboutText || "",
              AboutKeyPoints: aboutBlock.AboutKeyPoints || [],
              AboutImages: enrichedImages,
            }
          : block
      );
    }
  }

  // Extract skills block data
  const skillsPageData = skillsData?.data?.length > 0 ? skillsData.data[0] : null;
  if (skillsPageData?.Blocks) {
    const skillsBlock = skillsPageData.Blocks.find(
      (block: any) => block.__component === "blocks.skills"
    );
    
    if (skillsBlock) {
      const enrichedSkillImage = skillsBlock.SkillImage
      ? {
            ...skillsBlock.SkillImage,
            url: getStrapiMedia(
              skillsBlock.SkillImage?.formats?.medium?.url ||
              skillsBlock.SkillImage?.url ||
              '/fallback-image.webp'
            ),
        }
        : null;
      
      pageData.Blocks = (pageData.Blocks || []).map((block: any) => {
        if (block.__component === "blocks.skills") {
          return {
            ...block,
            Skills: skillsBlock.Skills || [],
            SkillImage: enrichedSkillImage,
          };
        }
        return block;
      });
    }
  }

  // Extract stackedSlider block data
    const stackedSliderPageData = stackedSliderData?.data?.length > 0 ? stackedSliderData.data[0] : null;
    if (stackedSliderPageData?.Blocks) {
      const stackedSliderBlock = stackedSliderPageData.Blocks.find(
        (block: any) => block.__component === "blocks.stacked-slider"
      );
  
      if (stackedSliderBlock) {
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.stacked-slider" ? stackedSliderBlock : block
        );
      }
    }

    // Expanding Cards Block
    const expandingCardsData = expandingCardData?.data?.[0];
    if (expandingCardsData?.Blocks) {
      const block = expandingCardsData.Blocks.find(
        (b: any) => b.__component === "blocks.expanding-cards"
      );
    
      if (block?.Content?.length > 0) {
        const cards = block.Content.map((item: any) => ({
          id: String(item.id),
          title: item.Title || item.Text || "No title",
          subtitle: item.Text || "",
          icon: null,
          backgroundUrl: getStrapiMedia(
            item.Image?.formats?.medium?.url || item.Image?.url || "/fallback.webp"
          ),
        }));
        
        pageData.Blocks = pageData.Blocks.map((b: any) =>
          b.__component === "blocks.expanding-cards"
            ? { ...b, items: cards }
            : b
        );
        
      }
    }
    
  return pageData;
};

export default fetchHomePageData;