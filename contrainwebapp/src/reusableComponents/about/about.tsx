'use client';

import styles from './about.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface AboutProps {
  Title: string;
  AboutText: string;
  AboutKeyPoints: Array<{ id: number; Icon: string; Text: string }>;
  AboutImages: Array<{ id: number; Image: string; ImageAltText: string }>;
  BackgroundColor?: string;
}

const AboutComponent: React.FC<AboutProps> = ({ Title, AboutText, AboutKeyPoints = [], AboutImages = [], BackgroundColor }) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div id='about-us' className={`${styles.aboutContainer} ${backgroundClass}`.trim()}>
      <div className={styles.aboutContent}>
        <h3 className={styles.aboutTitle}>{Title}</h3>
        <p className={styles.aboutText}>{AboutText}</p>
        <div className={styles.aboutKeyPoints}>
          {AboutKeyPoints.map((keyPoint) => (
            <div key={keyPoint.id} className={styles.keyPoint}>
              <i className={keyPoint.Icon} />
              <p className={styles.aboutTextContent}>{keyPoint.Text}</p>
            </div>
          ))}
        </div>
        <div className={styles.aboutImages}>
          {AboutImages.map((image) => (
            <img key={image.id} src={image.Image || '/left-product-1.webp'} alt={image.ImageAltText} />
          ))}
        </div>
      </div> 
    </div>
  );
};

export default AboutComponent;
