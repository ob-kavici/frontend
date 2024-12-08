import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/utils/not-found.tsx';
import { ThemeProvider } from './components/utils/theme-provider.tsx';
import HomePage from '@/components/home/home-page.tsx';
import GamePage from './components/games/game-page.tsx';
import Games from './components/games/game-type-list.tsx';
import UserProfile from './components/auth/user-profile.tsx';
import AuthPage from './components/auth/auth-page.tsx';
import Layout from '@/components/utils/layout.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'games',
        element: <Games />,
      },
      {
        path: 'games/:gameType',
        element: <GamePage />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />, // Auth page does not use Layout (no Navbar)
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
