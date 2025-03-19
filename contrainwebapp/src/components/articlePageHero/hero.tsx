"use client";
import useIsMobile from "@/hooks/useIsMobile";
import TypewriterTitle from "@/components/typewriterTexts/typewriterTexts";
import styles from "./hero.module.css";

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; // ✅ Ensure correct type
  BackgroundImage?: { url: string }; // ✅ Use Strapi's image format
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage }) => {
  const isMobile = useIsMobile();
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={BackgroundImage?.url || "/microcontroller.webp"} // ✅ Extract Strapi image URL
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
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;