import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTheme from '../../hooks/useTheme.ts';
import Header from '../Header/Header.tsx';
import NavBar from '../NavBar/NavBar.tsx';
import styles from './Layout.module.css';

// TODO: Configure toastify theme colors

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet context={{ toggleTheme, theme }} />
      </main>
      <NavBar />
      <ToastContainer
        className={styles.toastContainer}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Layout;
