'use client';

import { useState, useEffect } from 'react';
import styles from './typewriterTitle.module.css';

interface TypewriterTextProps {
  texts?: string[];
}

const TypewriterTitle: React.FC<TypewriterTextProps> = ({ texts = [] }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = isDeleting ? 100 : 100;
  const isSingleText = texts.length === 1;

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentText) {
      if (isSingleText) {
        return;
      }
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentText.slice(0, displayedText.length - 1)
          : currentText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, isSingleText]);

  return (
    <h1 className={styles.typewriterTitle}>
      {displayedText}
      <span style={{ borderRight: '2px solid white', marginLeft: '2px' }}></span>
    </h1>
  );
};

export default TypewriterTitle;
