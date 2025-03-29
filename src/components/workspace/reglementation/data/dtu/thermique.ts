
import { DTU } from '../../dtu/types';

export const thermiqueDTUs: DTU[] = [
  {
    id: "dtu-thermique-re2020-1",
    title: "RE2020 - Exigences pour logements neufs",
    category: "Thermique",
    description: "Réglementation environnementale 2020 applicable aux constructions neuves",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Bbio - Besoins bioclimatiques",
        content: "Le Bbio doit être inférieur au Bbiomax, qui dépend de la zone climatique, de l'altitude et de la surface. Réduction de 30% par rapport à la RT2012.",
        type: "standard"
      },
      {
        title: "Cep - Consommation d'énergie primaire",
        content: "Le Cep doit être inférieur au Cepmax (valeur moyenne autour de 75 kWhEP/m²/an). Inclut désormais l'éclairage, le chauffage, le refroidissement, l'eau chaude sanitaire et les auxiliaires.",
        type: "standard"
      },
      {
        title: "DH - Degrés-heures d'inconfort",
        content: "Nouvel indicateur : le DH doit être inférieur à 1250°C.h pour garantir le confort d'été sans climatisation. Calcul basé sur une température de confort variable.",
        type: "warning"
      },
      {
        title: "Ic Construction - Impact carbone construction",
        content: "Valeur seuil Ic Construction pour maisons : 640 kgCO2eq/m² à partir de 2022, puis 530 en 2025, 475 en 2028 et 415 en 2031.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Calcul de l'impact carbone",
        content: "L'analyse du cycle de vie (ACV) devient obligatoire et prend en compte les émissions de gaz à effet de serre sur 50 ans. Deux indicateurs sont calculés : Ic Construction (matériaux) et Ic Énergie (consommations)."
      },
      {
        title: "Systèmes énergétiques",
        content: "Sortie progressive du chauffage au gaz avec un seuil d'émission de gaz à effet de serre fixé à 4 kgCO2/m²/an à partir de 2022. Favorise le recours aux énergies renouvelables et aux systèmes performants."
      },
      {
        title: "Surfaces vitrées",
        content: "La surface totale des baies vitrées doit être supérieure ou égale à 1/6 de la surface habitable pour garantir un éclairage naturel suffisant dans les logements."
      }
    ]
  },
  {
    id: "dtu-thermique-rt2012-1",
    title: "RT2012 - Réglementation thermique pour bâtiments existants",
    category: "Thermique",
    description: "Exigences thermiques pour les bâtiments existants faisant l'objet de rénovations importantes",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "RT Existant globale",
        content: "Pour les bâtiments > 1000 m² achevés après 1948, avec rénovation > 25% de la valeur. Consommation Cep < Cepmax (80 à 195 kWhEP/m²/an selon zone climatique).",
        type: "standard"
      },
      {
        title: "RT Existant élément par élément",
        content: "Pour tous les autres cas de rénovation. Performances minimales pour chaque élément remplacé ou installé (isolation, menuiseries, chauffage, etc.).",
        type: "standard"
      },
      {
        title: "Garde-fous réglementaires",
        content: "Résistance thermique minimale : R ≥ 4,5 m².K/W pour les combles, R ≥ 3,7 m².K/W pour les murs, R ≥ 3 m².K/W pour les planchers bas.",
        type: "warning"
      },
      {
        title: "Étude thermique obligatoire",
        content: "Pour la RT Existant globale, une étude thermique doit être réalisée avant travaux avec le moteur de calcul Th-C-E ex, pour démontrer le respect des exigences.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Performance des menuiseries",
        content: "Uw ≤ 1,3 W/m².K pour les fenêtres en zone H1 et H2, Uw ≤ 1,6 W/m².K en zone H3. Le facteur solaire Sw doit être ≥ 0,36 pour optimiser les apports solaires en hiver."
      },
      {
        title: "Ventilation",
        content: "Obligation de maintenir ou installer un système de ventilation. Pour la VMC simple flux, débit d'extraction entre 45 et 135 m³/h selon le type de logement. VMC double flux recommandée."
      },
      {
        title: "Chauffage et ECS",
        content: "Rendement minimal de 90% pour les chaudières, COP minimum de 3,3 pour les pompes à chaleur. Isolation des réseaux de distribution obligatoire avec classe 4 minimum."
      }
    ]
  },
  {
    id: "dtu-thermique-renovation-1",
    title: "Réglementation thermique - Rénovation énergétique",
    category: "Thermique",
    description: "Dispositifs réglementaires et aides pour la rénovation énergétique des bâtiments",
    lastUpdate: "Septembre 2023",
    rules: [
      {
        title: "DPE - Diagnostic de Performance Énergétique",
        content: "Nouveau DPE opposable depuis juillet 2021. Calcul en énergie primaire et émissions de gaz à effet de serre. Classification de A à G.",
        type: "standard"
      },
      {
        title: "Interdiction de location",
        content: "Logements classés G en 2025, F en 2028 et E en 2034 seront considérés comme indécents et ne pourront plus être mis en location (loi Climat et Résilience).",
        type: "warning"
      },
      {
        title: "MaPrimeRénov'",
        content: "Aide principale pour la rénovation énergétique. Montant calculé selon revenus du foyer et gain énergétique. Cumulable avec les CEE.",
        type: "standard"
      },
      {
        title: "CEE - Certificats d'Économies d'Énergie",
        content: "Obligation pour les fournisseurs d'énergie de promouvoir l'efficacité énergétique. Prime versée aux particuliers réalisant des travaux d'économie d'énergie.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Qualification des professionnels",
        content: "Label RGE (Reconnu Garant de l'Environnement) obligatoire pour que les clients puissent bénéficier des aides financières. Qualification par domaine de travaux, avec audit de chantier."
      },
      {
        title: "Audit énergétique",
        content: "Audit énergétique obligatoire pour la vente des logements classés F ou G depuis avril 2023, E à partir de 2025 et D à partir de 2034. Doit proposer un parcours de travaux."
      },
      {
        title: "Bouquet de travaux",
        content: "Rénovation performante = rénovation qui traite les 6 postes de travaux : isolation des murs, du plancher bas, de la toiture, remplacement des menuiseries, ventilation et chauffage/ECS."
      }
    ]
  }
];
