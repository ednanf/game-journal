import { Link } from 'react-router-dom';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  // TODO: Implement handleChange and handleSubmit functions for form handling
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Log In</h2>
      </div>
      <div className={styles.formContent}>
        <form>
          <div className={styles.formInputs}>
            <TextInput label={'Email'} id={'email'} name={'email'} type={'email'} />
            <TextInput label={'Password'} id={'password'} name={'password'} type={'password'} />
          </div>
          <div className={styles.formButton}>
            <Button color={'default'}>{'Log In'}</Button>
          </div>
        </form>
      </div>
      <div className={styles.footer}>
        <p>
          No account? <Link to={'../signup'}>Sign up.</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
