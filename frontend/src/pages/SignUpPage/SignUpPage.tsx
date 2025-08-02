import { Link } from 'react-router-dom';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Sign up</h2>
      </div>
      <div className={styles.formContent}>
        <form>
          <div className={styles.formInputs}>
            <TextInput label={'Email'} id={'email'} name={'email'} type={'email'} />
            <TextInput label={'Password'} id={'password'} name={'password'} type={'password'} />
            <TextInput
              label={'Confirm Password'}
              id={'confirmPassword'}
              name={'confirmPassword'}
              type={'password'}
            />
          </div>
          <div className={styles.formButton}>
            <Button color={'default'}>{'Sign Up'}</Button>
          </div>
        </form>
      </div>
      <div className={styles.footer}>
        <p>
          Already have an account? <Link to={'../login'}>Log in.</Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
