'use client';

import styles from './categories.module.css';
import { useState, useEffect } from 'react';

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoriesProps {
  categories: CategoryItem[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoriesComponent: React.FC<CategoriesProps> = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
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
    <div className={styles.categoryContainer}>
      <h4>Kategorier</h4>
      <ul className={styles.categoryList}>
        <li
          onClick={() => onSelectCategory(null)}
          className={selectedCategory === null ? styles.active : ""}
        >
          Alla
        </li>
        {categories.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelectCategory(item.name)}
            className={selectedCategory === item.name ? styles.active : ""}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesComponent;
