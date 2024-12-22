import styles from './quote.module.css';

const Quote = () => {
    return (
        <section className={styles.quote}>
            <h3>"Tålamod, uthållighet och hårt arbete är en oslagbar kombination för framgång"</h3>
            <p>NAPOLEON HILL - FÖRFATTARE</p>
        </section>
    );
} 

export default Quote;