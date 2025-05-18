
import { DTU } from '../../dtu/types';

export const eurocodeDTUs: DTU[] = [
  {
    id: "eurocode-1",
    title: "Eurocode 1 - Actions sur les structures en PACA",
    category: "Eurocodes",
    description: "Définit les principes généraux pour le calcul des actions à considérer dans le dimensionnement des structures en région méditerranéenne.",
    lastUpdate: "2023-02-10",
    rules: [
      {
        title: "Charges climatiques spécifiques à la PACA",
        content: "En région PACA, les charges de vent peuvent atteindre des valeurs importantes, notamment lors des épisodes de mistral. Une attention particulière doit être portée aux façades exposées.",
        type: "warning"
      },
      {
        title: "Charges d'exploitation",
        content: "Catégorisation des charges selon l'usage du bâtiment (résidentiel, commercial, etc.) avec application des coefficients de sécurité adaptés aux normes françaises.",
        type: "standard"
      }
    ]
  },
  {
    id: "eurocode-2",
    title: "Eurocode 2 - Calcul des structures en béton pour la région PACA",
    category: "Eurocodes",
    description: "Spécifications pour le calcul des structures en béton armé et précontraint adaptées aux conditions climatiques méditerranéennes.",
    lastUpdate: "2023-03-15",
    rules: [
      {
        title: "Enrobage des armatures en zone côtière",
        content: "L'enrobage minimal des armatures en zone côtière méditerranéenne doit être augmenté en raison de l'exposition aux embruns marins, particulièrement à Marseille et Toulon.",
        type: "warning"
      },
      {
        title: "Dimensionnement parasismique",
        content: "Les poutres doivent être dimensionnées avec une attention particulière aux efforts sismiques, la région PACA étant classée en zones de sismicité 3 et 4.",
        type: "alert"
      }
    ]
  },
  {
    id: "eurocode-8",
    title: "Eurocode 8 - Conception parasismique des structures en PACA",
    category: "Eurocodes",
    description: "Règles spécifiques pour la conception et le dimensionnement des structures en zone sismique, particulièrement importantes en région PACA.",
    lastUpdate: "2023-05-20",
    rules: [
      {
        title: "Zonage sismique en PACA",
        content: "La région PACA est majoritairement classée en zone de sismicité 3 (modérée) à 4 (moyenne), avec des exigences spécifiques pour chaque zone.",
        type: "standard"
      },
      {
        title: "Régularité des bâtiments",
        content: "Recommandations pour la conception de bâtiments réguliers en plan et en élévation afin d'améliorer leur comportement face aux séismes en région méditerranéenne.",
        type: "tip"
      }
    ]
  }
];
