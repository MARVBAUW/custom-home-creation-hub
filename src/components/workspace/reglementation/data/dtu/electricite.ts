
import { DTU } from '../../dtu/types';

export const electriciteDTUs: DTU[] = [
  {
    id: "nfc-15-100",
    title: "NF C 15-100 - Installations électriques à basse tension",
    category: "Électricité",
    description: "Conception et réalisation des installations électriques",
    lastUpdate: "Octobre 2022",
    rules: [
      {
        title: "Section minimale des conducteurs",
        content: "La section minimale des conducteurs d'éclairage est de 1,5 mm² et celle des circuits de prises de courant est de 2,5 mm².",
        type: "standard"
      },
      {
        title: "Protection différentielle",
        content: "Toute installation doit comporter au moins un dispositif différentiel à haute sensibilité ≤ 30 mA protégeant l'ensemble des circuits terminaux.",
        type: "standard"
      },
      {
        title: "Risque électrique dans les salles d'eau",
        content: "Les volumes de sécurité (0, 1, 2) dans les salles d'eau doivent être strictement respectés. Aucun appareillage électrique non TBTS n'est autorisé dans les volumes 0 et 1.",
        type: "warning"
      },
      {
        title: "Identification des circuits",
        content: "Chaque circuit doit être identifié clairement au niveau du tableau électrique pour faciliter la maintenance et les interventions ultérieures.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "La norme NF C 15-100 s'applique aux installations électriques à basse tension des bâtiments d'habitation, tertiaires, industriels, agricoles, et établissements recevant du public."
      },
      {
        title: "Nombre de prises et points d'éclairage",
        content: "Dans un logement, chaque pièce de vie doit comporter au minimum 5 prises de courant. La cuisine doit disposer d'au moins 6 prises dont 4 au-dessus du plan de travail. Chaque pièce doit comporter au moins un point d'éclairage commandé."
      },
      {
        title: "Liaison équipotentielle",
        content: "Une liaison équipotentielle supplémentaire doit être réalisée dans les salles d'eau, reliant toutes les masses et éléments conducteurs (canalisations métalliques, huisseries, etc.)."
      }
    ]
  },
  {
    id: "ute-c-90-483",
    title: "UTE C 90-483 - Câblage résidentiel des réseaux de communication",
    category: "Électricité",
    description: "Infrastructures de communication dans les bâtiments résidentiels",
    lastUpdate: "Juin 2021",
    rules: [
      {
        title: "Grade minimal des câbles",
        content: "Les câbles utilisés pour les réseaux de communication doivent être au minimum de grade 3TV (câbles à paires torsadées catégorie 6 ou fibre optique).",
        type: "standard"
      },
      {
        title: "Tableau de communication",
        content: "Un tableau de communication (TC) doit être installé à proximité du tableau de répartition électrique et disposer d'au moins une rangée de 300 mm.",
        type: "standard"
      },
      {
        title: "Séparation des courants",
        content: "Les câbles courants forts et courants faibles doivent être séparés d'au moins 20 cm ou disposer d'une séparation physique pour éviter les interférences.",
        type: "warning"
      },
      {
        title: "Distribution en étoile",
        content: "Privilégier une distribution en étoile depuis le tableau de communication vers toutes les prises terminales pour faciliter les évolutions futures.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "La norme UTE C 90-483 s'applique aux infrastructures de communication dans les bâtiments résidentiels neufs et lors de rénovations complètes."
      },
      {
        title: "Prises terminales",
        content: "Chaque pièce de vie (séjour, chambre, bureau) doit être équipée d'au moins deux prises terminales de communication juxtaposées, dont une conçue pour les applications numériques (RJ45)."
      },
      {
        title: "Tests de conformité",
        content: "L'installation doit faire l'objet de tests de conformité à l'aide d'un testeur adapté permettant de vérifier la continuité, le câblage et les performances des liens."
      }
    ]
  },
  {
    id: "nfc-14-100",
    title: "NF C 14-100 - Installations de branchement électrique",
    category: "Électricité",
    description: "Conception et réalisation des branchements électriques",
    lastUpdate: "Novembre 2021",
    rules: [
      {
        title: "Emplacement du compteur",
        content: "Le compteur électrique doit être installé dans un emplacement facilement accessible, à une hauteur comprise entre 1,00 m et 1,80 m du sol fini.",
        type: "standard"
      },
      {
        title: "Gaine technique",
        content: "La gaine technique logement (GTL) doit avoir une largeur minimale de 600 mm et une profondeur de 200 mm pour accueillir les équipements électriques.",
        type: "standard"
      },
      {
        title: "Protection du branchement",
        content: "Les canalisations de branchement enterrées doivent être protégées mécaniquement sur toute leur longueur par un fourreau ou une goulotte.",
        type: "warning"
      },
      {
        title: "Réserve d'espace",
        content: "Prévoir une réserve d'espace de 20% dans la GTL pour permettre l'ajout futur d'équipements (Linky, domotique, etc.).",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "La norme NF C 14-100 s'applique aux installations de branchement à basse tension, depuis le réseau de distribution publique jusqu'au point de livraison (compteur)."
      },
      {
        title: "Puissance de branchement",
        content: "Le branchement peut être monophasé (jusqu'à 12 kVA) ou triphasé (jusqu'à 36 kVA), nécessitant des sections de câbles adaptées à la puissance souscrite."
      },
      {
        title: "Liaison de téléreport",
        content: "Une liaison de téléreport doit être prévue entre le compteur et un emplacement accessible depuis l'extérieur pour permettre le relevé à distance."
      }
    ]
  }
];
