
import { DTU } from '../../dtu/types';

export const eurocodeDTUs: DTU[] = [
  {
    id: "eurocode-1",
    title: "Eurocode 1 - Actions sur les structures",
    category: "Eurocode",
    description: "Règles pour le calcul des actions à considérer lors de la conception des bâtiments et ouvrages d'art",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Parties de l'Eurocode 1",
        content: "EC1-1-1: Poids volumiques, poids propres, charges d'exploitation; EC1-1-2: Actions sur les structures exposées au feu; EC1-1-3: Charges de neige; EC1-1-4: Actions du vent; EC1-1-5: Actions thermiques; EC1-1-6: Actions en cours d'exécution; EC1-1-7: Actions accidentelles.",
        type: "standard"
      },
      {
        title: "Charges d'exploitation",
        content: "Les charges d'exploitation varient selon la catégorie d'usage: catégorie A (habitation): 1,5 à 2,0 kN/m²; catégorie B (bureaux): 2,0 à 3,0 kN/m²; catégorie C (lieux de réunion): 3,0 à 5,0 kN/m².",
        type: "warning"
      },
      {
        title: "Combinaisons d'actions",
        content: "ELU: 1,35Gk + 1,5Qk (combinaison fondamentale); ELS: Gk + Qk (combinaison caractéristique); Gk + ψ2Qk (combinaison quasi-permanente).",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Charges de neige",
        content: "La charge de neige dépend de la zone (A à D en France), de l'altitude et de la forme de la toiture. Pour une toiture à deux versants avec α = 30°, la charge est réduite de 20% par rapport à une toiture plate."
      },
      {
        title: "Actions du vent",
        content: "La pression dynamique de pointe dépend de la catégorie de terrain (0 à IV), de la hauteur du bâtiment et de la zone de vent (1 à 4 en France). Les coefficients de pression extérieure varient selon la forme du bâtiment."
      }
    ]
  },
  {
    id: "eurocode-2",
    title: "Eurocode 2 - Calcul des structures en béton",
    category: "Eurocode",
    description: "Règles pour le calcul des structures en béton armé et précontraint",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Matériaux",
        content: "Béton: classes de C12/15 à C90/105; Acier: classes B500A, B500B et B500C avec fyk = 500 MPa.",
        type: "standard"
      },
      {
        title: "Enrobage minimal",
        content: "Varie selon la classe d'exposition: XC1 (intérieur sec): 10mm + Δcdev; XC4 (extérieur exposé aux intempéries): 25mm + Δcdev; XS3 (zone de marnage): 45mm + Δcdev.",
        type: "warning"
      },
      {
        title: "Flèches admissibles",
        content: "L/250 sous charges quasi-permanentes pour l'aspect; L/500 pour les éléments supportant des cloisons fragiles.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Ferraillage minimal",
        content: "As,min = 0,26 × (fctm/fyk) × bt × d mais jamais moins que 0,0013 × bt × d pour les poutres; As,min = 0,002 × Ac pour les poteaux."
      },
      {
        title: "Méthode de calcul en flexion",
        content: "Diagramme de contraintes rectangulaire simplifié: σc = 0,85 × fcd pour x ≤ 0,8 × xumax où xumax = 0,45d pour les bétons C50/60 ou inférieurs."
      }
    ]
  },
  {
    id: "eurocode-3",
    title: "Eurocode 3 - Calcul des structures en acier",
    category: "Eurocode",
    description: "Règles pour le calcul des structures en acier",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Classification des sections",
        content: "Classe 1: peuvent former une rotule plastique; Classe 2: peuvent atteindre le moment plastique; Classe 3: calcul élastique avec contrainte maximale fy; Classe 4: voilement local avant plastification.",
        type: "standard"
      },
      {
        title: "Résistance des sections",
        content: "Traction: Nt,Rd = A × fy / γM0; Compression: Nc,Rd = A × fy / γM0 (classes 1, 2, 3); Flexion: Mc,Rd = Wpl × fy / γM0 (classes 1, 2).",
        type: "standard"
      },
      {
        title: "Résistance au flambement",
        content: "Nb,Rd = χ × A × fy / γM1 où χ est le facteur de réduction pour le mode de flambement approprié, dépendant de l'élancement réduit λ̄.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Assemblages",
        content: "Les assemblages peuvent être classés comme rigides, semi-rigides ou articulés selon leur rigidité en rotation. La résistance des boulons en cisaillement est Fv,Rd = 0,6 × fub × A / γM2."
      },
      {
        title: "Stabilité des poutres",
        content: "Le déversement des poutres est évalué par la méthode du facteur de réduction χLT. Pour les profilés laminés en I ou H: χLT = 1 / (φLT + √(φLT² - λ̄LT²)) avec φLT = 0,5 × [1 + αLT(λ̄LT - 0,2) + λ̄LT²]."
      }
    ]
  }
];
