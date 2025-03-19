'use client'
import Image from 'next/image';
import styles from './header.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
    id: number;
    title: string;
    url: string;
    order: number;
    placement: string;
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState<boolean>(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  const menuRef = useRef<HTMLDivElement | null>(null);

  const fetchNavItems = async () => {
    try {
      const res = await fetch('http://localhost:1337/api/navigations');
      if (!res.ok) {
        throw new Error('Failed to fetch navigation items');
      }
    
      const json: { data: any[] } = await res.json();
      const items: NavItem[] = json.data
        .map((item) => ({
          id: item.id,
          title: item.title || item.attributes?.title || '',
          url: item.url || item.attributes?.url || '#',
          order: item.order || item.attributes?.order || 0,
          placement: item.Placement || 'Seperate',
        }))
        .sort((a, b) => a.order - b.order);
    
      setNavItems(items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavItems();
    const updateMedia = () => setDesktop(window.innerWidth > 1400);
    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
    
  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setDropdownOpen({}); // Close all dropdowns
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

    // 🔹 Function to Smooth Scroll to Section
    const handleScrollToSection = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false); // Close mobile menu
      }
    };

  if (loading) {
    return <header className={styles.header}>Loading...</header>;
  }

  // 🔹 Group navigation items
  const mainNav = navItems.filter(item => item.placement === "Seperate");
  const aboutNav = navItems.filter(item => item.placement === "About");
  const servicesNav = navItems.filter(item => item.placement === "Services");

  return (
    <header className={styles.header}>
      <a href='/'><Image src="/logo/logo-big-shadow.png" alt="contrain logo" width={125} height={80} /></a>
        {isDesktop ? ( 
          <nav className={styles.desktopNavMenu}>
            <ul className={styles.desktopNavMenuList}>
              {mainNav.map((item) => {
                if (item.title === "Tjänster") {
                  return (
                    <li key={item.id} className={styles.dropdown}>
                      <Link href={item.url} className={styles.parentLink}>
                        {item.title}
                      </Link>
                      {servicesNav.length > 0 && (
                        <ul className={styles.dropdownMenu}>
                          {servicesNav.map(service => (
                            <li key={service.id}>
                              <Link href={service.url}>{service.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }
                if (item.title === "Om oss") {
                  return (
                    <li key={item.id} className={styles.dropdown}>
                      <Link href={item.url} className={styles.parentLink}>
                        {item.title}
                      </Link>
                      {aboutNav.length > 0 && (
                        <ul className={styles.dropdownMenu}>
                          {aboutNav.map(about => (
                            <li key={about.id}>
                              <Link href={about.url}>{about.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={item.id}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                );
              })}
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
            {menuOpen && (
              <aside ref={menuRef} className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
                  &times;
                </button>
                <nav className={styles.mobileNavMenu}>
                  <ul className={styles.mobileNavMenuList}>
                    {mainNav.map((item) => {
                      if (item.title === "Tjänster") {
                        return (
                          <li key={item.id} className={styles.dropdown}>
                            <Link href={item.url} onClick={() => setMenuOpen(false)} className={styles.parentLink}>
                              {item.title}
                            </Link>
                            {servicesNav.length > 0 && (
                              <ul className={styles.dropdownMenu}>
                                {servicesNav.map(service => (
                                  <li key={service.id}>
                                    <Link href={service.url} onClick={() => setMenuOpen(false)}>{service.title}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      }
                      if (item.title === "Om oss") {
                        return (
                          <li key={item.id} className={styles.dropdown}>
                            <Link href={item.url} onClick={() => setMenuOpen(false)} className={styles.parentLink}>
                              {item.title}
                            </Link>
                            {aboutNav.length > 0 && (
                              <ul className={styles.dropdownMenu}>
                                {aboutNav.map(about => (
                                  <li key={about.id}>
                                    <Link href={about.url} onClick={() => setMenuOpen(false)}>{about.title}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      }
                      return (
                        <li key={item.id}>
                          <Link href={item.url} onClick={() => setMenuOpen(false)}>{item.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>
            )}     
          </>
        )}
    </header>
  );
};

export default Header;
