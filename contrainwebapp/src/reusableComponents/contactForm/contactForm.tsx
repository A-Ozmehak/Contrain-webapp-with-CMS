'use client';

import useIsMobile from '@/hooks/useIsMobile';
import styles from './contactForm.module.css';
import ContactInfoComponent from '../contactInfo/contactInfo';

interface ContactFormProps {
  SectionTitle?: string;
  SectionSubText?: string;
  FormTitle?: string;
  NameLabel?: string;
  EmailLabel?: string;
  MessageLabel?: string;
  CompanyName?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  City?: string;
  SocialMediaSectionTitle?: string;
  FacebookUrl?: string;
  InstagramUrl?: string;
  LinkedInUrl?: string;
  SocialMediaSubText?: string;
  BackgroundImage?: string;
}

const ContactFormComponent: React.FC<ContactFormProps> = ({ 
    SectionTitle, 
    SectionSubText, 
    FormTitle, 
    NameLabel, 
    EmailLabel, 
    MessageLabel, 
    CompanyName,
    Email,
    Phone,
    Address,
    City,
    SocialMediaSectionTitle,
    FacebookUrl,
    InstagramUrl,
    LinkedInUrl,
    SocialMediaSubText,
    BackgroundImage 
}) => {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.contactFormTitleContainer}>
        <h3 className={styles.contactFormTitle}>{SectionTitle}</h3>
        <p>{SectionSubText}</p>
      </div>
      <div className={styles.contactFormBottomPartContainer}>
        <div className={styles.contactInfoContainer}>
          <ContactInfoComponent email={Email} companyName={CompanyName} phone={Phone} address={Address} city={City} />
          <div className={styles.socialMediaContainer}>
              <h6>{SocialMediaSectionTitle}</h6>
              <div className={styles.socialMediaIcons}>
                <a href={FacebookUrl}><i className="fa-brands fa-facebook-f"></i></a>
                <a href={InstagramUrl}><i className="fa-brands fa-linkedin-in"></i></a>
                <a href={LinkedInUrl}><i className="fa-brands fa-instagram"></i></a>
              </div>
              <p>{SocialMediaSubText}</p>
          </div>
        </div>

        <div>
          <form className={styles.contactForm}>
            <h5>{FormTitle}</h5>
            <div className={styles.nameInput}>
              <label className={styles.label}>{NameLabel}</label>
              <input type='text'name='contactName' className={styles.input} />
            </div>
            <div className={styles.emailInput}>
              <label className={styles.label}>{EmailLabel}</label>
              <input type='email' name='contactEmail' className={styles.input} />
            </div>
            <div className={styles.messageInput}>
              <label className={styles.label}>{MessageLabel}</label>
              <input type='message' name='contactMessage' className={styles.input} />
            </div>
            <button id='contactFormBtn' className={styles.submitButton}>Skicka</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default ContactFormComponent;
