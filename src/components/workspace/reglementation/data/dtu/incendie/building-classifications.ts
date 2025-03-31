
import { DTU } from '../../../dtu/types';

export const buildingClassificationsDTUs: DTU[] = [
  {
    id: "dtu-classification-batiment-1",
    title: "Classifications des bâtiments pour la sécurité incendie",
    category: "Incendie Classification",
    description: "Classifications des bâtiments selon leurs caractéristiques et destination pour la réglementation incendie",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Habitation",
        content: "1ère famille: Maisons individuelles R+1. 2ème famille: Maisons R+3 ou habitat collectif R+3. 3ème famille: R+4 à R+7. 4ème famille: R+7 à 50m. IGH: >50m.",
        type: "standard"
      },
      {
        title: "ERP",
        content: "Classement par type (activité: J à X) et catégorie (effectif: 1ère à 5ème). Types principaux: J (structures d'accueil), L (spectacles), M (commerces), N (restaurants), etc.",
        type: "standard"
      },
      {
        title: "IGH",
        content: "Classés par lettres: A (habitation), O (hôtels), R (enseignement), S (santé), W (bureaux), Z (mixtes). Hauteur plancher bas >50m pour dernier niveau accessible.",
        type: "warning"
      },
      {
        title: "ERT",
        content: "Établissements Recevant des Travailleurs: Code du travail. Classés selon effectif et hauteur. Dispositions spécifiques pour locaux >8m hauteur ou >300 personnes.",
        type: "standard"
      },
      {
        title: "ICPE",
        content: "Installations Classées Protection Environnement: rubrique 2XXX selon activité. Régime autorisation, enregistrement ou déclaration. Risques: Seveso seuil haut/bas.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Catégories d'ERP",
        content: "1ère catégorie: >1500 personnes. 2ème: 701 à 1500. 3ème: 301 à 700. 4ème: <300 (sauf 5ème catégorie). 5ème: petits établissements sous seuils spécifiques (ex. M: <200)."
      },
      {
        title: "Types d'ERP",
        content: "J: Structures d'accueil personnes âgées/handicapées. L: Salles spectacles/réunions. M: Magasins. N: Restaurants. O: Hôtels. P: Dancings. R: Enseignement. S: Bibliothèques. T: Expositions. U: Établissements sanitaires. W: Bureaux. X: Sportifs. Y: Musées."
      },
      {
        title: "Classement des habitations",
        content: "1ère famille: individuelles isolées/jumelées R+1 max. 2ème famille: individuelles >R+1, collectives ≤R+3. 3ème famille A: R+7 max, dernier niveau ≤28m, accès échelles pompiers. 3ème famille B: non-accès échelles ou >R+7. 4ème famille: dernier niveau ≤50m."
      },
      {
        title: "Types d'IGH",
        content: "GHA: habitation >50m. GHO: hôtels >50m. GHR: enseignement >50m. GHS: santé >28m. GHU: sanitaires >28m. GHW: bureaux >50m. GHZ: usage mixte >50m. ITGH: immeuble de très grande hauteur >200m."
      }
    ],
    schemas: [
      {
        id: "schema-classification-1",
        title: "Classification des habitations",
        imageUrl: "/images/schemas/classification-habitations.png",
        description: "Représentation schématique des différentes familles d'habitations selon leur hauteur et configuration."
      }
    ]
  }
];
