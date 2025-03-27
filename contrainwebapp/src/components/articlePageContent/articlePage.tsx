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
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
    if (!data) {
      return <div>Error: Article Page data not found.</div>;
    }
  
    const { heroData, articles, categories, tags } = data;
  
    // Wrap setters to make them exclusive
    const handleCategorySelect = (category: string | null) => {
      setSelectedCategory(category);
      setSelectedTag(null); // reset tag when category is picked
    };

    const handleTagSelect = (tag: string | null) => {
      setSelectedTag(tag);
      setSelectedCategory(null); // reset category when tag is picked
    };

    const filteredArticles = articles.filter((a) => {
      if (selectedCategory) {
        return a.Category === selectedCategory;
      }
      if (selectedTag) {
        const tagList = a.Tags.split(',').map((tag) => tag.trim());
        return tagList.includes(selectedTag);
      }
      return true; // show all if no filter
    });

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
              onSelectCategory={handleCategorySelect}
            />
            <TagsComponent 
              tags={tags} 
              selectedTag={selectedTag}
              onSelectTag={handleTagSelect} />
          </div>
        </div>
      </div>
    );
  }