
import { DTU } from '../../dtu/types';

export const hygrometrieDTUs: DTU[] = [
  {
    id: 'hyg-001',
    title: 'Hygrométrie et transferts de vapeur dans les parois',
    category: 'Hygrométrie',
    description: 'Principes et règles concernant la gestion de l\'humidité et des transferts de vapeur d\'eau dans les parois du bâtiment.',
    lastUpdate: '08/01/2023',
    rules: [
      {
        title: 'Point de rosée',
        content: 'Le point de rosée ne doit jamais se situer à l\'intérieur d\'une paroi pour éviter les risques de condensation interne.',
        type: 'warning'
      },
      {
        title: 'Membrane pare-vapeur',
        content: 'La résistance à la diffusion de vapeur doit décroître de l\'intérieur vers l\'extérieur (règle du facteur 5).',
        type: 'standard'
      },
      {
        title: 'Locaux à forte hygrométrie',
        content: 'Dans les locaux à forte production d\'humidité, prévoir une ventilation adaptée et des parois à forte résistance à la diffusion de vapeur.',
        type: 'alert'
      }
    ],
    sections: [
      {
        title: 'Perméabilité des matériaux',
        content: 'La perméabilité à la vapeur d\'eau (μ) caractérise la capacité d\'un matériau à laisser passer la vapeur. Plus μ est faible, plus le matériau est perméable.'
      },
      {
        title: 'Zones climatiques',
        content: 'La conception hygrothermique des parois doit tenir compte de la zone climatique et de l\'exposition du bâtiment.'
      }
    ]
  },
  {
    id: 'hyg-002',
    title: 'DTU 20.1 - Étanchéité des maçonneries',
    category: 'Hygrométrie',
    description: 'Dispositions constructives pour assurer l\'étanchéité à l\'eau des ouvrages en maçonnerie.',
    lastUpdate: '19/11/2022',
    rules: [
      {
        title: 'Coupure capillaire',
        content: 'Une coupure de capillarité doit être placée à au moins 15 cm au-dessus du niveau du sol extérieur.',
        type: 'standard'
      },
      {
        title: 'Étanchéité des soubassements',
        content: 'Les murs enterrés doivent être protégés par un enduit d\'étanchéité ou une membrane jusqu\'à 15 cm au-dessus du terrain.',
        type: 'warning'
      },
      {
        title: 'Protection des acrotères',
        content: 'Les acrotères doivent être protégés en partie supérieure pour éviter les infiltrations.',
        type: 'tip'
      }
    ]
  }
];
