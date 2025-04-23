
import React from 'react';
import { RouteObject } from 'react-router-dom';
import ClientArea from '@/pages/client/ClientArea';
import ClientProjects from '@/pages/client/ClientProjects';
import ClientOnboarding from '@/pages/client/ClientOnboarding';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ClientProjectDetail from '@/components/client/project-detail/ClientProjectDetail';
import ClientMessages from '@/pages/client/ClientMessages';
import ClientSettings from '@/pages/client/ClientSettings';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientPlanning from '@/pages/client/ClientPlanning';

export const clientRoutes: RouteObject[] = [
  /* Auth routes are now handled in the main routes file */
  {
    path: "/client-onboarding",
    element: <ClientOnboarding />
  },
  {
    path: "/workspace/client-area",
    element: <ProtectedRoute><ClientArea /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/projects",
    element: <ProtectedRoute><ClientProjects /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/projects/:projectId",
    element: <ProtectedRoute><ClientProjectDetail /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/messages",
    element: <ProtectedRoute><ClientMessages /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/planning",
    element: <ProtectedRoute><ClientPlanning /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/profile",
    element: <ProtectedRoute><ClientProfile /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/settings",
    element: <ProtectedRoute><ClientSettings /></ProtectedRoute>
  }
];
