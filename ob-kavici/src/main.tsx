import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './components/utils/not-found.tsx'
import { ThemeProvider } from './components/utils/theme-provider.tsx'
import Navbar from './components/utils/navbar.tsx'
import HomePage from '@/components/home/home-page.tsx'
import GamePage from './components/games/game-page.tsx'
import Games from './components/games/games.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/:gameId",
    element: <GamePage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
