
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Contact from '@/pages/Contact';
import Estimation from '@/pages/Estimation';
import Legal from '@/pages/Legal';
import CGV from '@/pages/CGV';
import FAQ from '@/pages/FAQ';
import Sitemap from '@/pages/Sitemap';
import Parrainage from '@/pages/Parrainage';
import DevenirPartenaire from '@/pages/DevenirPartenaire';
import Prestations from '@/pages/Prestations';
import Realisations from '@/pages/Realisations';
import Equipe from '@/pages/Equipe';
import NotFound from '@/pages/NotFound';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Create placeholder components for pages
const PrivacyPolicy = () => <div className="p-8"><h1 className="text-2xl">Politique de confidentialité</h1></div>;
const CGU = () => <div className="p-8"><h1 className="text-2xl">Conditions Générales d'Utilisation</h1></div>;

// Wrap routes that need the standard layout (with navbar and footer)
const StandardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <StandardLayout><Index /></StandardLayout>
  },
  {
    path: "/contact",
    element: <StandardLayout><Contact /></StandardLayout>
  },
  {
    path: "/estimation",
    element: <StandardLayout><Estimation /></StandardLayout>
  },
  {
    path: "/mentions-legales",
    element: <StandardLayout><Legal /></StandardLayout>
  },
  {
    path: "/privacy-policy",
    element: <StandardLayout><PrivacyPolicy /></StandardLayout>
  },
  {
    path: "/cgu",
    element: <StandardLayout><CGU /></StandardLayout>
  },
  {
    path: "/cgv",
    element: <StandardLayout><CGV /></StandardLayout>
  },
  {
    path: "/faq",
    element: <StandardLayout><FAQ /></StandardLayout>
  },
  {
    path: "/sitemap",
    element: <StandardLayout><Sitemap /></StandardLayout>
  },
  {
    path: "/parrainage",
    element: <StandardLayout><Parrainage /></StandardLayout>
  },
  {
    path: "/devenir-partenaire",
    element: <StandardLayout><DevenirPartenaire /></StandardLayout>
  },
  {
    path: "/prestations-maitre-oeuvre",
    element: <StandardLayout><Prestations /></StandardLayout>
  },
  {
    path: "/realisations-architecte-maison",
    element: <StandardLayout><Realisations /></StandardLayout>
  },
  {
    path: "/equipe-maitrise-oeuvre",
    element: <StandardLayout><Equipe /></StandardLayout>
  },
  {
    path: "*",
    element: <NotFound />
  }
];
