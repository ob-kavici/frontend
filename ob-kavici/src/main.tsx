import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/utils/not-found.tsx';
import { ThemeProvider } from './components/utils/theme-provider.tsx';
import Layout from '@/components/utils/layout.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { App } from '@/app/index';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: 'games',
//         element: <Games />,
//       },
//       {
//         path: 'games/:gameType',
//         element: <GamePage />,
//       },
//       {
//         path: 'profile',
//         element: <UserProfile />,
//       },
//     ],
//   },
//   {
//     path: '/auth',
//     element: <AuthPage />, // Auth page does not use Layout (no Navbar)
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
// ]);

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);