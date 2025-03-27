import fetchArticlePageData from "@/utils/fetchArticlePageData";
import ArticlePageClient from "@/components/articlePageContent/articlePage";
import { getStrapiURL, getStrapiMedia } from '@/utils';

export async function generateMetadata() {
  try {
    const res = await fetch(
      getStrapiURL(`/api/article-page?populate=Seo.MetaImage`),
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

export default async function ArticlePage() {
  const pageData = await fetchArticlePageData();
  
  return <ArticlePageClient data={pageData} />;
}