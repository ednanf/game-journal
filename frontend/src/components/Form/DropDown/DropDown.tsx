import React from 'react';
import styles from './DropDown.module.css';

type SelectOption = {
  label: string;
  value: string;
};

type DropDownProps = {
  label?: string;
  name: string;
  id: string;
  size: number;
  value: string;
  values: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

const DropDown = ({
  label,
  name,
  id,
  size,
  value,
  values,
  placeholder,
  disabled,
  onChange,
  error,
}: DropDownProps) => {
  return (
    <div className={styles.inputBody}>
      <label className={styles.label}>{label}</label>
      <select
        name={name}
        id={id}
        size={size}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.selectBody}`}
      >
        {/*Dedicated option for a placeholder such as "Select platform..."*/}
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {/*Maps the entire array of options, such as platforms or status*/}
        {values.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
export default DropDown;
