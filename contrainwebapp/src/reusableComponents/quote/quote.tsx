import styles from './quote.module.css';

interface QuoteProps {
  Text: string;
  Author: string;
}

const QuoteComponent: React.FC<QuoteProps> = ({ Text, Author }) => {
  return (
    <div className={styles.quoteContainer}>
        <h5 className={styles.quoteContent}>"{Text || 'Quote text'}"</h5>
        <p> - {Author}</p>
      </div>
  );
};

export default QuoteComponent;
