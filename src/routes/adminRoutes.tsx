import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminProjects from '@/pages/client/AdminProjects';
import AdminProjectDetail from '@/pages/client/AdminProjectDetail';
import AdminAssignClient from '@/pages/client/AdminAssignClient';
import AdminProjectCreation from '@/pages/client/AdminProjectCreation';
import AdminProjectsOverview from '@/pages/client/AdminProjectsOverview';
import AdminClients from '@/pages/client/AdminClients';
import AdminClientDetail from '@/pages/client/AdminClientDetail';
import AdminPartners from '@/pages/client/AdminPartners';
import AdminDocuments from '@/pages/client/AdminDocuments';
import AdminNotifications from '@/pages/client/AdminNotifications';
import AdminSettings from '@/pages/client/AdminSettings';
import EstimationTravaux from '@/pages/client/EstimationTravaux';
import DevisHonoraires from '@/pages/client/DevisHonoraires';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminProjectEdit from '@/pages/client/AdminProjectEdit';

export const adminRoutes: RouteObject[] = [
  {
    path: "/workspace/client-area/admin",
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects",
    element: <ProtectedRoute adminOnly><AdminProjects /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/*",
    element: <ProtectedRoute adminOnly><AdminProjectDetail /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/assign-client",
    element: <ProtectedRoute adminOnly><AdminAssignClient /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/edit",
    element: <ProtectedRoute adminOnly><AdminProjectEdit /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/create",
    element: <ProtectedRoute adminOnly><AdminProjectCreation /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/planning",
    element: <ProtectedRoute adminOnly><AdminProjectsOverview /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/clients",
    element: <ProtectedRoute adminOnly><AdminClients /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/clients/:clientId",
    element: <ProtectedRoute adminOnly><AdminClientDetail /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/partners",
    element: <ProtectedRoute adminOnly><AdminPartners /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/documents",
    element: <ProtectedRoute adminOnly><AdminDocuments /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/notifications",
    element: <ProtectedRoute adminOnly><AdminNotifications /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/settings",
    element: <ProtectedRoute adminOnly><AdminSettings /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/estimate",
    element: <ProtectedRoute adminOnly><EstimationTravaux /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/fees",
    element: <ProtectedRoute adminOnly><DevisHonoraires /></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/budget",
    element: <ProtectedRoute adminOnly><div>Estimatif TCE</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/cctp",
    element: <ProtectedRoute adminOnly><div>CCTP</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/dpgf",
    element: <ProtectedRoute adminOnly><div>DPGF</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/planning",
    element: <ProtectedRoute adminOnly><div>Planning Gantt</div></ProtectedRoute>
  },
  {
    path: "/workspace/client-area/admin/projects/:projectId/meetings",
    element: <ProtectedRoute adminOnly><div>Réunions de chantier</div></ProtectedRoute>
  }
];
