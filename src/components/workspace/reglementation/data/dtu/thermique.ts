
import { DTU } from '../../dtu/types';

export const thermiqueDTUs: DTU[] = [
  {
    id: "dtu-thermique-1",
    title: "RE2020 - Exigences thermiques",
    category: "Thermique",
    description: "Réglementation environnementale 2020 - Volet thermique pour les bâtiments neufs",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Besoin bioclimatique (Bbio)",
        content: "Le Bbiomax est abaissé de 30% par rapport à la RT2012. Il varie selon la zone climatique, l'altitude et la surface du bâtiment.",
        type: "standard"
      },
      {
        title: "Consommation d'énergie primaire (Cep)",
        content: "Le Cepmax est fixé à 70 kWhep/m².an en moyenne, variable selon les zones climatiques. Il inclut 5 usages : chauffage, refroidissement, ECS, éclairage, auxiliaires.",
        type: "standard"
      },
      {
        title: "Confort d'été (DH)",
        content: "Le nombre de degrés-heures d'inconfort (DH) doit être inférieur à 1250 DH. Au-delà de 1850 DH, le bâtiment est non conforme.",
        type: "warning"
      },
      {
        title: "Étanchéité à l'air",
        content: "Perméabilité à l'air maximale : 0,6 m³/h/m² en maison individuelle, 1,0 m³/h/m² en logement collectif, mesurée sous 4 Pa.",
        type: "tip"
      },
      {
        title: "Émissions de carbone",
        content: "L'indicateur d'émissions de GES (Ic) comporte deux composantes : Ic construction (matériaux et chantier) et Ic énergie (consommations d'énergie).",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Conception bioclimatique",
        content: "La RE2020 valorise fortement la conception bioclimatique : orientation, compacité, protections solaires, inertie thermique, ventilation naturelle et éclairage naturel."
      },
      {
        title: "Énergies renouvelables",
        content: "Le recours aux énergies renouvelables est fortement encouragé, avec un bonus pour les solutions à faible impact carbone. Les systèmes gaz deviennent pénalisants."
      },
      {
        title: "Analyse du cycle de vie",
        content: "Une ACV complète est obligatoire pour calculer l'impact carbone du bâtiment sur 50 ans, incluant construction, exploitation, et déconstruction."
      },
      {
        title: "Exigences de moyens",
        content: "Obligation de mise en place de systèmes de pilotage et de suivi des consommations énergétiques par usage, accessibles aux occupants."
      }
    ],
    schemas: [
      {
        id: "schema-thermique-1",
        title: "Trajectoire RE2020",
        imageUrl: "/images/schemas/trajectoire-re2020.png",
        description: "Schéma présentant les seuils progressifs de la RE2020 jusqu'en 2031."
      }
    ]
  },
  {
    id: "dtu-thermique-2",
    title: "DTU 45.11 - Isolation thermique de combles",
    category: "Thermique",
    description: "Isolation des combles par soufflage d'isolant en vrac",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "Épaisseur minimale après tassement : 24 cm pour obtenir R ≥ 6 m².K/W (valeur minimale exigée en rénovation depuis 2023).",
        type: "standard"
      },
      {
        title: "Masse volumique",
        content: "La masse volumique de l'isolant doit être conforme aux préconisations du fabricant, généralement entre 10 et 15 kg/m³ pour la ouate de cellulose.",
        type: "standard"
      },
      {
        title: "Ventilation des combles",
        content: "Section totale des orifices de ventilation de la couverture ≥ 1/500 de la surface projetée en combles perdus.",
        type: "warning"
      },
      {
        title: "Repérage de hauteur",
        content: "Installer des repères de hauteur (piges) visibles après soufflage, espacés de 1 m maximum, pour contrôler l'épaisseur d'isolant.",
        type: "tip"
      },
      {
        title: "Protection des points singuliers",
        content: "Maintenir une distance de sécurité de 10 cm avec les conduits de fumée et créer un coffrage autour des spots encastrés dans le plancher.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types d'isolants en vrac",
        content: "Le DTU couvre les isolants en vrac minéraux (laines minérales) et organiques (ouate de cellulose, fibres de bois, textiles recyclés), chacun avec des spécificités d'application."
      },
      {
        title: "Préparation du support",
        content: "Le support doit être propre, sec, exempt de traces d'humidité, avec tous les défauts d'étanchéité à l'air corrigés. Un pare-vapeur est obligatoire côté chaud dans les zones très froides."
      },
      {
        title: "Protection des installations électriques",
        content: "Les boîtiers électriques doivent être protégés par des capots spécifiques, et les câbles électriques doivent être placés au-dessus de l'isolant ou sous conduit."
      },
      {
        title: "Traitement des accès",
        content: "Prévoir des zones d'accès renforcées avec des chemins de circulation si des interventions d'entretien sont nécessaires dans les combles isolés."
      }
    ],
    schemas: [
      {
        id: "schema-combles-1",
        title: "Isolation combles perdus",
        imageUrl: "/images/schemas/isolation-combles.png",
        description: "Détail de mise en œuvre de l'isolation par soufflage avec traitement des points singuliers."
      }
    ]
  },
  {
    id: "dtu-thermique-3",
    title: "DTU 45.10 - Isolation des combles aménagés",
    category: "Thermique",
    description: "Isolation thermique des combles aménagés en panneaux ou rouleaux",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Résistance thermique minimale",
        content: "R ≥ 6 m².K/W pour les rampants en construction neuve et rénovation pour respecter les exigences thermiques en vigueur.",
        type: "standard"
      },
      {
        title: "Lame d'air ventilée",
        content: "Lame d'air ventilée de 2 cm minimum entre l'isolant et la sous-face de la couverture, avec entrée d'air en bas et sortie en haut.",
        type: "standard"
      },
      {
        title: "Continuité de l'isolation",
        content: "Assurer la continuité de l'isolation sur toute l'enveloppe des combles, avec traitement soigné des jonctions mur/toiture et des fenêtres de toit.",
        type: "warning"
      },
      {
        title: "Membrane d'étanchéité à l'air",
        content: "Côté intérieur, une membrane d'étanchéité à l'air avec Sd ≥ 18 m est nécessaire, avec recouvrement de 10 cm aux joints et adhésifs spécifiques.",
        type: "tip"
      },
      {
        title: "Fixation des isolants",
        content: "Les isolants semi-rigides en rampant doivent être maintenus par des tasseaux horizontaux espacés de 40 cm maximum pour éviter tout affaissement.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Techniques d'isolation",
        content: "Le DTU décrit trois techniques principales : l'isolation entre chevrons, l'isolation sous chevrons et l'isolation sur chevrons (sarking), chacune avec ses avantages et contraintes."
      },
      {
        title: "Gestion de l'humidité",
        content: "La gestion de l'humidité est cruciale, avec des règles strictes sur la perméance des matériaux selon leur position dans la paroi, pour éviter tout risque de condensation."
      },
      {
        title: "Isolation acoustique",
        content: "L'isolation thermique doit être complétée par une isolation acoustique adéquate, notamment pour les bruits d'impact de la pluie sur la couverture (masse lourde ou isolation bicouche)."
      },
      {
        title: "Fenêtres de toit",
        content: "Les fenêtres de toit doivent faire l'objet d'un traitement spécifique, avec raccordement étanche de la membrane d'étanchéité à l'air et isolant périphérique."
      }
    ],
    schemas: [
      {
        id: "schema-rampant-1",
        title: "Isolation sous rampant",
        imageUrl: "/images/schemas/isolation-rampant.png",
        description: "Coupe détaillée d'une isolation sous rampant avec traitement de l'étanchéité à l'air."
      }
    ]
  },
  {
    id: "dtu-thermique-4",
    title: "DTU 45.4 - Isolation par l'extérieur",
    category: "Thermique",
    description: "Isolation thermique des murs par l'extérieur sous enduit",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Résistance thermique minimale",
        content: "R ≥ 3,7 m².K/W pour les murs en contact avec l'extérieur en construction neuve selon la RE2020, variable selon les zones climatiques.",
        type: "standard"
      },
      {
        title: "Fixation mécanique",
        content: "Fixation par au moins 5 chevilles par m² pour les panneaux isolants rigides, complétée par un collage couvrant au moins 20% de la surface.",
        type: "standard"
      },
      {
        title: "Traitement des points singuliers",
        content: "Renforcer tous les points singuliers (angles, ouvertures) avec des bandes de treillis d'armature supplémentaires sur au moins 20 cm de chaque côté.",
        type: "warning"
      },
      {
        title: "Décalage des joints",
        content: "Poser les panneaux isolants à joints décalés (pose à l'américaine) et en évitant tout joint filant horizontal ou vertical.",
        type: "tip"
      },
      {
        title: "Épaisseur d'enduit",
        content: "L'épaisseur minimale de l'enduit de base armé doit être de 3 mm, avec une armature totalement noyée dans l'enduit.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types d'isolants",
        content: "Le DTU couvre les isolants synthétiques (PSE, XPS), les isolants minéraux (laine de roche) et les isolants biosourcés (fibre de bois), chacun avec des exigences spécifiques."
      },
      {
        title: "Préparation des supports",
        content: "Les supports doivent être plans (tolérance de 1 cm sous règle de 2 m), propres, sans humidité, et les défauts de planéité supérieurs à 1 cm doivent être corrigés."
      },
      {
        title: "Résistance aux chocs",
        content: "Selon l'exposition, différentes classes de résistance aux chocs sont requises : normale (T2) pour les étages, renforcée (T3) pour les rez-de-chaussée et très renforcée (T4) pour les soubassements."
      },
      {
        title: "Protection incendie",
        content: "Pour les bâtiments de 3ᵉ et 4ᵉ famille, des dispositions spécifiques sont nécessaires : bandes coupe-feu en laine de roche tous les 2 niveaux et autour des baies."
      }
    ],
    schemas: [
      {
        id: "schema-ite-1",
        title: "Système d'ITE sous enduit",
        imageUrl: "/images/schemas/ite-enduit.png",
        description: "Coupe d'un système ITE avec isolant sous enduit et détail de traitement des angles."
      }
    ]
  }
];
