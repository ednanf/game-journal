import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Layout from './components/Layout/Layout.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import JournalPage from './pages/JournalPage/JournalPage.tsx';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage.tsx';
import CreateEntryPage from './pages/CreateEntryPage/CreateEntryPage.tsx';
import EditEntryPage from './pages/EditEntryPage/EditEntryPage.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: 'addEntry', element: <CreateEntryPage /> },
      { path: 'editEntry/:id', element: <EditEntryPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
