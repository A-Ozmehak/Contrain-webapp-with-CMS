'use client';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './textWithBackgroundImage.module.css';

interface componentProps {
  SectionTitle?: string;
  SubText?: string;
  BackgroundImage?: string;
  ButtonLabel?: string;
  ButtonUrl?: string;
}

const TextWithBackgroundImageComponent: React.FC<componentProps> = ({ SectionTitle, SubText, BackgroundImage, ButtonLabel, ButtonUrl }) => {
  const isMobile = useIsMobile(); // Detect if mobile

  return (
    <div className={styles.sectionContainer}>
        <div className={styles.imageWrapper}>
            <img
                src={BackgroundImage}
                alt="background"
                className={styles.backgroundImage}
            />

            <div className={styles.overlay}></div> 
                
            <div className={styles.textContainer}>
                <h4 className={styles.sectionTitle}>{SectionTitle}</h4>
                <p className={styles.subText}>{SubText}</p>
                { ButtonLabel && ButtonUrl &&
                    <a href={ButtonUrl} className={styles.button}>{ButtonLabel}</a>
                }
            </div>
        </div> 
    </div>
  );
};

export default TextWithBackgroundImageComponent;
