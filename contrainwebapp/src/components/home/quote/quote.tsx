import styles from './quote.module.css';

const Quote = () => {
    return (
        <section className={styles.quote}>
            <q>Tålamod, uthållighet och hårt arbete är en oslagbar kombination för framgång</q>
            <p className={styles.quoteAuthor}>NAPOLEON HILL - <span>FÖRFATTARE</span></p>
        </section>
    );
} 

export default Quote;