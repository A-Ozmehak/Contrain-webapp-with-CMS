'use client';

import React from 'react';
import styles from './material.module.css';
import { getStrapiMedia } from '@/utils';

interface MaterialDescriptionItem {
  id: number;
  MaterialShortName: string;
  MaterialFullName: string;
  Description: string;
  MaterialImage: {
    url: string;
  } | string;
}

interface MaterialProps {
  PageTitle?: string;
  MaterialDescription?: MaterialDescriptionItem[];
}

const MaterialComponent: React.FC<MaterialProps> = ({ PageTitle, MaterialDescription }) => {
  return (
    <section className={styles.materialContainer}>
      <div className={styles.materialGrid}>
        {MaterialDescription?.map((material) => (
          <div key={material.id} className={styles.materialCard}>
            {material.MaterialImage && (
              <img
                src={typeof material.MaterialImage === 'string'
                  ? material.MaterialImage
                  : getStrapiMedia(material.MaterialImage.url)}
                alt={material.MaterialShortName}
                className={styles.materialImage}
              />
            )}
            <h2 className={styles.materialShortName}>{material.MaterialShortName}</h2>
            <p className={styles.materialFullName}>{material.MaterialFullName}</p>
            <p className={styles.materialDescription}>{material.Description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MaterialComponent;
