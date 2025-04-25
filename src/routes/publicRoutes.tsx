import React from 'react';
import { RouteObject } from 'react-router-dom';
import Redirect from '../components/common/Redirect';
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
import SitemapXML from '../pages/SitemapXML';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CGU from '../pages/CGU';

// Pages dédiées aux prestations
import ConstructionNeuve from '../pages/prestations/ConstructionNeuve';
import Renovation from '../pages/prestations/Renovation';
import Extension from '../pages/prestations/Extension';
import OptimisationEspace from '../pages/prestations/OptimisationEspace';
import DesignInterieur from '../pages/prestations/DesignInterieur';
import MontageAdministratif from '../pages/prestations/MontageAdministratif';
import PetitCollectif from '../pages/prestations/PetitCollectif';
import Rehabilitation from '../pages/prestations/Rehabilitation';
import ConstructionEcologique from '../pages/prestations/ConstructionEcologique';
import RealisationsArchitecturales from '../pages/RealisationsArchitecturales';

// Add a proper route for the HTML sitemap page
export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />
  },
  // Redirections 301 avec messages
  {
    path: "/old-feature",
    element: <Redirect 
      to="/prestations-maitre-oeuvre" 
      message="Cette page a été déplacée vers nos prestations."
    />
  },
  {
    path: "/deprecated-page",
    element: <Redirect 
      to="/" 
      message="Cette page n'existe plus. Vous avez été redirigé vers l'accueil."
    />
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
  // Routes pour les pages spécifiques de prestations
  {
    path: "/prestations-maitre-oeuvre/construction-neuve",
    element: <ConstructionNeuve />
  },
  {
    path: "/prestations-maitre-oeuvre/renovation",
    element: <Renovation />
  },
  {
    path: "/prestations-maitre-oeuvre/extension",
    element: <Extension />
  },
  {
    path: "/prestations-maitre-oeuvre/optimisation-espace",
    element: <OptimisationEspace />
  },
  {
    path: "/prestations-maitre-oeuvre/design-interieur",
    element: <DesignInterieur />
  },
  {
    path: "/prestations-maitre-oeuvre/montage-administratif",
    element: <MontageAdministratif />
  },
  {
    path: "/prestations-maitre-oeuvre/petit-collectif",
    element: <PetitCollectif />
  },
  {
    path: "/prestations-maitre-oeuvre/rehabilitation",
    element: <Rehabilitation />
  },
  {
    path: "/prestations-maitre-oeuvre/construction-ecologique",
    element: <ConstructionEcologique />
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
    element: <PrivacyPolicy />
  },
  {
    path: "/cgu",
    element: <CGU />
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
  {
    path: "/sitemap.xml",
    element: <SitemapXML />
  },
  {
    path: "/realisations-architecturales",
    element: <RealisationsArchitecturales />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
