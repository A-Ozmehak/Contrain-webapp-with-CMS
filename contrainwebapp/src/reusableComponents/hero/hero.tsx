'use client';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './hero.module.css';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>;
  BackgroundImage: string;
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage }) => {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

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
            <h1 className={styles.typeWriterTitle}>{Title}</h1>
          ) : (
            <div>
              {typewriterTextsArray.length > 0 && <TypewriterTitle texts={typewriterTextsArray} />}
              <h2 className={styles.subtitle}>{SubText}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
