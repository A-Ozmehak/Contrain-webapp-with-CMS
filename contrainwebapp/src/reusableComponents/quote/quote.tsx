import styles from './quote.module.css';

interface QuoteProps {
  Text?: string;
}

const QuoteComponent: React.FC<QuoteProps> = ({ Text }) => {
  return (
    <div className={styles.quoteContainer}>
        <h5 className={styles.quoteContent}>"{Text || 'Quote text'}"</h5>
      </div>
  );
};

export default QuoteComponent;
