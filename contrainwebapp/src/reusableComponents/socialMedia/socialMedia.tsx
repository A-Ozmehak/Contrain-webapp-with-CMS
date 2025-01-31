import styles from './socialMedia.module.css';

interface SocialMediaProps {
    Title?: string;
    FacebookUrl: string;
    FacebookIcon: string;
    LinkedInUrl: string;
    LinkedInIcon: string;
    InstagramUrl: string;
    InstagramIcon: string;
}

const SocialMediaComponent: React.FC<SocialMediaProps> = ({ Title, FacebookUrl, FacebookIcon, LinkedInUrl, LinkedInIcon, InstagramUrl, InstagramIcon }) => {
  return (
    <div className={styles.quoteContainer}>
        <h5 className={styles.companyNameContent}>{Title}</h5>
        <div>
          
        </div>
      </div>
  );
};

export default SocialMediaComponent;
