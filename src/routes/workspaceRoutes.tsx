
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Workspace from '@/pages/Workspace';

export const workspaceRoutes: RouteObject[] = [
  {
    path: "/workspace",
    element: <Workspace />
  }
];
