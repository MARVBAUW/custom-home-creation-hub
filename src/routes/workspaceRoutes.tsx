
import React from "react";
import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import WorkspaceCalculateurs from "@/components/workspace/calculators/index";
import WorkspaceGuides from "@/components/workspace/WorkspaceGuides";
import WorkspaceReglementation from "@/components/workspace/WorkspaceReglementation";
import ResourceLandingPage from "@/components/workspace/resources/ResourceLandingPage";

// Sample resource data (in a real app, this would come from a database)
const guideRenovationEnergetique = {
  title: "Guide de la rénovation énergétique RE2020",
  description: "Guide pratique pour la rénovation énergétique selon la RE2020, incluant les exigences thermiques et environnementales",
  fileUrl: "/resources/guides/guide-renovation-energetique.pdf",
  fileType: "pdf",
  fileSize: 1224, // KB
  category: "Rénovation",
  keywords: ["énergie", "rénovation", "RE2020", "isolation", "thermique"],
  datePublished: "2023-07-22T10:30:15Z",
  previewAvailable: true,
  relatedResources: [
    {
      title: "Normes parasismiques",
      url: "/workspace/resources/guides/normes-parasismiques",
      description: "Guide complet sur les normes parasismiques pour la construction"
    }
  ]
};

const guideNormesParasismiques = {
  title: "Guide des normes parasismiques",
  description: "Guide complet sur les normes parasismiques pour la construction en France",
  fileUrl: "/resources/guides/normes-parasismiques.pdf",
  fileType: "pdf",
  fileSize: 1840, // KB
  category: "Technique",
  keywords: ["parasismique", "norme", "construction", "sécurité", "structure"],
  datePublished: "2023-09-15T14:25:10Z",
  previewAvailable: true,
  relatedResources: [
    {
      title: "Guide de la rénovation énergétique RE2020",
      url: "/workspace/resources/guides/guide-renovation-energetique",
      description: "Guide pratique pour la rénovation énergétique selon la RE2020"
    }
  ]
};

const listeDtuBatiment = {
  title: "Liste des DTUs du bâtiment",
  description: "Liste complète des Documents Techniques Unifiés (DTU) pour le bâtiment",
  fileUrl: "/resources/documents/liste-dtu-batiment.pdf",
  fileType: "pdf",
  fileSize: 950, // KB
  category: "Réglementation",
  keywords: ["DTU", "norme", "technique", "bâtiment", "construction"],
  datePublished: "2023-06-08T09:45:30Z",
  previewAvailable: true,
  relatedResources: [
    {
      title: "Texte intégral de la réglementation du bâtiment",
      url: "/workspace/resources/documents/texte-integral-reglementation",
      description: "Le texte officiel complet de la réglementation du bâtiment"
    }
  ]
};

const texteReglementation = {
  title: "Texte intégral de la réglementation du bâtiment",
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
      title: "Liste des DTUs du bâtiment",
      url: "/workspace/resources/documents/liste-dtu-batiment",
      description: "Liste complète des Documents Techniques Unifiés (DTU) pour le bâtiment"
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
  // Landing pages for guides
  {
    path: "/workspace/resources/guides/guide-renovation-energetique",
    element: <ResourceLandingPage resource={guideRenovationEnergetique} />,
  },
  {
    path: "/workspace/resources/guides/normes-parasismiques",
    element: <ResourceLandingPage resource={guideNormesParasismiques} />,
  },
  // Landing pages for documents
  {
    path: "/workspace/resources/documents/liste-dtu-batiment",
    element: <ResourceLandingPage resource={listeDtuBatiment} />,
  },
  {
    path: "/workspace/resources/documents/texte-integral-reglementation",
    element: <ResourceLandingPage resource={texteReglementation} />,
  }
];
