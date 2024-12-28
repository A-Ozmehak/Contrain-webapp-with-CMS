'use client'

import StartPrototyp from '@/components/home/start-prototyp/start-prototype';
import styles from './page.module.css';
import TypewriterTitle from '@/components/typewriterTitle/typewriterTitle';
import useIsMobile from '@/hooks/useIsMobile';
import StartPrototype from '@/components/home/start-prototyp/start-prototype';
import Prototypes from '@/components/home/prototypes/prototypes';
import Quote from '@/components/home/quote/quote';
import AboutUs from '@/components/home/about-us/about-us';
import SkillSets from '@/components/home/skill-sets/skill-sets';
import SkillMeters from '@/components/home/skill-meters/skill-meters';

export default function Home() {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div className={styles.homeMainContainer}>
      <div className={styles.typewriterContainer}>
        {isMobile ? (
          <h1>Skapa visionen</h1>
        ) : (
          <div className='typewriterTitle'>
            <TypewriterTitle texts={['Gör din idé till verklighet', 'Här börjar fantastiska produkter', 'Skapa visionen']} />
            <h2 className={styles.subtitle}>Vi förverkligar dina idéer</h2>  
          </div>
        )}
      </div>
     
      <StartPrototype />
      <Prototypes />
      <Quote />
      {/* <AboutUs /> */}
      <SkillSets />
      <SkillMeters />
    </div>
  );
}


