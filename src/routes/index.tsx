
import React from 'react';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { clientRoutes } from './clientRoutes';
import { workspaceRoutes } from './workspaceRoutes';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

// Layout component for standard pages with navbar and footer
const MainLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Combine all routes for the application
export const routes = [
  {
    element: <MainLayout />,
    children: [
      ...publicRoutes,
      ...workspaceRoutes,
      {
        path: "/workspace/sign-in",
        element: <React.lazy(() => import('../pages/client/SignIn')) />
      },
      {
        path: "/workspace/sign-up",
        element: <React.lazy(() => import('../pages/client/SignUp')) />
      },
      {
        path: "/sign-in",
        element: <React.lazy(() => import('../pages/client/SignIn')) />
      },
      {
        path: "/sign-up", 
        element: <React.lazy(() => import('../pages/client/SignUp')) />
      },
    ],
  },
  ...clientRoutes.filter(route => 
    !["/workspace/sign-in", "/workspace/sign-up", "/sign-in", "/sign-up"].includes(route.path || '')
  ),
  ...adminRoutes,
];

export default routes;
