import React from 'react';
import Index from '../pages/Index';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Prestations from '../pages/Prestations';
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
    path: "/prestations-maitre-oeuvre/:prestation",
    element: <Prestations />,
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
    path: "/",
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
