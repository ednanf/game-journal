import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaGithubSquare } from 'react-icons/fa';
import { deleteUnwrapped } from '../../utils/axiosInstance.ts';
import Button from '../../components/Button/Button.tsx';
import styles from './SettingsPage.module.css';
import sharedStyles from '../shared.module.css';
import { toast } from 'react-toastify';

type ServerResponse = {
  message: string;
};

const SettingsPage = () => {
  const { theme, toggleTheme } = useOutletContext<{ theme: string; toggleTheme: () => void }>();
  const isDarkMode = theme === 'dark';
  const currentUser = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('local-storage')); // Force re-check of token, updating the UI
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      const response: ServerResponse = await deleteUnwrapped('/users/delete');

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('local-storage')); // Force re-check of token, updating the UI

      toast.success(response.message);
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

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
          <Button onClick={handleLogout} color="default" disabled={false}>
            Log Out
          </Button>
          <Button onClick={handleDeleteAccount} color="magenta" disabled={false}>
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
            <FaGithubSquare size={20} className={styles.icon} /> <span>See on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
