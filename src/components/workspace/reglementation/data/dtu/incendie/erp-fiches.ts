
import { DTU } from '../../../dtu/types';

export const erpFichesDTUs: DTU[] = [
  {
    id: "dtu-erp-fiche-1",
    title: "ERP Type J - Structures d'accueil pour personnes âgées/handicapées",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de type J",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 4ème catégorie si effectif > 25 pers., 5ème catégorie si effectif ≤ 25 personnes de personnel et ≤ 100 résidents. Sous-sols interdits aux résidents.",
        type: "standard"
      },
      {
        title: "Isolement et accessibilité",
        content: "Murs CF 1h entre compartiments. Accès voie échelles obligatoire pour chaque compartiment. Façades accessibles sur 1/2 du périmètre au moins.",
        type: "warning"
      },
      {
        title: "Compartimentage",
        content: "Obligatoire dès la 4ème catégorie. Un compartiment = 1 à 3 niveaux max. Surface de 1500 m² max par niveau avec 20 chambres max par compartiment. Parois CF 1h, portes PF 1/2h.",
        type: "alert"
      },
      {
        title: "Dégagements",
        content: "Deux dégagements par niveau. Largeur couloirs 1,40 m min (1,20 m si porte des chambres en retrait). Aucun local à risque sur chemins d'évacuation.",
        type: "tip"
      },
      {
        title: "Détection automatique",
        content: "Obligatoire dans tous les locaux sauf sanitaires. Système de catégorie A avec détection généralisée. Alarme générale sélective ne fonctionnant que dans la zone sinistrée.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Chambres",
        content: "Surface minimale 10 m² par lit (9 m² en chambre individuelle). Parois CF 1/2h, portes PF 1/2h avec ferme-porte. Équipements sanitaires adaptés. Commande d'arrêt ventilation obligatoire."
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour circulations horizontales desservant les chambres, les escaliers encloisonnés et les locaux > 100 m². Commandes au niveau d'accès et à l'entrée des compartiments."
      },
      {
        title: "Éclairage de sécurité",
        content: "Type luminaires sur source centrale ou BAES. Éclairage d'ambiance dans les salles > 100 m², locaux de soins et circulations des zones d'hébergement. 5 lumens/m²."
      },
      {
        title: "Moyens de secours",
        content: "SSI de catégorie A, alarme de type 1, équipement d'alarme de type 1 avec temporisation. Service de sécurité selon catégorie. RIA DN 20 mm obligatoires si > 500 m²."
      }
    ]
  },
  {
    id: "dtu-erp-fiche-2",
    title: "ERP Type L - Salles de spectacles, réunions, conférences, multimédia",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de type L",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 5ème catégorie selon effectif. 1ère : > 1500 pers., 2ème : 701-1500, 3ème : 301-700, 4ème : ≤ 300, 5ème : ≤ 200 en sous-sol, ≤ 100 aux étages et ≤ 300 au total.",
        type: "standard"
      },
      {
        title: "Implantation",
        content: "Interdiction d'installer des salles de spectacle en sous-sol au-delà de -2. Les salles polyvalentes sont autorisées au 1er sous-sol uniquement.",
        type: "warning"
      },
      {
        title: "Construction",
        content: "Parois et planchers CF 1h à 2h selon catégorie. Structure SF 1h pour les ERP à simple rez-de-chaussée, SF 1h30 pour les autres niveaux.",
        type: "standard"
      },
      {
        title: "Sorties",
        content: "Nombre de sorties selon effectif: 2 sorties de 2 UP chacune jusqu'à 500 personnes, puis 1 sortie supplémentaire par tranche de 500 personnes.",
        type: "warning"
      },
      {
        title: "Dispositifs anti-panique",
        content: "Obligatoires pour les salles > 300 personnes. Barres anti-panique sur les portes des sorties principales et de secours.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Aménagements intérieurs",
        content: "Sièges fixés au sol par rangées de 16 maximum entre deux circulations, 8 max entre une paroi et une circulation. Circulations de 0,60 m (moins de 300 places) à 1,20 m (plus de 1000 places)."
      },
      {
        title: "Régie technique",
        content: "Parois CF 1h si dans la salle, porte PF 1/2h. Éclairage indépendant. Câblage électrique CR1. Visibilité obligatoire sur la totalité de la salle."
      },
      {
        title: "Scènes et décors",
        content: "Scènes isolées (> 120 m²): murs et plafond CF 2h, plancher SF 1h, porte CF 1h, rideau pare-flammes CF 1h. Matériaux décor M1 pour éléments suspendus, M2 au sol."
      },
      {
        title: "Désenfumage",
        content: "Désenfumage naturel ou mécanique obligatoire pour les salles en sous-sol, les salles sans façade accessible, les salles > 300 personnes. Surface d'exutoires ≥ 1/100 de la surface."
      }
    ]
  },
  {
    id: "dtu-erp-fiche-3",
    title: "ERP Type M - Magasins et centres commerciaux",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de type M",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 5ème catégorie selon effectif. 1ère : > 1500 pers., 2ème : 701-1500, 3ème : 301-700, 4ème : ≤ 300, 5ème : ≤ 200 au total.",
        type: "standard"
      },
      {
        title: "Calcul d'effectif",
        content: "1 pers. / 2 m² RDC/étages, 1 pers. / 5 m² sous-sol/ailes, 1 pers. / 3 m² boutiques <300 m². 2 pers. / m linéaire de comptoir pour stands de vente.",
        type: "standard"
      },
      {
        title: "Isolement et accessibilité",
        content: "Poteaux incendie 60 m³/h à moins de 100m, façades accessibles aux échelles sur au moins 50% du périmètre. Parois CF 1 à 3h selon tiers contigus.",
        type: "standard"
      },
      {
        title: "Locaux à risques",
        content: "Locaux de réserves > 300 m² = locaux à risques importants (CF 2h, portes CF 1h), < 300 m² = risques moyens (CF 1h, portes CF 1/2h). Stockages séparés des ventes.",
        type: "warning"
      },
      {
        title: "Sprinkleurs",
        content: "Obligatoires si surface > 3000 m² ou réserves > 500 m². Système adapté au risque. RIA DN 25 ou 40 obligatoires.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Dégagements",
        content: "Largeur cumulée 1 UP par fraction de 100 personnes. Centres commerciaux : 7 m de large pour mail principal. Escaliers à volées droites. Mails et sorties bien répartis pour limiter impasses."
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour les locaux > 300 m² ou en sous-sol, et les circulations > 30 m. Surface d'exutoires ≥ 1/100 de la surface des locaux (1/200 en mécanique). Mail de centre commercial: 1/100."
      },
      {
        title: "Mails des centres commerciaux",
        content: "Largeur minimale 6 m (4 m si 9 boutiques ou moins). Deux unités de passage libres en permanence. Interdiction d'implanter des réserves ou des locaux à risques sur le mail."
      },
      {
        title: "Installations électriques",
        content: "Éclairage normal sur réseau EDF + groupe électrogène ou 2 arrivées distinctes. Éclairage sécurité type C en circulation (tous types RDC), type A si sous-sol avec public."
      }
    ]
  },
  {
    id: "dtu-erp-fiche-4",
    title: "ERP Type O - Hôtels et établissements d'hébergement",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de type O",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 5ème catégorie selon effectif. 5ème si capacité ≤ 100 personnes. Calcul effectif: nombre de personnes pouvant occuper les chambres (2 pers / chambre sans que le total puisse excéder 1 pers / 10 m² de surface totale).",
        type: "standard"
      },
      {
        title: "Implantation",
        content: "Établissements recevant + de 50 personnes: dernier étage à max 8 m du sol pour les ERP non protégés par RIA ou système d'extinction automatique.",
        type: "warning"
      },
      {
        title: "Encloisonnement",
        content: "Escaliers obligatoirement encloisonnés. Toutes les chambres encloisonnées par des parois CF 1h et portes PF 1/2h. Couloirs recoupés tous les 35 m par des parois PF 1/2h.",
        type: "warning"
      },
      {
        title: "Circulations horizontales",
        content: "Largeur 1,40 m pour les >50 personnes. Distance de chambre à escalier < 40 m (30 m en cul-de-sac). Indication des numéros d'étage dans escaliers et couloirs.",
        type: "standard"
      },
      {
        title: "Détection incendie",
        content: "Système de Sécurité Incendie (SSI) de catégorie A obligatoire avec détection dans tous les locaux sauf sanitaires. Alarme générale sélective possible.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Chambres",
        content: "Surface minimale 9 m². Nécessité d'au moins une fenêtre ouvrable par chambre, sauf si désenfumage spécifique. Portes équipées de ferme-portes et plans d'évacuation obligatoires sur chaque porte."
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour escaliers, circulations horizontales > 10 m et locaux > 100 m². Fenêtres des chambres peuvent participer au désenfumage de secours."
      },
      {
        title: "Installations électriques",
        content: "Éclairage de sécurité d'évacuation obligatoire. Dans les établissements de 3ème et 4ème catégorie, éclairage de sécurité du type C; type A si sous-sol ou > 1000 personnes."
      },
      {
        title: "Moyens de secours",
        content: "Système d'alarme de type 1. Téléphone relié au réseau public obligatoire. Mise en place d'extincteurs dans les circulations (1 par 200 m², max 15m entre chacun)."
      }
    ]
  },
  {
    id: "dtu-erp-fiche-5",
    title: "ERP Type R - Établissements d'enseignement et colonies de vacances",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de type R",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 5ème catégorie selon effectif. 1ère : > 1500 pers., 2ème : 701-1500, 3ème : 301-700, 4ème : ≤ 300, 5ème : ≤ 200 (100 en étage ou sous-sol).",
        type: "standard"
      },
      {
        title: "Calcul d'effectif",
        content: "Écoles maternelles et crèches: 1 pers. / 2m² dans les classes, 1 pers. / 1m² dans les dortoirs. Autres établissements: selon déclaration du chef d'établissement ou 1 pers. / m² de classe.",
        type: "standard"
      },
      {
        title: "Conception",
        content: "Pour les écoles maternelles, les locaux à sommeil doivent être placés au rez-de-chaussée ou au 1er étage. Interdit dans les bâtiments en rez-de-chaussée comportant des vides sanitaires.",
        type: "warning"
      },
      {
        title: "Dégagements",
        content: "Largeur 1,20 m pour les circulations principales, 0,90 m pour les secondaires. Escaliers: 1 UP par fraction de 100 personnes pour les étages, 150 pour les rez-de-chaussée.",
        type: "standard"
      },
      {
        title: "Spécificités maternelles",
        content: "Maximum de 20 m à parcourir de tout point d'un local jusqu'à l'accès à un escalier. Portes des locaux accessibles aux élèves à 1,10 m maximum du sol.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Locaux à risques",
        content: "Laboratoires, ateliers, réserves de produits dangereux, chaufferies: isolés par parois CF 1h ou 2h selon risque. Stockage de liquides inflammables limité à 20L en armoire blindée dans les locaux de préparation."
      },
      {
        title: "Internat/hébergement",
        content: "Locaux à sommeil obligatoirement encloisonnés CF 1h, portes PF 1/2h avec ferme-porte. 10 m² min. par personne en chambre collective. Détection automatique obligatoire."
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour circulations horizontales encloisonnées, locaux > 100 m² en sous-sol ou sans ouverture sur l'extérieur, locaux > 300 m² en RDC ou étage."
      },
      {
        title: "Moyens de secours",
        content: "SSI de catégorie A pour les internats. Alarme type 1 pour les internats, type 2 pour les autres établissements. Plans d'intervention et consignes affichés à chaque niveau."
      }
    ]
  },
  {
    id: "dtu-erp-fiche-6",
    title: "ERP Type U - Établissements sanitaires",
    category: "Incendie ERP",
    description: "Dispositions spécifiques applicables aux établissements de santé",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Classement",
        content: "1ère à 5ème catégorie selon effectif. 5ème si ≤ 100 personnes. Calcul: 1 pers. par lit + personnel + visiteurs (1 visiteur pour 2 lits), ou 8 personnes pour 10 lits si hospitalisation de jour.",
        type: "standard"
      },
      {
        title: "Accessibilité",
        content: "Façades accessibles sur la moitié du périmètre au moins. Voie échelle le long de toutes les façades comportant des locaux à sommeil.",
        type: "warning"
      },
      {
        title: "Compartimentage",
        content: "Obligatoire dès la 4ème catégorie. Un compartiment = 1 niveau max, 800 m² max, 20 lits max par zone protégée. Parois CF 1h, portes CF 1/2h. Transfert horizontal patients.",
        type: "alert"
      },
      {
        title: "Chambre",
        content: "Portes PF 1/2h avec ferme-porte. Un espace d'attente sécurisé par chambre pour les établissements existants n'assurant pas l'évacuation immédiate.",
        type: "tip"
      },
      {
        title: "Détection incendie",
        content: "Obligatoire dans tous les locaux sauf sanitaires et circulations. Système de catégorie A. Alarme générale sélective ne fonctionnant que dans la zone sinistrée.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Locaux à risques",
        content: "Blocs opératoires, pharmacies, laboratoires, chaufferies: isolés par parois CF 2h (important) ou CF 1h (moyen), portes CF 1h ou CF 1/2h. Désenfumage mécanique obligatoire."
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour les circulations horizontales, les escaliers et les locaux > 400 m². Commandes manuelles des systèmes groupées par zone au poste de sécurité et à l'entrée des bâtiments."
      },
      {
        title: "Gaz médicaux",
        content: "Stockage d'oxygène selon normes spécifiques. Canalisations identifiées. Vanne de coupure accessible rapidement. Systèmes de secours pour alimentation électrique, notamment en soins intensifs."
      },
      {
        title: "Moyens de secours",
        content: "SSI catégorie A, alerte automatique des secours obligatoire. Service de sécurité incendie permanent (24h/24) pour les établissements > 1500 personnes. Formation spécifique du personnel."
      }
    ]
  }
];
