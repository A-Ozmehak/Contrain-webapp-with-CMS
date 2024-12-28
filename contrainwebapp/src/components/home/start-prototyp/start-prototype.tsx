import styles from './start-prototype.module.css';

const StartPrototype = () => {
    return (
        <section className={styles.startPrototyp}>
            <h2>Din idé är fantastisk, låt oss hjälpa dig!</h2>
            <p>Kontakta oss för en fri konsultation</p>
            <button className='purpleBtn'>Bygg din prototyp idag</button>
        </section>
    );
} 

export default StartPrototype;