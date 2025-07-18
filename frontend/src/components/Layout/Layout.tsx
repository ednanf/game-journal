import { Outlet } from 'react-router-dom';

import NavBar from '../NavBar/NavBar.tsx';

function Layout() {
  return (
    <>
      <header>Header</header>
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
