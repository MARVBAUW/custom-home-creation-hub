
import { DTU } from '../../../dtu/types';
import { erpDTUs } from './erp';
import { logementDTUs } from './logement';
import { parkingDTUs } from './parking';
import { buildingClassificationsDTUs } from './building-classifications';
import { desenfumageDTUs } from './desenfumage';
import { incendieSystemsDTUs } from './systems';

// Exporter tous les DTUs incendie combinés
export const incendieDTUs: DTU[] = [
  {
    id: "dtu-incendie-1",
    title: "Sécurité incendie des ERP",
    category: "Incendie",
    description: "Réglementation incendie applicable aux Établissements Recevant du Public",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Classement des ERP",
        content: "5 catégories selon l'effectif: 1ère (>1500 pers.), 2ème (701-1500), 3ème (301-700), 4ème (≤300 sauf 5ème), 5ème (effectifs sous seuils spécifiques par type)",
        type: "standard"
      },
      {
        title: "Résistance et réaction au feu",
        content: "Structures SF 1h à 1h30 selon catégorie. Revêtements sols M4, murs et plafonds M2 (ou B-s2,d0). Paroi séparatrice entre locaux à sommeil: CF 1h.",
        type: "standard"
      },
      {
        title: "Dégagements",
        content: "Largeur des dégagements: 1 UP = 0,60 m (passage 1 personne). Effectif ≤50: 1 sortie (0,90 m). Escaliers: 1 UP par 100 personnes (<200) puis 1 UP par 50.",
        type: "warning"
      },
      {
        title: "Distance maximale",
        content: "Distance maximale à parcourir pour atteindre une sortie: 50 m si choix entre plusieurs sorties, 30 m en cul-de-sac ou 20 m pour locaux à sommeil.",
        type: "tip"
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour locaux >300 m² ou en sous-sol, circulations >5 m de long et zones sans vision directe. Surface utile ≥1/200 de la surface à désenfumer.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types d'établissements",
        content: "Classés par type d'activité (lettres): J (structures d'accueil personnes âgées/handicapées), L (salles spectacle), M (magasins), N (restaurants), O (hôtels), R (enseignement), etc."
      },
      {
        title: "Éclairage de sécurité",
        content: "Deux types: évacuation (balisage des cheminements) et ambiance (éviter panique). BAES autonomie 1h, avec télécommande de mise au repos et test périodique mensuel."
      },
      {
        title: "Moyens de secours",
        content: "Extincteurs: 1 pour 200 m² (minimum 1 par niveau), RIA selon type et catégorie, SSI (A à E) avec détection automatique obligatoire pour sommeil, alarme type 1 à 4."
      },
      {
        title: "Commission de sécurité",
        content: "Visite obligatoire avant ouverture pour 1ère à 4ème catégorie. Périodicité des visites: 2 ans (1ère), 3 ans (2ème, 3ème avec sommeil), 5 ans (autres)."
      }
    ],
    schemas: [
      {
        id: "schema-incendie-1",
        title: "Compartimentage ERP",
        imageUrl: "/images/schemas/compartimentage-erp.png",
        description: "Principe de compartimentage et de désenfumage dans un ERP avec recoupement des volumes."
      }
    ]
  },
  {
    id: "dtu-incendie-2",
    title: "Sécurité incendie des bâtiments d'habitation",
    category: "Incendie",
    description: "Réglementation incendie applicable aux bâtiments d'habitation",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Classement des bâtiments",
        content: "4 familles: 1ère (individuel ≤R+1), 2ème (collectif ≤R+3), 3ème (R+4 à R+7), 4ème (R+7 à 50m). Puis ITGH si >50m. Z définit le niveau d'accès des échelles.",
        type: "standard"
      },
      {
        title: "Résistance au feu",
        content: "Structures: SF 1/4h (1ère), SF 1/2h (2ème), SF 1h (3ème), SF 1h30 (4ème). Séparatifs logements: CF 1/4h à CF 1h selon famille. Façades: règle C+D.",
        type: "standard"
      },
      {
        title: "Encloisonnement",
        content: "Cage d'escalier encloisonnée obligatoire dès la 2ème famille. Parois CF 1/2h à 1h avec portes PF 1/2h à portes CF 1/2h et ferme-portes selon famille.",
        type: "warning"
      },
      {
        title: "Dégagements",
        content: "Escalier: largeur 0,80 m (1ère et 2ème), 1 UP = 0,90 m (3ème et 4ème). Circulations: largeur 0,90 m (2ème), 1,20 m (3ème et 4ème).",
        type: "tip"
      },
      {
        title: "Désenfumage",
        content: "Circulations horizontales: 1 m² pour 25 m de longueur. Escaliers: 1 m² en partie haute. Commande manuelle à chaque niveau en 3ème et 4ème famille.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Isolement par rapport aux tiers",
        content: "Mur CF 1h à 4h selon nature du tiers, voire CF 6h pour risques particuliers. Isolement vertical 1,20 m CF même degré que plancher, ou protection de la façade par retour."
      },
      {
        title: "Façades et C+D",
        content: "Règle du C+D (C=1m vertical, D=0,6m horizontal): somme C+D ≥ 1m en 2ème et 3ème familles, C+D ≥ 1,3m en 4ème. Masse combustible des façades limitée selon étage."
      },
      {
        title: "Locaux à risques",
        content: "Locaux poubelles, caves, celliers, parking: parois CF 1h, porte CF 1/2h ou PF 1/2h selon cas. Gaines techniques: parois CF 1/4h à 1h selon famille, trappes PF 1/4h ou 1/2h."
      },
      {
        title: "Détection incendie",
        content: "DAAF (Détecteur Autonome Avertisseur de Fumée) obligatoire dans chaque logement. Système de détection généralisé pour certains IGH et 4ème famille."
      }
    ],
    schemas: [
      {
        id: "schema-incendie-2",
        title: "Règle du C+D",
        imageUrl: "/images/schemas/regle-cd.png",
        description: "Illustration de la règle du C+D pour limiter la propagation du feu par les façades entre étages."
      }
    ]
  },
  {
    id: "dtu-incendie-3",
    title: "Systèmes de sécurité incendie",
    category: "Incendie",
    description: "Systèmes de détection, d'alarme et de mise en sécurité incendie",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Catégories de SSI",
        content: "5 catégories: A (SDI+SMSI complet), B (SDI+SMSI partiel), C (SDI+SMSI mise en sécurité manuelle), D et E (sans SDI, fonctions limitées).",
        type: "standard"
      },
      {
        title: "Niveaux d'alarme",
        content: "4 types: 1 (générale, SDI, temporisation possible), 2a/b (générale, déclencheur manuel), 3 (générale, sans surveillance), 4 (limité 1 bâtiment).",
        type: "standard"
      },
      {
        title: "Détection automatique",
        content: "Obligatoire en ERP avec sommeil, en IGH, et locaux à risques spécifiques. Détecteurs distants de 0,5 m des obstacles et couvrant max 80 m².",
        type: "warning"
      },
      {
        title: "Câbles électriques",
        content: "CR1-C1 obligatoire pour fonctions de sécurité maintenues en marche pendant l'incendie: désenfumage, compartimentage, balisage, alarme.",
        type: "tip"
      },
      {
        title: "Alimentation",
        content: "Alimentation électrique de sécurité (AES) obligatoire. Autonomie: 12h pour veille + 1h en alarme en SSI A, 4h + 1h en SSI B à E.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Zones de détection",
        content: "Division en zones de max 600 m² par niveau, correspondant si possible aux zones de mise en sécurité. Min 2 détecteurs par zone. Indicateurs d'action hors locaux fermés."
      },
      {
        title: "Compartimentage",
        content: "Portes coupe-feu à fermeture automatique ou DAS (Dispositif Actionné de Sécurité) asservi au SSI, avec ordre de fermeture prioritaire sur autres fonctions."
      },
      {
        title: "Désenfumage",
        content: "Manuel (4 et 3) ou automatique (1 à 3), par exutoires ou ventilateurs. Commandes au CMSI, avec réarmement manuel obligatoire sur site après déclenchement."
      },
      {
        title: "Maintenance obligatoire",
        content: "Tests fonctionnels trimestriels, vérification générale annuelle, remplacement des détecteurs tous les 10 ans maximum. Registre de sécurité obligatoire."
      }
    ],
    schemas: [
      {
        id: "schema-incendie-3",
        title: "Architecture d'un SSI",
        imageUrl: "/images/schemas/schema-ssi.png",
        description: "Principe d'architecture d'un Système de Sécurité Incendie de catégorie A avec ses différentes fonctions et interfaces."
      }
    ]
  },
  {
    id: "dtu-incendie-4",
    title: "Moyens d'extinction et de secours",
    category: "Incendie",
    description: "Extincteurs, RIA, colonnes sèches et installations d'extinction automatique",
    lastUpdate: "Octobre 2022",
    rules: [
      {
        title: "Extincteurs",
        content: "1 extincteur portatif pour 200 m² (minimum 1 par niveau). Capacité minimale 6 kg/litres. Distance maximale à parcourir: 15 m.",
        type: "standard"
      },
      {
        title: "Robinets d'Incendie Armés",
        content: "Espacement de 40 m maximum entre RIA, pour couvrir chaque point avec au moins 1 RIA. Pression dynamique 2,5 à 7 bars au robinet.",
        type: "standard"
      },
      {
        title: "Colonnes sèches",
        content: "Obligatoires dès 3ème famille B (Z>8m). Raccord alimentation à <60 m d'une bouche/poteau incendie. Pression d'épreuve 16 bars.",
        type: "warning"
      },
      {
        title: "Sprinkleurs",
        content: "1 tête pour 12 m² max en risque courant, 9 m² en risque grave. Température de déclenchement: 68°C standard, 93°C chaufferies.",
        type: "tip"
      },
      {
        title: "Extincteurs spécifiques",
        content: "Classe A: eau, eau+additif (solides). Classe B: poudre, mousse, CO2 (liquides). Classe F: spécifiques (huiles de cuisson). Sur électricité: CO2.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "RIA",
        content: "Diamètres normés: DN 19/20 (tuyau semi-rigide) ou DN 33 (tuyau flexible). Débit minimal: 30 l/min pour DN 19/20, 60 l/min pour DN 33. Autonomie minimale: 20 minutes."
      },
      {
        title: "Colonnes humides",
        content: "Obligatoires dans IGH ou ERP de grande hauteur. Maintenues en eau avec surpresseur dédié. Pression statique 4 à 8 bars, débit minimal 60 m³/h à 6 bars pour 3 prises."
      },
      {
        title: "Systèmes d'extinction automatique",
        content: "Sprinkleurs à eau, brouillard d'eau, mousse, gaz inerte, agents chimiques selon risque. Réserve d'eau dimensionnée pour 60 à 90 min de fonctionnement."
      },
      {
        title: "Espaces protégés",
        content: "Tous les locaux accessibles, avec atteinte des foyers potentiels. Exclusions possibles: locaux techniques électriques, sanitaires sans risque, escaliers encloisonnés."
      }
    ],
    schemas: [
      {
        id: "schema-incendie-4",
        title: "Installation de sprinkleurs",
        imageUrl: "/images/schemas/schema-sprinkleurs.png",
        description: "Schéma de principe d'une installation de sprinkleurs avec sources d'eau, poste de contrôle et distribution."
      }
    ]
  },
  // Inclure tous les DTUs des différentes catégories
  ...buildingClassificationsDTUs,
  ...desenfumageDTUs,
  ...incendieSystemsDTUs,
  ...erpDTUs,
  ...logementDTUs,
  ...parkingDTUs
];
