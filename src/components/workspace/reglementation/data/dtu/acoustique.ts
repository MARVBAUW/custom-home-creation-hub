
import { DTU } from '../../dtu/types';

export const acoustiqueDTUs: DTU[] = [
  {
    id: 'ac-001',
    title: 'DTU 20.1 - Isolation acoustique des murs',
    category: 'Acoustique',
    description: 'Prescriptions et recommandations pour l\'isolation acoustique des murs et cloisons dans les constructions.',
    lastUpdate: '14/06/2022',
    rules: [
      {
        title: 'Niveau d\'affaiblissement minimum',
        content: 'L\'isolement acoustique entre deux logements doit être d\'au moins 53 dB pour les bruits aériens.',
        type: 'standard'
      },
      {
        title: 'Ponts phoniques',
        content: 'Éviter tous les ponts phoniques au niveau des jonctions entre cloisons et éléments de structure.',
        type: 'warning'
      },
      {
        title: 'Double cloison',
        content: 'Pour une isolation optimale, prévoir un espace d\'air de 4cm minimum entre deux parois, avec un matériau absorbant.',
        type: 'tip'
      }
    ],
    sections: [
      {
        title: 'Murs séparatifs entre logements',
        content: 'Les murs séparatifs entre logements doivent avoir une masse minimale de 200 kg/m² ou être composés d\'une double paroi avec isolation adaptée.'
      },
      {
        title: 'Traitement des gaines techniques',
        content: 'Les gaines techniques traversant plusieurs logements doivent être isolées acoustiquement pour éviter la transmission du bruit.'
      }
    ],
    schemas: [
      {
        id: 'ac-schema-1',
        title: 'Principe d\'une double cloison acoustique',
        imageUrl: '/lovable-uploads/32221f3f-9469-4804-9663-067d2065aa7e.png',
        description: 'Schéma illustrant la mise en œuvre correcte d\'une double cloison avec isolant acoustique'
      }
    ]
  },
  {
    id: 'ac-002',
    title: 'DTU 51.3 - Isolation des planchers au bruit d\'impact',
    category: 'Acoustique',
    description: 'Exigences et méthodes pour l\'isolation des planchers vis-à-vis des bruits d\'impact dans les bâtiments d\'habitation.',
    lastUpdate: '22/09/2022',
    rules: [
      {
        title: 'Niveau de pression pondéré',
        content: 'Le niveau de pression pondéré du bruit de choc standardisé ne doit pas dépasser 58 dB.',
        type: 'standard'
      },
      {
        title: 'Chape flottante',
        content: 'La mise en œuvre d\'une chape flottante nécessite un isolant acoustique continu et remonté en périphérie.',
        type: 'warning'
      },
      {
        title: 'Désolidarisation',
        content: 'Tous les éléments rigides doivent être désolidarisés des parois verticales pour éviter les transmissions latérales.',
        type: 'alert'
      }
    ]
  }
];
