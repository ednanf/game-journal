import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { postUnwrapped } from '../../utils/axiosInstance.ts';
import { API_BASE_URL } from '../../config/apiURL.ts';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './SignUpPage.module.css';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
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

  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset errors
    setErrors({ email: '', password: '', confirmPassword: '' });

    // Basic validation
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    try {
      if (!errors.email && !errors.password && !errors.confirmPassword) {
        // The response was unwrapped in the axios interceptor
        const response = (await postUnwrapped(
          `${API_BASE_URL}/users/register`,
          formData,
        )) as RegisterResponse;
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user);

        toast.success('Registration successful! Welcome aboard!');

        navigate('/journal');
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'An error occurred during registration. Please try again.');
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
            <TextInput
              label={'Confirm Password'}
              id={'confirmPassword'}
              name={'confirmPassword'}
              type={'password'}
              onChange={handleChange}
              required={true}
              error={errors.confirmPassword}
            />
          </div>
          <div className={styles.formButton}>
            <Button type={'submit'} color={'default'}>
              {'Sign Up'}
            </Button>
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
