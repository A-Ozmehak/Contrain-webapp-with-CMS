'use client';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './slider.module.css';

interface SliderProps {
    Image: string;
    Url?: string;
}


const SliderComponent: React.FC<SliderProps> = ({ Image, Url }) => {
  const isMobile = useIsMobile(); // Detect if mobile
  // const sliderArray = Media.map((item) => item.Image);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        <a href={Url}>
          <img
            src={Image || '/microcontroller.webp'}
            alt="background"
            className={styles.backgroundImage}
          />
        </a>
      </div>
    </div>
  );
};

export default SliderComponent;