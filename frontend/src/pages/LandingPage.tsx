import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import sharedStyles from './shared.module.css';

const LandingPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.landingPageContent}>
        <h2>Welcome to Game Journal!</h2>
        <p>Keep track of the games you played</p>
        <p>
          <Link to="signup">Sign up</Link> or <Link to="login">log in</Link> to get started
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
