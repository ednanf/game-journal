import HeaderButton from './HeaderButton/HeaderButton.tsx';
import { FaCog } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Game Journal</span>
      <div>
        <HeaderButton to={'settings'}>
          <FaCog />
        </HeaderButton>
      </div>
    </header>
  );
};
export default Header;
