import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderButton.module.css';

type HeaderButtonProps = {
  to: string;
  children: React.ReactNode;
};

const HeaderButton = ({ to, children }: HeaderButtonProps) => {
  return (
    <Link to={to} className={styles.link}>
      <span className={styles.icon}>{children}</span>
    </Link>
  );
};
export default HeaderButton;
