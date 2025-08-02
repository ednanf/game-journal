import styles from './LoginPage.module.css';
import sharedStyles from '../shared.module.css';

const LoginPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.loginContent}>
        <h2>Log in</h2>
      </div>
    </div>
  );
};
export default LoginPage;
