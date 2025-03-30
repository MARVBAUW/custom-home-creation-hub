
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { clientRoutes } from './clientRoutes';
import { adminRoutes } from './adminRoutes';
import { workspaceRoutes } from './workspaceRoutes';

export const routes: RouteObject[] = [
  // Special route for sitemap.xml - redirects to the static XML file
  {
    path: "/sitemap.xml",
    element: <Navigate to="/sitemap.xml" replace />
  },
  
  // Redirect index route to home page
  {
    path: "/index",
    element: <Navigate to="/" replace />
  },
  
  // Include all route groups
  ...publicRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...workspaceRoutes
];
