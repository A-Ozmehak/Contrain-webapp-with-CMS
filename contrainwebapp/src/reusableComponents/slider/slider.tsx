'use client';
import useIsMobile from '@/hooks/useIsMobile';
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

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        {Images.map((item) =>
          item.Image.map((img) => (
            <a key={img.id} href={item.Url || '#'}>
              <img
                src={img.url || '/microcontroller.webp'} // Use the original image URL
                alt={item.Alt || 'Image'}
                className={styles.backgroundImage}
              />
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default SliderComponent;