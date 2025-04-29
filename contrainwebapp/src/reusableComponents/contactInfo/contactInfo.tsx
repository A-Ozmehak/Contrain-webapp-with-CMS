import styles from './contactInfo.module.css';

interface SocialMediaItem {
  id: number;
  Url: string; 
  Icon: string; 
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

const ContactInfoComponent: React.FC<{ contactInfo: ContactInfoProps }> = ({ contactInfo }) => {
  return (
    <div className={styles.contactInfoContainer}>
      <h5>{contactInfo.Title}</h5>
      <div className={styles.contactInfo}>
        <p><i className="fa-regular fa-envelope"></i> {contactInfo.Email}</p>
        <p><i className="fa-solid fa-phone"></i> {contactInfo.Phone}</p>
        <p><i className="fa-regular fa-building"></i> {contactInfo.Address}</p>
        <p><i className="fa-solid fa-location-dot"></i> {contactInfo.City}, {contactInfo.Country}</p>
      </div>
      {contactInfo.SocialMediaSectionTitle && (
        <div className={styles.socialSection}>
          <h6>{contactInfo.SocialMediaSectionTitle}</h6>
          <div className={styles.socialIcons}>
            {contactInfo.SocialMedia?.map((media) => (
              <a key={media.id} href={media.Url} className={styles.contactInfoSocialMediaLink} target="_blank" rel="noopener noreferrer">
                <i className={media.Icon}></i>
              </a>
            ))}
          </div>
          {contactInfo.SubText && <p>{contactInfo.SubText}</p>}
        </div>
      )}
    </div>
  );
};

export default ContactInfoComponent;
