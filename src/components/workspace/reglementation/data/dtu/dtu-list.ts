
import { DTU } from '../../dtu/types';

export const dtuDTUs: DTU[] = [
  {
    id: 'dtu-001',
    title: 'DTU 20.1 - Parois et murs en maçonnerie',
    category: 'Maçonnerie',
    description: 'Prescriptions pour la mise en œuvre des parois et murs en maçonnerie de petits éléments.',
    lastUpdate: '12/05/2022',
    rules: [
      {
        title: 'Mortier de pose',
        content: 'Le mortier de pose doit être adapté au type de maçonnerie et aux conditions climatiques.',
        type: 'standard'
      },
      {
        title: 'Épaisseur des joints',
        content: 'L\'épaisseur des joints horizontaux doit être comprise entre 8 et 15 mm.',
        type: 'standard'
      },
      {
        title: 'Protection contre l\'humidité',
        content: 'Toujours prévoir une coupure de capillarité en pied de mur pour éviter les remontées d\'humidité.',
        type: 'warning'
      }
    ]
  },
  {
    id: 'dtu-002',
    title: 'DTU 31.2 - Construction de maisons à ossature bois',
    category: 'Ossature bois',
    description: 'Règles de conception et de mise en œuvre des maisons à ossature en bois.',
    lastUpdate: '18/09/2022',
    rules: [
      {
        title: 'Isolation thermique',
        content: 'L\'épaisseur de l\'isolant doit être adaptée à l\'espacement des montants d\'ossature.',
        type: 'standard'
      },
      {
        title: 'Pare-vapeur',
        content: 'Un pare-vapeur continu doit être posé côté intérieur de l\'isolation pour éviter les risques de condensation.',
        type: 'warning'
      },
      {
        title: 'Protection contre les insectes',
        content: 'Tous les bois de structure doivent être traités contre les insectes et les champignons selon leur classe d\'emploi.',
        type: 'alert'
      }
    ],
    sections: [
      {
        title: 'Conception des parois',
        content: 'Les parois à ossature bois doivent être conçues pour assurer l\'étanchéité à l\'air et à l\'eau tout en permettant la migration de la vapeur d\'eau.'
      },
      {
        title: 'Contreventement',
        content: 'Le contreventement doit être assuré par des panneaux de voile travaillant fixés sur l\'ossature ou par des diagonales.'
      }
    ],
    schemas: [
      {
        id: 'dtu-schema-1',
        title: 'Détail de jonction entre mur et plancher',
        imageUrl: '/lovable-uploads/3f77f084-4061-4e36-9f32-85cb08372b51.png',
        description: 'Schéma détaillant la jonction entre un mur à ossature bois et un plancher'
      }
    ]
  },
  {
    id: 'dtu-003',
    title: 'DTU 36.5 - Mise en œuvre des fenêtres et portes extérieures',
    category: 'Menuiseries',
    description: 'Prescriptions relatives à la mise en œuvre des fenêtres et portes extérieures dans le gros œuvre.',
    lastUpdate: '04/06/2022',
    rules: [
      {
        title: 'Étanchéité à l\'air',
        content: 'L\'étanchéité à l\'air doit être assurée par un calfeutrement continu entre le dormant et le gros œuvre.',
        type: 'standard'
      },
      {
        title: 'Drainage',
        content: 'Chaque traverse basse doit être équipée d\'un système de drainage pour évacuer l\'eau d\'infiltration.',
        type: 'warning'
      },
      {
        title: 'Fixation',
        content: 'Les fixations doivent être dimensionnées en fonction des charges appliquées à la menuiserie et du support.',
        type: 'alert'
      }
    ]
  },
  {
    id: 'dtu-004',
    title: 'DTU 43.1 - Étanchéité des toitures-terrasses',
    category: 'Étanchéité',
    description: 'Règles pour la conception et la réalisation des toitures-terrasses avec revêtement d\'étanchéité.',
    lastUpdate: '22/11/2022',
    rules: [
      {
        title: 'Pente minimale',
        content: 'La pente minimale est de 1% après déformation de la structure pour les toitures-terrasses accessibles.',
        type: 'standard'
      },
      {
        title: 'Relevés d\'étanchéité',
        content: 'La hauteur des relevés d\'étanchéité doit être d\'au moins 15 cm au-dessus du niveau fini de la terrasse.',
        type: 'warning'
      },
      {
        title: 'Protection lourde',
        content: 'La protection lourde doit être mise en œuvre sur un écran de séparation pour éviter le poinçonnement de l\'étanchéité.',
        type: 'tip'
      }
    ]
  },
  {
    id: 'dtu-005',
    title: 'DTU 60.1 - Plomberie sanitaire',
    category: 'Plomberie',
    description: 'Règles de conception et de dimensionnement des installations de plomberie sanitaire dans les bâtiments.',
    lastUpdate: '15/04/2023',
    rules: [
      {
        title: 'Dimensionnement des canalisations',
        content: 'Le diamètre des canalisations doit être calculé en fonction du débit probable et de la vitesse d\'écoulement.',
        type: 'standard'
      },
      {
        title: 'Pente des évacuations',
        content: 'Les canalisations d\'évacuation doivent avoir une pente minimale de 1 cm/m pour assurer un bon écoulement.',
        type: 'standard'
      },
      {
        title: 'Ventilation primaire',
        content: 'Toute chute d\'eau usée doit être prolongée en ventilation primaire hors toiture.',
        type: 'warning'
      }
    ]
  }
];
