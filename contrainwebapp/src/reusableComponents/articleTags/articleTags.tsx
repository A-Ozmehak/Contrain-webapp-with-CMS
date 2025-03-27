'use client';

import styles from './articleTags.module.css';
import { useState, useEffect } from 'react';

interface TagItem {
  id: number;
  name: string;
}

interface TagProps {
  tags: TagItem[];
}

const TagsComponent: React.FC<TagProps> = ({ tags = [] }) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowComponent(window.innerWidth >= 1400);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showComponent) return null;

  return (
    <div className={styles.articleTagsContainer}>
      <h4>Taggar</h4>
      <div>
        {tags.map((item) => (
          <a key={item.id} className={styles.tagItem}>
            <p>{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TagsComponent;
