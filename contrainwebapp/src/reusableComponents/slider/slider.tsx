'use client';
import useIsMobile from '@/hooks/useIsMobile';
import { useState, useEffect, useRef } from 'react';
import styles from './slider.module.css';

interface ImageFormat {
  url: string;
}

interface ImageObject {
  id: number;
  url: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

interface SliderProps {
  Images: Array<{
    id: number;
    Image: ImageObject[];
    Url?: string;
    Alt?: string;
  }>;
}

const SliderComponent: React.FC<SliderProps> = ({ Images = [] }) => {
  const isMobile = useIsMobile(); // Detect if mobile
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Adjust images per page dynamically based on screen size
  const getImagesPerPage = () => {
    if (window.innerWidth <= 768) return 1; // Mobile
    if (window.innerWidth <= 1024) return 2; // Tablet
    return 4; // Desktop
  };

  const [imagesPerPage, setImagesPerPage] = useState(getImagesPerPage());

  useEffect(() => {
    const updateImagesPerPage = () => setImagesPerPage(getImagesPerPage());
    window.addEventListener('resize', updateImagesPerPage);
    return () => window.removeEventListener('resize', updateImagesPerPage);
  }, []);

  const totalPages = Math.ceil(Images.length / imagesPerPage);

  // ✅ Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, totalPages]);

  // ✅ Group images into slides (each slide contains `imagesPerPage` images)
  const groupedImages = [];
  for (let i = 0; i < Images.length; i += imagesPerPage) {
    groupedImages.push(Images.slice(i, i + imagesPerPage));
  }
  // 
  return (
    <div id='our-projects' className={styles.sliderContainer} ref={sliderRef}>
      {/* ✅ Slide Wrapper */}
      <div className={styles.imageWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {groupedImages.map((group, index) => (
          <div key={index} className={styles.slide}>
            {group.map((item) =>
              item.Image.map((img) => (
                <a key={img.id} href={item.Url || '#'}>
                  <img src={'/microcontroller.webp'} alt={item.Alt || 'Image'} className={styles.sliderImage} />
                </a>
              ))
            )}
          </div>
        ))}
      </div>

      {/* ✅ Pagination Dots */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span key={index} className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`} onClick={() => setCurrentSlide(index)}></span>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;