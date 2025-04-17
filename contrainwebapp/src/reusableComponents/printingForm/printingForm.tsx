'use client';

import { useState } from 'react';
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
  const [status, setStatus] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    projectDescription: '',
    quantity: '',
    material: '',
    color: '',
    deliveryTime: '',
    deliveryDate: '',
    extraServices: [] as string[],
    message: '',
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
  
      setFormData(prev => ({
        ...prev,
        extraServices: checked
          ? [...prev.extraServices, value]
          : prev.extraServices.filter((item) => item !== value),
      }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const formPayload = new FormData();

    if (file) {
      formPayload.append('modelFile', file);
    }
    
    formPayload.append('companyName', formData.companyName);
    formPayload.append('contactPerson', formData.contactPerson);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('projectDescription', formData.projectDescription);
    formPayload.append('quantity', formData.quantity);
    formPayload.append('material', formData.material);
    formPayload.append('color', formData.color);
    formPayload.append('deliveryTime', formData.deliveryTime);
    formPayload.append('deliveryDate', formData.deliveryDate);
    formPayload.append('extraServices', formData.extraServices.join(', '));
    formPayload.append('message', formData.message);

    try {
      const res = await fetch('http://localhost:1337/api/printing-form', {
        method: 'POST',
        body: formPayload,
      });
  
      if (!res.ok) throw new Error('Failed');
  
      setStatus('Sent!');
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        projectDescription: '',
        quantity: '',
        material: '',
        color: '',
        deliveryTime: '',
        deliveryDate: '',
        extraServices: [],
        message: '',
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };
  
  return (
    <form onSubmit={handleSubmit} className={`${styles.printingForm} ${backgroundClass}`.trim()}>
       <div className={styles.printingFormGroup}>
        <label htmlFor="printingCompanyName" className={styles.label}>{CompanyInputLabel}:</label>
        <input type="text" value={formData.companyName} onChange={handleChange} id="companyName" name="companyName" className={styles.input} required placeholder={CompanyPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingContactPerson" className={styles.label}>{ContactPersonInputLabel}:</label>
        <input type="text" value={formData.contactPerson} onChange={handleChange} id="name" name="contactPerson" className={styles.input} required placeholder={ContactPersonPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingEmail" className={styles.label}>{EmailInputLabel}</label>
        <input type="email" value={formData.email} onChange={handleChange} id="email" name="email" className={styles.input} required placeholder={EmailPlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingPhone" className={styles.label}>{PhoneInputLabel}:</label>
        <input type="text" value={formData.phone} onChange={handleChange} id="phone" name="phone" className={styles.input} required placeholder={PhonePlaceholder} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingProjectDescription" className={styles.label}>{ProjectDescriptionInputLabel}:</label>
        <textarea value={formData.projectDescription} onChange={handleChange} id="projectDescription" name="projectDescription" required className={styles.textarea} placeholder={ProjectDescriptionPlaceholder}></textarea>
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingFile" className={styles.label}>{FileInputLabel}</label>
        <input type="file" id="file" name="modelFile" accept=".stl,.3mf,.gcode" className={styles.file} onChange={handleFileChange} />
      </div>
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingQuantity" className={styles.label}>{QuantityInputLabel}:</label>
        <input type="number" value={formData.quantity} onChange={handleChange} id="quantity" name="quantity" className={styles.input} />
      </div>

      {/* Material Radio Options */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="material" className={styles.label}>{MaterialRadioLabel}:</label>
        <div className={styles.printingFormRadio}>
          {MaterialOptions.length > 0 && MaterialOptions.map((option) => (
            <div key={option.id} className={styles.printingFormRadioGroup}>
              <input type="radio" id={`material-${option.id}`} name="material" className={styles.input} value={option.Option} onChange={handleChange} />
              <label htmlFor={`material-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Options Dropdown */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="color" className={styles.label}>{ColorLabel}:</label>
        <div className={styles.printingFormSelect}>
          <select id="color" name="color" value={formData.color} onChange={handleChange}>
            <option value="" disabled hidden>Välj färg</option>
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
              <input type="radio" id={`deliveryTime-${option.id}`} name="deliveryTime" className={styles.input} value={option.Option} onChange={handleChange} />
              <label htmlFor={`deliveryTime-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Date */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="deliveryDate" className={styles.label}>{DeliveryDateLabel}:</label>
        <input type="date" id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />
      </div>

      {/* Extra Services Checkbox Options */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="extraServices" className={styles.label}>{ExtraServicesLabel}:</label>
        <div className={styles.printingFormRadio}>
          {ExtraServicesOptions.length > 0 && ExtraServicesOptions.map((option) => (
            <div key={option.id} className={styles.printingFormRadioGroup}>
              <input type="checkbox" id={`extraService-${option.id}`} name="extraServices" className={styles.input} value={option.Option} onChange={handleChange} />
              <label htmlFor={`extraService-${option.id}`}>{option.Option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className={styles.printingFormGroup}>
        <label htmlFor="printingProjectMessage" className={styles.label}>{MessageInputLabel}:</label>
        <textarea id="message" value={formData.message} onChange={handleChange} name="message" className={styles.textarea}></textarea>
      </div>

      <button type="submit" className={styles.printingFormButton}>{ButtonLabel}</button>    
      {status && <p>{status}</p>}
    </form>
  );
};

export default PrintingComponent;
