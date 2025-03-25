'use client';

import { useEffect, useState } from 'react';
import styles from './latestArticles.module.css';

interface ArticleItem {
  id: number;
  Image: string;
  Date: string;
  Text: string;
}

interface LatestArticles {
  articles: ArticleItem[];
}

const LatestArticlesComponent: React.FC<LatestArticles> = ({ articles = [] }) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowComponent(window.innerWidth >= 1400);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showComponent) return null;

  return (
    <div className={styles.latestArticlesContainer}>
      <h4>Senaste artiklar</h4>
      <div className={styles.latestArticles}>
        {articles.map((item) => (
          <div key={item.id} className={styles.articleItem}>
            <img src={item.Image} alt='' />
            <div className={styles.latestArticleText}>
              <p>{item.Date}</p>
              <p>{item.Text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesComponent;
