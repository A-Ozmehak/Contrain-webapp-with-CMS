'use client';
import { useState, useEffect } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';
import styles from './hero.module.css';

interface HeroProps {
  Title?: string;
  SubText?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>; // ✅ Ensure correct type
  BackgroundImage?: string;
}

const HeroComponent: React.FC<HeroProps> = ({ Title, SubText, TypewriterTexts = [], BackgroundImage }) => {
  const isMobile = useIsMobile(); // Detect if mobile
  const typewriterTextsArray = TypewriterTexts.map((item) => item.Text);

  console.log('Received Typewriter Texts in Hero:', typewriterTextsArray); // ✅ Debugging

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
