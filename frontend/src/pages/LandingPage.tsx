import { Link } from 'react-router-dom';
import sharedStyles from './shared.module.css';

const LandingPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <h2>Welcome to Game Journal!</h2>
      <p>Keep track of the games you played</p>
      <p>
        <Link to="signup">Sign up</Link> or <Link to="login">login</Link> to get started
      </p>
    </div>
  );
};
export default LandingPage;
