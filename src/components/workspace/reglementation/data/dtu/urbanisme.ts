
import { DTU } from '../../dtu/types';

export const urbanismeDTUs: DTU[] = [
  {
    id: "dtu-urbanisme-1",
    title: "Règles d'urbanisme - Plan Local d'Urbanisme",
    category: "Urbanisme",
    description: "Comprendre et appliquer les règles du Plan Local d'Urbanisme (PLU)",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Zones du PLU",
        content: "Le PLU divise le territoire en zones : U (urbaine), AU (à urbaniser), A (agricole) et N (naturelle), chacune avec ses propres règles de constructibilité.",
        type: "standard"
      },
      {
        title: "Implantation des constructions",
        content: "L'implantation par rapport aux voies, aux limites séparatives et aux autres constructions est définie dans les articles 6, 7 et 8 du règlement de zone.",
        type: "standard"
      },
      {
        title: "Coefficient d'emprise au sol",
        content: "Le CES définit le rapport maximal entre la surface bâtie au sol et la surface du terrain. Il varie généralement entre 30% et 70% selon les zones.",
        type: "warning"
      },
      {
        title: "Consultation préalable",
        content: "Consulter le certificat d'urbanisme opérationnel (CUb) avant tout projet pour connaître précisément les règles applicables à la parcelle concernée.",
        type: "tip"
      },
      {
        title: "Servitudes d'utilité publique",
        content: "Vérifier les servitudes d'utilité publique (monuments historiques, lignes électriques, canalisations, etc.) qui peuvent restreindre les droits à construire.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Documents constitutifs du PLU",
        content: "Le PLU comprend un rapport de présentation, un PADD (Projet d'Aménagement et de Développement Durables), des OAP (Orientations d'Aménagement et de Programmation), un règlement et des annexes."
      },
      {
        title: "Hauteur des constructions",
        content: "La hauteur maximale est définie soit en mètres par rapport au terrain naturel, soit en nombre de niveaux (R+1, R+2...), avec parfois des règles spécifiques pour les toitures et les attiques."
      },
      {
        title: "Stationnement",
        content: "Les normes de stationnement imposent un nombre minimal de places selon la destination et la surface du bâtiment (ex: 1 place pour 60 m² de surface habitable en zone résidentielle)."
      },
      {
        title: "Espaces verts",
        content: "Le pourcentage minimal d'espaces verts est généralement fixé entre 20% et 50% de la surface du terrain, avec parfois une obligation de pleine terre et des règles de plantation."
      }
    ]
  },
  {
    id: "dtu-urbanisme-2",
    title: "Autorisations d'urbanisme",
    category: "Urbanisme",
    description: "Démarches et procédures pour les différentes autorisations d'urbanisme",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Déclaration préalable",
        content: "Requise pour les travaux modifiant l'aspect extérieur, les extensions de 5 à 40 m² (20 m² hors zone U), changements de destination sans travaux structurels.",
        type: "standard"
      },
      {
        title: "Permis de construire",
        content: "Obligatoire pour toute nouvelle construction > 20 m² en zone U (> 5 m² ailleurs), extensions > 40 m² ou portant la surface totale à > 150 m², changements de destination avec structure.",
        type: "standard"
      },
      {
        title: "Délais d'instruction",
        content: "1 mois pour une DP, 2 mois pour un PC maison individuelle, 3 mois pour autres PC. Délais prolongés en zones protégées ou si consultation spécifique.",
        type: "warning"
      },
      {
        title: "Affichage sur terrain",
        content: "Afficher l'autorisation d'urbanisme sur le terrain dès obtention, sur panneau rectangulaire > 80 cm, visible depuis l'espace public pendant toute la durée des travaux.",
        type: "tip"
      },
      {
        title: "Recours des tiers",
        content: "Les tiers peuvent contester l'autorisation dans un délai de 2 mois à compter du premier jour d'affichage sur le terrain, prolongeant la période de fragilité juridique.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Composition du dossier",
        content: "Le dossier doit comprendre le formulaire CERFA approprié, un plan de situation, un plan de masse, des plans de façades et toitures, des coupes, un document graphique d'insertion et des photographies."
      },
      {
        title: "Conformité des travaux",
        content: "À l'achèvement, déposer une DAACT (Déclaration Attestant l'Achèvement et la Conformité des Travaux). La mairie dispose de 3 à 5 mois pour contester la conformité."
      },
      {
        title: "Cas particuliers",
        content: "Les ERP (Établissements Recevant du Public) nécessitent une autorisation de travaux complémentaire. En zone protégée, l'avis de l'ABF (Architecte des Bâtiments de France) est requis."
      },
      {
        title: "Participations financières",
        content: "Certaines autorisations entraînent des participations financières : taxe d'aménagement, redevance d'archéologie préventive, participation pour équipements publics exceptionnels, etc."
      }
    ],
    schemas: [
      {
        id: "schema-urbanisme-1",
        title: "Cycle de l'autorisation d'urbanisme",
        imageUrl: "/images/schemas/cycle-autorisation.png",
        description: "Schéma présentant les étapes clés d'une autorisation d'urbanisme, de la demande à la conformité."
      }
    ]
  },
  {
    id: "dtu-urbanisme-3",
    title: "Réglementation des divisions foncières",
    category: "Urbanisme",
    description: "Cadre réglementaire des divisions et lotissements",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Types de divisions",
        content: "Trois types de divisions existent : simple division, déclaration préalable de division et permis d'aménager, selon le nombre de lots et la création de voiries ou espaces communs.",
        type: "standard"
      },
      {
        title: "Seuil du permis d'aménager",
        content: "Permis d'aménager obligatoire pour toute division créant plus de 2 lots à bâtir sur 10 ans avec création de voies/espaces communs, ou plus de 4 lots sans création de voies.",
        type: "standard"
      },
      {
        title: "Surface minimale des lots",
        content: "Le PLU peut imposer une surface minimale des terrains constructibles, généralement entre 400 et 1000 m² selon les zones et les contraintes d'assainissement.",
        type: "warning"
      },
      {
        title: "Déclaration préalable de division",
        content: "Pour les divisions simples (jusqu'à 4 lots sur 10 ans sans voies communes), une DP est suffisante. Le délai d'instruction est d'1 mois, extensible à 2 mois.",
        type: "tip"
      },
      {
        title: "Règlement de lotissement",
        content: "Le règlement de lotissement peut imposer des règles plus restrictives que le PLU pendant 10 ans. Au-delà, seules les règles d'urbanisme communes s'appliquent.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Contenu du permis d'aménager",
        content: "Le dossier de PA doit inclure un plan de l'état actuel, un projet d'aménagement, un programme des travaux, un document graphique, une notice et un règlement spécifique si nécessaire."
      },
      {
        title: "Viabilisation",
        content: "Les terrains issus d'une division doivent être viabilisés : accès à une voie publique ou privée, raccordement aux réseaux d'eau, d'électricité et d'assainissement (collectif ou individuel)."
      },
      {
        title: "Taxes et participations",
        content: "Les divisions foncières peuvent entraîner la taxe d'aménagement, la participation pour voiries et réseaux, la participation pour équipements publics exceptionnels, etc."
      },
      {
        title: "Garanties d'achèvement",
        content: "Pour les lotissements avec travaux, une garantie d'achèvement (bancaire ou consignation) est obligatoire pour obtenir l'autorisation de vente des lots avant finalisation des travaux."
      }
    ]
  },
  {
    id: "dtu-urbanisme-4",
    title: "Servitudes et contraintes d'urbanisme",
    category: "Urbanisme",
    description: "Comprendre les servitudes et contraintes affectant les droits à construire",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Servitudes d'utilité publique",
        content: "Les SUP sont des limitations administratives au droit de propriété, annexées au PLU : protection de monuments, réseaux, risques naturels et technologiques, etc.",
        type: "standard"
      },
      {
        title: "Zone de protection patrimoniale",
        content: "Dans un périmètre de 500 m autour d'un monument historique, tout projet est soumis à l'avis de l'ABF. Cet avis est conforme (obligatoire) dans les espaces en covisibilité.",
        type: "standard"
      },
      {
        title: "Plans de prévention des risques",
        content: "Les PPR (inondation, mouvement de terrain, technologique) définissent des zones avec interdiction ou restriction de construire, et des prescriptions constructives obligatoires.",
        type: "warning"
      },
      {
        title: "Étude géotechnique",
        content: "En zone d'aléa moyen ou fort de retrait-gonflement des argiles, une étude géotechnique est obligatoire avant toute construction nouvelle depuis 2020.",
        type: "tip"
      },
      {
        title: "Servitudes de passage",
        content: "Les servitudes de passage (des réseaux, des piétons sur le littoral, de halage) peuvent affecter un terrain et restreindre sa constructibilité sur une bande de 3 à 6 mètres.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Contraintes environnementales",
        content: "Les zones Natura 2000, ZNIEFF, espaces boisés classés, zones humides, trames vertes et bleues imposent des restrictions et peuvent nécessiter des études d'impact spécifiques."
      },
      {
        title: "Servitudes d'alignement",
        content: "Les plans d'alignement définissent la limite entre voie publique et propriété privée, avec interdiction de construire ou rénover des bâtiments dans la zone frappée d'alignement."
      },
      {
        title: "Servitudes aéronautiques",
        content: "À proximité des aéroports et aérodromes, des servitudes limitent la hauteur des constructions et installations selon des plans de dégagement spécifiques à chaque infrastructure."
      },
      {
        title: "Emplacements réservés",
        content: "Les emplacements réservés dans le PLU sont destinés à des équipements publics futurs. Ils gèlent la constructibilité mais donnent au propriétaire un droit de délaissement."
      }
    ],
    schemas: [
      {
        id: "schema-urbanisme-2",
        title: "Impact des servitudes d'utilité publique",
        imageUrl: "/images/schemas/servitudes-urbanisme.png",
        description: "Illustration des principales servitudes d'utilité publique et leur impact sur la constructibilité d'un terrain."
      }
    ]
  }
];
