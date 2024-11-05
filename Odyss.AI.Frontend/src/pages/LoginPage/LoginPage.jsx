// src/pages/LoginPage/LoginPage.js
import React from 'react';
import Login from '../../components/Login/Login';
import styles from './LoginPage.module.css';  // Import des spezifischen CSS Modules
import videoBg from '../../assets/Videos/background1.mp4';  // Beispielhafter Import des Videos
import { useState } from 'react';
import Header from '../../components/Header/Header'; // Import des Headers
import useAuthStore from '../../store/authStore';  // Import des Auth-Stores
import { createUser } from '../../utils';  // Import der createUser-Funktion

function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const login = useAuthStore((state) => state.login);  // Login-Funktion holen

    const toggleRegister = () => {
        setIsRegister((prev) => !prev);
    };

    const handleRegister = async () => {
        if (username) {
            const response = await createUser(username);
            if (response.error) {
                console.log(response.error);
                alert(response.error);
                return;
            }
            login(username);  // Login-Logik hier
        }
        else {
            alert('Please enter username and password');
        }
    }

    return (
        <div className={styles.loginPage}>
            {/* <video autoPlay loop muted className={styles.videoBackground}>
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className={styles.loginFormContainer}>
                {isRegister ? (
                    <div className={styles.registerForm}>
                        <h2>Registrieren</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            className={styles.inputField}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.inputField}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={styles.inputField}
                        />
                        <button onClick={handleRegister} className={styles.submitButton}>Register</button>
                        <p className={styles.toggleText} onClick={toggleRegister}>
                            Bereits registriert? Zum Login wechseln
                        </p>
                    </div>
                ) : (
                    <div>
                        <Login isRegister={isRegister} />
                        <p className={styles.toggleText} onClick={toggleRegister}>
                            Noch keinen Account? Jetzt registrieren
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;