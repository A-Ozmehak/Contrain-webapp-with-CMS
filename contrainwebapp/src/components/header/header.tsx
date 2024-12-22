'use client'
import Image from 'next/image';
import styles from './header.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
    id: number;
    title: string;
    url: string;
    order: number;
}

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isDesktop, setDesktop] = useState<boolean>(false);
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    interface ApiResponseItem {
        id: number;
        attributes?: {
          title: string;
          url: string;
          order: number;
        };
        title?: string;
        url?: string;
        order?: number;
      }
  
    const fetchNavItems = async () => {
        try {
          const res = await fetch('http://localhost:1337/api/navigations'); // Replace with your Strapi URL
          if (!res.ok) {
            throw new Error('Failed to fetch navigation items');
          }
    
          const json: { data: ApiResponseItem[]} = await res.json();
          const items: NavItem[] = json.data
            .map((item: any) => ({
              id: item.id,
              title: item.title || item.attributes?.title || '',
              url: item.url || item.attributes?.url || '#',
              order: item.order || item.attributes?.order || 0,
            }))
            .sort((a, b) => a.order - b.order);
    
          setNavItems(items);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching navigation items:', error);
          setLoading(false);
        }
      };
    
      // Effect to fetch data and update screen size on mount
      useEffect(() => {
        fetchNavItems();
    
        const updateMedia = () => setDesktop(window.innerWidth > 1400);
        updateMedia();
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
      }, []);
    
      if (loading) {
        return <header className={styles.header}>Loading...</header>;
      }
    
    return (
        <header className={styles.header}>
            <a href='/'><Image src="/logo/logo-big-shadow.png" alt="contrain logo" width={100} height={50} /></a>
            {isDesktop ? ( 
                <nav className={styles.desktopNavMenu}>
                    <ul className={styles.desktopNavMenuList}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link href={item.url}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <p>|</p>
                    <div className={styles.socialMedia}>
                        <a href='https://www.facebook.com/contrainrobot'><i className="fab fa-facebook-f"></i></a>
                        <a href='https://www.instagram.com/contrain_robot/'><i className="fab fa-instagram"></i></a>
                        <a href='https://www.linkedin.com/company/contrain-ab/'><i className="fab fa-linkedin"></i></a>
                    </div>
                </nav>
                    
            ) : (
                <>
                    <i className="fas fa-bars" onClick={() => setMenuOpen(!menuOpen)}></i> 
                    <aside className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
                        <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
                            &times;
                        </button>
                        {menuOpen && (
                            <nav className={styles.mobileNavMenu}>
                                <ul className={styles.mobileNavMenuList}>
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <Link href={item.url}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                </aside>
            </>
            )}
        </header>
      
    );
} 

export default Header;