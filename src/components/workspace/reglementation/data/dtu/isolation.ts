
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
  },
  {
    id: "dtu-45-11",
    title: "DTU 45.11 - Isolation thermique par l'extérieur",
    category: "Isolation",
    description: "Isolation thermique des parois verticales par l'extérieur",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Résistance au feu",
        content: "Pour les bâtiments de 2ème famille et plus, utiliser des isolants classés au minimum A2-s3,d0 ou prévoir une protection spécifique contre la propagation du feu.",
        type: "standard"
      },
      {
        title: "Joints de dilatation",
        content: "Les joints de dilatation du bâtiment doivent être respectés et repris dans le système d'isolation par l'extérieur avec des profilés adaptés.",
        type: "standard"
      },
      {
        title: "Pathologie d'infiltration",
        content: "Les défauts d'étanchéité aux jonctions (menuiseries, acrotères, etc.) sont source de désordres graves. Traiter ces points singuliers avec le plus grand soin.",
        type: "warning"
      },
      {
        title: "Débord de toiture",
        content: "Prévoir un débord de toiture ou bavette métallique suffisant pour protéger le haut du système d'isolation par l'extérieur contre le ruissellement des eaux.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.11 s'applique aux systèmes d'isolation thermique par l'extérieur avec enduit sur isolant, pour les parois verticales en maçonnerie ou béton."
      },
      {
        title: "Types de systèmes",
        content: "Le DTU distingue les systèmes collés, fixés mécaniquement par profilés, ou fixés mécaniquement par chevilles, chacun avec ses règles spécifiques de mise en œuvre."
      },
      {
        title: "Résistance aux chocs",
        content: "L'armature et l'enduit doivent assurer une résistance aux chocs adaptée à l'exposition de la façade. On distingue plusieurs catégories : normale, renforcée ou très renforcée."
      }
    ]
  },
  {
    id: "dtu-45-3",
    title: "DTU 45.3 - Isolation des combles",
    category: "Isolation",
    description: "Bâtiments neufs ou rénovation - Isolation thermique des combles",
    lastUpdate: "Février 2022",
    rules: [
      {
        title: "Lame d'air ventilée",
        content: "Pour les toitures non étanches à l'air (tuiles, ardoises), maintenir une lame d'air ventilée d'au moins 2 cm entre l'isolant et la couverture.",
        type: "standard"
      },
      {
        title: "Écran de sous-toiture",
        content: "En rénovation, installer un écran de sous-toiture HPV (Haute Perméabilité à la Vapeur d'eau) en cas d'absence d'écran existant.",
        type: "standard"
      },
      {
        title: "Condensation dans l'isolant",
        content: "Sans pare-vapeur correctement posé, la vapeur d'eau peut condenser dans l'isolant et réduire considérablement ses performances thermiques.",
        type: "warning"
      },
      {
        title: "Spot encastrés",
        content: "Pour les spots encastrés dans l'isolation, utiliser des capots de protection spécifiques pour éviter les risques d'échauffement et d'incendie.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.3 s'applique à l'isolation thermique des combles perdus ou aménagés, par l'intérieur, dans les bâtiments neufs ou existants."
      },
      {
        title: "Choix des techniques",
        content: "Le DTU couvre l'isolation entre et sous chevrons, l'isolation des planchers de combles perdus, et la mise en œuvre de différents types d'isolants (rouleaux, panneaux, vrac)."
      },
      {
        title: "Gestion de l'étanchéité à l'air",
        content: "L'étanchéité à l'air doit être assurée par une membrane continue, avec traitement spécifique des points singuliers : jonctions, passages de conduits, trappes d'accès."
      }
    ]
  }
];
