import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './SignUpPage.module.css';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password confirmation
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;

      if (confirmPassword && password !== confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      } else {
        setErrors({ ...errors, confirmPassword: '' });
      }
    }
  };

  // TODO: Implement handleSubmit

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Sign up</h2>
      </div>
      <div className={styles.formContent}>
        <form>
          <div className={styles.formInputs}>
            <TextInput
              label={'Email'}
              id={'email'}
              name={'email'}
              type={'email'}
              onChange={handleChange}
              error={errors.email}
            />
            <TextInput
              label={'Password'}
              id={'password'}
              name={'password'}
              type={'password'}
              onChange={handleChange}
              error={errors.password}
            />
            <TextInput
              label={'Confirm Password'}
              id={'confirmPassword'}
              name={'confirmPassword'}
              type={'password'}
              onChange={handleChange}
              error={errors.confirmPassword}
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
