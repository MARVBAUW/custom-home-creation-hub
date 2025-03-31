
import { DTU } from '../../dtu/types';

export const isolationDTUs: DTU[] = [
  {
    id: "dtu-isolation-1",
    title: "DTU 45.11 - Isolation thermique des bâtiments",
    category: "Isolation",
    description: "Isolation thermique de combles par soufflage d'isolant en vrac",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "Épaisseur minimale après tassement de 20 cm pour respecter les exigences thermiques actuelles (R ≥ 6 m².K/W)",
        type: "standard"
      },
      {
        title: "Repérage de l'épaisseur",
        content: "Installation de repères d'épaisseur (piges) régulièrement répartis, au minimum 1 pour 10 m² de combles",
        type: "standard"
      },
      {
        title: "Ventilation des combles",
        content: "Section totale de ventilation ≥ 1/500 de la surface projetée en combles perdus, répartie entre partie basse et partie haute",
        type: "warning"
      },
      {
        title: "Distance aux conduits",
        content: "Respecter un écart de 18 cm minimum avec les conduits de fumée et autres sources de chaleur (spots, moteurs)",
        type: "tip"
      },
      {
        title: "Protection des spots",
        content: "Capots de protection obligatoires autour des spots encastrés, dépassant de 10 cm au-dessus de l'isolant",
        type: "warning"
      },
      {
        title: "Étanchéité à l'air",
        content: "Membrane d'étanchéité à l'air avec continuité assurée (chevauchements collés, raccordements périphériques) avant soufflage",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.11 s'applique à l'isolation thermique des combles perdus non aménagés par soufflage d'isolant en vrac (laines minérales, ouate de cellulose, etc.)."
      },
      {
        title: "Conditions préalables",
        content: "Les conditions préalables incluent une toiture étanche, une charpente saine et dimensionnée pour supporter le poids de l'isolant, et un plancher de combles continu."
      },
      {
        title: "Mise en œuvre",
        content: "Le soufflage doit être réalisé avec une machine adaptée au produit, en respectant la masse volumique et l'épaisseur préconisées pour atteindre la résistance thermique visée."
      },
      {
        title: "Traitement des points singuliers",
        content: "Traitement spécifique des trappes d'accès (isolation et étanchéité à l'air), des parois verticales (rehausse ou déflecteur) et des parties non isolées (coffrage)."
      },
      {
        title: "Chemin de circulation",
        content: "En cas d'accès régulier aux combles, prévoir des chemins de circulation surélevés au-dessus de l'isolant par planches ou panneaux sur plots ou suspentes."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-1",
        title: "Soufflage en combles perdus",
        imageUrl: "/images/schemas/soufflage-combles.png",
        description: "Vue en coupe d'un comble isolé par soufflage avec membrane d'étanchéité, isolant en vrac et ventilation de la toiture."
      },
      {
        id: "schema-isolation-2",
        title: "Protection spot encastré",
        imageUrl: "/images/schemas/protection-spot.png",
        description: "Détail de la protection des spots encastrés par capot de protection dépassant de l'isolant."
      },
      {
        id: "schema-isolation-3",
        title: "Traitement trappe d'accès",
        imageUrl: "/images/schemas/trappe-isolee.png",
        description: "Traitement d'une trappe d'accès aux combles avec isolation rapportée et joint d'étanchéité périphérique."
      }
    ]
  },
  {
    id: "dtu-isolation-2",
    title: "DTU 45.10 - Isolation des combles",
    category: "Isolation",
    description: "Isolation thermique des combles par panneaux ou rouleaux",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Mise en œuvre en deux couches",
        content: "Pose en deux couches croisées recommandée pour limiter les ponts thermiques et atteindre des résistances thermiques élevées",
        type: "standard"
      },
      {
        title: "Continuité de l'isolant",
        content: "Assurer la continuité de l'isolation entre les différentes parois (murs, planchers, toiture) pour éviter les ponts thermiques",
        type: "standard"
      },
      {
        title: "Lame d'air sous couverture",
        content: "Lame d'air ventilée obligatoire de 2 cm minimum entre l'isolant et la sous-face de la couverture pour évacuer l'humidité",
        type: "warning"
      },
      {
        title: "Recouvrement des lés",
        content: "Recouvrement des lés de membrane d'étanchéité à l'air de 10 cm minimum avec ruban adhésif spécifique",
        type: "tip"
      },
      {
        title: "Fixation des suspentes",
        content: "Fixation des suspentes de plafond dimensionnée pour supporter 3 fois le poids du complexe isolant + parement",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Pose du pare-vapeur du côté chaud de l'isolation (sous l'isolant côté intérieur) pour éviter les risques de condensation dans l'isolant",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.10 s'applique à l'isolation thermique des combles perdus et aménagés par panneaux ou rouleaux souples (laines minérales, fibres végétales ou animales)."
      },
      {
        title: "Performances thermiques",
        content: "Les résistances thermiques minimales recommandées sont : 8 m².K/W en combles perdus, 6 m².K/W en combles aménagés, à adapter selon les exigences réglementaires locales."
      },
      {
        title: "Mise en œuvre entre fermettes",
        content: "En combles aménagés, l'épaisseur d'isolant est limitée par la hauteur des fermettes. Compléter si nécessaire par une seconde couche croisée avec ossature métallique."
      },
      {
        title: "Étanchéité à l'air",
        content: "La membrane d'étanchéité à l'air doit être continue, avec traitement soigné des jonctions, traversées, et raccordements aux parois verticales et au sol."
      },
      {
        title: "Prescriptions acoustiques",
        content: "Pour l'isolation acoustique des bruits aériens, privilégier des isolants denses (> 15 kg/m³) et prévoir un système masse-ressort-masse avec désolidarisation."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-4",
        title: "Isolation combles aménagés",
        imageUrl: "/images/schemas/isolation-combles-amenages.png",
        description: "Coupe d'isolation de combles aménagés avec deux couches d'isolant, membrane d'étanchéité et parement intérieur."
      },
      {
        id: "schema-isolation-5",
        title: "Détail de pied de fermette",
        imageUrl: "/images/schemas/pied-fermette.png",
        description: "Traitement du pied de fermette avec continuité de l'isolation et de l'étanchéité à l'air."
      },
      {
        id: "schema-isolation-6",
        title: "Jonction avec fenêtre de toit",
        imageUrl: "/images/schemas/jonction-fenetre-toit.png",
        description: "Détail de raccordement de l'isolation et de l'étanchéité autour d'une fenêtre de toit."
      }
    ]
  },
  {
    id: "dtu-isolation-3",
    title: "DTU 31.2 - Isolation des murs à ossature bois",
    category: "Isolation",
    description: "Construction de maisons et bâtiments à ossature bois",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Humidité du bois",
        content: "Humidité maximale du bois de 18% à la mise en œuvre, mesurée avec un humidimètre électrique",
        type: "standard"
      },
      {
        title: "Isolation entre montants",
        content: "Isolation semi-rigide entre montants d'ossature avec épaisseur égale à celle des montants et mise en œuvre sans tassement",
        type: "standard"
      },
      {
        title: "Protection contre les remontées",
        content: "Barrière d'étanchéité (film polyester, polyéthylène ou EPDM) entre le soubassement et l'ossature bois pour éviter les remontées d'humidité",
        type: "warning"
      },
      {
        title: "Pare-vapeur",
        content: "Pare-vapeur côté intérieur avec valeur Sd ≥ 18 m pour les laines minérales et ≥ 90 m pour les isolants biosourcés hygroscopiques",
        type: "tip"
      },
      {
        title: "Contreventement",
        content: "Voile de contreventement en panneaux (OSB, contreplaqué) d'épaisseur minimale 9 mm, avec fixations tous les 15 cm en périphérie",
        type: "standard"
      },
      {
        title: "Isolant en fonction du pare-pluie",
        content: "Si pare-pluie non HPV (Sd > 0,1 m), prévoir une lame d'air ventilée de 2 cm minimum entre l'isolant et le pare-pluie",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Système constructif",
        content: "Le DTU 31.2 couvre les murs à ossature bois constitués de montants verticaux espacés de 40 à 60 cm, avec contreventement, isolation intercalée, barrières d'étanchéité."
      },
      {
        title: "Performances thermiques",
        content: "La composition courante (isolant entre montants + isolant extérieur) permet d'atteindre des résistances thermiques supérieures à 4 m².K/W, adaptables selon besoin."
      },
      {
        title: "Transfert de vapeur d'eau",
        content: "Le principe de conception repose sur un gradient de perméabilité à la vapeur d'eau de l'intérieur vers l'extérieur (Sd intérieur > 5 × Sd extérieur)."
      },
      {
        title: "Revêtement extérieur",
        content: "Le revêtement extérieur (bardage, enduit) doit être séparé du pare-pluie par une lame d'air ventilée de 2 cm minimum, avec entrées et sorties d'air dimensionnées."
      },
      {
        title: "Isolant complémentaire extérieur",
        content: "Un isolant rigide en panneau peut être ajouté côté extérieur, fixé à travers l'ossature, pour renforcer la performance thermique et limiter les ponts thermiques."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-7",
        title: "Coupe mur ossature bois",
        imageUrl: "/images/schemas/mur-ossature-bois.png",
        description: "Coupe complète d'un mur à ossature bois avec isolation entre montants, pare-vapeur, contreventement et bardage ventilé."
      },
      {
        id: "schema-isolation-8",
        title: "Jonction mur-plancher",
        imageUrl: "/images/schemas/jonction-mur-plancher.png",
        description: "Détail de jonction entre un mur à ossature bois et un plancher intermédiaire, avec continuité de l'isolation et de l'étanchéité à l'air."
      },
      {
        id: "schema-isolation-9",
        title: "Intégration menuiserie",
        imageUrl: "/images/schemas/menuiserie-ossature-bois.png",
        description: "Détail d'intégration d'une menuiserie dans un mur à ossature bois avec étanchéité à l'air et à l'eau."
      }
    ]
  },
  {
    id: "dtu-isolation-4",
    title: "DTU 25.41 - Isolation des cloisons",
    category: "Isolation",
    description: "Ouvrages en plaques de plâtre avec isolation intégrée",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Entraxe des montants",
        content: "Entraxe des montants 40, 50 ou 60 cm selon l'épaisseur des plaques et la hauteur des cloisons",
        type: "standard"
      },
      {
        title: "Jeu en tête de cloison",
        content: "Jeu en tête de cloison de 1 à 2 cm pour absorber les déformations du support, à combler avec une bande résiliente",
        type: "standard"
      },
      {
        title: "Fixation des plaques",
        content: "Fixation des plaques par vis tous les 30 cm, à 1 cm des bords pour les bords longitudinaux et 1,5 cm pour les bords transversaux",
        type: "warning"
      },
      {
        title: "Isolation phonique",
        content: "Pour une bonne isolation phonique, utiliser des laines minérales denses (≥ 15 kg/m³) et des plaques haute densité ou à performance acoustique",
        type: "tip"
      },
      {
        title: "Joint entre plaques",
        content: "Joint entre plaques de 3 à 5 mm, à combler avec un enduit adapté et une bande à joint, sans chevauchement des joints entre couches",
        type: "standard"
      },
      {
        title: "Prises électriques",
        content: "Boîtiers électriques décalés d'au moins 50 cm de part et d'autre de la cloison pour éviter les ponts phoniques",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types de cloisons",
        content: "Le DTU 25.41 couvre les cloisons de distribution, de doublage et plafonds en plaques de plâtre sur ossature métallique avec ou sans isolant intégré."
      },
      {
        title: "Performances acoustiques",
        content: "Les performances acoustiques dépendent de la masse des parements, de l'épaisseur et la densité de l'isolant, et du système constructif (simple ou double ossature)."
      },
      {
        title: "Résistance aux chocs",
        content: "Différents niveaux de résistance aux chocs selon le nombre et type de plaques : standard (1 BA13), renforcé (2 BA13 ou 1 BA18), très renforcé (2 BA18 ou 3 BA13)."
      },
      {
        title: "Résistance à l'humidité",
        content: "En locaux humides (EB+ privatifs minimum), utiliser des plaques hydrofugées H1 avec traitement complémentaire des pieds de cloisons et joints."
      },
      {
        title: "Résistance au feu",
        content: "La résistance au feu (EI 30 à EI 120) est obtenue par le nombre et type de plaques, la nature de l'isolant et le respect des règles de mise en œuvre spécifiques."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-10",
        title: "Cloison 98/48",
        imageUrl: "/images/schemas/cloison-isolation.png",
        description: "Coupe d'une cloison 98/48 (98 mm d'épaisseur totale avec montants de 48 mm) avec isolation intégrée."
      },
      {
        id: "schema-isolation-11",
        title: "Jonction cloison-plafond",
        imageUrl: "/images/schemas/jonction-cloison-plafond.png",
        description: "Détail de jonction entre une cloison et un plafond suspendu avec joint souple en tête."
      },
      {
        id: "schema-isolation-12",
        title: "Double ossature acoustique",
        imageUrl: "/images/schemas/double-ossature.png",
        description: "Cloison à double ossature indépendante pour performance acoustique renforcée, avec isolants et parements multiples."
      }
    ]
  }
];
