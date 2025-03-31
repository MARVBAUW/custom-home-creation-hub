
import { DTU } from '../../dtu/types';

export const ratingClassificationsDTUs: DTU[] = [
  {
    id: "dtu-ratings-1",
    title: "Classification UPEC des revêtements de sol",
    category: "Classifications",
    description: "Système d'évaluation des performances des revêtements de sol",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "U - Usure",
        content: "Résistance à l'usure par abrasion et trafic. U2 (usage domestique modéré), U3 (usage domestique intensif ou commercial modéré), U4 (usage commercial intense).",
        type: "standard"
      },
      {
        title: "P - Poinçonnement",
        content: "Résistance aux charges fixes et mobiles. P2 (mobilier domestique et usage pieds nus), P3 (trafic fréquent, charges légères), P4 (trafic intense, charges lourdes).",
        type: "standard"
      },
      {
        title: "E - Eau",
        content: "Résistance à l'eau et à l'humidité. E1 (entretien occasionnel à la serpillière), E2 (entretien humide fréquent), E3 (présence d'eau fréquente).",
        type: "standard"
      },
      {
        title: "C - Produits Chimiques",
        content: "Résistance aux agents chimiques et taches. C0 (aucune exigence), C1 (résistance aux produits ménagers), C2 (résistance aux produits spécifiques).",
        type: "standard"
      },
      {
        title: "Applications",
        content: "Cuisine/SDB: minimum U3P2E2C1. Séjour/Chambre: minimum U2P2E1C0. Commerce: minimum U3P3E1C2. Industrie: U4P4E3C2.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Sélection d'un revêtement",
        content: "Le classement d'un local définit le niveau d'exigence UPEC minimum. Le revêtement choisi doit avoir un classement supérieur ou égal à celui exigé pour le local. Exemple: pour un local classé U3P2E1C0, on peut choisir un revêtement classé U3P3E2C1."
      },
      {
        title: "Carreaux céramiques",
        content: "Classés selon norme EN 14411. L'indice UPEC prend en compte la nature du carreau et le système de pose. La classe PEI (Porcelain Enamel Institute) complète souvent le classement pour l'abrasion des surfaces émaillées."
      },
      {
        title: "Revêtements PVC",
        content: "Classement selon EN ISO 10582 et 10581. Peuvent atteindre des valeurs élevées (U4P4) pour les produits homogènes épais ou à couche d'usure renforcée. PVC hétérogènes: performances variables selon couche d'usure."
      }
    ],
    schemas: [
      {
        id: "schema-upec-1",
        title: "Classification UPEC des locaux",
        imageUrl: "/images/schemas/classification-upec.png",
        description: "Tableau des classements UPEC recommandés pour différents types de locaux."
      }
    ]
  },
  {
    id: "dtu-ratings-2",
    title: "Classification AEV des menuiseries",
    category: "Classifications",
    description: "Classement des performances des fenêtres et portes-fenêtres",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "A - Perméabilité à l'air",
        content: "A*1 (standard), A*2 (amélioré), A*3 (renforcé), A*4 (exceptionnel). Le classement A*4 est le plus performant, obligatoire en BBC et passif.",
        type: "standard"
      },
      {
        title: "E - Étanchéité à l'eau",
        content: "E*1A à E*9A (pression croissante sans ruissellement) ou E*1B à E*7B (avec ruissellement). Zone exposée: minimum E*5A recommandé.",
        type: "standard"
      },
      {
        title: "V - Résistance au vent",
        content: "V*A1 à V*A5 (déformation sous vent) et V*1 à V*3 (résistance). Zones côtières ou bâtiments élevés: minimum V*A3V*2 recommandé.",
        type: "warning"
      },
      {
        title: "Sélection selon zone",
        content: "Zone littorale ou montagne > 900m: minimum A*3E*7BV*A3. Zone urbaine: minimum A*3E*5BV*A2. Zone rurale: minimum A*2E*4BV*A2.",
        type: "tip"
      },
      {
        title: "RT2012 et RE2020",
        content: "Perméabilité à l'air renforcée: A*4 recommandé pour respecter les performances énergétiques réglementaires.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Tests de classement",
        content: "Tests normalisés selon EN 12207 (air), EN 12208 (eau), EN 12210 (vent). Réalisés par des laboratoires accrédités. Le classement est valable pour un type de menuiserie, pas pour un fabricant."
      },
      {
        title: "Influence sur les performances thermiques",
        content: "La perméabilité à l'air A* impacte directement les déperditions énergétiques. Une menuiserie A*4 permet de réduire significativement les infiltrations d'air et d'améliorer le Uw (coefficient de transmission thermique)."
      },
      {
        title: "Certification et documentation",
        content: "Les menuiseries doivent être accompagnées d'un certificat de classement AEV. Le marquage CE et les DoP (Déclarations de Performances) indiquent également ces performances."
      }
    ],
    schemas: [
      {
        id: "schema-aev-1",
        title: "Classification AEV des fenêtres",
        imageUrl: "/images/schemas/classification-aev.png",
        description: "Schéma explicatif des différents niveaux de classement AEV et leurs applications selon les zones géographiques."
      }
    ]
  },
  {
    id: "dtu-ratings-3",
    title: "Classification REVETIR des façades",
    category: "Classifications",
    description: "Classement des systèmes d'isolation thermique extérieure par enduit",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "R - Résistance aux chocs",
        content: "R1 (chocs faibles, zone inaccessible), R2 (chocs moyens, < 2m du sol, zone privée), R3 (chocs forts, zone publique), R4 (chocs très forts, zone exposée).",
        type: "standard"
      },
      {
        title: "E - Étanchéité à l'eau",
        content: "E1 à E5 (croissant). E5 obligatoire pour zones très exposées. E1/E2: façades protégées. E3/E4: façades normalement exposées.",
        type: "standard"
      },
      {
        title: "V - Résistance à la vapeur d'eau",
        content: "V1 (très perméable, Sd < 0,10m), V2 (perméable, Sd 0,10 à 0,40m), V3 (moyennement perméable, Sd 0,40 à 1,4m), V4 (peu perméable, Sd > 1,4m).",
        type: "standard"
      },
      {
        title: "E - Résistance aux mouvements",
        content: "T1 (résistance limitée), T2 (résistance normale), T3 (résistance améliorée aux mouvements du support), T4 (haute résistance).",
        type: "standard"
      },
      {
        title: "I - Résistance aux intempéries",
        content: "I1 (normal), I2 (amélioré), I3 (fort), I4 (très fort). Impact sur le vieillissement et la durabilité de l'aspect.",
        type: "standard"
      },
      {
        title: "R - Réparation et entretien",
        content: "r1 (difficile), r2 (moyenne), r3 (facile). Facilité d'entretien et de réparation des dégradations localisées.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Choix selon exposition",
        content: "Façades en zones urbaines exposées: minimum R3E4V2T3I3r2. Façades courantes en résidentiel: minimum R2E3V2T2I2r2. Façades protégées: minimum R1E2V1T1I1r1."
      },
      {
        title: "Impact sur l'aspect",
        content: "Le classement I influence la résistance à l'encrassement et aux salissures. I3 et I4 sont recommandés pour les zones polluées, littorales ou très exposées aux intempéries."
      },
      {
        title: "Certification et garantie",
        content: "Les systèmes ITE sous enduit doivent être posés par des entreprises qualifiées. La certification QB ETICS du CSTB valide les performances REVETIR des systèmes complets."
      }
    ],
    schemas: [
      {
        id: "schema-revetir-1",
        title: "Classification REVETIR",
        imageUrl: "/images/schemas/classification-revetir.png",
        description: "Tableau explicatif des différents critères du classement REVETIR pour les systèmes d'ITE sous enduit."
      }
    ]
  },
  {
    id: "dtu-ratings-4",
    title: "Classification des bétons selon NF EN 206/CN",
    category: "Classifications",
    description: "Désignation normalisée des bétons selon leur destination et performances",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Classes d'exposition",
        content: "X0 (aucun risque), XC (carbonatation), XD (chlorures autres que mer), XS (chlorures marins), XF (gel/dégel), XA (attaques chimiques).",
        type: "standard"
      },
      {
        title: "Classes de résistance",
        content: "C16/20 à C100/115 pour béton normal. Premier chiffre = résistance cylindrique (MPa), second = résistance cubique (MPa).",
        type: "standard"
      },
      {
        title: "Classes de consistance",
        content: "S1 (ferme: affaissement 10-40mm), S2 (plastique: 50-90mm), S3 (très plastique: 100-150mm), S4 (fluide: 160-210mm), S5 (très fluide: >220mm).",
        type: "standard"
      },
      {
        title: "Dimension maximale des granulats",
        content: "Dmax en mm. Typiquement 10, 16, 20 ou 22,4mm selon application. Doit être compatible avec l'enrobage des armatures.",
        type: "standard"
      },
      {
        title: "Classes de chlorures",
        content: "Cl 0,20 (béton armé standard), Cl 0,40 (béton non armé), Cl 0,10 (béton précontraint). Teneur maximale en chlorures (%).",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Exemple de désignation",
        content: "BPS NF EN 206/CN C25/30 XC1 (F) Cl0,40 Dmax16 S3. Signifie: béton à propriétés spécifiées selon norme, résistance 25/30 MPa, pour environnement intérieur sec, chlorures ≤0,40%, granulats max 16mm, consistance très plastique."
      },
      {
        title: "Exigences selon ouvrages",
        content: "Fondations courantes: min C25/30 XC2 S3. Dallages industriels: min C30/37 XC4 XF1 S3. Ouvrages maritimes: min C35/45 XS3 S3. Ouvrages d'art: min C35/45 XF2 à XF4 selon exposition."
      },
      {
        title: "Contrôles et conformité",
        content: "Résistance vérifiée par essais à 28 jours. Consistance contrôlée au cône d'Abrams. Certification NF-BPE pour les centrales de production. Traçabilité obligatoire par bons de livraison."
      }
    ],
    schemas: [
      {
        id: "schema-betons-1",
        title: "Classes d'exposition des bétons",
        imageUrl: "/images/schemas/classification-beton.png",
        description: "Tableau des classes d'exposition des bétons selon NF EN 206/CN et leurs domaines d'application."
      }
    ]
  }
];
