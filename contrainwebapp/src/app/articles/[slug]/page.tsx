import { getStrapiURL, getStrapiMedia } from "@/utils";
import ReactMarkdown from "react-markdown";
import styles from './articleDetail.module.css';
import LatestArticlesComponent from "@/reusableComponents/latestArticles/latestArticles";
import fetchLatestArticles from "@/utils/fetchLatestArticles";

export async function generateMetadata({ params }: { params: { slug?: string | string[] } }) {
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
    const slug = `/articles/${slugArray.join('/')}`;
  
    const res = await fetch(getStrapiURL(
      `/api/articles?filters[Slug][$eq]=${slug}&populate[Seo][populate]=MetaImage`
    ), {
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
  
  
  

const fetchArticleData = async (slug: string) => {
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  
    const apiUrl = getStrapiURL(`/api/articles?filters[Slug][$eq]=${formattedSlug}&populate=*`);
  
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) return null;
  
    const json = await res.json();
    return json?.data?.[0] || null;
};
  
export default async function ArticleDetailPage({ params }: { params: { slug?: string | string[] } }) {
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);
    const slug = slugArray.length > 0 ? `/${slugArray.join('/')}` : '/';
  
    const formattedSlug = `/articles${slug}`;
  
    const [article, latestArticles] = await Promise.all([
      fetchArticleData(formattedSlug),
      fetchLatestArticles(),
    ]);
  
    if (!article) {
      return <div>Article not found.</div>;
    }
  
    const {
      Title,
      Text,
      Author,
      Date,
      Category,
      Image
    } = article;
  
    const imageUrl = getStrapiMedia(
      Image?.formats?.large?.url || Image?.url || "/fallback-hero.webp"
    );
  
    return (
        <div className={styles.articleWrapper}>
           <div className={styles.articleDetailHero}>
                <img src={imageUrl} alt={Image?.alternativeText || Title} className={styles.articleDetailHeroImage} />
                <div className={styles.articleDetailHeroOverlay}>
                    <h1 className={styles.heroTitle}>{Title}</h1>
                </div>
            </div>
            <div className={styles.articleDetailContent}>
                <div className={styles.body}>
                    <div className={styles.meta}>
                        <p>
                            <strong>By {Author}</strong> • {Date} • {Category}
                        </p>
                    </div>
            
                    <div>
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => (
                            <img {...props} className={styles.markdownImage} />
                            ),
                        }}
                        >
                        {Text}
                    </ReactMarkdown>                    </div>
                </div>
             
                <div className={styles.latestArticles}>
                    <LatestArticlesComponent articles={latestArticles} />
                </div>
            </div>
      </div>
    );
}


export async function generateStaticParams() {
    const res = await fetch(getStrapiURL('/api/articles?populate=*'));
  
    if (!res.ok) return [];
  
    const data = await res.json();
  
    return data.data.map((article: any) => {
        const slug = article.Slug?.replace(/^\/+/, '');
        return { slug };
    });
}