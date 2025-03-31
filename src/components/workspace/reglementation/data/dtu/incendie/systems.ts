
import { DTU } from '../../../dtu/types';

export const incendieSystemsDTUs: DTU[] = [
  {
    id: "dtu-incendie-systems-1",
    title: "Système de Sécurité Incendie (SSI)",
    category: "Incendie Systèmes",
    description: "Catégories et fonctionnalités des Systèmes de Sécurité Incendie",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "5 catégories de SSI",
        content: "A (automatique complet), B (automatique partiel), C (mise en sécurité manuelle avec SDI), D et E (manuel sans SDI). Plus la catégorie est élevée (A), plus le système est automatisé.",
        type: "standard"
      },
      {
        title: "SSI Catégorie A",
        content: "Comprend un SDI et un SMSI avec toutes les fonctions de mise en sécurité (compartimentage, désenfumage, évacuation) automatiques. Obligatoire pour les IGH, ERP avec locaux à sommeil.",
        type: "alert"
      },
      {
        title: "SSI Catégorie B",
        content: "Comprend un SDI et un SMSI partiel. Certaines fonctions sont automatiques, d'autres manuelles. Pour ERP type L,P,Y,M,S,T,W de 1ère et 2ème catégorie sans sommeil.",
        type: "warning"
      },
      {
        title: "SSI Catégorie C",
        content: "Comprend un SDI mais mise en sécurité entièrement manuelle. Pour ERP de 3ème et 4ème catégorie sans sommeil.",
        type: "standard"
      },
      {
        title: "SSI Catégorie D et E",
        content: "Sans SDI, uniquement des commandes manuelles pour quelques fonctions. D pour mise en sécurité d'un bâtiment, E pour un seul local spécifique.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Composants d'un SSI",
        content: "SDI (Système de Détection Incendie), SMSI (Système de Mise en Sécurité Incendie), CMSI (Centralisateur de Mise en Sécurité Incendie), DAS (Dispositifs Actionnés de Sécurité), DCMR (Dispositif de Commandes Manuelles Regroupées)."
      },
      {
        title: "Zonage de détection",
        content: "Division en ZD (Zones de Détection) de 1600 m² max par niveau. Déclenchement d'une ZD active les fonctions de sécurité dans une ou plusieurs ZS (Zones de Sécurité) correspondantes."
      },
      {
        title: "Fonctions de sécurité",
        content: "Compartimentage (C), Désenfumage (D), Évacuation (E), Extinction automatique (Ext), etc. Chaque fonction est gérée par zone de sécurité. Une ZS peut regrouper plusieurs ZD."
      }
    ],
    schemas: [
      {
        id: "schema-ssi-1",
        title: "Architecture d'un SSI catégorie A",
        imageUrl: "/images/schemas/schema-ssi-a.png",
        description: "Schéma de principe d'un Système de Sécurité Incendie de catégorie A avec tous ses composants."
      }
    ]
  },
  {
    id: "dtu-incendie-systems-2",
    title: "Détection Automatique d'Incendie (DAI)",
    category: "Incendie Systèmes",
    description: "Composants et principes des systèmes de détection automatique d'incendie",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Types de détecteurs",
        content: "Détecteurs de fumée (optiques ou ioniques), de chaleur (thermostatiques ou thermovélocimétriques), de flamme (infrarouge ou ultraviolet), multi-capteurs. Choix selon risque et environnement.",
        type: "standard"
      },
      {
        title: "Couverture des détecteurs",
        content: "Surface max de 60 à 80 m² par détecteur selon le type. Distance entre détecteurs < 10 à 15 m. Détecteurs éloignés de 0,5 m minimum des obstacles.",
        type: "standard"
      },
      {
        title: "Déclencheurs manuels",
        content: "Hauteur de 0,90 à 1,30 m du sol. Maximum 30 m entre deux déclencheurs. Implantation près des issues et dans les circulations principales.",
        type: "warning"
      },
      {
        title: "Centrale incendie",
        content: "Localise le départ de feu, gère les alarmes, les défauts et les mises en sécurité. 2 sources d'alimentation autonomes (secteur + batterie avec 12h d'autonomie en veille).",
        type: "standard"
      },
      {
        title: "Temporisation d'alarme",
        content: "Maximum 5 minutes en présence humaine permanente, pour vérification avant évacuation générale. Confirmation ou inhibition possible. Interdite sans personnel de sécurité.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Implantation des détecteurs",
        content: "En plafond, éloignés de 0,5 m minimum des parois et obstacles. Positionnés de préférence au droit des chemins d'évacuation. Adaptés à la configuration des locaux et à la hauteur sous plafond."
      },
      {
        title: "Indicateurs d'action",
        content: "Obligatoires pour les détecteurs installés dans des locaux fermés à clé ou masqués. Doivent être visibles depuis les circulations communes. Permettent de localiser rapidement le sinistre."
      },
      {
        title: "Maintenance",
        content: "Vérification annuelle complète obligatoire. Tests fonctionnels réguliers (cycles trimestriels par zone). Registre de sécurité tenu à jour. Remplacement des détecteurs tous les 10 ans."
      }
    ],
    schemas: [
      {
        id: "schema-dai-1",
        title: "Implantation des détecteurs incendie",
        imageUrl: "/images/schemas/schema-detecteurs.png",
        description: "Schéma montrant l'implantation correcte des détecteurs selon leur type et la configuration des locaux."
      }
    ]
  },
  {
    id: "dtu-incendie-systems-3",
    title: "Alarme incendie",
    category: "Incendie Systèmes",
    description: "Typologie et caractéristiques des systèmes d'alarme incendie",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Alarme type 1",
        content: "Système d'alarme le plus complet avec DAI, temporisation optionnelle, report au service sécurité. Obligatoire pour ERP 1ère catégorie, IGH et locaux à sommeil.",
        type: "alert"
      },
      {
        title: "Alarme type 2a",
        content: "Sans détection automatique mais avec surveillance du tableau et des déclencheurs manuels. Pour certains ERP 2ème catégorie sans locaux à sommeil.",
        type: "warning"
      },
      {
        title: "Alarme type 2b",
        content: "Sans surveillance permanente des déclencheurs manuels, mais autocontrôle du tableau. Pour ERP 3ème et 4ème catégorie sans locaux à sommeil.",
        type: "standard"
      },
      {
        title: "Alarme type 3",
        content: "Système simple sans autocontrôle, avec déclencheurs manuels et tableau d'alarme. Pour établissements particuliers ou certains ERP 4ème catégorie.",
        type: "standard"
      },
      {
        title: "Alarme type 4",
        content: "Système d'alarme élémentaire (cloche, sifflet, trompe) autonome. Pour ERP 5ème catégorie sans locaux à sommeil et petits établissements.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Signal d'alarme général",
        content: "Son conforme à la norme NF S 32-001 (fréquence 554 Hz ±44 Hz, modulation 4 Hz ±0,5 Hz). Niveau sonore 65 dB(A) minimum et 120 dB(A) maximum. Audible en tout point du bâtiment."
      },
      {
        title: "Signal d'évacuation",
        content: "Même caractéristique que l'alarme générale. Durée minimale de 5 min. Dispositifs lumineux complémentaires obligatoires dans les locaux à forte ambiance sonore (>90 dB) ou pour personnes malentendantes."
      },
      {
        title: "Alimentation",
        content: "Double alimentation obligatoire pour type 1 et 2 (secteur + batterie). Autonomie: 12h en veille + 5 min en alarme (type 1), 12h (type 2), 1h (type 3)."
      }
    ],
    schemas: [
      {
        id: "schema-alarme-1",
        title: "Types d'alarmes incendie",
        imageUrl: "/images/schemas/schema-alarmes.png",
        description: "Schéma comparatif des différents types d'alarme incendie et leurs principales caractéristiques."
      }
    ]
  },
  {
    id: "dtu-incendie-systems-4",
    title: "Systèmes d'extinction automatique",
    category: "Incendie Systèmes",
    description: "Caractéristiques des systèmes d'extinction automatique incendie",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Sprinkleurs à eau",
        content: "Buses thermosensibles déclenchées individuellement à température prédéfinie (68°C standard). Une tête couvre 9 à 12 m² selon risque. Pression réseau 3 à 7 bars.",
        type: "standard"
      },
      {
        title: "Brouillard d'eau",
        content: "Gouttelettes fines (< 1000 µm) refroidissant l'air, réduisant l'oxygène, bloquant rayonnement thermique. Consommation d'eau réduite. Haute (> 35 bars) ou basse pression.",
        type: "standard"
      },
      {
        title: "Systèmes à gaz",
        content: "Gaz inertes (argon, azote, CO₂) ou inhibiteurs chimiques. Extinction par réduction d'oxygène ou rupture de réaction chimique. Pour locaux clos uniquement.",
        type: "warning"
      },
      {
        title: "Systèmes à mousse",
        content: "Mélange eau + émulseur formant une couche isolante sur liquides inflammables. Types: haut, moyen ou bas foisonnement selon expansion. Efficace sur feux de classe B.",
        type: "standard"
      },
      {
        title: "Systèmes à poudre",
        content: "Poudres chimiques sèches (ABC ou BC) projetées sous pression. Action chimique inhibant combustion. Efficaces mais nettoyage difficile. Pour risques spécifiques.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Classement des risques sprinkleurs",
        content: "RO (Risque Ordinaire), RS (Risque Standard), REA (Risque Extra), RT (Risque Très sévère). Dimensionnement (surface impliquée, nombre de têtes, débit, réserve d'eau) selon classement."
      },
      {
        title: "Installation sprinkleurs",
        content: "Sous réseaux (RIA haute pression, pré-action, déluge), sous air (antigel pour zones froides), ESFR (suppression rapide), résidentiel. Certification APSAD R1 obligatoire pour assurances."
      },
      {
        title: "Sources d'eau",
        content: "Minimum 2 sources indépendantes pour RS/REA/RT. Capacité de la réserve selon risque et durée réglementaire (60 à 90 min). Essais hebdomadaires et contrôle semestriel obligatoires."
      }
    ],
    schemas: [
      {
        id: "schema-extinction-1",
        title: "Système de sprinkleurs",
        imageUrl: "/images/schemas/schema-sprinkleurs.png",
        description: "Schéma de principe d'une installation de sprinkleurs avec poste de contrôle et réseau de distribution."
      }
    ]
  }
];
