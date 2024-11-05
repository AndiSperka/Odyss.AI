// src/components/Header/Header.jsx
import React, { useState } from 'react';
import styles from './Header.module.css';
import userIcon from '../../assets/Images/boat.png'; // Beispiel für das Benutzer-Icon
import logo from '../../assets/Images/boat.png'; // Beispiel für das Logo
import Logout from '../Logout/Logout'; // Import der Logout-Komponente
import useAuthStore from '../../store/authStore'; // Auth Store importieren, um den Login-Status zu überprüfen

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // Login-Status holen

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} /> {/* Logo auf der linken Seite - CSS wurde geändert */}
            <h1 className={styles.title}>Sail to solutions with our answer-delivering boat!</h1> {/* Titel in der Mitte */}

            {isLoggedIn && ( // Nur anzeigen, wenn der Benutzer eingeloggt ist
                <div className={styles.userIconContainer}>
                    <img
                        src={userIcon}
                        alt="User Icon"
                        className={styles.userIcon}
                        onClick={toggleDropdown}
                    /> {/* Benutzer-Icon auf der rechten Seite */}
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <Logout /> {/* Logout-Komponente im Dropdown-Menü */}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
