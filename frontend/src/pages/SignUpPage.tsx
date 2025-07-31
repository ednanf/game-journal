import sharedStyles from './shared.module.css';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.signUpContent}>
        <h2>Sign up</h2>
      </div>
    </div>
  );
};
export default SignUpPage;
