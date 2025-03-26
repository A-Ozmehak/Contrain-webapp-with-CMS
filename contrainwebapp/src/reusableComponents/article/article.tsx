'use client';

import styles from './article.module.css';

interface CategoryItem {
  id: number;
  Category: string;
}

interface ArticleItem {
  Image: string;
  Author: string;
  Date: string
  Category: string;
  Title: string;
  Text: string;
}

const ArticleComponent: React.FC<ArticleItem> = ({ Image, Author, Date, Category, Title, Text }) => {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleImageWrapper}>
        <img src={Image} alt="article" className={styles.articleImage} />
      </div>
      <div className={styles.articleTextContent}>
        <div className={styles.articleHeader}>
          <p className={styles.articleAuthor}>by {Author}</p>
          <p>{Date}</p>
        </div>
        <p className={styles.articleCategory}>{Category}</p>
        <h3>{Title}</h3>
        <p className={styles.articleDescription}>{Text}</p>
        <button className={styles.articleButton}>Läs mer</button>
      </div>
    </div>
  );
};

export default ArticleComponent;