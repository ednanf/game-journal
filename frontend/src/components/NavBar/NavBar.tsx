import NavBarButton from './NavBarButton/NavBarButton.tsx';
import NavBarAddButton from './NavBarAddButton/NavBarAddButton.tsx';

// TODO: Implement the onClick handlers for the buttons

function NavBar() {
  return (
    <>
      <NavBarButton to={'journal'}>Journal</NavBarButton>
      <NavBarAddButton to={'addEntry'}>Add entry</NavBarAddButton>
      <NavBarButton to={'list'}>List</NavBarButton>
    </>
  );
}

export default NavBar;
