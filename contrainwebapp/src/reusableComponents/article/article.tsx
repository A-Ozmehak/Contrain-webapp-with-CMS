'use client';

import styles from './article.module.css';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface ArticleItem {
  Image: string;
  Author: string;
  Date: string;
  Category: string;
  Title: string;
  Text: string;
  Slug: string;
}

const ArticleComponent: React.FC<ArticleItem> = ({
  Image,
  Author,
  Date,
  Category,
  Title,
  Text,
  Slug,
}) => {
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

        <div className={styles.articleDescription}>
          <ReactMarkdown>{Text}</ReactMarkdown>
        </div>
          <Link className={styles.articleButton} href={Slug}>Läs mer</Link>
        </div>
    </div>
  );
};

export default ArticleComponent;
