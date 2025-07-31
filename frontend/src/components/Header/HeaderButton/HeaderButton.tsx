import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderButton.module.css';

type HeaderButtonProps = {
  to: string;
  icon: React.ReactNode;
};

const HeaderButton = ({ to, icon }: HeaderButtonProps) => {
  return (
    <Link to={to} className={styles.link}>
      <span className={styles.icon}>{icon}</span>
    </Link>
  );
};
export default HeaderButton;
