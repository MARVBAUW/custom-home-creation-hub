
import React from "react";
import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import { Outlet } from "react-router-dom";

// Nous utilisons la mise en page principale définie dans routes/index.tsx
// qui inclut déjà Navbar et Footer, donc nous n'avons pas besoin de les ajouter ici
export const workspaceRoutes: RouteObject[] = [
  {
    path: "/workspace",
    element: <Workspace />,
  },
];
