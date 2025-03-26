
import { ReactNode } from 'react';

export interface NavLink {
  name: string;
  path: string;
  subLinks?: {
    name: string;
    path: string;
  }[];
}

export const navLinks: NavLink[] = [
  {
    name: 'Accueil',
    path: '/',
  },
  {
    name: 'Nos Prestations',
    path: '/prestations-maitre-oeuvre',
    subLinks: [
      {
        name: 'Construction sur mesure',
        path: '/prestations-maitre-oeuvre#construction',
      },
      {
        name: 'Rénovation énergétique',
        path: '/prestations-maitre-oeuvre#renovation',
      },
      {
        name: 'Extension & agrandissement',
        path: '/prestations-maitre-oeuvre#extension',
      },
      {
        name: 'Optimisation d\'espace',
        path: '/prestations-maitre-oeuvre#optimisation',
      },
    ],
  },
  {
    name: 'Nos Réalisations',
    path: '/realisations-architecte-maison',
  },
  {
    name: 'Notre Équipe',
    path: '/equipe-maitrise-oeuvre',
  },
  {
    name: 'À Propos',
    path: '/a-propos',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];
