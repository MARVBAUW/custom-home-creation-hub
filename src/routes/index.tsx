
import React, { Suspense } from 'react';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { clientRoutes } from './clientRoutes';
import { workspaceRoutes } from './workspaceRoutes';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import SEOValidator from '../components/seo/SEOValidator';

// Lazily loaded components for authentication routes
const SignIn = React.lazy(() => import('../pages/client/SignIn'));
const SignUp = React.lazy(() => import('../pages/client/SignUp'));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    <span className="ml-3 text-lg text-gray-700">Chargement...</span>
  </div>
);

// Layout component for standard pages with navbar and footer
const MainLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      <Outlet />
    </main>
    <Footer />
    {/* Ajout du validateur SEO qui n'apparaîtra qu'en mode développement */}
    <SEOValidator />
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
        element: <Suspense fallback={<LoadingFallback />}><SignIn /></Suspense>
      },
      {
        path: "/workspace/sign-up",
        element: <Suspense fallback={<LoadingFallback />}><SignUp /></Suspense>
      },
      {
        path: "/sign-in",
        element: <Suspense fallback={<LoadingFallback />}><SignIn /></Suspense>
      },
      {
        path: "/sign-up", 
        element: <Suspense fallback={<LoadingFallback />}><SignUp /></Suspense>
      },
    ],
  },
  ...clientRoutes.filter(route => 
    !["/workspace/sign-in", "/workspace/sign-up", "/sign-in", "/sign-up"].includes(route.path || '')
  ),
  ...adminRoutes,
];

export default routes;
