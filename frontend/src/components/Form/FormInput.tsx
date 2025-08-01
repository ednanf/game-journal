// ARIA labels and accessibility considerations were skipped for brevity,
// as this is a simple project intended for personal use and portfolio purposes.

import React from 'react';
import styles from './FormInput.module.css';

type FormInputProps = {
  id: string;
  type: string;
  name: string;
  label?: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function FormInput({ id, type, name, label, value, placeholder, onChange, error }: FormInputProps) {
  return (
    <div className={styles.authInput}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label || ''}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        autoComplete={name === 'email' ? 'email' : name === 'password' ? 'new-password' : 'name'}
        required
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default FormInput;
