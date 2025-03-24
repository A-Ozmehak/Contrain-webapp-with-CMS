'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
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
    Url?: string;
    Alt?: string;
    HoverTitle?: string;
    HoverDescription?: string;
    Image: ImageObject[];
  }>;
}

const SliderComponent: React.FC<SliderProps> = ({ Images = [] }) => {
  return (
    <div id="our-projects" className={styles.sliderContainer}>
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
        {Images.map((item) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            {item.Image.map((img) => (
              <a key={img.id} href={item.Url || '#'} className={styles.imageLink}>
                <div className={styles.sliderImageWrapper}>
                  <img
                    src={'/microcontroller.webp'}
                    alt={item.Alt || 'Image'}
                    className={styles.sliderImage}
                  />
                  <div className={styles.hoverOverlay}>
                    <h3>{item.HoverTitle}</h3>
                    <p>{item.HoverDescription}</p>
                  </div>
                </div>
              </a>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
