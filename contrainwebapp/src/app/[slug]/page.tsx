import { getStrapiURL, getStrapiMedia } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';

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
  try {
    // Ensure slug always has a leading "/"
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;

    // General page data URL (fetches everything)
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${formattedSlug}`);
    const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.hero][populate][BackgroundImage]=true&populate[Blocks][on][blocks.hero][populate][TypewriterTexts]=true`);
    const textWithBackgroundUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.text-with-background-image][populate][BackgroundImage]=true`);    
    const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
    const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);
    const aboutUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*`);
    const skillsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*`);
    const servicesLargeUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.services-large][populate][Services][populate]=*`);
    const servicesFormUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.services-form][populate]=*`);
    const stackedSliderUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.stacked-slider][populate][Images][populate]=*`);
    const printingFormUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.printing-form][populate][MaterialOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ColorOptions]=*&populate[Blocks][on][blocks.printing-form][populate][DeliveryTimeOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ExtraServicesOptions]=*`);
    const expandingCardsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.expanding-cards][populate][Content][populate][Image]=true`);  
    
    // Fetch both general page data and hero-specific data in parallel
    const [res, 
      heroRes, 
      sliderRes, 
      ourServicesRes, 
      aboutRes, 
      skillsRes, 
      servicesLargeRes, 
      servicesFormRes, 
      stackedSliderRes, 
      printingFormRes,
      textWithBackgroundRes,
      expandingCardsRes
    ] = await Promise.all([
      fetch(apiUrl, { cache: 'no-store' }),
      fetch(heroDataUrl, { cache: 'no-store' }),
      fetch(sliderImagesUrl, { cache: 'no-store' }),
      fetch(ourServicesUrl, { cache: 'no-store' }),
      fetch(aboutUrl, { cache: 'no-store' }),
      fetch(skillsUrl, { cache: 'no-store' }),
      fetch(servicesLargeUrl, { cache: 'no-store' }),
      fetch(servicesFormUrl, { cache: 'no-store' }),
      fetch(stackedSliderUrl, { cache: 'no-store' }),
      fetch(printingFormUrl, { cache: 'no-store' }),
      fetch(textWithBackgroundUrl, { cache: 'no-store'}),
      fetch(expandingCardsUrl, { cache: 'no-store' }),
    ]);

    if (
      !res.ok || 
      !heroRes.ok || 
      !sliderRes.ok || 
      !ourServicesRes.ok || 
      !aboutRes.ok ||  
      !skillsRes.ok ||
      !servicesLargeRes.ok ||
      !servicesFormRes.ok ||
      !stackedSliderRes.ok ||
      !printingFormRes.ok ||
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
    const servicesLargeData = await servicesLargeRes.json();
    const servicesFormData = await servicesFormRes.json();
    const stackedSliderData = await stackedSliderRes.json();
    const printingFormData = await printingFormRes.json();
    const textWithBackgroundData = await textWithBackgroundRes.json();
    const expandingCardData = await expandingCardsRes.json();

    // Extract page data
    const pageData = data?.data?.length > 0 ? data.data[0] : null;
    if (!pageData) return null;

    // Extract hero block data
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
      const sliderBlocks = sliderPageData.Blocks.filter(
        (block: any) => block.__component === "blocks.slider"
      );

      if (sliderBlocks.length > 0) {
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.slider" ? sliderBlocks[0] : block
        );
      }
    }

    // Extract ourService block data
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

    // Extract about block data
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

    // Extract printingForm block data
    const printingFormPageData = printingFormData?.data?.[0] || null;
    if (!printingFormPageData) return null;

    if (printingFormPageData) {
      // Merge MaterialOptions, ColorOptions, DeliveryTimeOptions, and ExtraServicesOptions into the block data
      const printingFormBlock = printingFormPageData.Blocks.find((block: any) => block.__component === 'blocks.printing-form');
      
      if (printingFormBlock) {
        pageData.Blocks = pageData.Blocks.map((block: any) => {
          if (block.__component === 'blocks.printing-form') {
            return {
              ...block,
              MaterialOptions: printingFormBlock.MaterialOptions || [],
              ColorOptions: printingFormBlock.ColorOptions || [],
              DeliveryTimeOptions: printingFormBlock.DeliveryTimeOptions || [],
              ExtraServicesOptions: printingFormBlock.ExtraServicesOptions || [],
            };
          }
          return block;
        });
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

  } catch (error) {
    return null;
  }
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

