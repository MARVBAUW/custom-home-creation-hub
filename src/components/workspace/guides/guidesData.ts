import { BookOpen, FileText, Video, FileSpreadsheet, Calculator } from 'lucide-react';
import { GuideCategory, GuideDocument } from './types';

// Guide Categories
export const guideCategories: GuideCategory[] = [
  { id: 'tous', name: 'Tous les guides', icon: BookOpen },
  { id: 'construction', name: 'Construction', icon: FileText },
  { id: 'renovation', name: 'Rénovation', icon: FileSpreadsheet },
  { id: 'reglementation', name: 'Réglementation', icon: FileText },
  { id: 'videos', name: 'Tutoriels Vidéo', icon: Video },
  { id: 'calculateurs', name: 'Calculateurs', icon: Calculator },
];

// Guide Documents
export const guideDocuments: GuideDocument[] = [
  {
    id: '1',
    title: 'Guide complet de la construction',
    description: 'Tout ce que vous devez savoir pour réussir votre projet de construction du début à la fin.',
    type: 'pdf',
    fileSize: '4.2 MB',
    lastUpdated: '2023-10-15',
    url: '/files/guide-construction.pdf',
    categoryId: 'construction',
    featured: true,
    isNew: false,
    content: `
    # Guide complet de la construction

    ## Introduction
    Ce guide a été conçu pour vous accompagner à travers chaque étape de votre projet de construction, de la conception initiale à la remise des clés.

    ## Sommaire
    1. Définir votre projet et votre budget
    2. Choisir un terrain adapté
    3. Sélectionner les professionnels qui vous accompagneront
    4. Comprendre les démarches administratives
    5. Suivre efficacement le chantier
    6. Réceptionner les travaux

    ## 1. Définir votre projet et votre budget
    La première étape, et sans doute la plus importante, est de définir clairement votre projet et d'établir un budget réaliste. Prenez en compte non seulement le coût de la construction, mais aussi les frais annexes comme :
    - Les frais de notaire
    - Les taxes d'aménagement
    - Les raccordements aux réseaux
    - L'aménagement extérieur
    - Les éventuels dépassements de budget (prévoyez une marge de 10% minimum)

    ## 2. Choisir un terrain adapté
    Le choix du terrain déterminera en grande partie votre projet. Analysez :
    - La localisation et l'environnement
    - L'exposition et la topographie
    - Les contraintes d'urbanisme (PLU, servitudes)
    - L'accessibilité aux réseaux
    - Les risques naturels et technologiques

    ## 3. Sélectionner les professionnels
    Selon la complexité de votre projet, vous pourrez faire appel à :
    - Un architecte
    - Un maître d'œuvre comme Progineer
    - Un constructeur de maisons individuelles
    - Des artisans si vous optez pour l'auto-construction partielle

    ## 4. Comprendre les démarches administratives
    Votre projet nécessitera différentes autorisations :
    - Déclaration préalable de travaux ou permis de construire
    - Déclaration d'ouverture de chantier
    - Assurance dommage-ouvrage (obligatoire)
    - Déclaration d'achèvement des travaux

    ## 5. Suivre efficacement le chantier
    Le suivi de chantier implique :
    - Des réunions régulières avec les intervenants
    - Le respect du planning
    - La validation des différentes étapes
    - La gestion des éventuelles modifications

    ## 6. Réceptionner les travaux
    La réception des travaux est une étape juridique importante qui marque le transfert de la garde de l'ouvrage et le point de départ des garanties.

    Pour plus d'informations ou un accompagnement personnalisé, n'hésitez pas à contacter notre équipe.
    `
  },
  {
    id: '2',
    title: 'Rénovation énergétique',
    description: 'Comment rénover votre logement pour réduire votre consommation énergétique et augmenter votre confort.',
    type: 'pdf',
    fileSize: '3.8 MB',
    lastUpdated: '2023-11-20',
    url: '/files/renovation-energetique.pdf',
    categoryId: 'renovation',
    featured: true,
    isNew: true,
    content: `
    # Guide de rénovation énergétique

    ## Pourquoi rénover énergétiquement votre logement ?
    La rénovation énergétique présente de nombreux avantages :
    - Réduction significative des factures d'énergie
    - Amélioration du confort thermique été comme hiver
    - Valorisation de votre patrimoine immobilier
    - Contribution à la réduction des émissions de gaz à effet de serre
    - Possibilité de bénéficier d'aides financières importantes

    ## Les points clés d'une rénovation énergétique efficace
    
    ### 1. L'isolation thermique
    L'isolation est la priorité absolue. Concentrez-vous sur :
    - L'isolation des combles (30% des pertes de chaleur)
    - L'isolation des murs (25% des pertes)
    - Le remplacement des fenêtres (13% des pertes)
    - L'isolation des planchers bas (7% des pertes)

    ### 2. La ventilation
    Une bonne ventilation est essentielle pour :
    - Évacuer l'humidité et les polluants
    - Prévenir les problèmes de condensation et de moisissures
    - Maintenir une bonne qualité d'air intérieur
    
    Les solutions comme la VMC double flux permettent de récupérer la chaleur de l'air extrait.

    ### 3. Le chauffage et la production d'eau chaude
    Après avoir isolé, optimisez votre système de chauffage :
    - Pompe à chaleur (aérothermie ou géothermie)
    - Chaudière à condensation
    - Poêle à bois ou granulés
    - Systèmes solaires thermiques

    ### 4. Les énergies renouvelables
    Complétez votre rénovation par l'installation de :
    - Panneaux photovoltaïques
    - Chauffe-eau solaire
    - Récupération des eaux de pluie

    ## La démarche pour une rénovation réussie
    1. Réaliser un audit énergétique
    2. Définir un plan de travaux cohérent
    3. Faire appel à des professionnels qualifiés RGE
    4. Prioriser les travaux selon leur impact énergétique
    5. S'informer sur les aides financières disponibles

    Chez Progineer, nous vous accompagnons dans toutes ces étapes pour une rénovation énergétique performante et adaptée à votre budget.
    `
  },
  {
    id: '3',
    title: 'Normes de construction parasismiques',
    description: 'Comprendre les normes de construction parasismiques pour assurer la sécurité de votre bâtiment.',
    type: 'text',
    lastUpdated: '2023-09-01',
    url: '#',
    categoryId: 'reglementation',
    content: `
    # Normes de construction parasismiques

    ## Introduction
    Les zones sismiques en France sont classées de 1 à 5, la zone 1 étant la moins à risque et la zone 5 la plus à risque. Les normes de construction parasismiques visent à protéger les bâtiments et leurs occupants en cas de tremblement de terre.

    ## Les principes clés
    - **Conception:** Le bâtiment doit être conçu pour résister aux forces sismiques.
    - **Matériaux:** Utilisation de matériaux résistants et adaptés.
    - **Construction:** Respect strict des règles de construction parasismiques.

    ## Les obligations réglementaires
    Les bâtiments construits dans les zones sismiques doivent respecter les normes Eurocode 8 et les règles de construction parasismiques françaises.

    Pour plus d'informations, consultez le site du gouvernement.
    `,
    isNew: false
  },
  {
    id: '4',
    title: 'Tutoriel : Installation de panneaux solaires',
    description: 'Apprenez à installer des panneaux solaires sur votre toit grâce à ce tutoriel vidéo.',
    type: 'video',
    duration: '15 minutes',
    lastUpdated: '2023-08-10',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    categoryId: 'videos',
    isNew: false
  },
  {
    id: '5',
    title: 'Calculateur de surface habitable',
    description: 'Estimez rapidement la surface habitable de votre logement avec notre calculateur en ligne.',
    type: 'text',
    lastUpdated: '2023-07-01',
    url: '#',
    categoryId: 'calculateurs',
    content: `
    # Calculateur de surface habitable

    ## Introduction
    La surface habitable est la surface de plancher construite, après déduction des surfaces occupées par les murs, cloisons, marches et cages d'escalier, gaines, embrasures de portes et de fenêtres. Il n'est pas tenu compte de la superficie des dépendances.

    ## Comment calculer la surface habitable ?
    1. Mesurez la surface de chaque pièce.
    2. Déduisez les surfaces non habitables (murs, escaliers, etc.).
    3. Additionnez les surfaces habitables de chaque pièce.

    Notre calculateur en ligne vous permet d'estimer rapidement votre surface habitable.
    `,
    isNew: false
  },
  {
    id: '6',
    title: 'Guide des aides financières à la rénovation',
    description: 'Découvrez toutes les aides financières disponibles pour vos travaux de rénovation.',
    type: 'pdf',
    fileSize: '2.5 MB',
    lastUpdated: '2023-06-15',
    url: '/files/aides-financieres-renovation.pdf',
    categoryId: 'renovation',
    isNew: false
  },
  {
    id: '7',
    title: 'Les étapes clés d\'un projet de construction',
    description: 'Ce guide vous détaille les étapes essentielles pour mener à bien votre projet de construction.',
    type: 'text',
    lastUpdated: '2023-05-20',
    url: '#',
    categoryId: 'construction',
    content: `
    # Les étapes clés d'un projet de construction

    ## Introduction
    Un projet de construction réussi nécessite une planification rigoureuse et le respect de certaines étapes clés.

    ## Les étapes essentielles
    1. Définition du projet et du budget.
    2. Recherche et acquisition du terrain.
    3. Conception du projet (plans, permis de construire).
    4. Sélection des entreprises et artisans.
    5. Réalisation des travaux.
    6. Réception des travaux et levée des réserves.

    Chaque étape est cruciale pour la réussite de votre projet.
    `,
    isNew: false
  },
  {
    id: '8',
    title: 'Calculateur de prêt immobilier',
    description: 'Estimez vos mensualités et votre capacité d\'emprunt avec notre calculateur de prêt immobilier.',
    type: 'text',
    lastUpdated: '2023-04-01',
    url: '#',
    categoryId: 'calculateurs',
    content: `
    # Calculateur de prêt immobilier

    ## Introduction
    Le financement est une étape importante de votre projet immobilier. Notre calculateur vous aide à estimer vos mensualités et votre capacité d'emprunt.

    ## Comment utiliser le calculateur ?
    1. Indiquez le montant du prêt souhaité.
    2. Saisissez la durée du prêt en années.
    3. Renseignez le taux d'intérêt annuel.

    Le calculateur vous fournira une estimation de vos mensualités et du coût total du prêt.
    `,
    isNew: false
  },
  {
    id: '9',
    title: 'La réglementation thermique RT2020',
    description: 'Tout savoir sur la réglementation thermique RT2020 et ses exigences.',
    type: 'text',
    lastUpdated: '2023-03-10',
    url: '#',
    categoryId: 'reglementation',
    content: `
    # La réglementation thermique RT2020

    ## Introduction
    La RT2020 est la réglementation thermique en vigueur pour les constructions neuves. Elle vise à améliorer la performance énergétique des bâtiments et à réduire leur impact environnemental.

    ## Les exigences de la RT2020
    - Bâtiments à énergie positive (BEPOS) : production d'énergie supérieure à la consommation.
    - Utilisation d'énergies renouvelables.
    - Isolation thermique renforcée.
    - Performance énergétique des équipements (chauffage, ventilation, éclairage).

    La RT2020 est une étape importante vers la transition énergétique.
    `,
    isNew: false
  },
  {
    id: '10',
    title: 'Tutoriel : Création d\'un plan de maison 3D',
    description: 'Apprenez à créer un plan de maison en 3D avec un logiciel gratuit grâce à ce tutoriel vidéo.',
    type: 'video',
    duration: '20 minutes',
    lastUpdated: '2023-02-01',
    url: 'https://www.youtube.com/watch?v=YqeW9_5kURI',
    categoryId: 'videos',
    isNew: false
  },
];
