import React from 'react';

import { Link } from 'react-router-dom';

type NavBarButtonProps = {
  to: string;
  children: React.ReactNode;
};

function NavBarButton({ to, children }: NavBarButtonProps) {
  return <Link to={to}>{children}</Link>;
}

export default NavBarButton;
