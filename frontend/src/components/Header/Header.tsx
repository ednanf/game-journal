import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <div className={`${styles.header} ${styles.logo}`}>Game Journal</div>
    </header>
  );
}

export default Header;
