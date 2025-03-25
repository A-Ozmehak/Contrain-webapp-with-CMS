'use client';

import styles from './categories.module.css';
import { useState, useEffect } from 'react';

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoriesProps {
  categories: CategoryItem[];
}

const CategoriesComponent: React.FC<CategoriesProps> = ({ categories = [] }) => {
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
    <div className={styles.categoryContainer}>
      <h4>Kategorier</h4>
      <div>
        {categories.map((item) => (
          <ul key={item.id} className={styles.categoryItem}>
            <li>{item.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComponent;
