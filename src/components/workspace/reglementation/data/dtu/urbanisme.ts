
import { DTU } from '../../dtu/types';

export const urbanismeDTUs: DTU[] = [
  {
    id: 'urb-001',
    title: 'Règles d\'urbanisme et permis de construire',
    category: 'Urbanisme',
    description: 'Principales règles d\'urbanisme à respecter pour les projets de construction et les démarches liées aux autorisations.',
    lastUpdate: '15/03/2023',
    rules: [
      {
        title: 'Documents d\'urbanisme',
        content: 'Le PLU (Plan Local d\'Urbanisme) ou la carte communale déterminent les règles applicables à chaque parcelle.',
        type: 'standard'
      },
      {
        title: 'Coefficient d\'emprise au sol',
        content: 'L\'emprise au sol des constructions est souvent limitée par un pourcentage de la surface du terrain.',
        type: 'standard'
      },
      {
        title: 'Implantation par rapport aux limites',
        content: 'Les règles d\'implantation par rapport aux voies et limites séparatives sont définies dans le PLU.',
        type: 'warning'
      },
      {
        title: 'Hauteur maximale',
        content: 'La hauteur des constructions est généralement limitée en mètres ou en nombre de niveaux.',
        type: 'standard'
      }
    ],
    sections: [
      {
        title: 'Autorisations d\'urbanisme',
        content: 'Selon la nature et l\'importance des travaux, différentes autorisations sont nécessaires : permis de construire, déclaration préalable, permis d\'aménager...'
      },
      {
        title: 'Délais d\'instruction',
        content: 'Le délai d\'instruction d\'une demande de permis de construire est généralement de 2 mois pour une maison individuelle et 3 mois dans les autres cas.'
      }
    ]
  },
  {
    id: 'urb-002',
    title: 'Servitudes et contraintes réglementaires',
    category: 'Urbanisme',
    description: 'Principales servitudes d\'utilité publique et contraintes réglementaires pouvant affecter un projet de construction.',
    lastUpdate: '22/06/2022',
    rules: [
      {
        title: 'Plan de Prévention des Risques',
        content: 'Les PPR (inondation, mouvement de terrain, incendie...) peuvent imposer des contraintes constructives spécifiques.',
        type: 'warning'
      },
      {
        title: 'Protection du patrimoine',
        content: 'À proximité d\'un monument historique, les projets sont soumis à l\'avis de l\'Architecte des Bâtiments de France.',
        type: 'standard'
      },
      {
        title: 'Servitudes de réseaux',
        content: 'Le passage de réseaux (électricité, gaz, eau...) peut générer des servitudes limitant la constructibilité.',
        type: 'alert'
      }
    ]
  }
];
