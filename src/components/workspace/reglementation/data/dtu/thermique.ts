
import { DTU } from '../../dtu/types';

export const thermiqueDTUs: DTU[] = [
  {
    id: 'th-001',
    title: 'DTU 45.11 - Isolation thermique des combles',
    category: 'Thermique',
    description: 'Règles de mise en œuvre de l\'isolation thermique par l\'intérieur des combles.',
    lastUpdate: '28/05/2022',
    rules: [
      {
        title: 'Ventilation des combles',
        content: 'Une ventilation des combles non aménagés est obligatoire avec entrées d\'air en bas de versant et sorties en partie haute.',
        type: 'standard'
      },
      {
        title: 'Continuité de l\'isolation',
        content: 'L\'isolation doit être continue sur toute la surface et assurer un recouvrement de 10 cm minimum en cas de jonction.',
        type: 'warning'
      },
      {
        title: 'Écran de sous-toiture',
        content: 'L\'écran de sous-toiture doit être posé avec un chevauchement de 10 cm et une contre-latte pour assurer la ventilation.',
        type: 'tip'
      }
    ]
  },
  {
    id: 'th-002',
    title: 'DTU 45.10 - Isolation des parois verticales',
    category: 'Thermique',
    description: 'Mise en œuvre de l\'isolation thermique et acoustique par l\'intérieur des parois verticales.',
    lastUpdate: '12/01/2023',
    rules: [
      {
        title: 'Traitement des ponts thermiques',
        content: 'Les ponts thermiques doivent être traités par une isolation continue aux jonctions murs/planchers.',
        type: 'warning'
      },
      {
        title: 'Pare-vapeur',
        content: 'Le pare-vapeur doit être placé côté chaud de l\'isolant avec des recouvrements de 10 cm et jointures étanches.',
        type: 'standard'
      },
      {
        title: 'Ossature support',
        content: 'L\'espacement des montants de l\'ossature doit être compatible avec la largeur des panneaux isolants.',
        type: 'tip'
      }
    ],
    sections: [
      {
        title: 'Choix des matériaux',
        content: 'Les isolants doivent être choisis en fonction de leurs performances thermiques, acoustiques et de leur comportement au feu.'
      },
      {
        title: 'Gestion de l\'humidité',
        content: 'La perméabilité à la vapeur d\'eau des différentes couches doit décroître de l\'intérieur vers l\'extérieur pour éviter tout risque de condensation.'
      }
    ]
  },
  {
    id: 'th-003',
    title: 'RE 2020 - Exigences thermiques',
    category: 'Thermique',
    description: 'Principales exigences de la Réglementation Environnementale 2020 concernant la performance thermique des bâtiments.',
    lastUpdate: '04/03/2023',
    rules: [
      {
        title: 'Besoin bioclimatique',
        content: 'L\'indicateur Bbio doit être inférieur au Bbiomax, qui dépend de la localisation et de l\'altitude du projet.',
        type: 'standard'
      },
      {
        title: 'Confort d\'été',
        content: 'Le nombre d\'heures d\'inconfort DH (degrés-heures) ne doit pas dépasser 1250 pour garantir le confort d\'été.',
        type: 'warning'
      },
      {
        title: 'Consommation d\'énergie',
        content: 'L\'indicateur Cep mesure la consommation d\'énergie primaire et doit être inférieur au Cepmax réglementaire.',
        type: 'standard'
      },
      {
        title: 'Impact carbone',
        content: 'L\'indicateur IC évalue l\'impact carbone du bâtiment sur son cycle de vie et doit respecter des seuils maximaux.',
        type: 'alert'
      }
    ]
  }
];
