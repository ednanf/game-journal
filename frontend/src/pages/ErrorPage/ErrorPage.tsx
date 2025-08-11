import { Link } from 'react-router-dom';
import { PiWarningOctagon } from 'react-icons/pi';
import styles from './ErrorPage.module.css';
import sharedStyles from '../shared.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.pageContent}>
      <PiWarningOctagon size={80} />
      <div className={styles.titleContainer}>
        <h2>404 - Page Not Found</h2>
      </div>
      <div className={styles.errorMessage}>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          Please check the URL or{' '}
          <Link to={'/'} className={sharedStyles.link}>
            return to the homepage.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ErrorPage;
