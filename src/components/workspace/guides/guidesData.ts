
import { GuideDocument } from './types';

// Guide categories
export const guideCategories = [
  { id: 'technique', name: 'Technique' },
  { id: 'reglementation', name: 'Réglementation' },
  { id: 'gestion', name: 'Gestion de projet' },
  { id: 'eco', name: 'Construction écologique' },
  { id: 'renovation', name: 'Rénovation' }
];

// List of guides available in the workspace
export const guides: GuideDocument[] = [
  {
    id: 'guide-renovation-energetique',
    title: 'Guide de la rénovation énergétique RE2020',
    description: 'Guide pratique pour la rénovation énergétique selon la RE2020, incluant les exigences thermiques et environnementales',
    type: 'pdf',
    url: '/resources/guides/guide-renovation-energetique.pdf',
    categoryId: 'renovation',
    lastUpdated: '2023-07-22',
    fileSize: '1.2 Mo',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'normes-parasismiques',
    title: 'Guide des normes parasismiques',
    description: 'Comprendre et appliquer les normes parasismiques dans vos projets de construction, avec les exigences techniques détaillées',
    type: 'pdf',
    url: '/resources/guides/normes-parasismiques.pdf',
    categoryId: 'technique',
    lastUpdated: '2023-09-15',
    fileSize: '1.8 Mo',
    isNew: true
  },
  {
    id: 'liste-dtu-batiment',
    title: 'Liste des DTUs du bâtiment',
    description: 'Liste complète des Documents Techniques Unifiés par corps de métier pour la construction',
    type: 'pdf',
    url: '/resources/documents/liste-dtu-batiment.pdf',
    categoryId: 'reglementation',
    lastUpdated: '2023-06-08',
    fileSize: '950 Ko'
  },
  {
    id: 'gestion-chantier',
    title: 'Méthodes de gestion de chantier',
    description: 'Bonnes pratiques et méthodes pour une gestion efficace de vos chantiers de construction',
    type: 'text',
    url: '#',
    categoryId: 'gestion',
    lastUpdated: '2023-04-12',
    fileSize: '785 Ko',
    content: `# La gestion efficace de chantier

## Introduction
Une bonne gestion de chantier est essentielle pour la réussite de tout projet de construction ou de rénovation.

## Les points clés
1. **Planification détaillée** - Anticiper chaque phase du projet
2. **Communication constante** - Maintenir le dialogue entre tous les intervenants
3. **Suivi rigoureux** - Contrôler régulièrement l'avancement et la qualité
4. **Gestion des imprévus** - Prévoir une marge pour les aléas

## Outils recommandés
- Diagrammes de Gantt pour la planification
- Logiciels de suivi de chantier
- Réunions hebdomadaires avec compte-rendus
- Photos quotidiennes du chantier

## Conclusion
Une méthodologie rigoureuse permet d'éviter les retards et les dépassements de budget tout en garantissant la qualité des travaux.`
  },
  {
    id: 'construction-ecologique',
    title: 'Construction écologique : principes et matériaux',
    description: 'Guide sur les principes et matériaux pour une construction plus respectueuse de l\'environnement',
    type: 'text',
    url: '#',
    categoryId: 'eco',
    lastUpdated: '2023-08-30',
    fileSize: '1.1 Mo',
    content: `# Construction écologique

## Principes fondamentaux
La construction écologique vise à réduire l'impact environnemental d'un bâtiment sur l'ensemble de son cycle de vie.

## Matériaux biosourcés
* **Bois** - Matériau renouvelable par excellence
* **Chanvre** - Excellent isolant thermique et phonique
* **Paille** - Solution économique et performante
* **Terre crue** - Régulation naturelle de l'humidité

## Techniques constructives
* Ossature bois
* Pisé et bauge
* Enduits naturels
* Toitures végétalisées

## Certification et normes
* Label E+C-
* Bâtiment passif
* HQE
* BBCA`
  }
];
