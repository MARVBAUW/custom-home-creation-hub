
import { DTU } from '../../../dtu/types';

export const incendieSystemsDTUs: DTU[] = [
  {
    id: "dtu-securite-systemes-1",
    title: "Systèmes de Sécurité Incendie (SSI)",
    category: "Incendie Systèmes",
    description: "Caractéristiques et exigences techniques des Systèmes de Sécurité Incendie",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Catégories de SSI",
        content: "SSI A: 2 sous-systèmes SDI+SMSI complets. SSI B: SDI+SMSI partiel. SSI C: SDI+SMSI manuel. SSI D: SMSI avec DM. SSI E: SMSI manuel simple.",
        type: "standard"
      },
      {
        title: "SDI (Système Détection Incendie)",
        content: "Composé d'ECS (équipement central), détecteurs automatiques, déclencheurs manuels, indicateurs d'action, diffuseurs d'alarme. Zones de max 600m² par niveau.",
        type: "standard"
      },
      {
        title: "SMSI (Système Mise en Sécurité Incendie)",
        content: "CMSI (Centralisateur): gestion DAS (Dispositifs Actionnés Sécurité), évacuation, alerte. Volet compartimentage + volet désenfumage + volet évacuation.",
        type: "warning"
      },
      {
        title: "Critères d'installation",
        content: "Alimentation électrique secours (12h autonomie pour SSI A). Capotage min IP30. CMSI à proximité poste de sécurité. Liaisons électriques surveillées.",
        type: "tip"
      },
      {
        title: "Câblage électrique",
        content: "C2 minimum pour liaisons. CR1 pour fonctions maintenues en sécurité (désenfumage, compartimentage). Cheminements distincts des autres câbles.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Schémas normalisés",
        content: "4 types de configurations: alarme générale (AG), alarme sélective (AS), alarme générale sélective (AGS), alarme restreinte (AR). Avec ou sans temporisation: T1 (confirmation), T2 (reconnaissance), T3 (évacuation), T4 (sécurité)."
      },
      {
        title: "Détecteurs automatiques",
        content: "Types: optique fumée, thermique, thermostatique, thermovélocimétrique, flamme, multiponctuel, linéaire. Surface par détecteur limitée: 60-80m². Hauteur sous plafond 15m maximum sans dispositions particulières."
      },
      {
        title: "Asservissements",
        content: "Compartimentage (portes coupe-feu), désenfumage (ouvrants, extracteurs), arrêt installations techniques (ventilation, ascenseurs), déblocage issues secours, non-stop ascenseurs. Réarmement manuel uniquement, après disparition du feu."
      },
      {
        title: "Diffuseurs sonores et visuels",
        content: "Niveau sonore: 70dB(A) minimum, ou +10dB par rapport au bruit ambiant. Signal conforme NF S 32-001. Fréquence: 500Hz-1000Hz. Complément visuel obligatoire en présence de malentendants (flash 0,5Hz-2Hz)."
      }
    ],
    schemas: [
      {
        id: "schema-ssi-1",
        title: "Architecture SSI catégorie A",
        imageUrl: "/images/schemas/architecture-ssi.png",
        description: "Architecture d'un Système de Sécurité Incendie de catégorie A complète avec SDI et SMSI."
      }
    ]
  },
  {
    id: "dtu-securite-systemes-2",
    title: "Alarme et alerte incendie",
    category: "Incendie Systèmes",
    description: "Types d'alarme et systèmes d'alerte incendie",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Types d'alarme",
        content: "Type 1: SDI+SMSI complet (ERP 1-2, IGH, locaux sommeil). Type 2a: avec surveillance (ERP 3-4, sans sommeil). Type 2b: sans surveillance (petits ERP). Type 3: sans surveillance (ERP 5). Type 4: autonome (habitation).",
        type: "standard"
      },
      {
        title: "Temporisations",
        content: "Durée max: 5min en général, 0min si détecteurs dans locaux à sommeil. Temps reconnu d'investigation: 3min. Acquittement obligatoire sur site.",
        type: "warning"
      },
      {
        title: "Emplacements DM",
        content: "Hauteur 0,90m-1,30m. Tous niveaux près escaliers/sorties. Distance max 30m en circulations. Signalisation visible à 10m minimum. Rouge NF EN 54-11.",
        type: "standard"
      },
      {
        title: "Diffusion alarme évacuation",
        content: "Audible en tout point avec caractéristiques normalisées. Autonomie 5min min. Signal distinct de tous autres. Message vocal possible en plus.",
        type: "tip"
      },
      {
        title: "Alerte aux secours",
        content: "Ligne téléphonique dédiée pour ERP avec personnel permanent. Message enregistré pour locaux sans personnel permanent. Affichage consignes à proximité.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Son normalisé NF S 32-001",
        content: "Caractéristiques: signal principal 554Hz (±44Hz), signal secondaire 440Hz (±44Hz). Séquence: 0,5s signal principal + 0,5s signal secondaire + 0,5s silence. Puissance: dépassant le niveau ambiant d'au moins 10dB(A), et ≥65dB(A)."
      },
      {
        title: "Détection automatique",
        content: "Détecteurs adaptés aux risques: optiques (feux couvants, fumées), thermiques (feux vifs), flamme (feux rapides), spécifiques (gaz). Règles d'implantation: distance murs ≥0,5m, hauteur variable selon type, surface surveillée 30-80m² selon type."
      },
      {
        title: "Tableaux de signalisation",
        content: "Indication visuelle distincte et séparée pour: alarme feu, dérangement, hors service, alimentation. Signalisation par zone. Commandes accessibles selon niveau d'accès (1 à 4). Alimentation secours interne ou externe (AES)."
      },
      {
        title: "Dispositifs d'alarme visuels",
        content: "Obligatoires dans locaux où l'efficacité des signaux sonores est affectée (bruit >90dB) ou pour personnes malentendantes. Flash blanc ou rouge, fréquence 0,5Hz minimum. Implantation en hauteur visible de tous points, intensité lumineuse adaptée au local."
      }
    ],
    schemas: [
      {
        id: "schema-ssi-2",
        title: "Zones de détection et temporisation",
        imageUrl: "/images/schemas/zones-detection.png",
        description: "Principes de zonage et de temporisation dans les systèmes d'alarme incendie."
      }
    ]
  },
  {
    id: "dtu-securite-systemes-3",
    title: "Extincteurs et installations d'extinction",
    category: "Incendie Systèmes",
    description: "Équipements et systèmes d'extinction d'incendie",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Classes de feux",
        content: "A: solides (bois, papier). B: liquides (hydrocarbures). C: gaz. D: métaux. F: huiles/graisses cuisine. Agents adaptés: A→eau, AB→mousse/poudre, BC→CO2/poudre, D→poudres spéciales.",
        type: "standard"
      },
      {
        title: "Extincteurs portatifs",
        content: "Capacité minimale: 6L (eau), 6kg (poudre), 2kg (CO2). Distance entre extincteurs: 15m max. Signalisation normalisée. Contrôle annuel obligatoire.",
        type: "standard"
      },
      {
        title: "Robinets d'Incendie Armés",
        content: "Diamètres: DN19/20 (30l/min) ou DN33 (60l/min). Pression dynamique: 2,5 à 7 bars. Couverture: 40m (longueur tuyau + 5m jet). Zone protégée ≤ 800m².",
        type: "warning"
      },
      {
        title: "Sprinkleurs",
        content: "Types installations: sous eau, sous air, alternatives, déluge. Risques: léger RL (225m²/tête), ordinaire RO (12m²/tête), grave RS (9m²/tête). Autonomie: 1h-1h30.",
        type: "tip"
      },
      {
        title: "Systèmes gaz",
        content: "Agents: CO2, gaz inertes (IG01, IG55, IG100, IG541), chimiques (FK-5-1-12, HFC227ea). Local étanche. Concentration: 34-60% selon agent. Évacuation avant émission.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Règles d'implantation extincteurs",
        content: "Visibles, accessibles, proximité des risques, hauteur 1,20m max (poignée). Nombre minimum: 1 par niveau, 1 pour 200m² (ERP), 1 pour 150m² (industriel). Types selon risques: eau+additif (classe A), CO2 (risques électriques), poudre (classes ABC), spéciaux (cuisines, métaux)."
      },
      {
        title: "Installations sprinkleurs",
        content: "Sources d'eau: simple/double (réservoir sous pression, réservoir gravitaire, pompes). Supervision: pressostat, contrôleurs débit, alarme. Espacement: 2-4,6m entre têtes. Température déclenchement: 68°C standard, 93-141°C locaux chauds. Audit complet tous les 3 ans."
      },
      {
        title: "Systèmes à brouillard d'eau",
        content: "Haute pression (>35 bars), moyenne pression (12-35 bars), basse pression (<12 bars). Avantages: faible consommation eau, dégâts limités, refroidissement efficace. Applications: data centers, musées, hôpitaux, tunnels. Règles dimensionnement: essais CNPP ou FM/VdS."
      },
      {
        title: "Colonnes sèches/humides",
        content: "Colonnes sèches: bâtiments Z>8m. Prise en pied (diamètre 65mm) et à chaque niveau (diamètre 40mm). Colonnes humides: pressions permanentes 4,5-8,5 bars, débits 1000-2000l/min. Contrôle technique annuel. Signalisation normalisée. Bouches incendie: 1 par tranche de 60m."
      }
    ],
    schemas: [
      {
        id: "schema-ssi-3",
        title: "Installation de sprinkleurs",
        imageUrl: "/images/schemas/installation-sprinkleur.png",
        description: "Schéma d'une installation complète de sprinkleurs avec ses différents composants."
      }
    ]
  }
];
