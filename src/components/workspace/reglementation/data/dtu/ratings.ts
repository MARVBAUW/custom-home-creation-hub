
import { DTU } from '../../dtu/types';

export const ratingClassificationsDTUs: DTU[] = [
  {
    id: 'rat-001',
    title: 'Classement UPEC des revêtements de sol',
    category: 'Classifications',
    description: 'Système de classification des revêtements de sol selon leur résistance à l\'usage, le poinçonnement, l\'eau et les produits chimiques.',
    lastUpdate: '10/12/2022',
    rules: [
      {
        title: 'Indice U - Usure',
        content: 'Caractérise la résistance à l\'usure par abrasion, avec 4 niveaux de U1 (faible) à U4 (très élevé).',
        type: 'standard'
      },
      {
        title: 'Indice P - Poinçonnement',
        content: 'Évalue la résistance aux charges statiques et dynamiques, de P1 (faible) à P4 (très élevé).',
        type: 'standard'
      },
      {
        title: 'Indice E - Eau',
        content: 'Définit le comportement à l\'eau et à l\'humidité, de E1 (présence occasionnelle) à E3 (présence fréquente).',
        type: 'warning'
      },
      {
        title: 'Indice C - Chimie',
        content: 'Caractérise la tenue aux agents chimiques et taches, de C0 (aucune exigence) à C3 (résistance élevée).',
        type: 'standard'
      }
    ],
    sections: [
      {
        title: 'Choix selon la destination',
        content: 'Le choix du revêtement doit correspondre à la classification UPEC du local. Par exemple, une cuisine nécessite au minimum U3P2E2C1.'
      },
      {
        title: 'Certifications',
        content: 'Le classement UPEC est délivré par le CSTB après des essais normalisés et peut faire l\'objet d\'un certificat.'
      }
    ]
  },
  {
    id: 'rat-002',
    title: 'Classement des menuiseries extérieures',
    category: 'Classifications',
    description: 'Système de classification AEV des menuiseries extérieures selon leur résistance à l\'air, à l\'eau et au vent.',
    lastUpdate: '14/02/2023',
    rules: [
      {
        title: 'Indice A - Perméabilité à l\'air',
        content: 'Classé de A1 (faible) à A4 (très bonne étanchéité), selon la perméabilité à l\'air sous pression.',
        type: 'standard'
      },
      {
        title: 'Indice E - Étanchéité à l\'eau',
        content: 'Classé de E1 à E9 selon la résistance à l\'infiltration d\'eau sous pression et aspersion.',
        type: 'warning'
      },
      {
        title: 'Indice V - Résistance au vent',
        content: 'Classé de V1 à V5 selon la résistance à la pression/dépression et aux déformations sous charges.',
        type: 'standard'
      }
    ]
  },
  {
    id: 'rat-003',
    title: 'Euroclasses et réaction au feu',
    category: 'Classifications',
    description: 'Classification européenne de réaction au feu des produits de construction et d\'aménagement.',
    lastUpdate: '08/04/2023',
    rules: [
      {
        title: 'Classes principales',
        content: 'Les euroclasses vont de A1 (incombustible) à F (non classé), avec les classes A1, A2, B, C, D, E, F.',
        type: 'standard'
      },
      {
        title: 'Classements complémentaires',
        content: 'Le s1, s2, s3 évalue la production de fumées et le d0, d1, d2 les gouttelettes enflammées.',
        type: 'warning'
      },
      {
        title: 'Exigences réglementaires',
        content: 'Les exigences minimales varient selon le type de bâtiment et l\'emplacement du matériau.',
        type: 'alert'
      }
    ]
  }
];
