
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Index from '../pages/Index';
import Contact from '../pages/Contact';
import Estimation from '../pages/Estimation';
import Prestations from '../pages/Prestations';
import Realisations from '../pages/Realisations';
import Equipe from '../pages/Equipe';
import Parrainage from '../pages/Parrainage';
import DevenirPartenaire from '../pages/DevenirPartenaire';
import NotFound from '../pages/NotFound';
import Legal from '../pages/Legal';
import CGV from '../pages/CGV';
import FAQ from '../pages/FAQ';
import Sitemap from '../pages/Sitemap';

// Add a proper route for the HTML sitemap page
export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/estimation",
    element: <Estimation />
  },
  {
    path: "/prestations-maitre-oeuvre",
    element: <Prestations />
  },
  {
    path: "/realisations-architecte-maison",
    element: <Realisations />
  },
  {
    path: "/equipe-maitrise-oeuvre",
    element: <Equipe />
  },
  {
    path: "/parrainage",
    element: <Parrainage />
  },
  {
    path: "/devenir-partenaire",
    element: <DevenirPartenaire />
  },
  {
    path: "/mentions-legales",
    element: <Legal />
  },
  {
    path: "/privacy-policy",
    element: <Legal />
  },
  {
    path: "/cgu",
    element: <Legal />
  },
  {
    path: "/cgv",
    element: <CGV />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/sitemap",
    element: <Sitemap />
  },
];
