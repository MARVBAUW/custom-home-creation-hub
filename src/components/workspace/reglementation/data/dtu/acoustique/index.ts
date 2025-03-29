
import { DTU } from '../../../dtu/types';

// DTUs liés à l'acoustique
export const acoustiqueDTUs: DTU[] = [
  {
    id: "dtu-acoustique-1",
    title: "NF EN ISO 16283-1",
    category: "Acoustique",
    description: "Mesurage in situ de l'isolation acoustique des bâtiments et des éléments de construction - Partie 1 : Isolation aux bruits aériens",
    lastUpdate: "2021-05-15",
    rules: [
      {
        title: "Méthode de mesure standardisée",
        content: "La norme définit les méthodes de mesure sur site permettant de caractériser l'isolation acoustique aux bruits aériens des parois intérieures et extérieures.",
        type: "standard"
      },
      {
        title: "Conditions de mesure",
        content: "Les mesures doivent être réalisées dans des bâtiments meublés ou non meublés, avec mention explicite de l'état lors du rapport.",
        type: "standard"
      },
      {
        title: "Indices d'évaluation",
        content: "DnT,w et R'w sont les principaux indices calculés à partir des mesures pour évaluer la performance acoustique.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Champ d'application",
        content: "Cette norme s'applique aux mesures d'isolation aux bruits aériens dans les bâtiments, entre les pièces, et entre l'intérieur et l'extérieur."
      },
      {
        title: "Méthode de mesure par pressions",
        content: "Cette méthode utilise un ou plusieurs microphones fixes pour mesurer les niveaux de pression acoustique moyens dans les locaux d'émission et de réception."
      },
      {
        title: "Méthode d'intensité acoustique",
        content: "Cette méthode complémentaire permet d'identifier les chemins de transmission du bruit et les fuites acoustiques dans les constructions."
      }
    ]
  },
  {
    id: "dtu-acoustique-2",
    title: "NF EN ISO 16283-2",
    category: "Acoustique",
    description: "Mesurage in situ de l'isolation acoustique des bâtiments et des éléments de construction - Partie 2 : Isolation aux bruits de chocs",
    lastUpdate: "2020-09-18",
    rules: [
      {
        title: "Source de bruit normalisée",
        content: "La machine à chocs normalisée doit être utilisée pour générer les bruits d'impact standardisés.",
        type: "standard"
      },
      {
        title: "Positions de mesure",
        content: "Au moins quatre positions de machine à chocs et six positions de microphone sont nécessaires pour une mesure conforme.",
        type: "warning"
      },
      {
        title: "Indice d'évaluation",
        content: "L'nT,w est l'indice principal pour caractériser l'isolation aux bruits de chocs d'un plancher.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Principe général",
        content: "La mesure consiste à générer des bruits de chocs standardisés à l'aide d'une machine à chocs et à mesurer le niveau sonore dans le local de réception."
      },
      {
        title: "Procédure de mesure",
        content: "Les mesures sont effectuées par bandes de tiers d'octave entre 100 Hz et 3150 Hz, avec extension possible entre 50 Hz et 5000 Hz."
      },
      {
        title: "Expression des résultats",
        content: "Les résultats sont exprimés sous forme d'indices uniques, après comparaison avec des courbes de référence standardisées."
      }
    ]
  },
  {
    id: "dtu-acoustique-3",
    title: "NF EN ISO 16283-3",
    category: "Acoustique",
    description: "Mesurage in situ de l'isolation acoustique des bâtiments et des éléments de construction - Partie 3 : Isolation des façades",
    lastUpdate: "2020-11-10",
    rules: [
      {
        title: "Méthodes de mesure autorisées",
        content: "La norme propose deux méthodes principales : avec haut-parleur (méthode générale) ou en utilisant le bruit de trafic (méthode complémentaire).",
        type: "standard"
      },
      {
        title: "Conditions météorologiques",
        content: "Les mesures en façade sont sensibles aux conditions météorologiques. Le vent doit être inférieur à 5 m/s et l'humidité relative inférieure à 90%.",
        type: "warning"
      },
      {
        title: "Indice d'évaluation",
        content: "DnT,A,tr est l'indice utilisé en France pour l'isolation de façade, adapté au bruit de trafic.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Mesure avec haut-parleur",
        content: "Le haut-parleur est placé à l'extérieur, orienté vers la façade avec un angle d'incidence défini, généralement 45°."
      },
      {
        title: "Mesure avec bruit de trafic",
        content: "Cette méthode utilise le bruit de trafic réel comme source sonore, ce qui peut donner des résultats plus représentatifs dans certains cas."
      },
      {
        title: "Calcul des indices globaux",
        content: "Les indices globaux sont calculés par pondération des valeurs par bandes de fréquence selon les spectres acoustiques de référence définis."
      }
    ]
  },
  {
    id: "dtu-acoustique-4",
    title: "NF S 31-080",
    category: "Acoustique",
    description: "Acoustique - Bureaux et espaces associés - Niveaux et critères de performances acoustiques par type d'espace",
    lastUpdate: "2022-02-01",
    rules: [
      {
        title: "Niveaux de performance",
        content: "La norme définit trois niveaux de performance acoustique : courant, performant et très performant, selon les exigences des utilisateurs.",
        type: "standard"
      },
      {
        title: "Critères d'évaluation",
        content: "Cinq critères sont pris en compte : isolement aux bruits aériens, niveau de bruit de choc, bruit des équipements, aire d'absorption et décroissance spatiale.",
        type: "standard"
      },
      {
        title: "Open spaces",
        content: "La décroissance spatiale du niveau sonore par doublement de distance (D2,S) est un critère crucial pour les open spaces, devant être d'au moins 3 dB.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Classification des espaces",
        content: "Les espaces sont classés selon leur sensibilité : bureaux individuels, collectifs, salles de réunion, espaces ouverts, etc."
      },
      {
        title: "Exigences par type d'espace",
        content: "Des exigences spécifiques sont définies pour chaque type d'espace et chaque niveau de performance, avec des valeurs cibles pour chaque critère."
      },
      {
        title: "Intelligibilité de la parole",
        content: "Pour les espaces de communication, des critères d'intelligibilité de la parole sont définis à travers le STI (Speech Transmission Index)."
      }
    ]
  }
];

// Ajout des DTUs acoustiques à l'index principal
export default acoustiqueDTUs;
