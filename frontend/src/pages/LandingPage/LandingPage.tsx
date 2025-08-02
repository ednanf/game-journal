import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import sharedStyles from '../shared.module.css';
import { FaGithubSquare } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.landingPageContent}>
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
            <FaGithubSquare size={20} className={styles.icon} /> <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
