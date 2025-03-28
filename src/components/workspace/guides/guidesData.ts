
import { FileText, Book, Video, CheckCircle, Calendar } from 'lucide-react';
import { GuideCategory, GuideDocument } from './types';

// Define categories with icons
export const categories: GuideCategory[] = [
  { id: "all", name: "Tous les guides", icon: <FileText className="h-4 w-4" /> },
  { id: "construction", name: "Construction", icon: <Book className="h-4 w-4" /> },
  { id: "renovation", name: "Rénovation", icon: <Video className="h-4 w-4" /> },
  { id: "regulations", name: "Réglementation", icon: <CheckCircle className="h-4 w-4" /> },
  { id: "planning", name: "Planification", icon: <Calendar className="h-4 w-4" /> },
];

// Our guides data
export const guides: GuideDocument[] = [
  {
    id: "guide-1",
    title: "Guide complet sur la réglementation thermique RT 2020",
    description: "Découvrez toutes les exigences de la nouvelle réglementation thermique et comment les appliquer à vos projets de construction.",
    type: "pdf",
    fileSize: "4.2 MB",
    lastUpdated: "15/05/2023",
    url: "/documents/guide-rt2020.pdf",
    categoryId: "regulations",
    featured: true,
    isNew: true,
    content: "# Guide complet sur la réglementation thermique RT 2020\n\nLa RT 2020 est une réglementation thermique française qui vise à réduire les consommations énergétiques des bâtiments neufs. Elle s'inscrit dans la continuité de la RT 2012, mais avec des exigences accrues en matière de performance énergétique.\n\n## Objectifs principaux\n\n- Réduire les consommations énergétiques des bâtiments neufs\n- Limiter l'impact carbone des constructions\n- Favoriser l'utilisation d'énergies renouvelables\n- Assurer le confort thermique en été comme en hiver\n\n## Points clés à retenir\n\n1. **Consommation énergétique maximale** : La RT 2020 impose une consommation maximale d'énergie primaire de 50 kWh/m²/an, contre 80 kWh/m²/an pour la RT 2012.\n2. **Bilan énergétique positif** : Les bâtiments devront produire plus d'énergie qu'ils n'en consomment.\n3. **Empreinte carbone** : La RT 2020 introduit une limite d'émissions de gaz à effet de serre sur l'ensemble du cycle de vie du bâtiment.\n4. **Matériaux biosourcés** : Encouragement à l'utilisation de matériaux d'origine biologique (bois, chanvre, paille, etc.).\n\n## Applications pratiques\n\nPour respecter la RT 2020, voici quelques solutions techniques recommandées :\n\n- Isolation renforcée des murs, toitures et planchers\n- Menuiseries à triple vitrage\n- Ventilation double flux avec récupération de chaleur\n- Systèmes de chauffage à haute performance énergétique\n- Installation de panneaux photovoltaïques\n- Orientation et conception bioclimatique du bâtiment\n\n## Calendrier d'application\n\n- **1er janvier 2022** : Application aux bâtiments publics et aux bureaux\n- **1er juillet 2022** : Extension aux logements collectifs\n- **1er janvier 2023** : Application à l'ensemble des constructions neuves\n\nN'hésitez pas à consulter un professionnel pour adapter votre projet aux exigences de la RT 2020."
  },
  {
    id: "guide-2",
    title: "Optimiser la performance énergétique de votre habitation",
    description: "Améliorez l'efficacité énergétique de votre maison avec des solutions adaptées à tous les budgets.",
    type: "pdf",
    fileSize: "2.8 MB",
    lastUpdated: "03/04/2023",
    url: "/documents/performance-energetique.pdf",
    categoryId: "renovation"
  },
  {
    id: "guide-3",
    title: "Webinaire: Les nouvelles normes de construction durable",
    description: "Replay de notre webinaire sur les normes environnementales en vigueur pour les nouvelles constructions.",
    type: "video",
    duration: "45 min",
    lastUpdated: "22/03/2023",
    url: "/videos/webinaire-construction-durable.mp4",
    categoryId: "construction",
    featured: true
  },
  {
    id: "guide-4",
    title: "Texte intégral de la réglementation environnementale 2020",
    description: "Document officiel complet sur la RE2020 avec annotations et explications.",
    type: "pdf",
    fileSize: "7.5 MB",
    lastUpdated: "10/01/2023",
    url: "/documents/re2020-texte-integral.pdf",
    categoryId: "regulations"
  },
  {
    id: "guide-5",
    title: "Planifier votre projet de construction: le guide pas à pas",
    description: "Toutes les étapes clés pour mener à bien votre projet de construction, de la conception à la livraison.",
    type: "pdf",
    fileSize: "3.1 MB",
    lastUpdated: "05/02/2023",
    url: "/documents/guide-planification.pdf",
    categoryId: "planning"
  },
  {
    id: "guide-6",
    title: "Les matériaux écologiques pour une construction durable",
    description: "Panorama complet des matériaux écologiques disponibles sur le marché et leurs applications.",
    type: "pdf",
    fileSize: "5.2 MB",
    lastUpdated: "18/04/2023",
    url: "/documents/materiaux-ecologiques.pdf",
    categoryId: "construction"
  },
  {
    id: "guide-7",
    title: "Rénovation énergétique: les aides financières 2023",
    description: "Guide sur toutes les aides disponibles pour financer vos travaux de rénovation énergétique.",
    type: "pdf",
    fileSize: "2.4 MB",
    lastUpdated: "12/05/2023",
    url: "/documents/aides-renovation.pdf",
    categoryId: "renovation",
    isNew: true
  },
  {
    id: "guide-8",
    title: "Tutoriel vidéo: Économiser l'énergie dans votre habitation",
    description: "Conseils pratiques pour réduire votre consommation d'énergie au quotidien.",
    type: "video",
    duration: "32 min",
    lastUpdated: "25/03/2023",
    url: "/videos/economie-energie.mp4",
    categoryId: "renovation"
  },
  {
    id: "guide-9",
    title: "Guide des démarches administratives pour construire",
    description: "Toutes les autorisations nécessaires et comment constituer vos dossiers efficacement.",
    type: "pdf",
    fileSize: "3.8 MB",
    lastUpdated: "08/02/2023",
    url: "/documents/demarches-administratives.pdf",
    categoryId: "planning"
  },
  {
    id: "guide-10",
    title: "Les normes d'accessibilité pour les bâtiments",
    description: "Guide complet sur les normes d'accessibilité pour les personnes à mobilité réduite.",
    type: "pdf",
    fileSize: "4.5 MB",
    lastUpdated: "15/03/2023",
    url: "/documents/normes-accessibilite.pdf",
    categoryId: "regulations"
  },
  {
    id: "guide-11",
    title: "Réduire l'impact environnemental de votre chantier",
    description: "Pratiques recommandées pour limiter l'empreinte écologique pendant les travaux.",
    type: "pdf",
    fileSize: "2.9 MB",
    lastUpdated: "02/04/2023",
    url: "/documents/impact-environnemental.pdf",
    categoryId: "construction"
  },
  {
    id: "guide-12",
    title: "Webinaire: Rénovation de bâtiments anciens",
    description: "Replay de notre webinaire sur les techniques spécifiques à la rénovation du patrimoine ancien.",
    type: "video",
    duration: "58 min",
    lastUpdated: "19/02/2023",
    url: "/videos/webinaire-renovation-ancien.mp4",
    categoryId: "renovation"
  },
  {
    id: "guide-13",
    title: "Checklist: Préparer votre projet de construction",
    description: "Liste complète des points à vérifier avant de démarrer votre projet de construction.",
    type: "pdf",
    fileSize: "1.7 MB",
    lastUpdated: "05/05/2023",
    url: "/documents/checklist-construction.pdf",
    categoryId: "planning",
    isNew: true
  },
  {
    id: "guide-14",
    title: "Guide des certifications environnementales en 2023",
    description: "Panorama des différents labels et certifications pour votre projet immobilier.",
    type: "pdf",
    fileSize: "3.6 MB",
    lastUpdated: "22/04/2023",
    url: "/documents/certifications-environnementales.pdf",
    categoryId: "regulations"
  },
  {
    id: "guide-15",
    title: "Les fondamentaux de l'isolation thermique et acoustique",
    description: "Guide technique sur les principes et solutions d'isolation pour votre habitation.",
    type: "pdf",
    fileSize: "5.8 MB",
    lastUpdated: "11/03/2023",
    url: "/documents/isolation-guide.pdf",
    categoryId: "construction"
  }
];
