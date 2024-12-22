'use client'

import styles from './page.module.css';
import TypewriterTitle from '@/components/typewriterTitle/typewriterTitle';
import useIsMobile from '@/hooks/useIsMobile';

export default function Home() {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }} >
    {isMobile ? (
      <h1>Skapa visionen</h1>
    ) : (
      <div className='typewriterTitle'>
        <TypewriterTitle texts={['Gör din idé till verklighet', 'Här börjar fantastiska produkter', 'Skapa visionen']} />
        <h2 className={styles.subtitle}>Vi förverkligar dina idéer</h2>  
      </div>
    )}
  </div>
);
}


