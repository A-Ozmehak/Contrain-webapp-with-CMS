import BlockManager from '@/components/shared/BlockManager';
import fetchHomePageData from '@/utils/fetchHomePageData';
import { getStrapiURL, getStrapiMedia } from '@/utils';
import styles from './page.module.css';

export async function generateMetadata() {
  try {
    const res = await fetch(
      getStrapiURL(`/api/pages?filters[Slug][$eq]=/&populate=Seo.MetaImage`),
      { cache: 'no-store' }
    );
    const json = await res.json();
    const seo = json?.data?.[0]?.Seo;

    return {
      title: seo?.MetaTitle || 'Contrain – Prototyping Experts',
      description: seo?.MetaDescription || '',
      openGraph: {
        title: seo?.MetaTitle,
        description: seo?.MetaDescription,
        images: seo?.MetaImage?.url ? [getStrapiMedia(seo.MetaImage.url)] : [],
        url: 'https://www.contrain.se/',
        type: 'website',
      },
      robots: seo?.PreventIndexing ? 'noindex, nofollow' : 'index, follow',
    };
  } catch (err) {
    console.error('Failed to generate metadata', err);
    return {
      title: 'Contrain',
    };
  }
}

export default async function HomePage() {
  const pageData = await fetchHomePageData();

  if (!pageData) {
    return <div>Error: Home data not found.</div>;
  }
  

  return (
    <div id="homePage">
      <BlockManager blocks={pageData.Blocks} />
    </div>
  );
}
