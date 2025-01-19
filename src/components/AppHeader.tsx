import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AppHeader.module.css';
import Logo from '../assets/logo.svg';

const AppHeader: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        {
            key: '/',
            label: (
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Кошачий питнерест"
                    />
                </Link>
            ),
        },
        {
            key: '/all',
            label: <Link to="/all">Все котики</Link>,
        },
        {
            key: '/favorites',
            label: <Link to="/favorites">Любимые котики</Link>,
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.logo}>{menuItems[0].label}</div>
            <nav className={styles.nav}>
                {menuItems.slice(1).map((item) => (
                    <div
                        key={item.key}
                        className={`${styles.navItem} ${
                            location.pathname === item.key ? styles.navItemActive : ''
                        }`}
                    >
                        {item.label}
                    </div>
                ))}
            </nav>
        </header>
    );
};

export default AppHeader;
