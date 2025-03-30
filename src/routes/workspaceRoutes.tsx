
import React from "react";
import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

// Layout component for workspace pages
const WorkspaceLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

export const workspaceRoutes: RouteObject[] = [
  {
    path: "/workspace",
    element: <WorkspaceLayout />,
    children: [
      {
        index: true,
        element: <Workspace />,
      },
      // ... autres routes de workspace
    ],
  },
];
