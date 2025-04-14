'use client';

import fetchArticlePageData from "@/utils/fetchArticlePageData";
import ArticlesComponent from "@/reusableComponents/articles/articles";
import HeroComponent from "@/components/articlePageHero/hero";
import LatestArticlesComponent from "@/reusableComponents/latestArticles/latestArticles";
import styles from "./articlePageContent.module.css";
import CategoriesComponent from "@/reusableComponents/categories/categories";
import TagsComponent from "@/reusableComponents/articleTags/articleTags";
import { useState } from 'react';
import CalenderComponent from "@/reusableComponents/ui/calender/calender";
import fetchLatestArticles from "@/utils/fetchLatestArticles";
import { isSameDay, parseISO } from "date-fns";

interface ArticlePageClientProps {
  data: Awaited<ReturnType<typeof fetchArticlePageData>>;
  latestArticles: Awaited<ReturnType<typeof fetchLatestArticles>>;
}

export default function ArticlePageClient({ data, latestArticles }: ArticlePageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    if (!data) {
      return <div>Error: Article Page data not found.</div>;
    }
  
    const { heroData, articles, categories, tags } = data;
  
    const handleCategorySelect = (category: string | null) => {
      setSelectedCategory(category);
      setSelectedTag(null);
      setDate(new Date());
    };

    const handleTagSelect = (tag: string | null) => {
      setSelectedTag(tag);
      setSelectedCategory(null);
      setDate(new Date());
    };

    const handleDateSelect = (selectedDate: Date) => {
      if (date && isSameDay(date, selectedDate)) {
        setDate(null);
      } else {
        setDate(selectedDate);
        setSelectedCategory(null);
        setSelectedTag(null);
      }
    };
    
    const filteredArticles = articles.filter((a) => {
      const articleDate = a.Date ? parseISO(a.Date) : null;
    
      if (selectedCategory) {
        return a.Category === selectedCategory;
      }
    
      if (selectedTag) {
        const tagList = a.Tags.split(',').map((tag) => tag.trim());
        return tagList.includes(selectedTag);
      }
    
      if (date && articleDate) {
        return isSameDay(articleDate, date);
      }
    
      return true;
    });
    

    return (
      <div>
        {heroData && <HeroComponent {...heroData} />}
  
        <div className={styles.articlePageContainer}>
          <ArticlesComponent articles={filteredArticles} />
  
          <div className={styles.articlesSidebar}>
            <LatestArticlesComponent articles={latestArticles} />
            <CategoriesComponent
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <TagsComponent 
              tags={tags} 
              selectedTag={selectedTag}
              onSelectTag={handleTagSelect} />
            <CalenderComponent value={date ?? undefined} onChange={handleDateSelect} variant="gradient" />
          </div>
        </div>
      </div>
    );
  }