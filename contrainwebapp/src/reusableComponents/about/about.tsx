'use client';

import useIsMobile from '@/hooks/useIsMobile';
import styles from './about.module.css';

interface AboutProps {
  Title: string;
  AboutText: string;
  AboutKeyPoints: Array<{ id: number; Icon: string; Text: string }>;
  AboutImages: Array<{ id: number; Image: string; ImageAltText: string }>;
}

const AboutComponent: React.FC<AboutProps> = ({ Title, AboutText, AboutKeyPoints = [], AboutImages = [] }) => {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div id='about-us' className={styles.aboutContainer}>
      <h3 className={styles.aboutTitle}>{Title}</h3>
      <p className={styles.aboutText}>{AboutText}</p>
      <div className={styles.aboutKeyPoints}>
        {AboutKeyPoints.map((keyPoint) => (
          <div key={keyPoint.id} className={styles.keyPoint}>
            <i className={keyPoint.Icon} />
            <p>{keyPoint.Text}</p>
          </div>
        ))}
      </div>
      <div className={styles.aboutImages}>
        {/* {AboutImages.map((image) => (
          <img key={image.id} src={image.Image || '/left-product-1.webp'} alt={image.ImageAltText} />
        ))} */}
        <img className={styles.aboutLeftImg} src='/left-product-1.webp' alt="About" />
        <img className={styles.aboutMiddleImg} src='/middle-product-1.webp' alt="About" />
        <img className={styles.aboutRightImg} src='/right-product-1.webp' alt="About" />
      </div>
    </div>
  
  );
};

export default AboutComponent;
