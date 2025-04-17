'use client';

import { useState } from 'react';
import styles from './serviceForm.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface ServiceFormProps {
  SectionTitle: string;
  SubText: string;
  FormTitle: string;
  NameInputLabel: string;
  EmailInputLabel: string;
  SubjectInputLabel: string;
  MessageInputLabel?: string;
  ButtonLabel: string;
  ButtonUrl?: string;
  BackgroundColor?: string;
}

const ServiceFormComponent: React.FC<ServiceFormProps> = ({
  SectionTitle,
  SubText,
  FormTitle,
  NameInputLabel,
  EmailInputLabel,
  SubjectInputLabel,
  MessageInputLabel,
  ButtonLabel,
  BackgroundColor
}) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('http://localhost:1337/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('Your message has been sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <section id='services-form' className={`${styles.servicesFormContainer} ${backgroundClass}`.trim()}>
      <div className={styles.servicesFormContent}>
        <div className={styles.servicesFormTextContent}>
          <h2>{SectionTitle}</h2>
          <p>{SubText}</p>
        </div>

        <div className={styles.servicesFormWrapper}>
          <h3>{FormTitle}</h3>
          <form onSubmit={handleSubmit} className={styles.servicesForm}>
            <div className={styles.servicesFormInputWrapper}>
              <label>{NameInputLabel}</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className={styles.servicesFormInputWrapper}>
              <label>{EmailInputLabel}</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.servicesFormInputWrapper}>
              <label>{SubjectInputLabel}</label>
              <input type="text" name="subject" required value={formData.subject} onChange={handleChange} />
            </div>
            <div className={styles.servicesFormInputWrapper}>
              <label>{MessageInputLabel}</label>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit">{ButtonLabel}</button>
            {status && <p>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceFormComponent;
