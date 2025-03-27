'use client';

import styles from './articleTags.module.css';
import { useState, useEffect } from 'react';

interface TagItem {
  id: number;
  name: string;
}

interface TagProps {
  tags: TagItem[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const TagsComponent: React.FC<TagProps> = ({ 
  tags = [], 
  selectedTag,
   onSelectTag 
  }) => {
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
    <div className={styles.articleTagsContainer}>
      <h4>Taggar</h4>
      <div className={styles.tagList}>
        {tags.map((item) => (
          <p
            key={item.id}
            onClick={() => onSelectTag(item.name)}
            className={`${styles.tagItem} ${selectedTag === item.name ? styles.active : ""}`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TagsComponent;
