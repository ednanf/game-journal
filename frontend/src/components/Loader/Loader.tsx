import React from 'react';
import styles from './Loader.module.css';
import sharedStyles from '../../pages/shared.module.css';

type LoaderProps = {
  className?: string;
  style?: React.CSSProperties;
  message?: string;
};

const Loader: React.FC<LoaderProps> = ({ className = '', style, message }) => (
  <div className={`${styles.centerLoader} ${className}`} style={style}>
    <div className={sharedStyles.loader}></div>
    {message && <div className={styles.loaderMessage}>{message}</div>}
  </div>
);

export default Loader;
