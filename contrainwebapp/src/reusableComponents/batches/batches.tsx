import styles from './batches.module.css';

interface BatchItem {
  Title: string;
  Description: string;
  ButtonLabel: string;
  ButtonUrl: string;
  BackgroundImage: string;
}

interface BatchesProps {
  Batches: BatchItem[];
}

const BatchesComponent: React.FC<BatchesProps> = ({ Batches = [] }) => {
  return (
    <div id="batches" className={styles.batchesContainer}>
      {Batches.map((batch, index) => (
        <div key={index} className={styles.batchCard}>
          <div className={styles.imageWrapper}>
            <img src={batch.BackgroundImage} alt={batch.Title} className={styles.image} />
            <div className={styles.overlay}>
              <h4 className={styles.title}>{batch.Title}</h4>
              <p className={styles.description}>{batch.Description}</p>
              <a href={batch.ButtonUrl} className={styles.button}>{batch.ButtonLabel}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BatchesComponent;
