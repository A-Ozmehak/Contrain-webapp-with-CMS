'use client';
import useIsMobile from '@/hooks/useIsMobile';
import TypewriterTitle from '@/components/typewriterTexts/typewriterTexts';
import styles from './servicesLarge.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface ServiceProps {
  Title: string;
  Description?: string;
  TypewriterTexts?: Array<{ id: number; Text: string }>;
  BackgroundImage?: {
    url: string;
  };
  Url: string;
}

interface ServicesLargeProps {
  Services: Array<ServiceProps>;
  BackgroundColor?: string;
}

const ServicesLargeComponent: React.FC<ServicesLargeProps> = ({ Services = [], BackgroundColor }) => {
  const isMobile = useIsMobile();
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div className={`${styles.servicesLargeContainer} ${backgroundClass}`.trim()}>
      {Services.map((service) => {
        const typewriterTextsArray = service.TypewriterTexts?.map((item) => item.Text) || [];
        const bgImageUrl = service.BackgroundImage?.url || '/microcontroller.webp';

        return (
          <a key={service.Url} href={service.Url} className={styles.serviceCard}>
            <div className={styles.servicesLargeImageWrapper}>
              <img
                src={bgImageUrl}
                alt={service.Title}
                className={styles.servicesLargeBackgroundImage}
              />
              <div className={styles.servicesLargeTypewriterContainer}>
                {isMobile ? (
                  <h1 className={styles.typewriterTitle}>{service.Title}</h1>
                ) : (
                  <>
                    {typewriterTextsArray.length > 0 && (
                      <TypewriterTitle texts={typewriterTextsArray} />
                    )}
                    <h2 className={styles.subtitle}>{service.Description}</h2>
                  </>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ServicesLargeComponent;
