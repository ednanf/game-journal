import React from 'react';

import { Link } from 'react-router-dom';

type NavBarAddButtonProps = {
  to: string;
  children: React.ReactNode;
};

function NavBarAddButton({ to, children }: NavBarAddButtonProps) {
  return <Link to={to}>{children}</Link>;
}

export default NavBarAddButton;
