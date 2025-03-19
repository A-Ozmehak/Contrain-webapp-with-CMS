'use client';

import { useState, useEffect } from 'react';
import ArticleComponent from '@/reusableComponents/article/article';
import styles from './articles.module.css';

interface CategoryItem {
    id: number;
    Category: string;
  }
  
  interface ArticleItem {
    id: number;
    Image: string;
    Author: string;
    Date: string;
    Categories: CategoryItem[];
    Title: string;
    Text: string;
  }
  
  interface ArticlesProps {
    articles: ArticleItem[];
  }

  const ArticlesComponent: React.FC<ArticlesProps> = ({ articles }) => {
    return (
      <div className={styles.articlesContainer}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleComponent key={article.id} {...article} />
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    );
  };
  
  export default ArticlesComponent;
