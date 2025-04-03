'use client';

import styles from './printingForm.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface PrintingFormProps {
  CompanyInputLabel: string;
  CompanyPlaceholder: string;
  ContactPersonInputLabel: string;
  ContactPersonPlaceholder: string;
  EmailInputLabel: string;
  EmailPlaceholder: string;
  PhoneInputLabel: string;
  PhonePlaceholder: string;
  ProjectDescriptionInputLabel: string;
  ProjectDescriptionPlaceholder: string;
  FileInputLabel: string;
  QuantityInputLabel: number;
  MaterialRadioLabel: string;
  MaterialOptions: { id: number; Option: string }[];
  ColorLabel: string;
  ColorOptions: { id: number; Option: string }[];
  DeliveryTimeLabel: string;
  DeliveryTimeOptions: { id: number; Option: string }[];
  DeliveryDateLabel: string;
  ExtraServicesLabel: string;
  ExtraServicesOptions: { id: number; Option: string }[];
  MessageInputLabel: string;
  ButtonLabel: string;
  BackgroundColor?: string;
}

const PrintingComponent: React.FC<PrintingFormProps> = ({ 
  CompanyInputLabel,
  CompanyPlaceholder,
  ContactPersonInputLabel, 
  ContactPersonPlaceholder, 
  EmailInputLabel, 
  EmailPlaceholder,
  PhoneInputLabel,
  PhonePlaceholder,
  ProjectDescriptionInputLabel,
  ProjectDescriptionPlaceholder,
  FileInputLabel,
  QuantityInputLabel,
  MaterialRadioLabel,
  MaterialOptions = [],
  ColorLabel,
  ColorOptions = [],
  DeliveryTimeLabel,
  DeliveryTimeOptions = [],
  DeliveryDateLabel,
  ExtraServicesLabel,
  ExtraServicesOptions = [],
  MessageInputLabel,
  ButtonLabel,
  BackgroundColor 
}) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);


  return (
    <form className={`${styles.printingForm} ${backgroundClass}`.trim()}>
       <div className={styles.printingFormGroup}>
        <label htmlFor="companyName" className={styles.label}>{CompanyInputLabel}:</label>
        <input type="text" id="companyName" name="printingCompanyName" className={styles.input} placeholder={CompanyPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="name" className={styles.label}>{ContactPersonInputLabel}:</label>
        <input type="text" id="name" name="printingName" className={styles.input} placeholder={ContactPersonPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="email" className={styles.label}>{EmailInputLabel}</label>
        <input type="email" id="email" name="printingEmail" className={styles.input} placeholder={EmailPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="phone" className={styles.label}>{PhoneInputLabel}:</label>
        <input type="text" id="phone" name="printingPhone" className={styles.input} placeholder={PhonePlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="projectDescription" className={styles.label}>{ProjectDescriptionInputLabel}:</label>
        <textarea id="projectDescription" name="printingProjectDescription" className={styles.textarea} placeholder={ProjectDescriptionPlaceholder}></textarea>
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="file" className={styles.label}>{FileInputLabel}</label>
        <input type="file" id="file" name="printingFile" className={styles.file} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="quantity" className={styles.label}>{QuantityInputLabel}:</label>
        <input type="number" id="quantity" name="printingQuantity" className={styles.input} />
      </div>

      {/* Material Radio Options */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="material" className={styles.label}>{MaterialRadioLabel}:</label>
        <div className={styles.printingFormRadio}>
          {MaterialOptions.length > 0 && MaterialOptions.map((option) => (
            <div key={option.id} className={styles.printingFormRadioGroup}>
              <input type="radio" id={`material-${option.id}`} name="printingMaterial" className={styles.input} value={option.Option} />
              <label htmlFor={`material-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Options Dropdown */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="color" className={styles.label}>{ColorLabel}:</label>
        <div className={styles.printingFormSelect}>
          <select id="color" name="color">
            {ColorOptions.length > 0 && ColorOptions.map((option) => (
              <option key={option.id} value={option.Option}>{option.Option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Delivery Time Radio Options */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="deliveryTime" className={styles.label}>{DeliveryTimeLabel}:</label>
        <div className={styles.printingFormRadio}>
          {DeliveryTimeOptions.length > 0 && DeliveryTimeOptions.map((option) => (
            <div key={option.id} className={styles.printingFormRadioGroup}>
              <input type="radio" id={`deliveryTime-${option.id}`} name="printingDeliveryTime" className={styles.input} value={option.Option} />
              <label htmlFor={`deliveryTime-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Date */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="deliveryDate" className={styles.label}>{DeliveryDateLabel}:</label>
        <input type="date" id="deliveryDate" name="deliveryDate" />
      </div>

      {/* Extra Services Checkbox Options */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="extraServices" className={styles.label}>{ExtraServicesLabel}:</label>
        <div className={styles.printingFormRadio}>
          {ExtraServicesOptions.length > 0 && ExtraServicesOptions.map((option) => (
            <div key={option.id} className={styles.printingFormRadioGroup}>
              <input type="checkbox" id={`extraService-${option.id}`} name="printingExtraServices" className={styles.input} value={option.Option} />
              <label htmlFor={`extraService-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="message" className={styles.label}>{MessageInputLabel}:</label>
        <textarea id="message" name="printingProjectMessage" className={styles.textarea}></textarea>
      </div>

      <button type="submit" className={styles.printingFormButton}>{ButtonLabel}</button>    
    </form>
  );
};

export default PrintingComponent;
