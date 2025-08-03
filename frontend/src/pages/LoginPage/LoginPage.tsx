import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { postUnwrapped } from '../../utils/axiosInstance.ts';
import { API_BASE_URL } from '../../config/apiURL.ts';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './LoginPage.module.css';

type FormData = {
  email: string;
  password: string;
};

// No need to use the correct response structure as it was unwrapped in the axios interceptor
interface RegisterResponse {
  message: string;
  user: string;
  token: string;
}

interface ApiError {
  message: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset errors
    setErrors({ email: '', password: '' });

    // Basic validation
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }

    try {
      if (!errors.email && !errors.password) {
        // The response was unwrapped in the axios interceptor
        const response = (await postUnwrapped(
          `${API_BASE_URL}/users/login`,
          formData,
        )) as RegisterResponse;

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user);

        toast.success('Login successful! Welcome back!');

        navigate('/journal');
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Sign up</h2>
      </div>
      <div className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInputs}>
            <TextInput
              label={'Email'}
              id={'email'}
              name={'email'}
              type={'email'}
              onChange={handleChange}
              required={true}
              error={errors.email}
            />
            <TextInput
              label={'Password'}
              id={'password'}
              name={'password'}
              type={'password'}
              onChange={handleChange}
              required={true}
              error={errors.password}
            />
          </div>
          <div className={styles.formButton}>
            <Button type={'submit'} color={'default'}>
              {'Log in'}
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.footer}>
        <p>
          Don't have an account? <Link to={'../login'}>Sign up.</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
