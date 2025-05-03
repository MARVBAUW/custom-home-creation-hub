
import { DTU } from '../../dtu/types';

export const accessibiliteDTUs: DTU[] = [
  {
    id: 'acc-001',
    title: 'Accessibilité des bâtiments aux personnes handicapées',
    category: 'Accessibilité',
    description: 'Exigences d\'accessibilité des bâtiments aux personnes handicapées selon la réglementation en vigueur.',
    lastUpdate: '05/10/2022',
    rules: [
      {
        title: 'Largeur minimale de passage',
        content: 'Une largeur minimale de 0,90 m doit être assurée dans tous les espaces de circulation et passages.',
        type: 'standard'
      },
      {
        title: 'Rampes d\'accès',
        content: 'Les rampes d\'accès doivent avoir une pente maximale de 5% avec un palier de repos tous les 10m pour les pentes > 4%.',
        type: 'standard'
      },
      {
        title: 'Sanitaires adaptés',
        content: 'Prévoir un espace de rotation de 1,50 m à l\'intérieur des sanitaires adaptés et un barre d\'appui latérale à 0,70m du sol.',
        type: 'standard'
      }
    ],
    sections: [
      {
        title: 'Cheminements extérieurs',
        content: 'Les cheminements extérieurs doivent être accessibles, avec une largeur minimale de 1,20 m libre de tout obstacle. La pente transversale maximale est de 2%.'
      },
      {
        title: 'Ascenseurs',
        content: 'Un ascenseur est obligatoire pour tous les ERP situés dans un bâtiment comportant plus de 3 étages ou recevant plus de 50 personnes en étages.'
      }
    ]
  },
  {
    id: 'acc-002',
    title: 'Contrastes visuels pour l\'accessibilité',
    category: 'Accessibilité',
    description: 'Recommandations et exigences concernant les contrastes visuels pour garantir l\'accessibilité des personnes malvoyantes.',
    lastUpdate: '18/03/2023',
    rules: [
      {
        title: 'Contraste des éléments de commande',
        content: 'Les éléments de commande (interrupteurs, boutons, etc.) doivent présenter un contraste visuel ≥ 70% avec leur support.',
        type: 'standard'
      },
      {
        title: 'Signalétique',
        content: 'La signalétique doit utiliser des caractères de taille suffisante avec un contraste de 70% minimum entre les caractères et le fond.',
        type: 'standard'
      },
      {
        title: 'Repérage des obstacles',
        content: 'Tout obstacle doit être signalé par un contraste visuel et tactile pour éviter les risques de heurt.',
        type: 'warning'
      }
    ]
  }
];
