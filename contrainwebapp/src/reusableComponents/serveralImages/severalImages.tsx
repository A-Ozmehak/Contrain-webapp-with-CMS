import React from 'react';
import styles from './severalImages.module.css';

interface ImageItem {
  id: number;
  Image: string;
  Alt?: string;
}

interface SeveralImagesProps {
  Image: ImageItem[];
}

const SeveralImagesComponent: React.FC<SeveralImagesProps> = ({ Image }) => {
  if (!Image || Image.length === 0) {
    return null;
  }

  return (
    <div className={styles.severalImagesContainer}>
      {Image.map((item) => (
        <div key={item.id} className="w-full">
          <img
            src={item.Image}
            alt={item.Alt || "Image"}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default SeveralImagesComponent;
