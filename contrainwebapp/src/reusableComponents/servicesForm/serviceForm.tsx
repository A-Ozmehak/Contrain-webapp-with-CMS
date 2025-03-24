'use client';

import styles from './serviceForm.module.css';

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
  ButtonUrl
}) => {
  return (
    <section className={styles.servicesFormContainer}>
      <div className={styles.servicesFormTextContent}>
        <h2>{SectionTitle}</h2>
        <p>{SubText}</p>
      </div>

      <div className={styles.servicesFormWrapper}>
        <h3>{FormTitle}</h3>
        <form action={ButtonUrl || '#'} method="POST" className={styles.servicesForm}>
          <div className={styles.servicesFormInputWrapper}>
            <label>{NameInputLabel}</label>
            <input type="text" name="name" required />
          </div>
          <div className={styles.servicesFormInputWrapper}>
            <label>{EmailInputLabel}</label>
            <input type="email" name="email" required />
          </div>
          <div className={styles.servicesFormInputWrapper}>
            <label>{SubjectInputLabel}</label>
            <input type="text" name="subject" required />
          </div>
          <div className={styles.servicesFormInputWrapper}>
            <label>{MessageInputLabel}</label>
            <textarea name="message" rows={4}></textarea>
          </div>
          <button type="submit">{ButtonLabel}</button>
        </form>
      </div>
    </section>
  );
};

export default ServiceFormComponent;
