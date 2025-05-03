
import { DTU } from '../../dtu/types';

export const eurocodeDTUs: DTU[] = [
  {
    id: 'ec-001',
    title: 'Eurocode 1 - Actions sur les structures',
    category: 'Eurocode',
    description: 'Prescriptions pour l\'évaluation des actions à considérer dans le calcul des structures de bâtiment.',
    lastUpdate: '10/11/2022',
    rules: [
      {
        title: 'Charge permanente',
        content: 'La charge permanente inclut le poids propre de la structure et tous les éléments non structuraux fixes.',
        type: 'standard'
      },
      {
        title: 'Charges d\'exploitation',
        content: 'Les charges d\'exploitation pour les planchers d\'habitation sont de 1,5 à 2,5 kN/m² selon la catégorie.',
        type: 'standard'
      },
      {
        title: 'Combinaisons de charges',
        content: 'Toujours vérifier les structures en utilisant les combinaisons d\'actions à l\'ELU et à l\'ELS.',
        type: 'warning'
      }
    ]
  },
  {
    id: 'ec-002',
    title: 'Eurocode 2 - Calcul des structures en béton',
    category: 'Eurocode',
    description: 'Règles pour le calcul et le dimensionnement des structures en béton armé ou précontraint.',
    lastUpdate: '08/02/2023',
    rules: [
      {
        title: 'Enrobage minimal',
        content: 'L\'enrobage minimal des armatures doit être défini en fonction de la durabilité, de l\'adhérence et de la résistance au feu.',
        type: 'standard'
      },
      {
        title: 'Armatures minimales',
        content: 'Une section de béton doit contenir une quantité minimale d\'armatures pour éviter la rupture fragile.',
        type: 'warning'
      },
      {
        title: 'Flèche admissible',
        content: 'La flèche d\'une poutre ou dalle ne doit pas dépasser L/250 pour la somme des charges permanentes et variables.',
        type: 'alert'
      }
    ]
  },
  {
    id: 'ec-008',
    title: 'Eurocode 8 - Conception parasismique',
    category: 'Eurocode',
    description: 'Règles pour le dimensionnement et la construction des bâtiments en zone sismique.',
    lastUpdate: '15/03/2023',
    rules: [
      {
        title: 'Classe de sol',
        content: 'La classe de sol influence fortement l\'amplification de l\'accélération sismique au niveau du bâtiment.',
        type: 'standard'
      },
      {
        title: 'Régularité structurale',
        content: 'La régularité en plan et en élévation est primordiale pour un bon comportement sismique.',
        type: 'warning'
      },
      {
        title: 'Joint parasismique',
        content: 'Un joint parasismique doit être prévu entre bâtiments adjacents pour éviter l\'entrechoquement.',
        type: 'alert'
      }
    ],
    sections: [
      {
        title: 'Zonage sismique',
        content: 'La France est divisée en 5 zones de sismicité, de très faible (1) à forte (5). La région PACA se situe principalement en zones 3 et 4.'
      },
      {
        title: 'Dispositions constructives',
        content: 'Des dispositions constructives spécifiques sont obligatoires : chaînages horizontaux et verticaux, ancrages des éléments non structuraux, etc.'
      }
    ]
  }
];
