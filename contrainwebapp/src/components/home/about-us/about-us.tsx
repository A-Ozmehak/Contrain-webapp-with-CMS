import styles from './about-us.module.css';
import DynamicZone from '@/components/dynamic-zone';
import { Block } from '@/components/dynamic-zone';

export const getStaticProps = async () => {
    const response = await fetch(
      'http://localhost:1337/api/about?populate[blocks][populate]=*'
    );
    const data = await response.json();
  
    return {
      props: {
        about: data.data.attributes // Extract the attributes (including blocks)
      },
    };
  };
  
const AboutUs = ({ about }: { about: {title: string, blocks: any[] }}) => {
    const { title, blocks } = about;

    return (
        <section className={styles.aboutUsContentContainer}>
            <div className={styles.aboutUsHeader}>
                <h3>{title}</h3>
                <p>Contrain är en forsknings- och utvecklingskraftverk med fokus på konsten och vetenskapen bakom prototypskapande.
                    Företaget är en ledstjärna för innovation och erbjuder stöd för att förverkliga idéer till funktionella prototyper.
                </p>
            </div>

            {blocks.map((block) => (
                <DynamicZone blocks={[block]} />
            ))}
        </section>
    );
} 

export default AboutUs;