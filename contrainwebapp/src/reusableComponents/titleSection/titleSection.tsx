import styles from './titleSection.module.css';

interface TitleSectionProps {
  Title?: string;
  SubTitle?: string;
}

const TitleSectionComponent: React.FC<TitleSectionProps> = ({ Title, SubTitle }) => {

  return (
    <div id="titleSection" className={styles.titleSection}>
        <h1>{Title}</h1>
        <p>{SubTitle}</p>
    </div>
  );
};

export default TitleSectionComponent;
