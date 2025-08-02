import React from 'react';
import styles from './TextInput.module.css';

type TextInputProps = {
  label?: string;
  type: 'text' | 'email' | 'password';
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const TextInput = ({
  label,
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
  error,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'password' : 'text'}
        required
        className={`${styles.inputField} ${error ? styles.inputFieldError : ''}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
export default TextInput;
