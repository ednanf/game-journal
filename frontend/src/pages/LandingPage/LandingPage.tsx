import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appIcon from '../../assets/app-icon.png';
import styles from './LandingPage.module.css';
import sharedStyles from '../shared.module.css';
import { FaGithubSquare } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/journal', { replace: true }); // Replace the current entry in the history stack
    }
  }, [navigate]);

  // This part of the component will only be visible for a fraction of a second
  // for logged-in users before the redirect happens. For new users, it's all they see.
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.landingPageContent}>
        <img src={appIcon} alt="logo" className={styles.appLogo} />
        <h2>Welcome to Game Journal!</h2>
        <p>Keep track of the games you played</p>
        <p>
          <Link to="signup" className={sharedStyles.link}>
            Sign up
          </Link>{' '}
          or{' '}
          <Link to="login" className={sharedStyles.link}>
            log in
          </Link>{' '}
          to get started
        </p>
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
export default LandingPage;
