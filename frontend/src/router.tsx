import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Journal from './pages/Journal';
import List from './pages/List';
import AddEntry from './pages/AddEntry.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'journal', element: <Journal /> },
      { path: 'list', element: <List /> },
      { path: 'addEntry', element: <AddEntry /> },
      // Add more routes here as needed
    ],
  },
]);
