
import { DTU } from '../../dtu/types';

export const ratingClassificationsDTUs: DTU[] = [
  {
    id: "rating-upec",
    title: "Classement UPEC",
    category: "Classifications",
    description: "Système d'évaluation de la résistance des revêtements de sol selon quatre critères : Usure, Poinçonnement, Eau, produits Chimiques.",
    lastUpdate: "2022-01-15",
    rules: [
      {
        title: "Critère U (Usure)",
        content: "Évalue la résistance à l'usure par frottement, notée de 2 à 4.",
        type: "standard"
      },
      {
        title: "Critère P (Poinçonnement)",
        content: "Mesure la résistance aux enfoncements et aux déformations, notée de 2 à 4.",
        type: "standard"
      },
      {
        title: "Critère E (Eau)",
        content: "Indique la tenue à l'eau et à l'humidité, notée de 1 à 3.",
        type: "warning"
      },
      {
        title: "Critère C (Chimie)",
        content: "Définit la résistance aux produits chimiques et taches, notée de 0 à 3.",
        type: "standard"
      }
    ]
  },
  {
    id: "rating-aev",
    title: "Classement AEV",
    category: "Classifications",
    description: "Classification des performances des fenêtres selon leur perméabilité à l'Air, leur Étanchéité à l'eau et leur résistance au Vent.",
    lastUpdate: "2021-11-20",
    rules: [
      {
        title: "Critère A (Air)",
        content: "Perméabilité à l'air, classée de A1 (faible) à A4 (excellente).",
        type: "standard"
      },
      {
        title: "Critère E (Eau)",
        content: "Étanchéité à l'eau, classée de E1 (faible) à E9 (excellente).",
        type: "warning"
      },
      {
        title: "Critère V (Vent)",
        content: "Résistance au vent, classée de V1 (faible) à V4 (excellente).",
        type: "standard"
      }
    ]
  },
  {
    id: "rating-revetir",
    title: "Classement REVETIR",
    category: "Classifications",
    description: "Évaluation des performances des revêtements muraux selon 7 critères.",
    lastUpdate: "2022-03-10",
    rules: [
      {
        title: "Critères d'évaluation",
        content: "R (Réaction au feu), E (Entretien), V (Vieillissement), E (Eau), T (Tenue aux chocs), I (Insectes), R (Rayures).",
        type: "standard"
      },
      {
        title: "Applications",
        content: "Utilisé principalement pour les revêtements muraux dans les ERP et les logements collectifs.",
        type: "tip"
      }
    ]
  }
];
