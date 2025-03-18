import styles from './contactInfo.module.css';

interface ContactInfoProps {
    companyName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
}

const ContactInfoComponent: React.FC<ContactInfoProps> = ({ companyName, email, phone, address, city }) => {
  return (
    <div className={styles.contactInfoContainer}>
      <h5>{companyName}</h5>
        <div className={styles.contactInfo}>
          <p><i className="fa-regular fa-envelope"></i>{email}</p>
          <p><i className="fa-solid fa-phone"></i>{phone}</p>
          <p><i className="fa-regular fa-building"></i>{address}</p>
          <p><i className="fa-solid fa-location-dot"></i>{city}</p>
        </div>
      </div>
  );
};

export default ContactInfoComponent;
