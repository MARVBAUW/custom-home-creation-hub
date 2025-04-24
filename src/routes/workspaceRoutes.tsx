
import React from "react";
import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import WorkspaceCalculateurs from "@/components/workspace/calculators/index";
import WorkspaceGuides from "@/components/workspace/WorkspaceGuides";
import WorkspaceReglementation from "@/components/workspace/WorkspaceReglementation";
import ResourceLandingPage from "@/components/workspace/resources/ResourceLandingPage";

// Sample resource data (in a real app, this would come from a database)
const guideReglementation = {
  title: "Guide complet sur la réglementation",
  description: "Un guide exhaustif sur les dernières réglementations du bâtiment en vigueur",
  fileUrl: "/resources/guides/reglementation-complete-batiment.pdf",
  fileType: "pdf",
  fileSize: 1452, // KB
  category: "Réglementation",
  keywords: ["construction", "normes", "réglementation", "guide", "bâtiment"],
  datePublished: "2023-05-15T09:15:23Z",
  previewAvailable: true,
  relatedResources: [
    {
      title: "Texte intégral de la réglementation",
      url: "/workspace/resources/documents/texte-integral-reglementation",
      description: "Le texte officiel complet de la nouvelle réglementation"
    }
  ]
};

const texteReglementation = {
  title: "Texte intégral de la réglementation",
  description: "Le texte officiel complet de la nouvelle réglementation du bâtiment",
  fileUrl: "/resources/documents/texte-integral-reglementation.pdf",
  fileType: "pdf",
  fileSize: 2140, // KB
  category: "Documents officiels",
  keywords: ["officiel", "texte intégral", "législation", "réglementation"],
  datePublished: "2023-05-10T14:30:25Z",
  previewAvailable: true,
  relatedResources: [
    {
      title: "Guide complet sur la réglementation",
      url: "/workspace/resources/guides/reglementation-complete-batiment",
      description: "Un guide explicatif détaillé sur cette réglementation"
    }
  ]
};

export const workspaceRoutes: RouteObject[] = [
  {
    path: "/workspace",
    element: <Workspace />,
  },
  {
    path: "/workspace/calculateurs",
    element: <WorkspaceCalculateurs />,
  },
  {
    path: "/workspace/guides",
    element: <WorkspaceGuides />,
  },
  {
    path: "/workspace/reglementation",
    element: <WorkspaceReglementation />,
  },
  {
    // Landing page for the regulation guide
    path: "/workspace/resources/guides/reglementation-complete-batiment",
    element: <ResourceLandingPage resource={guideReglementation} />,
  },
  {
    // Landing page for the full regulation text
    path: "/workspace/resources/documents/texte-integral-reglementation",
    element: <ResourceLandingPage resource={texteReglementation} />,
  }
];
