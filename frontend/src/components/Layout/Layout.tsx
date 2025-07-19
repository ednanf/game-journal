import { Outlet } from 'react-router-dom';

import Header from '../Header/Header.tsx';
import NavBar from '../NavBar/NavBar.tsx';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <nav>
          <NavBar />
        </nav>
      </main>
    </>
  );
}

export default Layout;
