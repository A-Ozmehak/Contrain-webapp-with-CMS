import styles from './quote.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface QuoteProps {
  Text: string;
  Author: string;
  BackgroundColor?: string;
}

const QuoteComponent: React.FC<QuoteProps> = ({ Text, Author, BackgroundColor }) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div className={`${styles.quoteContainer} ${backgroundClass}`.trim()}>
        <h5 className={styles.quoteContent}>"{Text || 'Quote text'}"</h5>
        <p> - {Author}</p>
      </div>
  );
};

export default QuoteComponent;
