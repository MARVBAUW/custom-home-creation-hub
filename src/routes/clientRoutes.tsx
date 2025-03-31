
import React from 'react';
import { RouteObject } from 'react-router-dom';
import ClientArea from '@/pages/client/ClientArea';
import ClientProjects from '@/pages/client/ClientProjects';
import SignIn from '@/pages/client/SignIn';
import ClientOnboarding from '@/pages/client/ClientOnboarding';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ClientProjectDetail from '@/components/client/project-detail/ClientProjectDetail';

export const clientRoutes: RouteObject[] = [
  {
    path: "/workspace/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
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
    element: <ProtectedRoute><div>Messages</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/planning",
    element: <ProtectedRoute><div>Planning</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/profile",
    element: <ProtectedRoute><div>Profil</div></ProtectedRoute>
  }
];
