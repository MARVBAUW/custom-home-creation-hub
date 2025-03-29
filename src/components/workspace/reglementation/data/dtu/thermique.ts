
import { DTU } from '../../dtu/types';

export const thermiqueDTUs: DTU[] = [
  {
    id: "dtu-thermique-re2020-1",
    title: "RE2020 - Exigences principales",
    category: "Thermique RE2020",
    description: "Exigences réglementaires pour les constructions neuves selon la RE2020",
    lastUpdate: "Janvier 2024",
    rules: [
      {
        title: "Bbio",
        content: "Besoin bioclimatique maximal Bbiomax réduit de 30% par rapport à la RT2012, variable selon zone climatique et altitude",
        type: "standard"
      },
      {
        title: "Cep",
        content: "Consommation d'énergie primaire maximale de 75 kWhEP/m².an pour les maisons individuelles (modulation selon localisation)",
        type: "standard"
      },
      {
        title: "Ic énergie",
        content: "Impact carbone maximal lié aux consommations d'énergie : 4 kgCO2eq/m².an en 2022, 2,5 kgCO2eq/m².an en 2031",
        type: "warning"
      },
      {
        title: "DH",
        content: "Degré-heure d'inconfort estival limité à 1250°C.h, avec simulation sur période canicule de référence",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Évolutions temporelles",
        content: "Renforcement progressif des exigences par palier en 2025, 2028 et 2031. Durcissement progressif des exigences sur l'empreinte carbone des matériaux."
      },
      {
        title: "Attestations",
        content: "Étude thermique et attestation RE2020 à fournir au dépôt de permis de construire et à l'achèvement des travaux. Contrôle par bureau d'études qualifié."
      },
      {
        title: "Méthode de calcul",
        content: "Méthode horaire, simulation sur 8760 heures de l'année. Prise en compte fine des masques, des apports solaires et du confort d'été."
      }
    ],
    schemas: [
      {
        id: "schema-re2020-1",
        title: "Exigences de résultat RE2020",
        imageUrl: "/images/schemas/re2020-exigences.png",
        description: "Ce schéma présente les 3 indicateurs principaux à respecter dans la RE2020 : le Bbio pour la conception bioclimatique, le Cep pour la consommation d'énergie et l'Ic énergie pour l'impact carbone."
      },
      {
        id: "schema-re2020-2",
        title: "Calendrier d'application RE2020",
        imageUrl: "/images/schemas/re2020-calendrier.png",
        description: "Ce tableau chronologique montre l'évolution des seuils réglementaires sur la période 2022-2031, avec les différentes étapes de renforcement."
      }
    ]
  },
  {
    id: "dtu-thermique-rt2012-1",
    title: "RT2012 - Rappel des exigences",
    category: "Thermique RT2012",
    description: "Exigences réglementaires pour les constructions neuves selon la RT2012 (valable jusqu'en 2021)",
    lastUpdate: "Décembre 2022",
    rules: [
      {
        title: "Bbio",
        content: "Besoin bioclimatique limité à Bbiomax, fonction de la localisation, de l'altitude et de la surface du logement",
        type: "standard"
      },
      {
        title: "Cep",
        content: "Consommation maximale de 50 kWhEP/m².an en moyenne, modulée selon la zone climatique et l'altitude",
        type: "standard"
      },
      {
        title: "Tic",
        content: "Température intérieure conventionnelle en été inférieure à la température de référence Ticréf",
        type: "tip"
      },
      {
        title: "Étanchéité à l'air",
        content: "Q4Pa-surf ≤ 0,6 m³/(h.m²) pour les maisons individuelles, ≤ 1,0 m³/(h.m²) pour les logements collectifs",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Exigences de moyens",
        content: "Surface minimale de baies vitrées ≥ 1/6 de la surface habitable. Traitement des ponts thermiques. Obligation d'utiliser une énergie renouvelable."
      },
      {
        title: "Attestations",
        content: "Attestation de prise en compte de la RT2012 au dépôt du permis de construire et à l'achèvement des travaux, avec test d'étanchéité à l'air obligatoire."
      },
      {
        title: "Labels associés",
        content: "Label Effinergie+ : Bbiomax -20%, Cepmax -20%. Label BEPOS Effinergie : production d'énergie > consommations tous usages."
      }
    ],
    schemas: [
      {
        id: "schema-rt2012-1",
        title: "Zonage climatique RT2012",
        imageUrl: "/images/schemas/rt2012-zones.png",
        description: "Cette carte présente les 8 zones climatiques de la RT2012, qui déterminent les modulations des exigences Bbiomax et Cepmax."
      }
    ]
  },
  {
    id: "dtu-thermique-renovation-1",
    title: "Réglementation Thermique en Rénovation",
    category: "Thermique Rénovation",
    description: "Exigences pour les travaux de rénovation énergétique des bâtiments existants",
    lastUpdate: "Février 2024",
    rules: [
      {
        title: "Parois opaques",
        content: "Résistance thermique minimale après travaux : Murs R ≥ 3,7 m².K/W, Toiture R ≥ 4,5 m².K/W, Planchers bas R ≥ 3,0 m².K/W",
        type: "standard"
      },
      {
        title: "Menuiseries",
        content: "Performance minimale pour les fenêtres : Uw ≤ 1,3 W/m².K, facteur solaire Sw ≥ 0,3 en cas de remplacement",
        type: "standard"
      },
      {
        title: "Ventilation",
        content: "Conservation/installation d'un système de ventilation adapté lors de l'amélioration de l'étanchéité à l'air",
        type: "warning"
      },
      {
        title: "Rénovation globale",
        content: "Consommation après travaux ≤ 80 kWhEP/m².an (modulation selon zone climatique) pour rénovation globale MaPrimeRénov'",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Règles spécifiques",
        content: "Dérogations possibles pour les bâtiments historiques, l'architecture d'intérêt, ou contraintes techniques insurmontables justifiées."
      },
      {
        title: "Dispositifs d'aides",
        content: "MaPrimeRénov', CEE, Éco-PTZ, TVA à 5,5% sous condition de respect des critères de performance minimaux après travaux."
      },
      {
        title: "Étude thermique",
        content: "Audit énergétique obligatoire pour vente de logements classés F ou G à partir de 2022. Étude thermique recommandée pour orientation optimale des travaux."
      }
    ],
    schemas: [
      {
        id: "schema-renovation-1",
        title: "Étapes de rénovation énergétique",
        imageUrl: "/images/schemas/renovation-etapes.png",
        description: "Ce schéma présente les étapes clés d'une rénovation énergétique efficace : diagnostic, choix des solutions, ordre optimal des travaux."
      }
    ]
  }
];
