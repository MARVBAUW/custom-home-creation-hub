
import React from 'react';
import Index from '../pages/Index';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Prestations from '../pages/Prestations';
import ConstructionNeuve from '../pages/prestations/ConstructionNeuve';
import Renovation from '../pages/prestations/Renovation';
import Extension from '../pages/prestations/Extension';
import OptimisationEspace from '../pages/prestations/OptimisationEspace';
import DesignInterieur from '../pages/prestations/DesignInterieur';
import Realisations from '../pages/Realisations';
import Equipe from '../pages/Equipe';
import Estimation from '../pages/Estimation';
import Legal from '../pages/Legal';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CGU from '../pages/CGU';
import CGV from '../pages/CGV';
import FAQ from '../pages/FAQ';
import Sitemap from '../pages/Sitemap';
import SitemapXML from '../pages/SitemapXML';
import Parrainage from '../pages/Parrainage';
import DevenirPartenaire from '../pages/DevenirPartenaire';
import NotFound from '../pages/NotFound';

export const publicRoutes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/a-propos",
    element: <About />,
  },
  {
    path: "/prestations-maitre-oeuvre",
    element: <Prestations />,
  },
  {
    path: "/prestations-maitre-oeuvre/construction-neuve",
    element: <ConstructionNeuve />,
  },
  {
    path: "/prestations-maitre-oeuvre/renovation",
    element: <Renovation />,
  },
  {
    path: "/prestations-maitre-oeuvre/extension",
    element: <Extension />,
  },
  {
    path: "/prestations-maitre-oeuvre/optimisation-espace",
    element: <OptimisationEspace />,
  },
  {
    path: "/prestations-maitre-oeuvre/design-interieur",
    element: <DesignInterieur />,
  },
  {
    path: "/realisations-architecte-maison",
    element: <Realisations />,
  },
  {
    path: "/equipe-maitrise-oeuvre",
    element: <Equipe />,
  },
  {
    path: "/estimation",
    element: <Estimation />,
  },
  {
    path: "/mentions-legales",
    element: <Legal />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/cgu",
    element: <CGU />,
  },
  {
    path: "/cgv",
    element: <CGV />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/sitemap",
    element: <Sitemap />,
  },
  {
    path: "/sitemap.xml",
    element: <SitemapXML />,
  },
  {
    path: "/sitemap.xml/",
    element: <SitemapXML />,
  },
  {
    path: "/parrainage",
    element: <Parrainage />,
  },
  {
    path: "/devenir-partenaire",
    element: <DevenirPartenaire />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
