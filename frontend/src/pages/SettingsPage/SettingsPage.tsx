import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaGithubSquare } from 'react-icons/fa';
import Button from '../../components/Button/Button.tsx';
import styles from './SettingsPage.module.css';
import sharedStyles from '../shared.module.css';

const SettingsPage = () => {
  const { theme, toggleTheme } = useOutletContext<{ theme: string; toggleTheme: () => void }>();
  const isDarkMode = theme === 'dark';
  const currentUser = localStorage.getItem('user');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Settings</h2>
      </div>
      <div className={styles.settingsContent}>
        <div className={styles.buttonsGroup}>
          <Button type={'button'} to={''} color="cyan" onClick={toggleTheme} disabled={false}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button to={''} color="default" disabled={false}>
            Log Out
          </Button>
          <Button to={''} color="magenta" disabled={false}>
            Delete Account
          </Button>
        </div>
        <div className={styles.accountInfo}>
          <p>Account: {currentUser ? currentUser : 'Failed fetching the current user.'}</p>
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
