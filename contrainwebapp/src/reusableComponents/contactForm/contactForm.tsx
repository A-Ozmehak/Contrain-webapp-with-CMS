'use client';

import useIsMobile from '@/hooks/useIsMobile';
import styles from './contactForm.module.css';

interface ContactFormProps {
  Title?: string;
  SubText?: string;
  FormContainerTitle?: string;
  NameFormLabel?: string;
  EpostFormLabel?: string;
  MessageFormLabel?: string;
  CompanyName?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  City?: string;
  SocialMediaTitle?: string;
  FacebookLink?: string;
  InstagramLink?: string;
  LinkedInLink?: string;
  SocialMediaText?: string;
  BackgroundImage?: string;
}

const ContactFormComponent: React.FC<ContactFormProps> = ({ 
    Title, 
    SubText, 
    FormContainerTitle, 
    NameFormLabel, 
    EpostFormLabel, 
    MessageFormLabel, 
    CompanyName,
    Email,
    Phone,
    Address,
    City,
    SocialMediaTitle,
    FacebookLink,
    InstagramLink,
    LinkedInLink,
    SocialMediaText,
    BackgroundImage 
}) => {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.contactFormTitleContainer}>
        <h3 className={styles.contactFormTitle}>{Title || 'Låt oss Börja din resa'}</h3>
        <p>{SubText || 'Ta steget och förverkliga din drömvision'}</p>
      </div>
      
      <div className={styles.contactFormBottomPartContainer}>
        <div className={styles.contactInfoContainer}>
          <h5>{CompanyName || 'Contrain'}</h5>
          <div className={styles.contactInfo}>
              <p><i className="fa-regular fa-envelope"></i>{Email || 'info@contrain.se'}</p>
              <p><i className="fa-solid fa-phone"></i>{Phone || '+46 (0) 705 61 46 56'}</p>
              <p><i className="fa-regular fa-building"></i>{Address || 'Karl Johansgatan 152'}</p>
              <p><i className="fa-solid fa-location-dot"></i>{City || 'Göteborg'}</p>
          </div>
          <div className={styles.socialMediaContainer}>
              <h6>{SocialMediaTitle || 'Kontakta oss'}</h6>
              <div className={styles.socialMediaIcons}>
                  <a href={FacebookLink}><i className="fa-brands fa-facebook-f"></i></a>
                  <a href={InstagramLink}><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href={LinkedInLink}><i className="fa-brands fa-instagram"></i></a>
              </div>
              <p>{SocialMediaText || 'Följ oss på social medier'}</p>
          </div>
        </div>

        <div>
          <form className={styles.contactForm}>
              <h5>{FormContainerTitle || 'Skicka oss ett Meddelande'}</h5>
              <div className={styles.nameInput}>
                  <label className={styles.label}>{NameFormLabel || 'Namn'}</label>
                  <input type='text'name='name' className={styles.input} />
              </div>
              <div className={styles.emailInput}>
                  <label className={styles.label}>{EpostFormLabel || 'E-post'}</label>
                  <input type='email' name='email' className={styles.input} />
              </div>
              <div className={styles.messageInput}>
                  <label className={styles.label}>{MessageFormLabel || 'Meddelande(valfritt)'}</label>
                  <input type='message' name='message' className={styles.input} />
              </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default ContactFormComponent;
