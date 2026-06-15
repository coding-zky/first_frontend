import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const UserListPage = lazy(() => import('@/pages/UserListPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div style={{ padding: 50, textAlign: 'center' }}>加载中...</div>}>
    {children}
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LazyLoad><HomePage /></LazyLoad>,
      },
      {
        path: 'users',
        element: <LazyLoad><UserListPage /></LazyLoad>,
      },
    ],
  },
  {
    path: '*',
    element: <LazyLoad><NotFoundPage /></LazyLoad>,
  },
])

export default router
