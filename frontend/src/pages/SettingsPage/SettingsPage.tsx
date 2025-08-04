import { useState, useEffect } from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import Button from '../../components/Button/Button.tsx';
import styles from './SettingsPage.module.css';
import sharedStyles from '../shared.module.css';

// Function to get the initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
  return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
};

const SettingsPage = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDarkMode = theme === 'dark';
  const currentUser = localStorage.getItem('user');

  // Effect to apply the theme to the body and store it in localStorage
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect to listen for changes in localStorage across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Function to toggle the theme between light and dark
  const handleToggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Settings</h2>
      </div>
      <div className={styles.settingsContent}>
        <div className={styles.buttonsGroup}>
          <Button type={'button'} to={''} color="cyan" onClick={handleToggleTheme} disabled={false}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button type={'button'} to={''} color="default" disabled={false}>
            Log Out
          </Button>
          <Button type={'button'} to={''} color="magenta" disabled={false}>
            Delete Account
          </Button>
        </div>
        <div className={styles.accountInfo}>
          <p>Account: {currentUser ? currentUser : 'Failed fetching the current user'}</p>
        </div>
        <div className={styles.footer}>
          <a
            href="https://github.com/ednanf/game-journal"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <FaGithubSquare size={20} className={styles.icon} /> <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
