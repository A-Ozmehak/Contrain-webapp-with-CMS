'use client';

import ContactInfoComponent from '../contactInfo/contactInfo';
import PrintingComponent from '../printingForm/printingForm';
import styles from './offertComponent.module.css';

interface SocialMediaItem {
  id: number;
  Icon: string;
  Url: string;
}

interface ContactInfoProps {
  Title: string;
  Email: string;
  Phone: string;
  Address: string;
  City: string;
  Country: string;
  SocialMediaSectionTitle?: string;
  SubText?: string;
  SocialMedia?: SocialMediaItem[];
}

interface PrintingFormProps {
  CompanyInputLabel: string;
  CompanyPlaceholder?: string;
  ContactPersonInputLabel: string;
  ContactPersonPlaceholder?: string;
  EmailInputLabel: string;
  EmailPlaceholder?: string;
  PhoneInputLabel: string;
  PhonePlaceholder?: string;
  ProjectDescriptionInputLabel: string;
  ProjectDescriptionPlaceholder?: string;
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
  SectionTitle?: string;
}

interface OffertComponentProps {
    PageTitle: string;
    PageSubTitle: string;
    contactInfo?: ContactInfoProps;
    offertForm?: PrintingFormProps;
}

const OffertComponent: React.FC<OffertComponentProps> = ({ PageTitle, PageSubTitle, contactInfo, offertForm }) => {
  return (
    <div id="offertComponent" className={styles.offertContainer}>
        <div className={styles.offertOverlay}></div>
        <div className={styles.offertContentContainer}>
            <div className={styles.offertTitleContainer}>
                <h1>{PageTitle}</h1>
                <p>{PageSubTitle}</p>
            </div>
            <div className={styles.offertContent}>
                <div className={styles.offertContactInfoContainer}>
                    {contactInfo && (
                        <ContactInfoComponent contactInfo={contactInfo} />
                    )}
                </div>
                <div className={styles.offertFormContainer}>
                    {offertForm ? (
                        <PrintingComponent
                        CompanyInputLabel={offertForm.CompanyInputLabel}
                        CompanyPlaceholder={offertForm.CompanyPlaceholder || ''}
                        ContactPersonInputLabel={offertForm.ContactPersonInputLabel}
                        ContactPersonPlaceholder={offertForm.ContactPersonPlaceholder || ''}
                        EmailInputLabel={offertForm.EmailInputLabel}
                        EmailPlaceholder={offertForm.EmailPlaceholder || ''}
                        PhoneInputLabel={offertForm.PhoneInputLabel}
                        PhonePlaceholder={offertForm.PhonePlaceholder || ''}
                        ProjectDescriptionInputLabel={offertForm.ProjectDescriptionInputLabel}
                        ProjectDescriptionPlaceholder={offertForm.ProjectDescriptionPlaceholder || ''}
                        FileInputLabel={offertForm.FileInputLabel}
                        QuantityInputLabel={offertForm.QuantityInputLabel}
                        MaterialRadioLabel={offertForm.MaterialRadioLabel}
                        MaterialOptions={offertForm.MaterialOptions || []}
                        ColorLabel={offertForm.ColorLabel}
                        ColorOptions={offertForm.ColorOptions || []}
                        DeliveryTimeLabel={offertForm.DeliveryTimeLabel}
                        DeliveryTimeOptions={offertForm.DeliveryTimeOptions || []}
                        DeliveryDateLabel={offertForm.DeliveryDateLabel}
                        ExtraServicesLabel={offertForm.ExtraServicesLabel}
                        ExtraServicesOptions={offertForm.ExtraServicesOptions || []}
                        MessageInputLabel={offertForm.MessageInputLabel}
                        ButtonLabel={offertForm.ButtonLabel}
                        SectionTitle={offertForm.SectionTitle || ''}
                        />
                    ) : (
                        <p>Form is not available.</p>
                    )}
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default OffertComponent;
