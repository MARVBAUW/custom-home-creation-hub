
import { BookOpen, Files, Home, FileCode, FileText, Calculator, BookCheck, Scale, Building, FileBarChart2 } from 'lucide-react';
import { GuideCategory, GuideDocument } from './types';

// Définition des catégories de guides
export const guideCategories: GuideCategory[] = [
  { id: "tous", name: "Tous", icon: Files },
  { id: "construction", name: "Construction", icon: Building },
  { id: "renovation", name: "Rénovation", icon: Home },
  { id: "reglementation", name: "Réglementation", icon: Scale },
  { id: "techniques", name: "Techniques", icon: FileCode },
  { id: "financier", name: "Financier", icon: FileBarChart2 }
];

// Définition des documents/guides
export const guideDocuments: GuideDocument[] = [
  {
    id: "guide-1",
    title: "Guide complet de la construction neuve",
    description: "Toutes les étapes pour réussir votre projet de construction neuve en région PACA",
    type: "pdf",
    fileSize: "4.2 MB",
    lastUpdated: "2023-11-15",
    url: "#",
    categoryId: "construction",
    featured: true,
    isNew: true,
    content: `
# Guide complet de la construction neuve

## Introduction
Construire une maison neuve est un projet passionnant mais complexe. Ce guide vous accompagne à chaque étape pour réussir votre projet en région PACA.

## Les étapes clés de votre projet
1. **Définition de votre projet** - Budget, besoins, localisation
2. **Recherche du terrain** - Critères essentiels, règles d'urbanisme
3. **Conception architecturale** - Plans, esquisse, insertion paysagère
4. **Démarches administratives** - Permis de construire, déclarations
5. **Sélection des professionnels** - Constructeur, artisans, maître d'œuvre
6. **Suivi du chantier** - Réunions, contrôles, coordination
7. **Réception des travaux** - Vérifications, réserves, garanties

## Spécificités de la région PACA
* Adaptation au climat méditerranéen
* Normes parasismiques
* Architecture locale et intégration paysagère
* Réglementations thermiques renforcées

## Budget et financement
* Estimation des coûts de construction
* Frais annexes (terrain, raccordements, taxes)
* Options de financement
* Aides régionales disponibles
    `
  },
  {
    id: "guide-2",
    title: "Les pièges à éviter en rénovation",
    description: "Découvrez les erreurs courantes et comment les éviter lors de vos projets de rénovation",
    type: "pdf",
    fileSize: "2.8 MB",
    lastUpdated: "2023-09-30",
    url: "#",
    categoryId: "renovation",
    featured: true,
    content: `
# Les pièges à éviter en rénovation

## Introduction
La rénovation d'un bien immobilier est souvent semée d'embûches. Ce guide vous aide à identifier et éviter les erreurs les plus courantes.

## Avant les travaux
* Sous-estimer l'importance du diagnostic initial
* Négliger les démarches administratives
* Mal évaluer le budget global
* Choisir des professionnels uniquement sur le prix

## Pendant les travaux
* Ne pas prévoir de marge dans le planning
* Modifier constamment le projet initial
* Négliger la coordination entre corps de métier
* Faire l'impasse sur le suivi de chantier régulier

## Aspects techniques
* Mauvaise gestion de l'humidité
* Problèmes d'isolation thermique
* Questions électriques et de sécurité
* Traitement inapproprié des matériaux existants

## Solutions recommandées
* Méthodologie de planification efficace
* Checklist de vérification pour chaque étape
* Comment gérer les imprévus
* Communication efficace avec les professionnels
    `
  },
  {
    id: "guide-3",
    title: "La RT 2020 expliquée simplement",
    description: "Comprendre facilement la réglementation thermique 2020 et son impact sur votre projet",
    type: "text",
    lastUpdated: "2023-10-12",
    url: "#",
    categoryId: "reglementation",
    content: `
# La RT 2020 expliquée simplement

## Qu'est-ce que la RT 2020 ?
La RT 2020, ou Réglementation Environnementale 2020 (RE2020), est le nouveau cadre réglementaire qui remplace la RT 2012. Elle vise à réduire significativement la consommation énergétique des bâtiments neufs et leur impact environnemental.

## Principaux objectifs
* Diminuer l'impact carbone des bâtiments
* Poursuivre l'amélioration de la performance énergétique
* Garantir le confort des occupants en toute saison

## Les changements majeurs
* Introduction d'un indicateur carbone sur l'ensemble du cycle de vie
* Renforcement des exigences de performance énergétique
* Valorisation des énergies renouvelables
* Adaptation au changement climatique (confort d'été)

## Impact sur votre projet
* Choix des matériaux et techniques constructives
* Solutions énergétiques à privilégier
* Conception bioclimatique renforcée
* Anticipation des surcoûts potentiels

## Comment s'y préparer
* Travailler avec des professionnels formés à la RE2020
* Anticiper les études thermiques et environnementales
* Privilégier les matériaux biosourcés
* Optimiser l'orientation et la conception dès les premières phases
    `
  },
  {
    id: "guide-4",
    title: "Techniques d'isolation performantes",
    description: "Guide complet sur les techniques d'isolation modernes pour une performance énergétique optimale",
    type: "pdf",
    fileSize: "3.5 MB",
    lastUpdated: "2023-08-20",
    url: "#",
    categoryId: "techniques",
    content: `
# Techniques d'isolation performantes

## L'importance d'une bonne isolation
Une isolation de qualité est fondamentale pour le confort thermique, les économies d'énergie et la durabilité de votre bâtiment.

## Isolation des murs
* Isolation par l'intérieur (ITI)
* Isolation par l'extérieur (ITE)
* Matériaux traditionnels vs biosourcés
* Performance et épaisseurs recommandées

## Isolation des combles et toitures
* Combles perdus vs combles aménagés
* Techniques de mise en œuvre
* Points de vigilance (ventilation, étanchéité)
* Solutions innovantes

## Isolation des sols
* Dalle sur terre-plein
* Planchers bas sur vide sanitaire
* Planchers intermédiaires

## Menuiseries et ponts thermiques
* Choix des fenêtres et portes
* Traitement des ponts thermiques
* Étanchéité à l'air

## Matériaux d'isolation innovants
* Isolants minces réfléchissants
* Aérogels et mousses haute performance
* Matériaux à changement de phase
* Isolants sous vide
    `
  },
  {
    id: "guide-5",
    title: "Optimiser le financement de votre projet",
    description: "Stratégies et conseils pour financer efficacement votre projet immobilier",
    type: "pdf",
    fileSize: "2.1 MB",
    lastUpdated: "2023-12-01",
    url: "#",
    categoryId: "financier",
    featured: true,
    isNew: true,
    content: `
# Optimiser le financement de votre projet

## Préparer son plan de financement
* Évaluation précise du budget global
* Constitution de l'apport personnel
* Capacité d'emprunt et endettement
* Réserve pour imprévus

## Les solutions de crédit
* Prêt immobilier classique
* Prêt à taux zéro (PTZ)
* Prêt action logement (ex 1% logement)
* Prêts spécifiques (PAS, prêt conventionné)

## Aides et subventions
* Aides de l'ANAH
* MaPrimeRénov'
* Aides locales et régionales
* Certificats d'économie d'énergie (CEE)

## Optimisation fiscale
* Dispositifs d'investissement locatif
* Crédit d'impôt et réductions fiscales
* TVA à taux réduit
* Exonération de taxe foncière

## Stratégies avancées
* Financement en plusieurs phases
* Montages juridiques spécifiques
* Auto-construction partielle
* Habitat participatif
    `
  },
  {
    id: "guide-6",
    title: "Rénovation énergétique - Le guide complet",
    description: "Tout ce que vous devez savoir pour réussir la rénovation énergétique de votre logement",
    type: "pdf",
    fileSize: "4.7 MB",
    lastUpdated: "2023-11-05",
    url: "#",
    categoryId: "renovation",
    content: `
# Rénovation énergétique - Le guide complet

## Pourquoi rénover énergétiquement ?
* Économies sur les factures d'énergie
* Amélioration du confort thermique
* Valorisation du patrimoine immobilier
* Impact environnemental réduit

## Diagnostic et état des lieux
* DPE et audit énergétique
* Détection des pathologies du bâti
* Priorisation des travaux
* Scénarios de rénovation

## Solutions techniques par poste
* Isolation (murs, toiture, planchers)
* Menuiseries extérieures
* Ventilation et qualité de l'air
* Chauffage et eau chaude sanitaire
* Énergies renouvelables

## Approche globale vs rénovation par étapes
* Avantages/inconvénients de chaque approche
* Phasage cohérent des travaux
* Coordination des interventions
* Solutions transitoires

## Financement et accompagnement
* Dispositifs d'aide spécifiques
* Parcours administratif
* Accompagnateurs Rénov'
* Suivi post-travaux et évaluation
    `
  },
  {
    id: "guide-7",
    title: "Fondamentaux de la conception bioclimatique",
    description: "Principes essentiels pour concevoir un bâtiment en harmonie avec son environnement",
    type: "text",
    lastUpdated: "2023-07-15",
    url: "#",
    categoryId: "techniques",
    content: `
# Fondamentaux de la conception bioclimatique

## Principes de base
La conception bioclimatique vise à tirer parti des conditions climatiques favorables tout en se protégeant des aspects défavorables, pour créer un bâtiment confortable et économe en énergie.

## Implantation et orientation
* Analyse du site (topographie, végétation, vents)
* Orientation optimale selon la région climatique
* Gestion des masques solaires
* Protection contre les vents dominants

## Gestion de l'ensoleillement
* Conception des ouvertures (taille, position)
* Protections solaires adaptées aux saisons
* Inertie thermique et déphasage
* Serres et espaces tampons

## Ventilation naturelle
* Principes de la ventilation traversante
* Effet cheminée et tirage thermique
* Rafraîchissement passif nocturne
* Puits canadien/provençal

## Matériaux et systèmes constructifs
* Choix selon l'inertie thermique
* Isolants adaptés au climat local
* Solutions constructives intégrées
* Végétalisation (toitures, façades)

## Applications en région PACA
* Spécificités du climat méditerranéen
* Solutions adaptées à la chaleur estivale
* Gestion de l'eau et des ressources
* Exemples de réalisations locales
    `
  },
  {
    id: "guide-8",
    title: "Guide des démarches administratives en construction",
    description: "Toutes les démarches et autorisations nécessaires pour votre projet de construction",
    type: "pdf",
    fileSize: "2.4 MB",
    lastUpdated: "2023-09-10",
    url: "#",
    categoryId: "reglementation",
    content: `
# Guide des démarches administratives en construction

## Comprendre les documents d'urbanisme
* PLU, POS, carte communale
* Règlement et zonage
* Servitudes et contraintes particulières
* Certificat d'urbanisme

## Autorisations d'urbanisme
* Déclaration préalable de travaux
* Permis de construire
* Permis d'aménager
* Permis modificatif et transfert

## Constitution des dossiers
* Pièces obligatoires
* Recours à un architecte
* Insertion paysagère
* Notice descriptive et technique

## Instruction et délais
* Dépôt et récépissé
* Délais d'instruction standards et majorés
* Demandes de pièces complémentaires
* Affichage et recours des tiers

## Après l'obtention
* Déclaration d'ouverture de chantier
* Modifications en cours de chantier
* Déclaration d'achèvement des travaux
* Conformité et contentieux éventuels
    `
  },
  {
    id: "guide-9",
    title: "Les fondations en terrain difficile",
    description: "Solutions techniques pour construire sur des terrains à contraintes géotechniques",
    type: "video",
    duration: "18:45",
    lastUpdated: "2023-10-25",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categoryId: "techniques",
    content: `
# Les fondations en terrain difficile

## Comprendre son terrain
* Études géotechniques (G1, G2, G3)
* Identification des risques
* Interprétation des rapports de sol
* Hydrologie et gestion des eaux

## Types de terrains difficiles
* Sols argileux et retrait-gonflement
* Terrains en pente
* Présence d'eau/nappe phréatique
* Remblais et sols hétérogènes
* Zones sismiques

## Solutions de fondations adaptées
* Semelles filantes renforcées
* Radier général
* Puits et plots
* Micropieux
* Fondations spéciales

## Drainage et gestion des eaux
* Drains périphériques
* Pompes de relevage
* Gestion des eaux de ruissellement
* Barrières étanches

## Conception structurelle adaptée
* Joints de rupture
* Chaînages renforcés
* Adaptation du système constructif
* Sous-sols et vides sanitaires techniques
    `
  },
  {
    id: "guide-10",
    title: "Aides financières pour la rénovation énergétique 2023",
    description: "Panorama complet des dispositifs d'aide à la rénovation énergétique disponibles cette année",
    type: "pdf",
    fileSize: "1.9 MB",
    lastUpdated: "2023-12-15",
    url: "#",
    categoryId: "financier",
    isNew: true,
    content: `
# Aides financières pour la rénovation énergétique 2023

## Les aides nationales
* MaPrimeRénov' et ses forfaits
* CEE (Certificats d'Économie d'Énergie)
* Éco-PTZ (prêt à taux zéro)
* TVA à taux réduit (5,5%)
* Chèque énergie et ses bonus

## Aides locales en région PACA
* Aides du Conseil Régional
* Dispositifs départementaux
* Subventions communales et intercommunales
* Cumulabilité avec les aides nationales

## Aides spécifiques
* Aides de l'ANAH (Habiter Mieux Sérénité)
* Dispositifs pour les copropriétés
* Aides pour les bailleurs
* Solutions pour les ménages modestes

## Parcours et démarches
* France Rénov' et conseillers
* Séquençage des demandes
* Documents nécessaires
* Calendrier optimal

## Évolutions et perspectives
* Changements prévus en 2024
* Renforcement des exigences
* Nouveaux dispositifs à venir
* Stratégie d'optimisation des aides
    `
  },
  {
    id: "guide-11",
    title: "L'autoconstruction - Avantages et limites",
    description: "Tout ce qu'il faut savoir avant de se lancer dans un projet d'autoconstruction",
    type: "text",
    lastUpdated: "2023-06-20",
    url: "#",
    categoryId: "construction",
    content: `
# L'autoconstruction - Avantages et limites

## Définition et cadre légal
L'autoconstruction consiste à réaliser soi-même tout ou partie des travaux de construction de son logement, avec des implications juridiques et assurantielles spécifiques.

## Avantages de l'autoconstruction
* Économies financières potentielles
* Liberté de conception et d'exécution
* Satisfaction personnelle
* Progression à son rythme
* Maîtrise totale du projet

## Limites et points de vigilance
* Compétences techniques requises
* Temps nécessaire considérable
* Difficulté d'obtention des assurances
* Problèmes potentiels à la revente
* Complexité administrative

## Quelle part autoconstruire ?
* Travaux accessibles aux débutants
* Corps d'état techniques à confier
* Équilibre entre intervention personnelle et sous-traitance
* Coordination des intervenants

## Méthodes de réussite
* Formation préalable
* Documentation et ressources
* Accompagnement par des professionnels
* Planification rigoureuse
* Réseaux d'entraide et d'autoconstructeurs
    `
  },
  {
    id: "guide-12",
    title: "Gestion de l'eau dans le bâtiment",
    description: "Solutions durables pour gérer l'eau dans votre projet de construction ou rénovation",
    type: "pdf",
    fileSize: "3.2 MB",
    lastUpdated: "2023-08-05",
    url: "#",
    categoryId: "techniques",
    content: `
# Gestion de l'eau dans le bâtiment

## Approche globale
Une gestion intelligente de l'eau combine économies, récupération, traitement et protection contre les risques liés à l'eau.

## Économie d'eau
* Équipements hydro-économes
* Conception des réseaux
* Détection des fuites
* Comptage divisionnaire

## Récupération des eaux pluviales
* Dimensionnement des systèmes
* Usages autorisés
* Solutions techniques
* Réglementation applicable

## Gestion des eaux usées
* Systèmes d'assainissement individuels
* Phytoépuration
* Toilettes sèches
* Séparation des eaux grises/noires

## Protection contre l'humidité
* Étanchéité des fondations et soubassements
* Gestion des remontées capillaires
* Ventilation et régulation hygrométrique
* Matériaux perspirantes vs étanches

## Intégration paysagère
* Jardins de pluie
* Surfaces perméables
* Toitures végétalisées
* Bassins de rétention paysagers
    `
  }
];
