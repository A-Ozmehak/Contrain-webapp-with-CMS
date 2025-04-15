import { getStrapiURL, getStrapiMedia } from ".";

const fetchNormalizedPageData = async (slug: string) => {
    const formattedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  
    const buildUrl = (path: string) => getStrapiURL(
      `/api/pages?filters[Slug][$eq]=${formattedSlug}&${path}`
    );
  
    const urls = {
      full: getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${formattedSlug}`),
      hero: buildUrl("populate[Blocks][on][blocks.hero][populate][BackgroundImage]=true&populate[Blocks][on][blocks.hero][populate][TypewriterTexts]=true"),
      textWithBg: buildUrl("populate[Blocks][on][blocks.text-with-background-image][populate][BackgroundImage]=true"),
      slider: buildUrl("populate[Blocks][on][blocks.slider][populate][Images][populate]=*"),
      ourServices: buildUrl("populate[Blocks][on][blocks.our-services][populate][Service][populate]=*"),
      about: buildUrl("populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*"),
      skills: buildUrl("populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*"),
      servicesLarge: buildUrl("populate[Blocks][on][blocks.services-large][populate][Services][populate]=*"),
      servicesForm: buildUrl("populate[Blocks][on][blocks.services-form][populate]=*"),
      stackedSlider: buildUrl("populate[Blocks][on][blocks.stacked-slider][populate][Images][populate]=*"),
      printingForm: buildUrl("populate[Blocks][on][blocks.printing-form][populate][MaterialOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ColorOptions]=*&populate[Blocks][on][blocks.printing-form][populate][DeliveryTimeOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ExtraServicesOptions]=*"),
      expandingCards: buildUrl("populate[Blocks][on][blocks.expanding-cards][populate][Content][populate][Image]=true"),
    };
  
    const [
      res, heroRes, sliderRes, ourServicesRes, aboutRes,
      skillsRes, servicesLargeRes, servicesFormRes, stackedSliderRes,
      printingFormRes, textWithBackgroundRes, expandingCardsRes
    ] = await Promise.all([
      fetch(urls.full), fetch(urls.hero), fetch(urls.slider), fetch(urls.ourServices),
      fetch(urls.about), fetch(urls.skills), fetch(urls.servicesLarge),
      fetch(urls.servicesForm), fetch(urls.stackedSlider), fetch(urls.printingForm),
      fetch(urls.textWithBg), fetch(urls.expandingCards)
    ]);
  
    const allResponses = [
      res, heroRes, sliderRes, ourServicesRes, aboutRes,
      skillsRes, servicesLargeRes, servicesFormRes, stackedSliderRes,
      printingFormRes, textWithBackgroundRes, expandingCardsRes
    ];
  
    if (allResponses.some(r => !r.ok)) return null;
  
    const [
      data, heroData, sliderData, ourServicesData, aboutData,
      skillsData, servicesLargeData, servicesFormData, stackedSliderData,
      printingFormData, textWithBgData, expandingCardData
    ] = await Promise.all(allResponses.map(res => res.json()));
  
    const pageData = data?.data?.[0];
    if (!pageData) return null;
  
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
  const textWithBgPageData = textWithBgData?.data?.length > 0 ? textWithBgData.data[0] : null;
  if (textWithBgPageData?.Blocks) {
    const textWithBgBlock = textWithBgPageData.Blocks.find(
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

    
    // Extract servicesLarge block data
    const servicesPageData = servicesLargeData?.data?.length > 0 ? servicesLargeData.data[0] : null;
    if (servicesPageData?.Blocks) {
      const servicesLargeBlock = servicesPageData.Blocks.find(
         (block: any) => block.__component === "blocks.services-large"
      );
        
      if (servicesLargeBlock) {
        const enrichedServices = (servicesLargeBlock.Services || []).map((service: any) => ({
          ...service,
          BackgroundImage: {
            url: getStrapiMedia(
              service.BackgroundImage?.formats?.medium?.url ||
              service.BackgroundImage?.url ||
              '/fallback-image.webp'
            ),
          },
        }));
        
        // Replace block in pageData
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.services-large"
            ? { ...servicesLargeBlock, Services: enrichedServices }
            : block
        );
      }
    }

    // Extract serviceForm block data
    const servicesFormPageData = servicesFormData?.data?.length > 0 ? servicesFormData.data[0] : null;
    if (servicesFormPageData?.Blocks) {
      const servicesFormBlock = servicesFormPageData.Blocks.find(
        (block: any) => block.__component === "blocks.services-form"
      );

      if (servicesFormBlock) {
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.services-form" ? servicesFormBlock : block
        );
      }
    }
  
    return pageData;
  };
  
export default fetchNormalizedPageData;