'use client';

import styles from './contactForm.module.css';
import ContactInfoComponent from '../contactInfo/contactInfo';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';
import { useState } from 'react';

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
  Country?: string;
  SocialMediaSectionTitle?: string;
  FacebookUrl?: string;
  InstagramUrl?: string;
  LinkedInUrl?: string;
  SocialMediaSubText?: string;
  BackgroundImage?: string; // full URL now
  BackgroundColor?: string;
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
  Country,
  SocialMediaSectionTitle,
  FacebookUrl,
  InstagramUrl,
  LinkedInUrl,
  SocialMediaSubText,
  BackgroundImage,
  BackgroundColor
}) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactMessage: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    const payload = {
      name: formData.contactName,
      email: formData.contactEmail,
      message: formData.contactMessage,
    };

    try {
      const res = await fetch('http://localhost:1337/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('Message sent!');
      setFormData({ contactName: '', contactEmail: '', contactMessage: '' });
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong.');
    }
  };

  const contactInfo = {
    Title: CompanyName || '',
    Email: Email || '',
    Phone: Phone || '',
    Address: Address || '',
    City: City || '',
    Country: Country || '',
    SocialMediaSectionTitle: SocialMediaSectionTitle || '',
    SubText: SocialMediaSubText || '',
    SocialMedia: [
      FacebookUrl ? { id: 1, Icon: 'fa-brands fa-facebook-f', Url: FacebookUrl } : null,
      LinkedInUrl ? { id: 2, Icon: 'fa-brands fa-linkedin-in', Url: LinkedInUrl } : null,
      InstagramUrl ? { id: 3, Icon: 'fa-brands fa-instagram', Url: InstagramUrl } : null,
    ].filter(Boolean) as { id: number; Icon: string; Url: string }[],
  };

  return (
    <div id="contact-us" className={`${styles.contactFormContainer}`}>
      {BackgroundImage && (
        <div className={styles.imageWrapper}>
          <img
            src={BackgroundImage}
            alt="Background"
            className={styles.backgroundImage}
          />
        </div>
      )}
      
      <div className={styles.overlay}></div>

      <div className={styles.contactFormContent}>
        <div className={styles.contactFormTitleContainer}>
          <h3 className={styles.contactFormTitle}>{SectionTitle}</h3>
          <p>{SectionSubText}</p>
        </div>

        <div className={styles.contactFormBottomPartContainer}>
          <div className={styles.contactInfoContainer}>
            <ContactInfoComponent contactInfo={contactInfo} />
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h5>{FormTitle}</h5>
            <div className={styles.nameInput}>
              <label className={styles.label}>{NameLabel}</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.emailInput}>
              <label className={styles.label}>{EmailLabel}</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.messageInput}>
              <label className={styles.label}>{MessageLabel}</label>
              <input
                type="text"
                name="contactMessage"
                value={formData.contactMessage}
                onChange={handleChange}
                className={styles.messageInputField}
                required
              />
            </div>
            <button id="contactFormBtn" className={styles.submitButton} type="submit">
              Skicka
            </button>
            {status && <p>{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormComponent;
