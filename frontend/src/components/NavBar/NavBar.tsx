import { useLocation } from 'react-router-dom';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import NavBarButton from './NavBarButton/NavBarButton.tsx';
import NavBarMainButton from './NavBarMainButton/NavBarMainButton.tsx';

import styles from './NavBar.module.css';

function NavBar() {
  const location = useLocation();

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.sideButton}>
          <NavBarButton
            to={'journal'}
            icon={<BsJournalBookmarkFill />}
            active={location.pathname === '/journal'}
          >
            Journal
          </NavBarButton>
        </div>
        <NavBarMainButton to={'addEntry'} icon={<HiPlus />}></NavBarMainButton>
        <div className={styles.sideButton}>
          <NavBarButton
            to={'statistics'}
            icon={<FaHistory />}
            active={location.pathname === '/statistics'}
          >
            Statistics
          </NavBarButton>
        </div>
      </div>
    </>
  );
}

export default NavBar;
