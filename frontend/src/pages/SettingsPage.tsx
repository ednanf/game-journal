import { useState } from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import Button from '../components/Button/Button.tsx';
import styles from './Settings.module.css';
import sharedStyles from './shared.module.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light');
  const isDarkMode = theme === 'dark';

  const handleToggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Settings</h2>
      </div>
      <div className={styles.settingsContent}>
        <div className={styles.buttonsGroup}>
          <Button to={''} color="cyan" onClick={handleToggleTheme}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button to={''} color="default">
            Log Out
          </Button>
          <Button to={''} color="magenta">
            Delete Account
          </Button>
        </div>
        <div className={styles.accountInfo}>
          <p>Account: EMAIL@PLACEHOLDER.COM</p>
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
