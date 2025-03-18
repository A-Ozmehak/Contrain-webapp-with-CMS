'use client';
import useIsMobile from '@/hooks/useIsMobile';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';
import styles from './hero.module.css';

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; // ✅ Ensure correct type
  BackgroundImage?: string;
  ShowButton: boolean;
  ButtonLabel?: string;
  ButtonUrl?: string;
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage, ShowButton, ButtonLabel, ButtonUrl }) => {
  const isMobile = useIsMobile(); // Detect if mobile
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={BackgroundImage || '/microcontroller.webp'}
          alt="background"
          className={styles.backgroundImage}
        />
        <div className={styles.typewriterContainer}>
          {isMobile ? (
            <h1 className={styles.typewriterTitle}>{Title}</h1>
          ) : (
            <div>
              {typewriterTextsArray.length > 0 && <TypewriterTitle texts={typewriterTextsArray} />}
              <h2 className={styles.subtitle}>{SubText}</h2>
            </div>
          )}

          {ShowButton && (
            <a href={ButtonUrl || '/'} className={styles.heroButton}>
              {ButtonLabel || 'Learn More'}
            </a>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default HeroComponent;
