import styles from './ErrorPage.module.css';
import sharedStyles from './shared.module.css';

const ErrorPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.errorPageContent}>
        <h2>ERROR 404</h2>
      </div>
    </div>
  );
};
export default ErrorPage;
