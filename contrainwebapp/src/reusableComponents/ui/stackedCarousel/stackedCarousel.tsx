'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./stackedCarousel.module.css";
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

// ✅ Props for the component
interface StackedCarouselProps {
  slides: {
    image: string;
    HoverTitle?: string;
    HoverDescription?: string;
    Url?: string;
  }[];
  className?: string;
  BackgroundColor?: string;
  SectionTitle: string;
}

const StackedCarousel: React.FC<StackedCarouselProps> = ({
  slides = [],
  className = "",
  BackgroundColor,
  SectionTitle
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundClass = useBackgroundClass(BackgroundColor);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getSlideIndex = (index: number): number => {
    return (index - activeIndex + slides.length) % slides.length;
  };

  return (
    <div className={`${styles.stackedCarouselContainer} ${backgroundClass}`.trim()}>
      <h4>{SectionTitle}</h4>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselInner}>
          {/* Arrows */}
          <button onClick={prevSlide} className={`${styles.arrowButton} ${styles.leftArrow}`}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button onClick={nextSlide} className={`${styles.arrowButton} ${styles.rightArrow}`}>
            <i className="fa-solid fa-chevron-right" />
          </button>

          {/* Slides */}
          <div className="relative h-full w-full">
            {slides.map((item, index) => {
              const position = getSlideIndex(index);
              return (
                <a
                  key={index}
                  href={item.Url || "#"}
                  rel="noopener noreferrer"
                  className={cn(
                    "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-700",
                    "cursor-pointer hover:scale-105",
                    {
                      "z-30": position === 0,
                      "z-20": position === 1 || position === slides.length - 1,
                      "z-10": position === 2 || position === slides.length - 2,
                      "opacity-0": slides.length > 4 && position > 2 && position < slides.length - 2,
                      "-translate-x-[98%]": position === slides.length - 1,
                      "translate-x-[0%]": position === 1,
                      "scale-90": position !== 0,
                      "-rotate-12": position === slides.length - 1,
                      "rotate-12": position === 1,
                    }
                  )}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "1rem",
                    boxShadow:
                      position === 0
                        ? "0 0 30px rgba(0, 0, 0, 0.4)"
                        : "0 0 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className={styles.slideContent}>
                    <h3>{item.HoverTitle}</h3>
                    <p>{item.HoverDescription}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedCarousel;
