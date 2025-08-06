import { BsJournalBookmarkFill, BsBarChartLineFill } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import NavBarButton from './NavBarButton/NavBarButton.tsx';
import NavBarMainButton from './NavBarMainButton/NavBarMainButton.tsx';

import styles from './NavBar.module.css';

function NavBar() {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.sideButton}>
          <NavBarButton to={'journal'} icon={<BsJournalBookmarkFill />}>
            Journal
          </NavBarButton>
        </div>
        <NavBarMainButton to={'/addEntry'} icon={<HiPlus />}></NavBarMainButton>
        <div className={styles.sideButton}>
          <NavBarButton to={'/statistics'} icon={<BsBarChartLineFill />}>
            Statistics
          </NavBarButton>
        </div>
      </div>
    </>
  );
}

export default NavBar;
