'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './accordion.module.css';

interface AccordionItemType {
  Title: string;
  Text: string;
}

interface AccordionProps {
  AccordionItem?: AccordionItemType[];
}

const AccordionComponent: React.FC<AccordionProps> = ({ AccordionItem = [] }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div id="accordion" className={styles.accordionContainer}>
      {AccordionItem.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const contentRef = useRef<HTMLDivElement>(null);

        return (
          <div key={index} className={styles.accordionItem}>
            <button
              className={`${styles.accordionTitle} ${isOpen ? styles.open : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {item.Title}
              <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            <div
              ref={contentRef}
              className={styles.accordionContentWrapper}
              style={{
                maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
              }}
            >
              <div className={styles.accordionContent}>
                <p>{item.Text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionComponent;
