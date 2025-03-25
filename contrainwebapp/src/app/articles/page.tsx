import fetchArticlePageData from "@/utils/fetchArticlePageData";
import ArticlesComponent from "@/reusableComponents/articles/articles";
import HeroComponent from "@/components/articlePageHero/hero";
import LatestArticlesComponent from "@/reusableComponents/latestArticles/latestArticles";
import styles from "./page.module.css";
import CategoriesComponent from "@/reusableComponents/categories/categories";

export default async function ArticlePage() {
  const pageData = await fetchArticlePageData();

  if (!pageData) {
    return <div>Error: Article Page data not found.</div>;
  }

  const { heroData, articles, categories } = pageData;

  return (
    <div>
      {/* ✅ Render Hero First */}
      {heroData && <HeroComponent {...heroData} />}

    <div className={styles.articlePageContainer}>
      {/* ✅ Render Articles */}
      <ArticlesComponent articles={articles} />
      <div className={styles.articlesSidebar}>
        <LatestArticlesComponent articles={articles} />
        <CategoriesComponent categories={categories} />
      </div>
      
    </div>
     
    </div>
  );
}