import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ShortenerTest from './components/ShortenerTest/ShortenerTest.tsx'
import ExpiredPage from './components/ExpiredPage/ExpiredPage.tsx'
import NoPage from './components/NoPage/NoPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShortenerTest />
  },
  {
    path: '/expired',
    element: <ExpiredPage />
  },
  {
    path: '/no-page',
    element: <NoPage />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
