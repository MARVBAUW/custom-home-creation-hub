
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { clientRoutes } from './clientRoutes';
import { adminRoutes } from './adminRoutes';
import { workspaceRoutes } from './workspaceRoutes';

export const routes: RouteObject[] = [
  // Remove the special route for sitemap.xml as it's already handled by serving the static file from public/
  
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
