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
      expandingCards: buildUrl("populate[Blocks][on][blocks.expanding-cards][populate][Content][populate][Image]=true"),
      offertComponent: buildUrl(
        [
          "populate[Blocks][on][blocks.offert-component][populate][ContactInfo][populate][SocialMedia]=*",
          "populate[Blocks][on][blocks.offert-component][populate][OffertForm][populate][MaterialOptions]=*",
          "populate[Blocks][on][blocks.offert-component][populate][OffertForm][populate][ColorOptions]=*",
          "populate[Blocks][on][blocks.offert-component][populate][OffertForm][populate][DeliveryTimeOptions]=*",
          "populate[Blocks][on][blocks.offert-component][populate][OffertForm][populate][ExtraServicesOptions]=*",
        ].join('&')
      ),
      contactForm: buildUrl("populate[Blocks][on][blocks.contact-form][populate]=BackgroundImage"),
      imageAndText: buildUrl("populate[Blocks][on][blocks.image-and-text][populate]=Image"),
      severalImages: buildUrl("populate[Blocks][on][blocks.several-images][populate][Image][populate]=Image"),
      material: buildUrl("populate[Blocks][on][blocks.material][populate][MaterialDescription][populate]=MaterialImage"),
      materialList: buildUrl("populate[Blocks][on][blocks.material-list][populate][MaterialList][populate]=*"),
      serviceTitleAndText: buildUrl("populate[Blocks][on][blocks.service-title-and-text][populate][Image]=true&populate[Blocks][on][blocks.service-title-and-text][populate][Service]=*"),
      batches: buildUrl("populate[Blocks][on][blocks.batches][populate][Batches][populate]=BackgroundImage"),
      accordion: buildUrl("populate[Blocks][on][blocks.accordion][populate][AccordionItem][populate]=*"),
    }
  
    const [
      res, heroRes, sliderRes, ourServicesRes, aboutRes,
      skillsRes, servicesLargeRes, servicesFormRes, stackedSliderRes,
      textWithBackgroundRes, expandingCardsRes, offertComponentRes, contactFormRes, 
      imageAndTextRes, severalImagesRes, materialRes, materialListRes, 
      serviceTitleAndTextRes, batchesRes, accordionRes  
    ] = await Promise.all([
      fetch(urls.full), fetch(urls.hero), fetch(urls.slider), fetch(urls.ourServices),
      fetch(urls.about), fetch(urls.skills), fetch(urls.servicesLarge),
      fetch(urls.servicesForm), fetch(urls.stackedSlider),
      fetch(urls.textWithBg), fetch(urls.expandingCards),
      fetch(urls.offertComponent), fetch(urls.contactForm),
      fetch(urls.imageAndText), fetch(urls.severalImages),
      fetch(urls.material), fetch(urls.materialList),
      fetch(urls.serviceTitleAndText), fetch(urls.batches),
      fetch(urls.accordion)
    ]);
  
    const allResponses = [
      res, heroRes, sliderRes, ourServicesRes, aboutRes,
      skillsRes, servicesLargeRes, servicesFormRes, stackedSliderRes,
      textWithBackgroundRes, expandingCardsRes, contactFormRes, imageAndTextRes,
      severalImagesRes,  materialRes, materialListRes, serviceTitleAndTextRes, 
      batchesRes, accordionRes 
    ];
  
    if (allResponses.some(r => !r.ok)) return null;
  
    const [
      data, heroData, sliderData, ourServicesData, aboutData,
      skillsData, servicesLargeData, servicesFormData, stackedSliderData,
      textWithBgData, expandingCardData, contactFormData, imageAndTextData,
      severalImagesData, materialData, materialListData, serviceTitleAndTextData,
      batchesData, accordionData 
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

    // Extract offertComponent block data
    const offertComponentData = offertComponentRes?.ok ? await offertComponentRes.json() : null;
    if (offertComponentData?.data?.[0]?.Blocks) {
      const offertBlock = offertComponentData.data[0].Blocks.find(
        (block: any) => block.__component === "blocks.offert-component"
      );
    
      if (offertBlock) {
        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.offert-component" ? offertBlock : block
        );
      }
    }

    // Merge Contact Form Background Image
    const contactFormPageData = contactFormData?.data?.length > 0 ? contactFormData.data[0] : null;

    if (contactFormPageData?.Blocks) {
      const contactFormBlock = contactFormPageData.Blocks.find(
        (block: any) => block.__component === "blocks.contact-form"
      );

      if (contactFormBlock) {
        const imageFile = contactFormBlock.BackgroundImage;
        const backgroundImageUrl = getStrapiMedia(
          imageFile?.formats?.medium?.url ||
          imageFile?.url ||
          "/fallback-contact.webp"
        );

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.contact-form"
            ? {
                ...block,
                BackgroundImage: backgroundImageUrl,
              }
            : block
        );
      }
    }

    // 🖼 Merge ImageAndText block
    const imageAndTextPageData = imageAndTextData?.data?.length > 0 ? imageAndTextData.data[0] : null;
    if (imageAndTextPageData?.Blocks) {
      const imageAndTextBlock = imageAndTextPageData.Blocks.find(
        (block: any) => block.__component === "blocks.image-and-text"
      );

      if (imageAndTextBlock?.Image) {
        const imageUrl = getStrapiMedia(
          imageAndTextBlock.Image?.formats?.medium?.url || imageAndTextBlock.Image?.url || "/fallback-image.webp"
        );

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.image-and-text"
            ? { ...block, Image: imageUrl }
            : block
        );
      }
    }

    // Extract Several Images block data
    const severalImagesPageData = severalImagesData?.data?.length > 0 ? severalImagesData.data[0] : null;

    if (severalImagesPageData?.Blocks) {
      const severalImagesBlock = severalImagesPageData.Blocks.find(
        (block: any) => block.__component === "blocks.several-images"
      );

      if (severalImagesBlock?.Image?.length > 0) {
        const enrichedImages = severalImagesBlock.Image.map((item: any) => {
          const imageFile = item.Image; // 🛠 you must go into .Image inside .Image

          return {
            id: item.id,
            Image: getStrapiMedia(
              imageFile?.formats?.medium?.url || imageFile?.url || "/fallback-image.webp"
            ),
            Alt: imageFile?.alternativeText || "", // safer
          };
        });

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.several-images"
            ? { ...block, Image: enrichedImages }
            : block
        );
      }
    }

    // Material Block
    const materialPageData = materialData?.data?.length > 0 ? materialData.data[0] : null;
    if (materialPageData?.Blocks) {
      const materialBlock = materialPageData.Blocks.find(
        (block: any) => block.__component === "blocks.material"
      );

      if (materialBlock?.MaterialDescription?.length > 0) {
        const enrichedDescriptions = materialBlock.MaterialDescription.map((item: any) => ({
          id: item.id,
          MaterialShortName: item.MaterialShortName,
          MaterialFullName: item.MaterialFullName,
          Description: item.Description,
          MaterialImage: getStrapiMedia(
            item.MaterialImage?.formats?.medium?.url || item.MaterialImage?.url || "/fallback-material.webp"
          )
        }));

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.material"
            ? { ...block, MaterialDescription: enrichedDescriptions }
            : block
        );
      }
    }

    // Material List Block
    const materialListPageData = materialListData?.data?.length > 0 ? materialListData.data[0] : null;
    if (materialListPageData?.Blocks) {
      const materialListBlock = materialListPageData.Blocks.find(
        (block: any) => block.__component === "blocks.material-list"
      );

      if (materialListBlock?.MaterialList?.length > 0) {
        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.material-list"
            ? { ...block, MaterialList: materialListBlock.MaterialList }
            : block
        );
      }
    }

    // Extract service-title-and-text block data
    const serviceTitleAndTextPageData = serviceTitleAndTextData?.data?.length > 0 ? serviceTitleAndTextData.data[0] : null;

    if (serviceTitleAndTextPageData?.Blocks) {
      const serviceTitleAndTextBlock = serviceTitleAndTextPageData.Blocks.find(
        (block: any) => block.__component === "blocks.service-title-and-text"
      );

      if (serviceTitleAndTextBlock) {
        const globalImage = serviceTitleAndTextBlock.Image
          ? getStrapiMedia(
              serviceTitleAndTextBlock.Image?.formats?.medium?.url ||
              serviceTitleAndTextBlock.Image?.url ||
              "/fallback-service-title.webp"
            )
          : null;

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.service-title-and-text"
            ? {
                ...block,
                Service: serviceTitleAndTextBlock.Service || [],
                Image: globalImage,
              }
            : block
        );
      }
    }

    // Extract batches block data
    const batchesPageData = batchesData?.data?.length > 0 ? batchesData.data[0] : null;
    if (batchesPageData?.Blocks) {
      const batchesBlock = batchesPageData.Blocks.find(
        (block: any) => block.__component === "blocks.batches"
      );
    
      if (batchesBlock?.Batches?.length > 0) {
        const enrichedBatches = batchesBlock.Batches.map((batch: any) => ({
          id: batch.id,
          Title: batch.Title,
          Description: batch.Description,
          ButtonLabel: batch.ButtonLabel,
          ButtonUrl: batch.ButtonUrl,
          BackgroundImage: getStrapiMedia(
            batch.BackgroundImage?.formats?.medium?.url || batch.BackgroundImage?.url || "/fallback-batch.webp"
          ),
        }));
    
        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.batches"
            ? { ...block, Batches: enrichedBatches }
            : block
        );
      }
    }

    // Extract accordion block data
    const accordionPageData = accordionData?.data?.length > 0 ? accordionData.data[0] : null;
    if (accordionPageData?.Blocks) {
      const accordionBlock = accordionPageData.Blocks.find(
        (block: any) => block.__component === "blocks.accordion"
      );

      if (accordionBlock?.AccordionItem?.length > 0) {
        const enrichedAccordion = accordionBlock.AccordionItem.map((accordion: any) => ({
          id: accordion.id,
          Title: accordion.Title,
          Text: accordion.Text
        }));

        pageData.Blocks = pageData.Blocks.map((block: any) =>
          block.__component === "blocks.accordion"
            ? { ...block, AccordionItem: enrichedAccordion }
            : block
        );
      }
    }
    
    return pageData;
  };
  
export default fetchNormalizedPageData;