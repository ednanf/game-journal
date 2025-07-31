import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBarButton.module.css';

type NavBarButtonProps = {
  to: string;
  icon?: React.ReactNode;
  active?: boolean;
  children?: React.ReactNode;
};

function NavBarButton({ to, icon, active, children }: NavBarButtonProps) {
  return (
    <Link to={to} className={`${styles.link} ${active ? styles.active : ''}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </Link>
  );
}

export default NavBarButton;
