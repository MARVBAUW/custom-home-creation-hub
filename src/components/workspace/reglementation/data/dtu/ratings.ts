
import { DTU } from '../../dtu/types';

export const ratingClassificationsDTUs: DTU[] = [
  {
    id: "classification-upec-1",
    title: "Classification UPEC des revêtements de sol",
    category: "Classifications UPEC",
    description: "Système de classification des revêtements de sol selon leurs performances d'usage",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Signification",
        content: "U: Usure à la marche; P: Poinçonnement; E: Comportement à l'eau et à l'humidité; C: Résistance aux agents chimiques et taches.",
        type: "standard"
      },
      {
        title: "Indices",
        content: "Chaque lettre est suivie d'un indice de 1 à 4 (parfois avec un '+'), indiquant le niveau croissant de performance. Ex: U4P3E2C2.",
        type: "standard"
      },
      {
        title: "Locaux classés",
        content: "Les locaux sont eux-mêmes classés selon leur niveau d'exigence. Le revêtement choisi doit avoir des indices UPEC ≥ à ceux du local.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Classification des locaux",
        content: "Chambres/séjours individuels: U2P2E1C0; Cuisines individuelles: U3P2E2C2; Couloirs circulation collective: U4P3E2C1; Commerces/bureaux: U3P3E1C2 à U4P3E2C2."
      },
      {
        title: "Exemples de revêtements",
        content: "Carrelage grès cérame: U4P4E3C2; Moquette: U2P2E1C0 à U3P2E1C0; PVC sur mousse: U2P2E2C1 à U3P3E2C2; Parquet: U2/3P2/3E1C0 selon essence et finition."
      },
      {
        title: "Certification",
        content: "Les caractéristiques UPEC sont certifiées par le CSTB et font l'objet d'un certificat. Tous les revêtements de sol ne disposent pas nécessairement d'un classement UPEC."
      }
    ]
  },
  {
    id: "classification-aev-1",
    title: "Classification AEV des fenêtres",
    category: "Classifications AEV",
    description: "Système de classification des fenêtres selon leur étanchéité à l'air, à l'eau et leur résistance au vent",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Perméabilité à l'Air (A)",
        content: "De A*1 (basique) à A*4 (excellente). A*4: débit de fuite inférieur à 3 m³/h/m² sous 100 Pa.",
        type: "standard"
      },
      {
        title: "Étanchéité à l'Eau (E)",
        content: "De E*1A (basique) à E*9A (excellente). Ex: E*5A: étanche jusqu'à 200 Pa, E*7A: étanche jusqu'à 300 Pa.",
        type: "standard"
      },
      {
        title: "Résistance au Vent (V)",
        content: "Pression d'essai: de V*1 (400 Pa) à V*5 (2000 Pa). Flèche du cadre: de A (≤1/150) à C (≤1/300).",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Classification minimale selon exposition",
        content: "Bâtiment protégé, hauteur ≤ 6m: A*2 E*4B V*A2; Bâtiment exposé, hauteur 10-18m: A*3 E*5B V*A2; Bâtiment très exposé, hauteur > 18m: A*4 E*7B V*A3."
      },
      {
        title: "Tests et certification",
        content: "Les essais AEV sont réalisés selon les normes européennes EN 1026, EN 1027 et EN 12211. Les résultats sont certifiés par des organismes comme le CSTB (certification NF)."
      },
      {
        title: "Impact sur la performance énergétique",
        content: "Une fenêtre A*4 peut réduire les pertes de chaleur dues aux infiltrations d'air jusqu'à 80% par rapport à une fenêtre A*1. L'étanchéité à l'air contribue significativement à la performance thermique globale."
      }
    ]
  },
  {
    id: "classification-revetir-1",
    title: "Classification REVETIR des façades",
    category: "Classifications REVETIR",
    description: "Système de classification des enduits et revêtements de façades selon leurs performances techniques",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Signification",
        content: "R: Réparation des supports; E: Étanchéité à l'eau; V: Résistance au vieillissement; E: Stabilité aux états thermiques; T: Résistance aux chocs thermiques; I: Isolation thermique; R: Résistance aux chocs mécaniques.",
        type: "standard"
      },
      {
        title: "Notation",
        content: "Chaque critère est évalué de 1 à 5, du niveau le plus faible au plus performant. Ex: R3E5V2E4T3I2R4.",
        type: "standard"
      },
      {
        title: "Application",
        content: "Ce classement permet de choisir un système de façade adapté aux contraintes spécifiques du bâtiment: exposition, sollicitations mécaniques, exigences thermiques, etc.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Critères d'évaluation détaillés",
        content: "R1-R5: capacité à masquer les fissures de 0,2 mm à 2 mm; E1-E5: perméabilité à l'eau de 0,5 kg/m² à 0,1 kg/m²; V1-V5: résistance aux UV et intempéries; E1-E5: comportement aux chocs thermiques; T1-T5: comportement aux cycles gel/dégel; I1-I5: résistance thermique; R1-R5: résistance aux chocs de 3 à 50 joules."
      },
      {
        title: "Exigences selon l'exposition",
        content: "Façade protégée en zone calme: E2V2T2R2; Façade exposée en zone urbaine: E4V3T3R3; Façade très exposée (bord de mer): E5V4T4R4; Soubassements accessibles: R4 minimum."
      },
      {
        title: "Cas des ETICS",
        content: "Pour les systèmes d'isolation thermique par l'extérieur (ETICS), la classification REVETIR prend en compte l'ensemble du système (isolant + enduit). Le critère I est particulièrement important et varie selon l'épaisseur et la nature de l'isolant."
      }
    ]
  },
  {
    id: "classification-feu-1",
    title: "Euroclasses de réaction au feu",
    category: "Classifications Feu",
    description: "Classification européenne des produits de construction selon leur comportement au feu",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Classes principales",
        content: "A1, A2: Incombustibles; B: Très difficilement inflammables; C: Difficilement inflammables; D: Moyennement inflammables; E: Facilement inflammables; F: Non classés ou très inflammables.",
        type: "warning"
      },
      {
        title: "Sous-classifications",
        content: "s1, s2, s3: Production de fumée (smoke) de faible à forte; d0, d1, d2: Gouttelettes/débris enflammés (droplets) de aucun à nombreux.",
        type: "standard"
      },
      {
        title: "Correspondance M/Euroclasses",
        content: "M0 ≈ A1, A2-s1,d0; M1 ≈ B-s3,d1; M2 ≈ C-s3,d1; M3 ≈ D-s3,d1; M4 ≈ E, E-d2; NC ≈ F.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Exigences réglementaires",
        content: "ERP (établissements recevant du public): Plafonds: B-s3,d0 ou C-s3,d0 selon local; Murs: B-s2,d0 à D-s2,d0; Sols: Dfl-s1 à Cfl-s1. Habitations: Façades: B-s3,d0 à D-s3,d0 selon hauteur; Cages d'escalier: A2-s1,d0 à C-s3,d0."
      },
      {
        title: "Tests de classement",
        content: "SBI (Single Burning Item) pour classes B à D; Test d'incombustibilité pour A1 et A2; Small flame test pour classe E; Essai au four radiateur pour les sols (classes Afl à Ffl)."
      },
      {
        title: "Documentation et preuve",
        content: "Le classement au feu doit être attesté par un PV (procès-verbal) d'essai ou un rapport de classement émis par un laboratoire accrédité. Pour les produits standardisés, le DoP (Declaration of Performance) mentionne l'Euroclasse."
      }
    ]
  }
];
