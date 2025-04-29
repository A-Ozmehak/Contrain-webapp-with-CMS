import styles from './titleAndText.module.css';

interface TitleAndTextItem {
  Icon?: string;
  SkillTitle: string;
  SkillText: string;
}

interface TitleAndTextProps {
  Services: TitleAndTextItem[];
  Image?: string;
}

const TitleAndTextComponent: React.FC<TitleAndTextProps> = ({ Services = [], Image }) => {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.gridWrapper}>
        {Services.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.title}>{item.SkillTitle}</h3>
            <div className={styles.line}></div>
            <p className={styles.text}>{item.SkillText}</p>
          </div>
        ))}
        {Image && (
          <div className={styles.imageWrapper}>
            <img src={Image} alt="Service Overview" className={styles.image} />
          </div>
        )}
      </div>
    </section>

  );
};

export default TitleAndTextComponent;
