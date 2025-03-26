'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import styles from './slider.module.css';

interface SliderProps {
  Images: Array<{
    id: number;
    Url?: string;
    Alt?: string;
    HoverTitle?: string;
    HoverDescription?: string;
    image: string; // Image URL as a string
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
        {Images.length > 0 ? (
          Images.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              <a href={item.Url || '#'} className={styles.imageLink}>
                <div className={styles.sliderImageWrapper}>
                  <img
                    src={item.image || '/microservices.webp'}
                    alt={item.Alt || 'Image'}
                    className={styles.sliderImage}
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
          <p>No images available</p>  // Show a message when no images are available
        )}
      </Swiper>
    </div>
  );
};

export default SliderComponent;