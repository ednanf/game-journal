import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarMainButton.module.css';

type NavBarMainButton = {
  to: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

function NavBarMainButton({ to, icon, children }: NavBarMainButton) {
  return (
    <Link to={to} className={styles.link}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </Link>
  );
}

export default NavBarMainButton;
