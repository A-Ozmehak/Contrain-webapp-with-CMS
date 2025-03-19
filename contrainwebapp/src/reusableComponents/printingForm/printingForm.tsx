'use client';

import styles from './printingForm.module.css';

interface PrintingFormProps {
  NameInputLabel: string;
  NamePlaceholder: string;
  EmailInputLabel: string;
  EmailPlaceholder: string;
  MessageInputLabel: string;
  MessagePlaceholder: string;
  FileInputLabel: string;
  ButtonLabel: string;
}

const PrintingComponent: React.FC<PrintingFormProps> = ({ 
  NameInputLabel, 
  NamePlaceholder, 
  EmailInputLabel, 
  EmailPlaceholder,
  MessageInputLabel,
  MessagePlaceholder,
  FileInputLabel,
  ButtonLabel 
}) => {

  return (
    <form className={styles.printingForm}>
      <div className={styles.printingFormGroup}>
        <label htmlFor="name" className={styles.label}>{NameInputLabel}</label>
        <input type="text" id="name" name="printingName" className={styles.input} placeholder={NamePlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="email" className={styles.label}>{EmailInputLabel}</label>
        <input type="email" id="email" name="printingEmail" className={styles.input} placeholder={EmailPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="message" className={styles.label}>{MessageInputLabel}</label>
        <textarea id="message" name="printingMessage" className={styles.textarea} placeholder={MessagePlaceholder}></textarea>
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="file" className={styles.label}>{FileInputLabel}</label>
        <input type="file" id="file" name="printingFile" className={styles.file} />
      </div>
      <button type="submit" className={styles.printingFormButton}>{ButtonLabel}</button>    
    </form>
  );
};

export default PrintingComponent;