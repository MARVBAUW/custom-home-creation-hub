
import { DTU } from '../../dtu/types';

export const incendieDTUs: DTU[] = [
  {
    id: 'inc-001',
    title: 'Réglementation incendie - ERP',
    category: 'Sécurité incendie',
    description: 'Prescriptions pour la protection contre l\'incendie dans les Établissements Recevant du Public (ERP).',
    lastUpdate: '20/07/2022',
    rules: [
      {
        title: 'Compartimentage',
        content: 'Les niveaux, locaux à risques et zones de sommeil doivent être isolés par des parois coupe-feu.',
        type: 'standard'
      },
      {
        title: 'Dégagements',
        content: 'Le nombre et la largeur des dégagements sont déterminés en fonction de l\'effectif total de l\'établissement.',
        type: 'warning'
      },
      {
        title: 'Désenfumage',
        content: 'Les locaux de plus de 300 m² et les circulations de plus de 5m de long doivent être désenfumés.',
        type: 'alert'
      }
    ],
    sections: [
      {
        title: 'Classifications des ERP',
        content: 'Les ERP sont classés par type (activité) et catégorie (effectif). La réglementation applicable dépend de ces classifications.'
      },
      {
        title: 'Résistance au feu',
        content: 'Les degrés de résistance au feu exigés pour les structures et parois varient selon le type de bâtiment : R (stabilité), E (étanchéité) et I (isolation).'
      }
    ]
  },
  {
    id: 'inc-002',
    title: 'Réglementation incendie - Habitations',
    category: 'Sécurité incendie',
    description: 'Exigences de sécurité incendie applicables aux bâtiments d\'habitation collectifs et individuels.',
    lastUpdate: '05/03/2023',
    rules: [
      {
        title: 'Classement des bâtiments',
        content: 'Les bâtiments d\'habitation sont classés en 4 familles selon leur hauteur et caractéristiques.',
        type: 'standard'
      },
      {
        title: 'Enveloppe coupe-feu',
        content: 'Les parois séparatives entre logements doivent être coupe-feu 1/4h pour les maisons individuelles et 1/2h pour les collectifs.',
        type: 'warning'
      },
      {
        title: 'Conduits et gaines',
        content: 'Les conduits traversant plusieurs niveaux doivent être disposés dans des gaines techniques avec des parois coupe-feu.',
        type: 'alert'
      }
    ]
  }
];
