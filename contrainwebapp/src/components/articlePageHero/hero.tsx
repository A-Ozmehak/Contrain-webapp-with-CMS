"use client";
import useIsMobile from "@/hooks/useIsMobile";
import TypewriterTitle from "@/components/typewriterTexts/typewriterTexts";
import styles from "./hero.module.css";

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; 
  BackgroundImage?: { url: string };
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage }) => {
  const isMobile = useIsMobile();
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);

  // BackgroundImage?.url || 
  return (
    <div className={styles.articleHeroContainer}>
      <div className={styles.articleImageWrapper}>
        <img
          src={"/microcontroller.webp"}
          alt="background"
          className={styles.articleBackgroundImage}
        />
        <div className={styles.articleTypewriterContainer}>
          {isMobile ? (
            <h1 className={styles.typewriterTitle}>{Title}</h1>
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