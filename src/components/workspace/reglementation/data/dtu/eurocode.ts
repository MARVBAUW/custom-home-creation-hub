
import { DTU } from '../../dtu/types';

export const eurocodeDTUs: DTU[] = [
  {
    id: "eurocode-1",
    title: "Eurocode 1 - Actions sur les structures",
    category: "Eurocodes",
    description: "Définit les principes généraux pour le calcul des actions à considérer dans le dimensionnement des structures.",
    lastUpdate: "2022-02-10",
    rules: [
      {
        title: "Charges permanentes",
        content: "Les charges permanentes comprennent le poids propre de la structure et des éléments non structuraux permanents.",
        type: "standard"
      },
      {
        title: "Charges d'exploitation",
        content: "Catégorisation des charges selon l'usage du bâtiment (résidentiel, commercial, etc.)",
        type: "standard"
      }
    ]
  },
  {
    id: "eurocode-2",
    title: "Eurocode 2 - Calcul des structures en béton",
    category: "Eurocodes",
    description: "Spécifications pour le calcul des structures en béton armé et précontraint.",
    lastUpdate: "2022-03-15",
    rules: [
      {
        title: "Enrobage des armatures",
        content: "L'enrobage minimal des armatures dépend de la classe d'exposition environnementale.",
        type: "warning"
      },
      {
        title: "Dimensionnement des poutres",
        content: "Les poutres doivent être dimensionnées pour résister aux moments de flexion et aux efforts tranchants.",
        type: "tip"
      }
    ]
  }
];
