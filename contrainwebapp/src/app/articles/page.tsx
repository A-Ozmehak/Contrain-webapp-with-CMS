import fetchArticlePageData from "@/utils/fetchArticlePageData";
import ArticlesComponent from "@/reusableComponents/articles/articles";
import HeroComponent from "@/components/articlePageHero/hero";
// import styles from "./articlePage.module.css";

export default async function ArticlePage() {
  const pageData = await fetchArticlePageData();

  if (!pageData) {
    return <div>Error: Article Page data not found.</div>;
  }

  const { heroData, articles } = pageData;

  return (
    <div>
      {/* ✅ Render Hero First */}
      {heroData && <HeroComponent {...heroData} />}

      <h1>Artiklar</h1>

      {/* ✅ Render Articles */}
      <ArticlesComponent articles={articles} />
    </div>
  );
}