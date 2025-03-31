
import { DTU } from '../../dtu/types';

export const dtuDTUs: DTU[] = [
  {
    id: "dtu-general-1",
    title: "DTU 20.1 - Ouvrages en maçonnerie de petits éléments",
    category: "DTU Maçonnerie",
    description: "Règles de mise en œuvre des ouvrages en maçonnerie de petits éléments (blocs, briques, etc.)",
    lastUpdate: "Octobre 2020",
    rules: [
      {
        title: "Domaine d'application",
        content: "Ce DTU s'applique aux murs en maçonnerie de petits éléments (briques, blocs de béton, etc.) pour les bâtiments courants.",
        type: "standard"
      },
      {
        title: "Matériaux",
        content: "Les éléments de maçonnerie doivent être conformes aux normes NF EN 771. Les mortiers doivent être conformes à la norme NF EN 998-2.",
        type: "standard"
      },
      {
        title: "Mise en œuvre",
        content: "L'appareillage doit respecter un recouvrement d'au moins 1/3 de la longueur des éléments. Les joints ont une épaisseur régulière de 10 mm (+/- 5 mm).",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Règles générales d'exécution",
        content: "Les murs doivent être montés d'aplomb, avec une tolérance de 1 cm pour 3 m de hauteur. Les joints horizontaux sont continus sur toute la longueur du mur."
      },
      {
        title: "Protection contre l'humidité",
        content: "Une coupure de capillarité doit être disposée à la base des murs extérieurs et des murs de refend. Les ouvrages doivent être protégés de la pluie pendant l'exécution."
      }
    ]
  },
  {
    id: "dtu-general-2",
    title: "DTU 13.3 - Dallages - Conception, calcul et exécution",
    category: "DTU Gros Œuvre",
    description: "Règles pour la conception, le calcul et l'exécution des dallages en béton armé ou non armé",
    lastUpdate: "Mars 2021",
    rules: [
      {
        title: "Domaine d'application",
        content: "Ce DTU concerne les dallages en béton armé ou non armé, désolidarisés ou non, avec ou sans couche d'usure.",
        type: "standard"
      },
      {
        title: "Classification des dallages",
        content: "Les dallages sont classés selon leur destination: industriels, commerciaux, ou pour bâtiments d'habitation collective et tertiaires.",
        type: "standard"
      },
      {
        title: "Couche de forme",
        content: "Une couche de forme est obligatoire sous le dallage. Son épaisseur minimale est de 20 cm après compactage.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Conception",
        content: "Le dimensionnement du dallage doit prendre en compte la nature du sol, les charges d'exploitation, et les charges permanentes."
      },
      {
        title: "Joints",
        content: "Des joints de retrait, de construction et de dilatation doivent être prévus. Les joints de retrait forment des panneaux de surface ≤ 25 m² pour les dallages non armés."
      }
    ]
  },
  {
    id: "dtu-general-3",
    title: "DTU 43.1 - Étanchéité des toitures-terrasses",
    category: "DTU Étanchéité",
    description: "Travaux d'étanchéité des toitures-terrasses avec éléments porteurs en maçonnerie",
    lastUpdate: "Juin 2022",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale est de 1% pour les éléments porteurs en maçonnerie. Une pente nulle est tolérée dans certains cas particuliers.",
        type: "warning"
      },
      {
        title: "Isolation thermique",
        content: "L'isolant thermique doit être compatible avec le revêtement d'étanchéité et adapté à la destination de la toiture.",
        type: "standard"
      },
      {
        title: "Relevés d'étanchéité",
        content: "La hauteur minimale des relevés est de 15 cm au-dessus de la protection de l'étanchéité.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Support d'étanchéité",
        content: "Le support doit être propre, sec, et présenter une surface plane avec des tolérances de 10 mm sous la règle de 2 m et 3 mm sous la règle de 20 cm."
      },
      {
        title: "Protection de l'étanchéité",
        content: "La protection peut être meuble (gravillons), dure (dalles), ou par autoprotection (membrane autoprotégée). Le choix dépend de l'accessibilité de la toiture."
      }
    ]
  }
];
