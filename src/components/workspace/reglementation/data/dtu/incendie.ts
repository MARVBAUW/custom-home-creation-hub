
import { DTU } from '../../dtu/types';
import { buildingClassificationsDTUs } from './incendie/building-classifications';

export const incendieDTUs: DTU[] = [
  ...buildingClassificationsDTUs,
  {
    id: "incendie-1",
    title: "Sécurité incendie - Principes généraux",
    category: "Sécurité Incendie",
    description: "Réglementation et principes généraux de la sécurité incendie dans les bâtiments.",
    lastUpdate: "2022-07-15",
    rules: [
      {
        title: "Objectifs réglementaires",
        content: "La réglementation vise à: permettre l'évacuation du public, limiter la propagation de l'incendie, faciliter l'intervention des secours.",
        type: "standard"
      },
      {
        title: "Réaction au feu",
        content: "Les euroclasses définissent le comportement au feu des matériaux. Classes A1 à F. Principales classes: A1 et A2 (incombustible), B (difficilement inflammable), C et D (combustible), E et F (facilement inflammable).",
        type: "warning"
      },
      {
        title: "Résistance au feu",
        content: "Les éléments de construction doivent résister au feu selon 3 critères: R (résistance mécanique), E (étanchéité aux flammes), I (isolation thermique).",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Principes de désenfumage",
        content: "Le désenfumage a pour objectif d'extraire les fumées et gaz chauds en cas d'incendie pour maintenir praticables les chemins d'évacuation et faciliter l'intervention des secours."
      },
      {
        title: "Compartimentage",
        content: "Les bâtiments doivent être divisés en zones pour limiter la propagation du feu. Les parois séparatives doivent avoir une résistance au feu définie selon le type de bâtiment."
      }
    ]
  },
  {
    id: "incendie-2",
    title: "Règles de sécurité incendie pour les ERP",
    category: "Sécurité Incendie ERP",
    description: "Dispositions réglementaires spécifiques aux Établissements Recevant du Public.",
    lastUpdate: "2022-09-10",
    rules: [
      {
        title: "Évacuation du public",
        content: "Règle des dégagements: minimum 2 sorties pour un effectif > 50 personnes. Largeur minimale 0.9m. Unité de passage (UP) = 0.6m.",
        type: "alert"
      },
      {
        title: "Distance maximale",
        content: "La distance à parcourir pour atteindre une sortie ou un escalier ne doit pas dépasser 40m (30m en cul-de-sac).",
        type: "warning"
      },
      {
        title: "Éclairage de sécurité",
        content: "Obligatoire dans tous les ERP sauf les 5ème catégories sans locaux à sommeil. Deux types: évacuation (BAES) et ambiance.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Calcul des unités de passage",
        content: "Effectif < 20 personnes: 1 UP (0.9m). De 20 à 100 personnes: 1 UP par fraction de 100. De 101 à 500 personnes: 1 UP par fraction de 100. > 500 personnes: 1 UP par fraction de 100."
      },
      {
        title: "Système de Sécurité Incendie (SSI)",
        content: "Les SSI sont classés par catégories de A à E. La catégorie est déterminée selon le type et la catégorie de l'ERP. Catégorie A: plus contraignante, E: moins contraignante."
      }
    ],
    schemas: [
      {
        id: "schema-erp-1",
        title: "Unités de passage et dégagements",
        imageUrl: "/images/dtu/unites-passage.png",
        description: "Schéma illustrant les dimensions des unités de passage et le calcul des dégagements."
      }
    ]
  },
  {
    id: "incendie-3",
    title: "Désenfumage des bâtiments",
    category: "Désenfumage",
    description: "Règles techniques pour le désenfumage naturel et mécanique.",
    lastUpdate: "2021-12-05",
    rules: [
      {
        title: "Surface utile de désenfumage",
        content: "La surface utile des exutoires (SUE) doit être de 1/200ème de la superficie pour un désenfumage naturel dans les locaux de plus de 300m².",
        type: "standard"
      },
      {
        title: "Implantation des amenées d'air",
        content: "Les amenées d'air doivent être en partie basse, à l'opposé des évacuations qui sont en partie haute.",
        type: "tip"
      },
      {
        title: "Désenfumage mécanique",
        content: "Le débit d'extraction doit être de 1 m³/s pour 100 m² avec un minimum de 1,5 m³/s par local.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de désenfumage",
        content: "Désenfumage naturel: utilise la différence de pression due aux effets thermiques. Désenfumage mécanique: utilise des extracteurs mécaniques pour évacuer les fumées."
      },
      {
        title: "Calcul des surfaces",
        content: "La surface géométrique (Sg) est liée à la surface utile (Su) par un coefficient aéraulique: Su = Sg × Cv. Le coefficient Cv dépend du type d'exutoire utilisé."
      }
    ]
  }
];
