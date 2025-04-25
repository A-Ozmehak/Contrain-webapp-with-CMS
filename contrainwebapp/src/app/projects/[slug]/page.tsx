import { getStrapiURL, getStrapiMedia } from "@/utils";
import BlockManager from '@/components/shared/BlockManager';

export async function generateMetadata({ params }: { params: { slug?: string | string[] } }) {
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
  const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';

  const res = await fetch(getStrapiURL(`/api/projects?filters[Slug][$eq]=${slug}&populate=Seo.MetaImage`), {
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

const fetchProjectData = async (slug: string) => {
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;

    const baseProjectUrl = getStrapiURL(`/api/projects?filters[Slug][$eq]=${formattedSlug}&populate=*`);
    const heroUrl = getStrapiURL(`/api/projects?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.hero][populate][BackgroundImage]=true&populate[Blocks][on][blocks.hero][populate][TypewriterTexts]=true`);
    const sliderUrl = getStrapiURL(`/api/projects?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.slider][populate][Images][populate]=*`);
    const textWithBackgroundUrl = getStrapiURL(`/api/projects?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.text-with-background-image][populate][BackgroundImage]=true`);
    const stackedSliderUrl = getStrapiURL(`/api/projects?filters[Slug][$eq]=${formattedSlug}&populate[Blocks][on][blocks.stacked-slider][populate][Images][populate]=*`);    
    
    const [res, heroRes, sliderRes, stackedSliderRes, textWithBackgroundRes] = 
    await Promise.all([
        fetch(baseProjectUrl, { cache: 'no-store' }),
        fetch(heroUrl, { cache: 'no-store' }),
        fetch(sliderUrl, { cache: 'no-store' }),
        fetch(stackedSliderUrl, { cache: 'no-store' }),
        fetch(textWithBackgroundUrl, { cache: 'no-store'})
    ]) 
    if (!res.ok || !heroRes.ok || !sliderRes.ok || !stackedSliderRes.ok || !textWithBackgroundRes.ok) return null;
  
    const json = await res.json();
    const heroData = await heroRes.json();
    const sliderData = await sliderRes.json();
    const stackedSliderData = await stackedSliderRes.json();
    const textWithBackgroundData = await textWithBackgroundRes.json();

    const projectData = json?.data?.length > 0 ? json.data[0] : null;
  
    if (!projectData) return null;
  
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
    
        projectData.Blocks = projectData.Blocks.map((block: any) =>
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
      
        projectData.Blocks = projectData.Blocks.map((block: any) =>
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
        projectData.Blocks = (projectData.Blocks || []).map((block: any) =>
          block.__component === "blocks.slider" ? sliderBlocks[0] : block
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
        projectData.Blocks = (projectData.Blocks || []).map((block: any) =>
           block.__component === "blocks.stacked-slider" ? stackedSliderBlock : block
         );
       }
     }
  
    return projectData;
  };
  
  export default async function ProjectPage({ params }: { params: { slug?: string | string[] } }) {
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
    const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';
  
    const projectData = await fetchProjectData(slug);
  
    if (!projectData) {
      return <div>Project not found.</div>;
    }
  
    return (
      <div id={`project-${slug.replace(/\//g, '-')}`}>
        <BlockManager blocks={projectData.Blocks} />
      </div>
    );
  }


export async function generateStaticParams() {
    const res = await fetch(getStrapiURL('/api/projects?populate=*'));
  
    if (!res.ok) return [];
  
    const data = await res.json();
  
    return data.data.map((project: any) => {
      const slug = project.Slug?.replace('/projects/', '');
      return { slug };
    });
}