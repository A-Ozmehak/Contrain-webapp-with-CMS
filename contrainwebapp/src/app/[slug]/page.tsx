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
    const heroDataUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.hero][populate][BackgroundImage]=true&populate[Blocks][on][blocks.hero][populate][TypewriterTexts]=true
    `);
    const sliderImagesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
    const ourServicesUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.our-services][populate][Service][populate]=*`);
    const aboutUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.about][populate][AboutKeyPoints][populate]=*&populate[Blocks][on][blocks.about][populate][AboutImages][populate]=*`);
    const skillsUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.skills][populate][Skills][populate]=*&populate[Blocks][on][blocks.skills][populate][SkillImage][populate]=*`);
    const servicesLargeUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.services-large][populate][Services][populate]=*`);
    const servicesFormUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.services-form][populate]=*`);
    const stackedSliderUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.stacked-slider][populate][Images][populate]=*`);
    const printingFormUrl = getStrapiURL(`/api/pages?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.printing-form][populate][MaterialOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ColorOptions]=*&populate[Blocks][on][blocks.printing-form][populate][DeliveryTimeOptions]=*&populate[Blocks][on][blocks.printing-form][populate][ExtraServicesOptions]=*`);

    // Fetch both general page data and hero-specific data in parallel
    const [res, heroRes, sliderRes, ourServicesRes, aboutRes, skillsRes, servicesLargeRes, servicesFormRes, stackedSliderRes, printingFormRes] = await Promise.all([
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
      !printingFormRes.ok
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
        // 🖼️ Enrich the BackgroundImage
        const imageFile = heroBlock.BackgroundImage;
        const backgroundImageUrl = getStrapiMedia(
          imageFile?.formats?.medium?.url || imageFile?.url || "/fallback-hero.webp"
        );
    
        // 🔄 Replace the block in the pageData and inject enriched BackgroundImage
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

    const servicesPageData = servicesLargeData?.data?.length > 0 ? servicesLargeData.data[0] : null;

    if (servicesPageData?.Blocks) {
      const servicesLargeBlock = servicesPageData.Blocks.find(
        (block: any) => block.__component === "blocks.services-large"
      );

      if (servicesLargeBlock) {
        pageData.Blocks = (pageData.Blocks || []).map((block: any) =>
          block.__component === "blocks.services-large" ? servicesLargeBlock : block
        );
      }
    }

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

