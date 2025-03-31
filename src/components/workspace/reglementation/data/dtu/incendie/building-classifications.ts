
import { DTU } from '../../../dtu/types';

export const buildingClassificationsDTUs: DTU[] = [
  {
    id: "dtu-incendie-class-1",
    title: "Classification des bâtiments d'habitation",
    category: "Incendie Classifications",
    description: "Systèmes de classification des bâtiments d'habitation par famille pour la réglementation incendie",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Première famille",
        content: "Habitations individuelles isolées ou jumelées à R+1 maximum. Habitations individuelles groupées en bande à RDC.",
        type: "standard"
      },
      {
        title: "Deuxième famille",
        content: "Habitations individuelles isolées ou jumelées de plus d'un étage. Habitations individuelles groupées en bande à R+1. Habitations collectives ≤ R+3.",
        type: "standard"
      },
      {
        title: "Troisième famille A",
        content: "Habitations collectives R+4 à R+7 avec distance ≤ 7m entre la voie et l'entrée. Une seule cage d'escalier et étages accessibles aux échelles.",
        type: "warning"
      },
      {
        title: "Troisième famille B",
        content: "Habitations collectives R+4 à R+7 ne répondant pas aux conditions de la 3ème famille A (distance >7m ou plusieurs cages d'escalier).",
        type: "warning"
      },
      {
        title: "Quatrième famille",
        content: "Habitations collectives R+8 à R+27 (plancher bas < 50m). Au-delà, ce sont des IGH (Immeubles de Grande Hauteur).",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Distance d'accessibilité",
        content: "La distance entre la voie carrossable et l'entrée du bâtiment est un critère important pour le classement. Pour les bâtiments de 3ème famille A, cette distance doit être ≤ 7m."
      },
      {
        title: "Hauteur du plancher bas",
        content: "La hauteur du plancher bas du dernier niveau accessible est mesurée par rapport au niveau de la voie accessible aux engins de secours. C'est un critère déterminant pour le classement."
      },
      {
        title: "Immeubles de Grande Hauteur (IGH)",
        content: "Bâtiments dont le plancher bas du dernier niveau est situé à plus de 50m du sol. Ils sont soumis à une réglementation spécifique plus contraignante."
      }
    ],
    schemas: [
      {
        id: "schema-habitation-1",
        title: "Classification des bâtiments d'habitation",
        imageUrl: "/images/schemas/classification-habitation.png",
        description: "Schéma récapitulatif des différentes familles de bâtiments d'habitation selon leur hauteur et configuration."
      }
    ]
  },
  {
    id: "dtu-incendie-class-2",
    title: "Classification des ERP (Établissements Recevant du Public)",
    category: "Incendie Classifications",
    description: "Classement des ERP par type d'activité et catégorie selon leur effectif",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Types d'ERP par activité",
        content: "J (structures d'accueil pour personnes âgées/handicapées), L (salles spectacle), M (magasins), N (restaurants), O (hôtels), P (dancings), R (enseignement), S (bibliothèques), T (expositions), U (sanitaires), V (culte), W (bureaux), X (sportif), Y (musées).",
        type: "standard"
      },
      {
        title: "1ère catégorie",
        content: "Effectif supérieur à 1500 personnes. Contrôles très stricts et visites de sécurité tous les 2 ans.",
        type: "alert"
      },
      {
        title: "2ème catégorie",
        content: "Effectif de 701 à 1500 personnes. Visites de sécurité tous les 3 ans.",
        type: "warning"
      },
      {
        title: "3ème catégorie",
        content: "Effectif de 301 à 700 personnes. Visites de sécurité tous les 3 ans, ou tous les 5 ans sans locaux à sommeil.",
        type: "warning"
      },
      {
        title: "4ème catégorie",
        content: "Effectif de 300 personnes et moins, à l'exception des établissements de 5ème catégorie. Visites tous les 5 ans.",
        type: "standard"
      },
      {
        title: "5ème catégorie",
        content: "Petits établissements dont l'effectif ne dépasse pas les seuils spécifiques à chaque type. Règles simplifiées, sans visite périodique obligatoire.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Seuils d'effectif pour la 5ème catégorie",
        content: "Les seuils varient selon le type d'ERP : Magasins (M) : 200 pers., Restaurants (N) : 200 pers., Hôtels (O) : 100 pers., Enseignement (R) : 200 pers., Bureaux (W) : 200 pers."
      },
      {
        title: "Commission de sécurité",
        content: "Visite obligatoire avant ouverture pour les 1ère à 4ème catégories. Périodicité des visites selon la catégorie. Établit des procès-verbaux et peut proposer des fermetures administratives."
      },
      {
        title: "ERP avec plusieurs activités",
        content: "Un ERP peut relever de plusieurs types. Les règles les plus contraignantes s'appliquent. L'effectif total détermine la catégorie."
      }
    ],
    schemas: [
      {
        id: "schema-erp-1",
        title: "Classification des ERP",
        imageUrl: "/images/schemas/classification-erp.png",
        description: "Tableau récapitulatif des différentes catégories d'ERP en fonction des effectifs admissibles."
      }
    ]
  },
  {
    id: "dtu-incendie-class-3",
    title: "Classification des IGH (Immeubles de Grande Hauteur)",
    category: "Incendie Classifications",
    description: "Classement des IGH par type d'usage et critères de hauteur",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Définition IGH",
        content: "Bâtiment dont le plancher bas du dernier niveau accessible est à plus de 50m du niveau du sol le plus haut utilisable par les engins des services publics de secours.",
        type: "alert"
      },
      {
        title: "GHA (habitation)",
        content: "Immeuble à usage d'habitation dont le plancher bas du dernier niveau est à plus de 50m et moins de 200m.",
        type: "warning"
      },
      {
        title: "GHO (hôtels)",
        content: "Immeuble à usage d'hôtel dont le plancher bas du dernier niveau est à plus de 28m et moins de 200m.",
        type: "warning"
      },
      {
        title: "GHR (enseignement)",
        content: "Immeuble à usage d'enseignement dont le plancher bas du dernier niveau est à plus de 28m et moins de 200m.",
        type: "warning"
      },
      {
        title: "GHS (dépôt d'archives)",
        content: "Immeuble à usage de dépôt d'archives dont le plancher bas du dernier niveau est à plus de 28m et moins de 200m.",
        type: "warning"
      },
      {
        title: "GHTC (tour de contrôle)",
        content: "Tour de contrôle dont le plancher bas du dernier niveau est à plus de 28m, ou à plus de 15m des bâtiments voisins.",
        type: "warning"
      },
      {
        title: "ITGH",
        content: "Immeuble de Très Grande Hauteur. Plancher bas du dernier niveau > 200m.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Compartimentage IGH",
        content: "Chaque niveau doit constituer un compartiment CF 2h d'une surface max de 800 m². Système d'extinction automatique obligatoire dans certains cas."
      },
      {
        title: "Dégagements IGH",
        content: "Minimum 2 escaliers encloisonnés par compartiment. Largeur d'une unité de passage (0,60m) par fraction de 100 personnes. Distance max à parcourir : 30m."
      },
      {
        title: "Désenfumage IGH",
        content: "Désenfumage mécanique obligatoire pour les circulations horizontales et locaux > 300 m². Mise en surpression des escaliers."
      }
    ],
    schemas: [
      {
        id: "schema-igh-1",
        title: "Classification des IGH",
        imageUrl: "/images/schemas/classification-igh.png",
        description: "Schéma récapitulatif des différentes classes d'IGH et des hauteurs correspondantes."
      }
    ]
  },
  {
    id: "dtu-incendie-class-4",
    title: "Classification de résistance au feu des matériaux",
    category: "Incendie Classifications",
    description: "Classements réglementaires des matériaux selon leur comportement au feu",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Euroclasses (réaction au feu)",
        content: "A1 (incombustible), A2 (pratiquement incombustible), B, C, D, E, F (non classé). Complété par s pour fumée (s1, s2, s3) et d pour gouttelettes (d0, d1, d2).",
        type: "standard"
      },
      {
        title: "Classes M (réaction au feu)",
        content: "M0 (incombustible), M1 (non inflammable), M2 (difficilement inflammable), M3 (moyennement inflammable), M4 (facilement inflammable). Ancienne classification française progressivement remplacée par les Euroclasses.",
        type: "standard"
      },
      {
        title: "Équivalence M0",
        content: "Correspond à A1 et A2-s1,d0 en Euroclasses.",
        type: "tip"
      },
      {
        title: "Équivalence M1",
        content: "Correspond à B-s3,d1 en Euroclasses.",
        type: "tip"
      },
      {
        title: "Résistance au feu REI",
        content: "R (Résistance mécanique), E (Étanchéité aux flammes), I (Isolation thermique). Exprimée en minutes: 15, 30, 60, 90, 120, 180, 240.",
        type: "standard"
      },
      {
        title: "Stabilité au feu (SF)",
        content: "Ancienne désignation correspondant au critère R. Capacité de l'élément à conserver sa fonction portante.",
        type: "standard"
      },
      {
        title: "Pare-flamme (PF)",
        content: "Ancienne désignation correspondant aux critères RE. Capacité à empêcher le passage des flammes.",
        type: "warning"
      },
      {
        title: "Coupe-feu (CF)",
        content: "Ancienne désignation correspondant aux critères REI. Capacité à bloquer flammes et chaleur.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Classement des murs et cloisons",
        content: "Murs porteurs: REI (ou SF en ancienne méthode). Cloisons distributives: EI (ou PF/CF). Les durées requises varient selon le type de bâtiment."
      },
      {
        title: "Classement des planchers et plafonds",
        content: "Planchers: REI (ou CF en ancienne méthode). Plafonds: EI (ou CF). Faux-plafonds: généralement de classes B-s3,d0 à D-s3,d0 selon l'usage."
      },
      {
        title: "Classement des portes et menuiseries",
        content: "Portes: E ou EI (ou PF/CF) avec durée requise selon localisation. EI1 pour isolation renforcée, EI2 pour isolation standard."
      }
    ],
    schemas: [
      {
        id: "schema-resistance-1",
        title: "Équivalence entre classes M et Euroclasses",
        imageUrl: "/images/schemas/equivalence-classes-feu.png",
        description: "Tableau d'équivalence entre l'ancien système français (M0 à M4) et les Euroclasses européennes."
      }
    ]
  }
];
