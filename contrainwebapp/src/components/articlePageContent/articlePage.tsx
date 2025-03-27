'use client';

import fetchArticlePageData from "@/utils/fetchArticlePageData";
import ArticlesComponent from "@/reusableComponents/articles/articles";
import HeroComponent from "@/components/articlePageHero/hero";
import LatestArticlesComponent from "@/reusableComponents/latestArticles/latestArticles";
import styles from "./articlePageContent.module.css";
import CategoriesComponent from "@/reusableComponents/categories/categories";
import TagsComponent from "@/reusableComponents/articleTags/articleTags";
import { useState } from 'react';

export default function ArticlePageClient({ data }: { data: Awaited<ReturnType<typeof fetchArticlePageData>> }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
    if (!data) {
      return <div>Error: Article Page data not found.</div>;
    }
  
    const { heroData, articles, categories, tags } = data;
  
    // ✅ Filter articles
    const filteredArticles = selectedCategory
      ? articles.filter((a) => a.Category === selectedCategory)
      : articles;
  
    return (
      <div>
        {heroData && <HeroComponent {...heroData} />}
  
        <div className={styles.articlePageContainer}>
          <ArticlesComponent articles={filteredArticles} />
  
          <div className={styles.articlesSidebar}>
            <LatestArticlesComponent articles={articles} />
            <CategoriesComponent
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <TagsComponent tags={tags} />
          </div>
        </div>
      </div>
    );
  }