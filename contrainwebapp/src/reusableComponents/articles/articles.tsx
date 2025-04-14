'use client';

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
    Category: string;
    Title: string;
    Text: string;
    Slug: string;
  }
  
  interface ArticlesProps {
    articles: ArticleItem[];
  }

  const ArticlesComponent: React.FC<ArticlesProps> = ({ articles }) => {
    return (
      <div className={styles.articlesContainer}>
        {articles.length > 0 ? (
          [...articles]
            .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
            .map((article) => (
              <ArticleComponent key={article.id} {...article} />
            ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    );
  };
  
  export default ArticlesComponent;
