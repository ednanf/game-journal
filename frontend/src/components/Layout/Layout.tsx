import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import NavBar from '../NavBar/NavBar.tsx';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};
export default Layout;
