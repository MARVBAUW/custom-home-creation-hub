
import React from 'react';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { clientRoutes } from './clientRoutes';
import { workspaceRoutes } from './workspaceRoutes';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

// Lazily loaded components for authentication routes
const SignIn = React.lazy(() => import('../pages/client/SignIn'));
const SignUp = React.lazy(() => import('../pages/client/SignUp'));

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
        element: <SignIn />
      },
      {
        path: "/workspace/sign-up",
        element: <SignUp />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/sign-up", 
        element: <SignUp />
      },
    ],
  },
  ...clientRoutes.filter(route => 
    !["/workspace/sign-in", "/workspace/sign-up", "/sign-in", "/sign-up"].includes(route.path || '')
  ),
  ...adminRoutes,
];

export default routes;
