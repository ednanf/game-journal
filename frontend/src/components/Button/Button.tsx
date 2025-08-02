import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

// default color = purple
type ButtonProps = {
  to?: string;
  icon?: React.ReactNode;
  color: 'default' | 'cyan' | 'green' | 'magenta' | 'yellow';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ to, icon, color, onClick, children }: ButtonProps) => {
  const colorClass =
    color === 'default' ? styles.button : `${styles.button} ${styles[`button--${color}`]}`;

  // Buttons with `to` prop are links, others are buttons
  if (to && to.trim() !== '') {
    return (
      <Link to={to} className={colorClass}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.text}>{children}</span>
      </Link>
    );
  }

  return (
    <button className={colorClass} onClick={onClick} type="button">
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{children}</span>
    </button>
  );
};
export default Button;
