'use client';
import useIsMobile from '@/hooks/useIsMobile';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';
import styles from './hero.module.css';
import Image from 'next/image';

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; 
  BackgroundImage?: string;
  ShowButton: boolean;
  ButtonWithBackgroundLabel?: string;
  ButtonWithBackgroundUrl?: string;
  BorderButtonLabel?: string;
  BorderButtonUrl?: string;
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage, ShowButton, ButtonWithBackgroundLabel, ButtonWithBackgroundUrl, BorderButtonLabel, BorderButtonUrl }) => {
  const isMobile = useIsMobile();
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);
  const showStaticTitle = isMobile || typewriterTextsArray.length === 0;

  return (
    <div id="heroContainer" className={styles.heroContainer}>
      <div id="heroImageWrapper" className={styles.imageWrapper}>
        <Image
          src={BackgroundImage || '/microcontroller.webp'}
          alt="background"
          className={styles.backgroundImage}
          width={800}
          height={600}
          id='heroImage'
        />
        <div className={styles.typewriterContainer}>
          {showStaticTitle ? (
            <div>
              <h1 className={styles.typewriterTitle}>{Title}</h1>
              <h2 className={styles.subtitle}>{SubText}</h2>
            </div>
          ) : (
            <div>
              {typewriterTextsArray.length > 0 && <TypewriterTitle texts={typewriterTextsArray} />}
              <h2 className={styles.subtitle}>{SubText}</h2>
            </div>
          )}
            
              {ShowButton && (
                <div className={styles.heroButtonsContainer}>
                  <a href={ButtonWithBackgroundUrl} className={styles.heroFirstButton}>
                    {ButtonWithBackgroundLabel}
                  </a>
                  <a href={BorderButtonUrl} className={styles.heroSecondButton}>
                    {BorderButtonLabel}
                  </a>
                </div>
              )}     
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
