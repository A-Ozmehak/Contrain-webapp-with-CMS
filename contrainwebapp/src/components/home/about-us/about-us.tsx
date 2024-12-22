import styles from './about-us.module.css';

const AboutUs = () => {
    return (
        <section className={styles.aboutUs}>
            <h3>Om Contrain som företag</h3>
            <p>Contrain är en forsknings- och utvecklingskraftverk med fokus på konsten och vetenskapen bakom prototypskapande.
                Företaget är en ledstjärna för innovation och erbjuder stöd för att förverkliga idéer till funktionella prototyper.
            </p>

            <div>
                <div>
                    <i></i>
                    <p>Supersnabbt och pålitligt</p>
                </div>
                <div>
                    <i></i>
                    <p>Expertis</p>
                </div>
                <div>
                    <i></i>
                    <p>Vi levererar resultat</p>
                </div>
            </div>

            <div>
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
            </div>
        </section>
    );
} 

export default AboutUs;