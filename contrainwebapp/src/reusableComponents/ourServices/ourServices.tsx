'use client';
import styles from './ourServices.module.css';

interface ServiceItem {
    id: number;
    Text: string;
    Icon?: string | null;
    Url: string;
    Image?: { url: string } | null;
  }

interface OurServicesProps {
    Title: string;
    SubText?: string;
    Services: ServiceItem[];
}

const OurServicesComponent: React.FC<OurServicesProps> = ({ Title, SubText, Services = [] }) => {
    return (
        <div className={styles.ourServicesContainer}>
            <div className={styles.ourServicesHeader}>
                <h4>{Title}</h4>
                {SubText && <p>{SubText}</p>}
            </div>
            <div className={styles.serviceContainer}>
                {Services.map((service) => (
                    <a href={service.Url} key={service.id} className={styles.serviceCard}>
                        <img src={service.Image?.url || "/microcontroller.webp"} alt="service" className={styles.serviceImage} />
                        <div className={styles.serviceTextContent}>
                            {service.Icon && <img src={service.Icon} alt="icon" />}
                            <h5>{service.Text}</h5>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default OurServicesComponent;
