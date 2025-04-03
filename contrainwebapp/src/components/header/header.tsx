'use client';

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
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
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
    const updateMedia = () => setIsDesktop(window.innerWidth > 1400);
    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setDropdownOpen({});
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleToggleDropdown = (title: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleScrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  if (loading) {
    return <header className={styles.header}>Loading...</header>;
  }

  const mainNav = navItems.filter(item => item.placement === "Seperate");
  const aboutNav = navItems.filter(item => item.placement === "About");
  const servicesNav = navItems.filter(item => item.placement === "Services");

  return (
    <header className={styles.header}>
      <a href='/'><Image src="/logo/Contrain_logo-white-19.svg" alt="contrain logo" className={styles.logo} width={150} height={100} /></a>

      {isDesktop ? (
        // ✅ Desktop Menu
        <nav className={styles.desktopNavMenu}>
          <ul className={styles.desktopNavMenuList}>
            {mainNav.map((item) => {
              const hasDropdown = item.title === "Tjänster" || item.title === "Om oss";
              const childItems = item.title === "Tjänster" ? servicesNav : item.title === "Om oss" ? aboutNav : [];

              return hasDropdown ? (
                <li key={item.id} className={styles.dropdown}>
                  <Link href={item.url} className={styles.parentLink}>
                    {item.title}
                  </Link>
                  <ul className={styles.desktopDropdownMenu}>
                    {childItems.map((child) => (
                      <li key={child.id}>
                        <Link href={child.url}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
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
        // ✅ Mobile Menu
        <>
          <i id={styles.mobilIcon} className="fas fa-bars" onClick={() => setMenuOpen(!menuOpen)}></i>
          {menuOpen && (
            <aside ref={menuRef} className={`${styles.mobileMenu} ${styles.open}`}>
              <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>&times;</button>
              <nav className={styles.mobileNavMenu}>
                <ul className={styles.mobileNavMenuList}>
                {mainNav.map((item) => {
                    const isDropdown = item.title === "Tjänster" || item.title === "Om oss";
                    const dropdownItems = item.title === "Tjänster" ? servicesNav : item.title === "Om oss" ? aboutNav : [];

                    return (
                      <li key={item.id} className={styles.mobileMenuItem}>
                        <div className={styles.mobileMenuHeader}>
                          <Link
                            href={item.url}
                            onClick={() => setMenuOpen(false)}
                            className={styles.parentLink}
                          >
                            {item.title}
                          </Link>

                          {isDropdown && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDropdownOpen((prev) => ({
                                  ...prev,
                                  [item.title]: !prev[item.title],
                                }));
                              }}
                              className={styles.dropdownToggle}
                              aria-label="Toggle Dropdown"
                            >
                              {dropdownOpen[item.title] ? "▲" : "▼"}
                            </button>
                          )}
                        </div>

                        {isDropdown && dropdownOpen[item.title] && (
                          <ul className={styles.mobileDropdownMenu}>
                            {dropdownItems.map((sub) => (
                              <li key={sub.id}>
                                <Link href={sub.url} onClick={() => setMenuOpen(false)}>
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
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
