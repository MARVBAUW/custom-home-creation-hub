import React from 'react';
import { BookOpen, FileText, Video, FileSpreadsheet, Calculator } from 'lucide-react';
import { GuideCategory, GuideDocument } from './types';

// Guide Categories
export const guideCategories: GuideCategory[] = [
  { id: 'tous', name: 'Tous les guides', icon: BookOpen },
  { id: 'construction', name: 'Construction', icon: FileText },
  { id: 'renovation', name: 'Rénovation', icon: FileSpreadsheet },
  { id: 'reglementation', name: 'Réglementation', icon: FileText },
  { id: 'videos', name: 'Tutoriels Vidéo', icon: Video },
  { id: 'calculateurs', name: 'Calculateurs', icon: Calculator },
];

// Guide Documents
export const guideDocuments: GuideDocument[] = [
  {
    id: '1',
    title: 'Guide complet de la construction',
    description: 'Tout ce que vous devez savoir pour réussir votre projet de construction du début à la fin.',
    type: 'pdf',
    fileSize: '4.2 MB',
    lastUpdated: '2023-10-15',
    url: '/files/guide-construction.pdf',
    categoryId: 'construction',
    featured: true,
    isNew: false
  },
  {
    id: '2',
    title: 'Rénovation énergétique',
    description: 'Comment rénover votre logement pour réduire votre consommation énergétique et augmenter votre confort.',
    type: 'pdf',
    fileSize: '3.8 MB',
    lastUpdated: '2023-11-20',
    url: '/files/renovation-energetique.pdf',
    categoryId: 'renovation',
    featured: true,
    isNew: true
  },
  {
    id: '3',
    title: 'RT 2020 expliquée',
    description: 'Les principes et exigences de la Réglementation Thermique 2020 expliqués simplement.',
    type: 'pdf',
    fileSize: '2.5 MB',
    lastUpdated: '2023-09-10',
    url: '/files/rt-2020-expliquee.pdf',
    categoryId: 'reglementation',
    featured: false,
    isNew: false
  },
  {
    id: '4',
    title: 'Comment calculer le coût de votre projet',
    description: 'Méthodes et outils pour estimer le budget de votre projet de construction ou rénovation.',
    type: 'video',
    duration: '15:42',
    lastUpdated: '2023-11-05',
    url: 'https://www.youtube.com/watch?v=example',
    categoryId: 'videos',
    featured: true,
    isNew: false
  },
  {
    id: '5',
    title: 'Choix des matériaux écologiques',
    description: 'Guide pour sélectionner des matériaux durables et respectueux de l\'environnement.',
    type: 'pdf',
    fileSize: '3.2 MB',
    lastUpdated: '2023-10-30',
    url: '/files/materiaux-ecologiques.pdf',
    categoryId: 'construction',
    featured: false,
    isNew: true
  },
  {
    id: '6',
    title: 'Tutorat: Installation d\'une VMC double flux',
    description: 'Guide pas à pas pour installer correctement un système de ventilation mécanique contrôlée.',
    type: 'video',
    duration: '28:17',
    lastUpdated: '2023-11-15',
    url: 'https://www.youtube.com/watch?v=example2',
    categoryId: 'videos',
    featured: false,
    isNew: true
  },
  {
    id: '7',
    title: 'Les aides financières pour la rénovation 2023',
    description: 'Panorama complet des subventions et crédits d\'impôt disponibles cette année.',
    type: 'pdf',
    fileSize: '2.9 MB',
    lastUpdated: '2023-11-28',
    url: '/files/aides-financieres.pdf',
    categoryId: 'renovation',
    featured: true,
    isNew: true
  },
  {
    id: '8',
    title: 'Réglementation urbanisme 2023',
    description: 'Les dernières mises à jour des PLU et règles d\'urbanisme à connaître avant de démarrer.',
    type: 'pdf',
    fileSize: '3.4 MB',
    lastUpdated: '2023-11-02',
    url: '/files/urbanisme-2023.pdf',
    categoryId: 'reglementation',
    featured: false,
    isNew: false
  },
  {
    id: '9',
    title: 'Extension de maison : guide complet',
    description: 'De la conception aux finitions, tout ce qu\'il faut savoir pour agrandir votre maison.',
    type: 'pdf',
    fileSize: '4.5 MB',
    lastUpdated: '2023-10-25',
    url: '/files/guide-extension.pdf',
    categoryId: 'construction',
    featured: true,
    isNew: false
  },
  {
    id: '10',
    title: 'Diagnostic énergétique : comment l\'interpréter',
    description: 'Comprendre votre DPE et les recommandations pour améliorer votre logement.',
    type: 'text',
    lastUpdated: '2023-09-05',
    url: '#',
    categoryId: 'renovation',
    featured: false,
    isNew: false,
    content: `
    # Comment interpréter votre diagnostic énergétique

    Le Diagnostic de Performance Énergétique (DPE) est un document qui évalue la consommation d'énergie d'un logement et son impact en termes d'émissions de gaz à effet de serre. Voici comment le comprendre :

    ## Les classes énergétiques

    Les logements sont classés de A à G :
    - **A et B** : Très bonne performance énergétique
    - **C et D** : Performance moyenne
    - **E, F et G** : Performance médiocre à très mauvaise

    ## Que regarder dans votre DPE ?

    1. **La consommation d'énergie primaire** (en kWh/m²/an)
    2. **Les émissions de gaz à effet de serre** (en kg CO₂/m²/an)
    3. **Les recommandations de travaux** pour améliorer la performance

    ## Impact sur la valeur immobilière

    Depuis 2022, les logements classés F et G (appelés "passoires thermiques") font l'objet de restrictions progressives à la location. D'ici 2028, les logements classés E seront également concernés.

    ## Comment améliorer votre DPE ?

    - Isolation des combles et des murs
    - Remplacement des fenêtres simple vitrage
    - Modernisation du système de chauffage
    - Installation d'une ventilation performante

    Une rénovation énergétique bien menée peut faire gagner 2 à 3 classes énergétiques et valoriser significativement votre bien immobilier.
    `
  }
];
