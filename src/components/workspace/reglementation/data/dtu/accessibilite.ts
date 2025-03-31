
import { DTU } from '../../dtu/types';

export const accessibiliteDTUs: DTU[] = [
  {
    id: "dtu-accessibilite-erp-1",
    title: "Accessibilité des ERP neufs",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des établissements recevant du public lors de leur construction",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Cheminements extérieurs",
        content: "Largeur minimale 1,40 m libre de tout obstacle. Pente ≤ 5%, dévers ≤ 2%. Palier de repos tous les 10 m pour les pentes ≥ 4%. Contrastes visuels et tactiles des cheminements",
        type: "standard"
      },
      {
        title: "Ressauts",
        content: "Hauteur maximale 2 cm, ou 4 cm si chanfrein à 1/3. Distance minimale entre deux ressauts : 2,50 m. Pas de ressauts successifs, sauf escaliers",
        type: "warning"
      },
      {
        title: "Portes d'entrée",
        content: "Largeur minimale 0,90 m (largeur de passage utile 0,83 m). Espace de manœuvre de porte : 1,70 m × 1,40 m devant chaque porte et 1,20 m × 1,40 m derrière. Effort d'ouverture ≤ 50 N",
        type: "standard"
      },
      {
        title: "Sanitaires",
        content: "Au moins un sanitaire accessible par niveau. Espace d'usage 0,80 m × 1,30 m latéral à la cuvette. Barre d'appui entre 0,70 m et 0,80 m du sol. Hauteur de cuvette entre 0,45 m et 0,50 m",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Stationnement",
        content: "2% des places accessibles (minimum 1 place). Places de 3,30 m de large minimum, avec cheminement horizontal. Signalisation verticale et horizontale. Raccordées par un cheminement accessible jusqu'à l'entrée."
      },
      {
        title: "Accueil et circulations intérieures",
        content: "Largeur minimale des circulations 1,40 m. Points d'accueil avec partie abaissée à 0,80 m max et profondeur ≥ 0,30 m. Revêtement non meuble, non glissant, non réfléchissant et sans obstacle. Éclairage ≥ 100 lux."
      },
      {
        title: "Dispositifs de commande",
        content: "Situés entre 0,90 m et 1,30 m du sol. Repérage visuel et tactile des interrupteurs. Espace d'usage de 0,80 m × 1,30 m devant chaque équipement. Utilisation possible en position debout comme assise."
      },
      {
        title: "Escaliers",
        content: "Largeur entre mains courantes ≥ 1,20 m. Hauteur des marches ≤ 16 cm, giron ≥ 28 cm. Contremarches contrastées de 10 cm min sur la première et dernière marche. Double main courante à 0,90 m et 0,75 m du sol avec prolongement horizontal."
      },
      {
        title: "Ascenseurs",
        content: "Obligatoires si ERP > 50 personnes en étages ou si prestations non disponibles au RDC. Cabine min. 1,10 m × 1,40 m. Précision d'arrêt ±2 cm. Dispositifs de commande à 0,90-1,30 m, avec repérage visuel et tactile."
      }
    ],
    schemas: [
      {
        id: "schema-accessibilite-erp-1",
        title: "Dimensions réglementaires des espaces de manœuvre",
        imageUrl: "/images/schemas/accessibilite/espace-manoeuvre.png", 
        description: "Schéma détaillant les dimensions requises pour les espaces de manœuvre des portes et la circulation en fauteuil roulant dans les ERP"
      },
      {
        id: "schema-accessibilite-erp-2",
        title: "Aménagement d'un sanitaire accessible",
        imageUrl: "/images/schemas/accessibilite/sanitaire-accessible.png",
        description: "Dimensions et équipements nécessaires pour un sanitaire accessible en ERP"
      }
    ]
  },
  {
    id: "dtu-accessibilite-erp-2",
    title: "Accessibilité des ERP existants",
    category: "Accessibilité",
    description: "Dispositions relatives à la mise en accessibilité des établissements recevant du public existants",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Dérogations possibles",
        content: "Possibilité de dérogation pour impossibilité technique, contraintes liées à la conservation du patrimoine, disproportion manifeste entre améliorations et conséquences, refus par l'assemblée générale de copropriétaires",
        type: "standard"
      },
      {
        title: "Ad'AP (Agenda d'Accessibilité Programmée)",
        content: "Agenda d'Accessibilité Programmée obligatoire pour étaler les travaux sur 3, 6 ou 9 ans selon le patrimoine. Dépôt en préfecture. Sanctions administratives en cas de non-respect (1500€ à 45000€)",
        type: "alert"
      },
      {
        title: "Ascenseurs",
        content: "Obligatoire si effectif > 50 personnes en étages ou si prestations non disponibles au RDC. Cabine 1,10 m × 1,40 m minimum. Tolérance dimensionnelle possible pour l'existant avec dérogation",
        type: "standard"
      },
      {
        title: "Mesures de substitution",
        content: "En cas d'impossibilité technique avérée, mise en place d'une prestation de substitution (aide humaine, visioguichet, etc.). Ces mesures doivent être équivalentes en qualité d'usage",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Registre d'accessibilité",
        content: "Document obligatoire consultable par le public, regroupant informations et prestations pour personnes handicapées : descriptif des locaux, attestations, formation du personnel, éventuelles dérogations obtenues."
      },
      {
        title: "Signalétique",
        content: "Visuelle contrastée (70% min.), tactile en relief et en braille pour les principaux locaux et équipements. Hauteur des caractères proportionnelle à la distance de lecture (15 mm pour 1 m, 50 mm pour 5 m)."
      },
      {
        title: "Types de handicap",
        content: "Prise en compte des 4 familles de handicap : moteur, visuel, auditif et mental, avec solutions adaptées pour chacune (bandes de guidage podotactiles, boucle magnétique, pictogrammes, etc.)."
      },
      {
        title: "Calendrier Ad'AP",
        content: "Périodes de 3 ans maximum, jusqu'à 3 périodes (9 ans) pour les patrimoines complexes. Pour un ERP isolé : maximum 3 ans. Bilan à mi-parcours obligatoire. Attestation d'achèvement en fin d'Ad'AP."
      },
      {
        title: "Procédure de validation",
        content: "Dépôt en mairie (AT-ADAP) ou préfecture (ADAP). Instruction en 4 mois maximum. Absence de réponse vaut approbation. Commission consultative départementale de sécurité et d'accessibilité (CCDSA) consultée."
      }
    ]
  },
  {
    id: "dtu-accessibilite-adap",
    title: "Agenda d'Accessibilité Programmée (Ad'AP)",
    category: "Accessibilité",
    description: "Procédures et modalités de mise en œuvre des Agendas d'Accessibilité Programmée pour les ERP existants",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Obligation légale",
        content: "Depuis le 1er janvier 2015, tout ERP non conforme doit être inscrit dans un Ad'AP, sous peine de sanctions administratives pouvant aller jusqu'à 45 000€ pour une personne morale",
        type: "alert"
      },
      {
        title: "Durée de réalisation",
        content: "1 à 3 ans pour un ERP isolé, jusqu'à 6 ans pour un patrimoine de plusieurs ERP (établissements de 1ère à 4ème catégorie), jusqu'à 9 ans pour un patrimoine complexe ou un cas particulier",
        type: "standard"
      },
      {
        title: "Contenu du dossier",
        content: "Analyse des points non conformes, description des travaux envisagés, programmation financière et calendrier détaillé, dérogations éventuelles à demander, attestation de financement pour les périodes > 3 ans",
        type: "tip"
      },
      {
        title: "Suivi et contrôle",
        content: "Bilan d'avancement à la fin de la première année, bilan à mi-parcours pour les Ad'AP > 3 ans, attestation d'achèvement à transmettre en fin d'Ad'AP. Sanctions en cas de non-réalisation",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types d'Ad'AP",
        content: "Ad'AP de patrimoine (plusieurs ERP d'un même gestionnaire), Ad'AP de patrimoine complexe (très nombreux ERP ou cas particuliers), Ad'AP simplifié (ERP de 5ème catégorie), Autorisation de travaux valant Ad'AP (AT-Ad'AP)."
      },
      {
        title: "Procédure d'élaboration",
        content: "1) Diagnostic d'accessibilité détaillé, 2) Consultation des associations de personnes handicapées, 3) Élaboration de la stratégie, 4) Établissement de la programmation, 5) Constitution du dossier, 6) Dépôt en préfecture."
      },
      {
        title: "Dérogations possibles",
        content: "Impossibilité technique (structure du bâtiment, topographie), préservation du patrimoine architectural, disproportion manifeste entre coûts et résultats, refus de l'assemblée de copropriétaires (majorité art. 24)."
      },
      {
        title: "Sanctions administratives",
        content: "Non-dépôt : 1 500€ à 5 000€. Absence de suivi : 1 500€ à 2 500€. Non-conformité après Ad'AP : jusqu'à 45 000€ pour les personnes morales. Les sanctions peuvent être assorties d'une injonction de réalisation sous astreinte."
      },
      {
        title: "Calendrier de réalisation",
        content: "Année 1 : Diagnostics, conception, démarches administratives. Années 2-3 : Travaux sur les principaux points de non-conformité. Années 4-6 : Mise en conformité des accès et circulations. Années 7-9 : Finalisation des aménagements."
      }
    ],
    schemas: [
      {
        id: "schema-adap-1",
        title: "Calendrier typique d'un Ad'AP sur 9 ans",
        imageUrl: "/images/schemas/accessibilite/calendrier-adap.png",
        description: "Chronologie des étapes clés d'un Agenda d'Accessibilité Programmée sur 9 ans pour un patrimoine complexe"
      }
    ]
  },
  {
    id: "dtu-accessibilite-logement-1",
    title: "Accessibilité des logements collectifs neufs",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des bâtiments d'habitation collectifs et de leurs abords",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Caractéristiques de base",
        content: "Tous les logements doivent être évolutifs : adaptation possible par travaux simples. Unité de vie en RDC ou étage desservi par ascenseur (séjour, cuisine, toilettes, salle d'eau, 1 chambre)",
        type: "standard"
      },
      {
        title: "Dimensionnement",
        content: "Cercle de rotation Ø 1,50 m dans cuisine, séjour, 1 chambre, WC et salle d'eau. Passage libre des portes : 0,90 m (0,83 m utile). Largeur minimum des circulations : 0,90 m",
        type: "standard"
      },
      {
        title: "Ascenseurs",
        content: "Obligatoires pour les bâtiments > R+3 ou si plus de 15 logements en étages. Cabine 1,00 × 1,30 m minimum. Précision d'arrêt : ± 2 cm. Espace de manœuvre devant l'ascenseur : 1,50 × 1,50 m",
        type: "warning"
      },
      {
        title: "Salle d'eau",
        content: "Espace d'usage 0,80 × 1,30 m latéral à la douche ou baignoire. Ressaut du bac de douche ≤ 2 cm. Possibilité d'installation ultérieure d'une douche accessible de plain-pied",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Cheminements extérieurs",
        content: "Largeur minimale 1,20 m, pente ≤ 5%, dévers ≤ 2%. Revêtement non meuble, non glissant, contrasté par rapport à l'environnement. Palier de repos (1,20m × 1,40m) tous les 10 m si pente ≥ 4%."
      },
      {
        title: "Commandes et équipements",
        content: "Prises, interrupteurs, équipements entre 0,90 m et 1,30 m du sol. Système d'arrêt d'urgence du chauffage et ventilation accessible. Boîte aux lettres utilisable en position assise (30-40% des boîtes entre 0,90 et 1,30 m)."
      },
      {
        title: "Balcons et terrasses",
        content: "Accessibles depuis les pièces de vie par un passage ≥ 0,80 m. Seuil ≤ 2 cm. Garde-corps permettant la visibilité en position assise. Espace de manœuvre Ø 1,50 m si superficie > 4 m²."
      },
      {
        title: "Dispositifs d'accès et de sécurité",
        content: "Visiophone ou interphone à 0,90-1,30 m de hauteur. Boutons à 0,40 m minimum de tout angle rentrant. Signaux sonores doublés de signaux visuels. Temporisation suffisante pour l'ouverture des portes automatiques."
      },
      {
        title: "Places de stationnement",
        content: "5% des places réservées (min. 1 place). Dimensions : 3,30 m × 5 m avec bande latérale 0,80 m. Raccordées à l'entrée par un cheminement accessible. Signalisation horizontale et verticale. Contrôle d'accès utilisable depuis un véhicule."
      }
    ],
    schemas: [
      {
        id: "schema-logement-1",
        title: "Dimensions des unités de vie accessibles",
        imageUrl: "/images/schemas/accessibilite/unite-vie-logement.png",
        description: "Schéma explicatif des dimensions réglementaires pour l'aménagement d'une unité de vie accessible en logement collectif"
      }
    ]
  },
  {
    id: "dtu-accessibilite-logement-2",
    title: "Accessibilité des maisons individuelles neuves",
    category: "Accessibilité",
    description: "Dispositions relatives à l'accessibilité des maisons individuelles neuves",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Champ d'application",
        content: "Applicable aux maisons individuelles construites pour être louées, mises à disposition ou vendues. Non applicable aux propriétaires construisant pour eux-mêmes sauf si financements publics",
        type: "standard"
      },
      {
        title: "Accès au logement",
        content: "Au moins un accès depuis l'extérieur doit être accessible, avec une largeur minimale de 0,90 m. Ressaut maximum 2 cm ou jusqu'à 4 cm avec pente ≤ 33%",
        type: "standard"
      },
      {
        title: "Unité de vie",
        content: "Cuisine, séjour, chambre, WC et salle d'eau en RDC ou accessibles par un niveau desservi par ascenseur/élévateur. Cercle de rotation Ø 1,50 m dans chaque pièce de l'unité de vie",
        type: "warning"
      },
      {
        title: "Escaliers",
        content: "Si logement sur plusieurs niveaux, escalier adapté avec mains courantes et contremarches visuellement contrastées. Hauteur des marches ≤ 17 cm, giron ≥ 28 cm",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Circulations intérieures",
        content: "Largeur minimale des circulations 0,90 m. Absence de ressauts et obstacles à la roue. Revêtements non glissants. Espace de manœuvre Ø 1,50 m pour demi-tour devant portes et dans couloirs > 1,80 m."
      },
      {
        title: "Équipements électriques",
        content: "Dispositifs de commande entre 0,90 m et 1,30 m du sol. Prise et interrupteur par pièce à cette hauteur. Protection des circuits conforme à la NF C 15-100. Éclairage de 100 lux minimum dans les circulations."
      },
      {
        title: "Adaptabilité",
        content: "Conception permettant ultérieurement et à moindre coût l'installation d'un appareil élévateur ou l'aménagement d'une salle d'eau accessible. Prévoir l'emplacement et les réservations nécessaires dans la structure."
      },
      {
        title: "Dimensions des pièces",
        content: "Cuisine : passage libre 1,50 m devant équipements. Chambre : lit accessible sur grand côté (0,90 m). Espace pour transfert fauteuil roulant - lit. Toilettes : espace latéral 0,80 × 1,30 m et Ø 1,50 m pour demi-tour."
      },
      {
        title: "Dérogations possibles",
        content: "Caractéristiques du terrain (terrain en pente, parcelle de petite taille, etc.) ou contraintes liées aux règles d'urbanisme. Une étude spécifique doit être fournie pour justifier la demande de dérogation en mairie."
      }
    ],
    schemas: [
      {
        id: "schema-maison-1",
        title: "Schéma d'aménagement d'une maison individuelle accessible",
        imageUrl: "/images/schemas/accessibilite/maison-accessible.png",
        description: "Plan détaillé d'une maison individuelle accessible avec dimensions réglementaires et aménagements"
      }
    ]
  },
  {
    id: "dtu-accessibilite-dimensionnement",
    title: "Règles dimensionnelles d'accessibilité",
    category: "Accessibilité",
    description: "Détails des exigences dimensionnelles pour l'accessibilité des espaces et équipements dans les ERP et logements",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Espaces de manœuvre",
        content: "Espace de rotation : Ø 1,50 m. Espace d'usage : 0,80 m × 1,30 m. Espace de manœuvre avec possibilité de demi-tour devant portes : 1,70 m × 1,40 m",
        type: "standard"
      },
      {
        title: "Largeurs de passage",
        content: "Cheminements : 1,40 m (ERP), 1,20 m (parties communes logements), 0,90 m (intérieur logements). Rétrécissement ponctuel toléré jusqu'à 1,20 m (ERP) ou 0,90 m (logements collectifs)",
        type: "standard"
      },
      {
        title: "Hauteurs",
        content: "Équipements et commandes : entre 0,90 m et 1,30 m. Obstacles en hauteur : passage libre ≥ 2,20 m. Seuils de portes : ≤ 2 cm ou jusqu'à 4 cm si chanfrein",
        type: "warning"
      },
      {
        title: "Pentes et rampes",
        content: "Pente ≤ 5% (tolérance ponctuelle jusqu'à 8% sur 2 m, 10% sur 0,50 m). Dévers ≤ 2%. Palier de repos (1,20 m × 1,40 m) tous les 10 m si pente ≥ 4%. Garde-corps si rupture de niveau > 0,40 m",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Dimensions des portes",
        content: "Largeur minimale : 0,90 m (passage utile 0,83 m) pour les ERP et parties communes, 0,80 m (passage utile 0,77 m) pour l'intérieur des logements. Poignées facilement préhensibles et manœuvrables avec une seule main."
      },
      {
        title: "Sanitaires accessibles",
        content: "WC : hauteur d'assise 0,45-0,50 m, espace latéral 0,80 × 1,30 m, barre d'appui latérale 0,70-0,80 m du sol. Lavabo : hauteur 0,70 m sous vasque, profondeur 0,30 m, miroir base à 1,05 m max. Douche : sans ressaut > 2 cm."
      },
      {
        title: "Escaliers",
        content: "Largeur entre mains courantes ≥ 1,00 m. Marches : hauteur ≤ 16 cm (ERP) ou ≤ 17 cm (logements), giron ≥ 28 cm. Main courante à 0,90 m avec prolongement horizontal ≥ 28 cm. Nez de marches contrastés et non glissants."
      },
      {
        title: "Ascenseurs",
        content: "Dimensions intérieures : 1,10 × 1,40 m (ERP), 1,00 × 1,30 m (logements). Précision d'arrêt ± 2 cm. Boutons à 0,90-1,30 m du sol. Signal sonore et visuel d'arrivée. Espace de manœuvre devant : 1,50 × 1,50 m."
      },
      {
        title: "Signalétique",
        content: "Contrastes visuels ≥ 70%. Hauteur des caractères : distance de lecture en mm / 30, minimum 15 mm. Pictogrammes : visibilité à 25 m pour taille 10 cm. Signalétique en relief et braille pour principaux locaux."
      }
    ],
    schemas: [
      {
        id: "schema-dimensions-1",
        title: "Dimensions réglementaires d'accessibilité",
        imageUrl: "/images/schemas/accessibilite/dimensions-reglementaires.png",
        description: "Schéma récapitulatif des principales dimensions d'accessibilité pour les espaces et équipements"
      },
      {
        id: "schema-dimensions-2",
        title: "Détails des rampes d'accès",
        imageUrl: "/images/schemas/accessibilite/rampes-acces.png",
        description: "Spécifications techniques des rampes d'accès : pentes, paliers, dimensions"
      },
      {
        id: "schema-dimensions-3",
        title: "Aménagement des sanitaires accessibles",
        imageUrl: "/images/schemas/accessibilite/sanitaires-details.png",
        description: "Dimensions et disposition des équipements dans un sanitaire accessible"
      }
    ]
  },
  {
    id: "dtu-accessibilite-erp-specifiques",
    title: "Accessibilité des ERP spécifiques",
    category: "Accessibilité",
    description: "Règles particulières pour l'accessibilité des établissements spécifiques comme les hôtels, restaurants, commerces et établissements sportifs",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Établissements d'hébergement",
        content: "Chambres adaptées : min. 1 jusqu'à 20 chambres, 2 jusqu'à 50, +1 par tranche de 50. Dimensions : Ø 1,50 m de rotation, espace latéral lit 0,90 m, sanitaires avec douche accessible",
        type: "standard"
      },
      {
        title: "Restaurants et débits de boissons",
        content: "Tables accessibles : 2 jusqu'à 50 places, +1 par tranche de 50. Hauteur sous table : 0,70 m min, profondeur 0,30 m. Allées principales : 1,40 m min. Menus lisibles (gros caractères, contraste)",
        type: "standard"
      },
      {
        title: "Commerces et centres commerciaux",
        content: "Cabines d'essayage adaptées : min. 1 par tranche de 20. Surface : 1,50 × 1,50 m. Caisses accessibles : min. 1 par tranche de 20. Comptoirs : 0,80 m max hauteur, 0,30 m profondeur",
        type: "tip"
      },
      {
        title: "Établissements sportifs",
        content: "Places adaptées pour spectateurs : 2 jusqu'à 50 places, +1 par tranche de 50. Vestiaires accessibles : min. 1 par sexe. Bassins de piscine : accès par rampe, pente ≤ 5% ou système de mise à l'eau",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Établissements scolaires",
        content: "Salles de classe : mobilier adapté et espaces de circulation ≥ 1,40 m. Tableaux et affichages à hauteur adaptée. Équipements informatiques avec dispositifs spécifiques. Espaces de repos accessibles."
      },
      {
        title: "Établissements de santé",
        content: "Chambres adaptées : 10% min. (hôpitaux), 4% (cliniques). Lit médicalisé : accès 1,50 m sur grand côté, 1,20 m petit côté. Sanitaires privatifs entièrement accessibles. Équipements de communication adaptés."
      },
      {
        title: "Salles de spectacles et cinémas",
        content: "Places adaptées : réparties dans la salle, différentes catégories tarifaires, dimensions 0,80 × 1,30 m + espace accompagnateur. Boucle magnétique pour malentendants. Éclairage des cheminements ≥ 50 lux."
      },
      {
        title: "Installations ouvertes au public (IOP)",
        content: "Espaces verts : cheminements stabilisés ≥ 1,40 m. Aires de jeux : équipements accessibles, revêtements amortissants compacts. Plages : dispositifs de mise à l'eau, cheminements jusqu'aux zones de baignade."
      },
      {
        title: "Dispositions spécifiques par type de handicap",
        content: "Handicap visuel : bandes de guidage, informations sonores et tactiles. Handicap auditif : boucles magnétiques, informations visuelles. Handicap mental : pictogrammes, signalisation simplifiée et intuitive."
      }
    ],
    schemas: [
      {
        id: "schema-erp-specifiques-1",
        title: "Aménagement d'une chambre d'hôtel accessible",
        imageUrl: "/images/schemas/accessibilite/chambre-hotel.png",
        description: "Plan détaillé d'une chambre d'hôtel accessible avec dimensions réglementaires"
      },
      {
        id: "schema-erp-specifiques-2",
        title: "Configuration d'un restaurant accessible",
        imageUrl: "/images/schemas/accessibilite/restaurant-accessible.png",
        description: "Dispositions des tables, circulations et équipements dans un restaurant accessible"
      }
    ]
  }
];
