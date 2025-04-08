'use client';
import useIsMobile from '@/hooks/useIsMobile';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';
import styles from './hero.module.css';

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; 
  BackgroundImage?: string;
  ShowButton: boolean;
  ButtonLabel?: string;
  ButtonUrl?: string;
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage, ShowButton, ButtonLabel, ButtonUrl }) => {
  const isMobile = useIsMobile(); // Detect if mobile
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);
  const showStaticTitle = isMobile || typewriterTextsArray.length === 0;

  return (
    <div id="heroContainer" className={styles.heroContainer}>
      <div id="heroImageWrapper" className={styles.imageWrapper}>
        <img
          src={BackgroundImage || '/microcontroller.webp'}
          alt="background"
          className={styles.backgroundImage}
          id='heroImage'
        />
        <div className={styles.typewriterContainer}>
          {showStaticTitle ? (
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
