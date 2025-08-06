import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { postUnwrapped } from '../../utils/axiosInstance.ts';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import Button from '../../components/Button/Button.tsx';
import sharedStyles from '../shared.module.css';
import styles from './LoginPage.module.css';

type FormData = {
  email: string;
  password: string;
};

// No need to use the correct response structure as it was unwrapped in the axios interceptor
interface LoginResponse {
  message: string;
  user: string;
  token: string;
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Validation function to check for empty fields and email format
  const validate = (data: FormData) => {
    const newErrors: FormData = { email: '', password: '' };
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!data.password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: '', password: '' });

    // Basic validation
    const validationErrors = validate(formData);
    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // The response was unwrapped in the axios interceptor
      const response = await postUnwrapped<LoginResponse>(`/users/login`, formData);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user);

      toast.success('Login successful. Welcome back!');

      navigate('/journal');
    } catch (error) {
      // Error is validated in the axios interceptor as well
      toast.error((error as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Log in</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <form onSubmit={handleSubmit}>
          <div className={sharedStyles.formInputs}>
            <TextInput
              label={'Email'}
              id={'email'}
              name={'email'}
              type={'email'}
              value={formData.email}
              onChange={handleChange}
              required={true}
              error={errors.email}
            />
            <TextInput
              label={'Password'}
              id={'password'}
              name={'password'}
              type={'password'}
              value={formData.password}
              onChange={handleChange}
              required={true}
              error={errors.password}
            />
          </div>
          <div className={sharedStyles.formButton}>
            <Button type={'submit'} color={'default'} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.footer}>
        <p>
          Don't have an account?{' '}
          <Link to={'../signup'} className={styles.link}>
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
