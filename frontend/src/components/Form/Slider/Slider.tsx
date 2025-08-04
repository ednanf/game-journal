// ARIA labels and accessibility considerations were skipped for brevity,
// as this is a simple project intended for personal use and portfolio purposes.

import React from 'react';
import styles from './Slider.module.css';

type FormSliderProps = {
  label?: string;
  name: string;
  min: number;
  max: number;
  value: number;
  disabled?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormSlider({
  label,
  name,
  min = 0,
  max = 10,
  value = 5,
  disabled,
  error,
  onChange,
}: FormSliderProps) {
  return (
    <div className={styles.sliderContainer}>
      <label htmlFor={name} className={styles.label}>
        {label ?? name}
      </label>
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        className={`${styles.sliderInput} ${error ? styles.error : ''}`}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.sliderValue}>{value}</span>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default FormSlider;
