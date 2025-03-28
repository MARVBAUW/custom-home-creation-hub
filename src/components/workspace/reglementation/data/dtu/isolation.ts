
import { DTU } from '../../dtu/types';

export const isolationDTUs: DTU[] = [
  {
    id: "dtu-45-1",
    title: "DTU 45.1 - Isolation thermique des bâtiments",
    category: "Isolation",
    description: "Isolation thermique des bâtiments par l'intérieur",
    lastUpdate: "Septembre 2020",
    rules: [
      {
        title: "Pare-vapeur côté chaud",
        content: "Le pare-vapeur doit toujours être positionné du côté chaud de l'isolant (côté intérieur du local) pour éviter les condensations.",
        type: "standard"
      },
      {
        title: "Continuité de l'isolation",
        content: "Assurer la continuité de l'isolation aux jonctions entre parois (murs/planchers, angles) pour éviter les ponts thermiques.",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Le non-respect de la continuité du pare-vapeur peut conduire à des problèmes d'humidité dans les parois et une dégradation de l'isolant.",
        type: "warning"
      },
      {
        title: "Vides techniques",
        content: "Prévoir un vide technique de 2 à 4 cm entre le parement et l'isolant pour le passage des gaines électriques sans altérer le pare-vapeur.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.1 traite de l'isolation thermique par l'intérieur des murs en béton ou en maçonnerie, des planchers et des combles des bâtiments, au moyen de produits manufacturés."
      },
      {
        title: "Choix des isolants",
        content: "Les isolants doivent être certifiés et adaptés à leur usage. Leur résistance thermique doit être choisie en fonction des exigences réglementaires (RT2012, RE2020)."
      },
      {
        title: "Mise en œuvre du pare-vapeur",
        content: "Le pare-vapeur doit avoir une valeur Sd (épaisseur d'air équivalente) supérieure à 18 m dans le cas général. Les joints doivent être rendus étanches par des adhésifs compatibles."
      }
    ]
  }
];
