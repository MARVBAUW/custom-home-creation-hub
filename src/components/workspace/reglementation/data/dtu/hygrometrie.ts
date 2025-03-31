
import { DTU } from '../../dtu/types';

export const hygrometrieDTUs: DTU[] = [
  {
    id: "hygrometrie-1",
    title: "DTU 20.1 - Hygrométrie dans les bâtiments",
    category: "Hygrométrie",
    description: "Recommandations techniques pour la gestion de l'humidité dans les constructions.",
    lastUpdate: "2021-08-12",
    rules: [
      {
        title: "Classes d'hygrométrie",
        content: "Les bâtiments sont classés en 4 catégories selon leur taux d'hygrométrie intérieure.",
        type: "standard"
      },
      {
        title: "Pare-vapeur",
        content: "Un pare-vapeur doit être installé du côté chaud de l'isolation pour éviter la condensation interne.",
        type: "warning"
      }
    ]
  },
  {
    id: "hygrometrie-2",
    title: "DTU 25.41 - Plaque de plâtre en milieu humide",
    category: "Hygrométrie",
    description: "Spécifications pour l'installation des plaques de plâtre dans les pièces humides.",
    lastUpdate: "2020-06-05",
    rules: [
      {
        title: "Types de plaques",
        content: "En milieu humide, utiliser des plaques hydrofuges de type H1.",
        type: "alert"
      },
      {
        title: "Fixation",
        content: "L'espacement des fixations doit être réduit en zone humide pour garantir la stabilité.",
        type: "tip"
      }
    ]
  }
];
