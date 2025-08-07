import { useState, useEffect } from 'react';
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
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    // The 'storage' event fires when a storage area (localStorage/sessionStorage)
    // has been changed in the context of another document.
    window.addEventListener('storage', handleStorageChange);

    // We also need a custom event to handle changes within the same tab,
    // as the 'storage' event doesn't fire for the tab that made the change.
    // You would dispatch this 'local-storage' event from your login/logout logic.
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <Header token={token} />
      <main className={styles.mainContent}>
        <Outlet context={{ toggleTheme, theme }} />
      </main>
      {token && <NavBar />}
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
