
import { DTU } from '../../dtu/types';

export const accessibiliteDTUs: DTU[] = [
  {
    id: "dtu-accessibilite-erp-1",
    title: "Accessibilité des ERP neufs",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des établissements recevant du public lors de leur construction",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Cheminements extérieurs",
        content: "Largeur minimale 1,40 m libre de tout obstacle. Pente ≤ 5%, dévers ≤ 2%. Palier de repos tous les 10 m pour les pentes ≥ 4%",
        type: "standard"
      },
      {
        title: "Ressauts",
        content: "Hauteur maximale 2 cm, ou 4 cm si chanfrein à 1/3. Distance minimale entre deux ressauts : 2,50 m",
        type: "warning"
      },
      {
        title: "Portes d'entrée",
        content: "Largeur minimale 0,90 m (largeur de passage utile 0,83 m). Espace de manœuvre de porte : 1,70 m × 1,40 m devant chaque porte",
        type: "standard"
      },
      {
        title: "Sanitaires",
        content: "Au moins un sanitaire accessible par niveau. Espace d'usage 0,80 m × 1,30 m latéral à la cuvette. Barre d'appui entre 0,70 m et 0,80 m du sol",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Stationnement",
        content: "2% des places accessibles (minimum 1 place). Places de 3,30 m de large minimum. Raccordées par un cheminement accessible jusqu'à l'entrée."
      },
      {
        title: "Accueil et circulations intérieures",
        content: "Largeur minimale des circulations 1,40 m. Points d'accueil avec partie abaissée à 0,80 m max. Revêtement non meuble, non glissant, non réfléchissant et sans obstacle."
      },
      {
        title: "Dispositifs de commande",
        content: "Situés entre 0,90 m et 1,30 m du sol. Repérage visuel et tactile des interrupteurs. Espace d'usage de 0,80 m × 1,30 m devant chaque équipement."
      }
    ]
  },
  {
    id: "dtu-accessibilite-erp-2",
    title: "Accessibilité des ERP existants",
    category: "Accessibilité",
    description: "Dispositions relatives à la mise en accessibilité des établissements recevant du public existants",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Dérogations possibles",
        content: "Possibilité de dérogation pour impossibilité technique, contraintes liées à la conservation du patrimoine, disproportion manifeste entre améliorations et conséquences",
        type: "standard"
      },
      {
        title: "Ad'AP",
        content: "Agenda d'Accessibilité Programmée obligatoire pour étaler les travaux sur 3, 6 ou 9 ans selon le patrimoine. Sanctions en cas de non-respect",
        type: "warning"
      },
      {
        title: "Ascenseurs",
        content: "Obligatoire si effectif > 50 personnes en étages ou si prestations non disponibles au RDC. Cabine 1,10 m × 1,40 m minimum",
        type: "standard"
      },
      {
        title: "Mesures de substitution",
        content: "En cas d'impossibilité technique avérée, mise en place d'une prestation de substitution (aide humaine, visioguichet, etc.)",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Registre d'accessibilité",
        content: "Document obligatoire consultable par le public, regroupant informations et prestations pour personnes handicapées : descriptif des locaux, attestations, formation du personnel."
      },
      {
        title: "Signalétique",
        content: "Visuelle contrastée (70% min.), tactile en relief et en braille pour les principaux locaux et équipements. Hauteur des caractères proportionnelle à la distance de lecture."
      },
      {
        title: "Types de handicap",
        content: "Prise en compte des 4 familles de handicap : moteur, visuel, auditif et mental, avec solutions adaptées pour chacune (bandes de guidage, boucle magnétique, etc.)."
      }
    ]
  },
  {
    id: "dtu-accessibilite-logement-1",
    title: "Accessibilité des logements collectifs neufs",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des bâtiments d'habitation collectifs et de leurs abords",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Caractéristiques de base",
        content: "Tous les logements doivent être évolutifs : adaptation possible par travaux simples. Unité de vie en RDC ou étage desservi par ascenseur",
        type: "standard"
      },
      {
        title: "Dimensionnement",
        content: "Cercle de rotation Ø 1,50 m dans cuisine, séjour, 1 chambre, WC et salle d'eau. Passage libre des portes : 0,90 m (0,83 m utile)",
        type: "standard"
      },
      {
        title: "Ascenseurs",
        content: "Obligatoires pour les bâtiments > R+3 ou si plus de 15 logements en étages. Cabine 1,00 × 1,30 m minimum",
        type: "warning"
      },
      {
        title: "Salle d'eau",
        content: "Espace d'usage 0,80 × 1,30 m latéral à la douche ou baignoire. Ressaut du bac de douche ≤ 2 cm",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Cheminements extérieurs",
        content: "Largeur minimale 1,20 m, pente ≤ 5%. Revêtement non meuble, non glissant, contrasté par rapport à l'environnement."
      },
      {
        title: "Commandes et équipements",
        content: "Prises, interrupteurs, équipements entre 0,90 m et 1,30 m du sol. Système d'arrêt d'urgence du chauffage et ventilation accessible."
      },
      {
        title: "Balcons et terrasses",
        content: "Accessibles depuis les pièces de vie par un passage ≥ 0,80 m. Seuil ≤ 2 cm. Garde-corps permettant la visibilité en position assise."
      }
    ]
  },
  {
    id: "dtu-accessibilite-logement-2",
    title: "Accessibilité des maisons individuelles neuves",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des maisons individuelles neuves",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Champ d'application",
        content: "Applicable aux maisons individuelles construites pour être louées, mises à disposition ou vendues. Non applicable aux propriétaires construisant pour eux-mêmes",
        type: "standard"
      },
      {
        title: "Accès au logement",
        content: "Au moins un accès depuis l'extérieur doit être accessible, avec une largeur minimale de 0,90 m",
        type: "standard"
      },
      {
        title: "Unité de vie",
        content: "Cuisine, séjour, chambre, WC et salle d'eau en RDC ou accessibles par un niveau desservi par ascenseur/élévateur",
        type: "warning"
      },
      {
        title: "Escaliers",
        content: "Si logement sur plusieurs niveaux, escalier adapté avec mains courantes et contremarches visuellement contrastées",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Circulations intérieures",
        content: "Largeur minimale des circulations 0,90 m. Absence de ressauts et obstacles à la roue. Revêtements non glissants."
      },
      {
        title: "Équipements électriques",
        content: "Dispositifs de commande entre 0,90 m et 1,30 m du sol. Prise et interrupteur par pièce à cette hauteur. Protection des circuits conforme à la NF C 15-100."
      },
      {
        title: "Adaptabilité",
        content: "Conception permettant ultérieurement et à moindre coût l'installation d'un appareil élévateur ou l'aménagement d'une salle d'eau accessible."
      }
    ]
  }
];
