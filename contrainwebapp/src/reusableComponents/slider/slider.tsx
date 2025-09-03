'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import styles from './slider.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';
import Image from 'next/image';

interface SliderProps {
  Images: Array<{
    id: number;
    Url?: string;
    Alt?: string;
    HoverTitle?: string;
    HoverDescription?: string;
    image: string;
  }>;
  BackgroundColor?: string;
  SectionTitle: string;
}

const SliderComponent: React.FC<SliderProps> = ({ Images = [], BackgroundColor, SectionTitle }) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div className={`${styles.sliderContainer} ${backgroundClass}`.trim()}>
      <h4>{SectionTitle}</h4>
      <div id="our-projects" className={styles.sliderContent}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className={styles.swiper}
        >
          {Images.length > 0 ? (
            Images.map((item) => (
              <SwiperSlide key={`slide-${item.id}-${item.Url || item.Alt || item.HoverTitle || Math.random()}`} className={styles.swiperSlide}>
                <a href={item.Url || '#'} className={styles.imageLink}>
                  <div className={styles.sliderImageWrapper}>
                    <Image
                      src={item.image || '/microservices.webp'}
                      alt={item.Alt || 'Image'}
                      className={styles.sliderImage}
                      height={100}
                      width={100}
                    />
                    <div className={styles.hoverOverlay}>
                      <h3>{item.HoverTitle}</h3>
                      <p>{item.HoverDescription}</p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))
          ) : (
            <p>No images available</p>
          )}
        </Swiper>
      </div>
    </div>
    
  );
};

export default SliderComponent;