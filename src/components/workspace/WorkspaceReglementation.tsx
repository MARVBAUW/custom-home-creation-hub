
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCheck, Clock, Calendar, ArrowUpRight, Bell, FileText, Bookmark, Building, BookOpen, Landmark, HardHat, Home, Ruler, Search, FileWarning, Receipt, Shield, BookOpen as BookOpen2, Ruler as Ruler2 } from 'lucide-react';
import Button from '@/components/common/Button';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';

// Articles d'actualité générés - Enrichis avec davantage de contenu
const actualites = [
  {
    id: 1,
    title: "La RE2020 : nouvelles exigences pour les constructions à partir de septembre 2024",
    description: "La Réglementation Environnementale 2020 entre dans sa phase finale avec des seuils plus stricts pour les émissions de carbone et la performance énergétique des bâtiments neufs.",
    content: "Dès septembre 2024, les seuils d'émission de gaz à effet de serre seront renforcés de 15% pour toutes les constructions neuves. Les professionnels devront désormais intégrer l'analyse du cycle de vie complet des matériaux utilisés et privilégier les solutions biosourcées. Cette évolution s'accompagne d'exigences accrues sur l'étanchéité à l'air et le confort d'été sans climatisation active.",
    date: "2024-05-15",
    category: "réglementation",
    source: "Ministère de la Transition Écologique",
    readTime: "5 min",
    keywords: ["RE2020", "bâtiment neuf", "performance énergétique", "émissions carbone", "construction durable"]
  },
  {
    id: 2,
    title: "Aides MaPrimeRénov' 2024 : ce qui change pour les propriétaires",
    description: "Les nouveaux critères d'éligibilité et plafonds de l'aide à la rénovation énergétique évoluent en faveur des rénovations d'ampleur et des ménages modestes.",
    content: "La réforme de MaPrimeRénov' favorise désormais les rénovations globales avec un gain énergétique d'au moins deux classes sur le DPE. Les ménages modestes peuvent bénéficier jusqu'à 90% de financement pour leurs travaux, avec un plafond relevé à 35 000€ pour les rénovations complètes. Le dispositif exige maintenant un accompagnateur Rénov' agréé pour les projets dépassant 10 000€.",
    date: "2024-05-12",
    category: "financement",
    source: "ANAH",
    readTime: "4 min",
    keywords: ["MaPrimeRénov", "rénovation énergétique", "aide financière", "économies d'énergie", "transition écologique"]
  },
  {
    id: 3,
    title: "DPE correctif : nouvelles mesures pour les logements mal évalués",
    description: "Le gouvernement met en place un dispositif permettant de faire réviser les Diagnostics de Performance Énergétique jugés défavorables après vérification technique.",
    content: "Suite aux contestations de propriétaires concernant des DPE jugés trop sévères, le gouvernement a lancé la procédure de DPE correctif. Cette démarche permet, après expertise contradictoire, de réviser le classement énergétique d'un bien si des erreurs méthodologiques sont constatées. Une enveloppe de 20 millions d'euros est allouée pour financer partiellement ces contre-expertises, particulièrement pour les propriétaires de logements classés F ou G.",
    date: "2024-05-08",
    category: "diagnostic",
    source: "ADEME",
    readTime: "3 min",
    keywords: ["DPE", "diagnostic immobilier", "passoire thermique", "rénovation obligatoire", "location"]
  },
  {
    id: 4,
    title: "Fin des passoires thermiques : le calendrier s'accélère pour les propriétaires bailleurs",
    description: "À partir de 2025, les logements classés G ne pourront plus être proposés à la location, une échéance qui inquiète les propriétaires de biens anciens.",
    content: "L'interdiction de mise en location des logements classés G prend effet dès janvier 2025, suivie par les logements F en 2028 et E en 2034. Cette mesure impacte directement 600 000 logements en France. Les propriétaires concernés doivent engager des travaux de rénovation pour atteindre au minimum la classe E, avec un coût moyen estimé entre 15 000€ et 40 000€ selon la surface et l'état initial du bien.",
    date: "2024-05-03",
    category: "réglementation",
    source: "Ministère du Logement",
    readTime: "6 min",
    keywords: ["passoire thermique", "interdiction de location", "classe énergétique", "parc locatif", "rénovation obligatoire"]
  },
  {
    id: 5,
    title: "Obligation d'un audit énergétique : les notaires en première ligne",
    description: "L'obligation d'un audit énergétique pour les ventes de maisons individuelles classées F et G est désormais en vigueur, les notaires doivent vérifier la conformité des dossiers.",
    content: "Depuis avril 2023, l'audit énergétique est obligatoire pour toute vente de maison individuelle ou immeuble monopropriété classé F ou G. Ce document, distinct du DPE, doit proposer un parcours de travaux permettant d'atteindre au minimum la classe C. Les notaires sont tenus de vérifier sa présence dans le dossier de diagnostic technique, sous peine d'engager leur responsabilité professionnelle.",
    date: "2024-04-28",
    category: "diagnostic",
    source: "Chambre des Notaires",
    readTime: "4 min",
    keywords: ["audit énergétique", "vente immobilière", "notaire", "diagnostic technique", "rénovation énergétique"]
  },
  {
    id: 6,
    title: "TVA à 5,5% pour les travaux d'isolation : quels matériaux sont éligibles ?",
    description: "La liste des matériaux d'isolation bénéficiant du taux réduit de TVA a été étendue pour inclure les isolants biosourcés à haute performance environnementale.",
    content: "L'administration fiscale a élargi la liste des matériaux d'isolation éligibles au taux réduit de TVA à 5,5%. Sont désormais inclus les isolants à base de fibres de bois, de chanvre, de lin et de ouate de cellulose répondant aux critères de performance thermique minimum. Pour bénéficier de ce taux, les travaux doivent être réalisés par un professionnel certifié RGE et concerner la résidence principale achevée depuis plus de deux ans.",
    date: "2024-04-22",
    category: "fiscalité",
    source: "Direction Générale des Finances Publiques",
    readTime: "5 min",
    keywords: ["TVA réduite", "isolation thermique", "matériaux biosourcés", "rénovation énergétique", "fiscalité immobilière"]
  },
  {
    id: 7,
    title: "Loi Climat et Résilience : impact sur l'artificialisation des sols",
    description: "Les collectivités locales doivent désormais réviser leurs documents d'urbanisme pour respecter l'objectif de réduction de l'artificialisation des sols de 50% d'ici 2030.",
    content: "La loi Climat et Résilience impose aux communes de revoir leurs plans locaux d'urbanisme (PLU) avant 2027 pour intégrer l'objectif de réduction de moitié de l'artificialisation des sols d'ici 2030, puis atteindre le zéro artificialisation nette en 2050. Cette contrainte implique de privilégier la construction en hauteur, la réhabilitation de friches industrielles et la densification des zones déjà urbanisées, limitant ainsi les nouvelles constructions en périphérie.",
    date: "2024-04-18",
    category: "urbanisme",
    source: "France Urbaine",
    readTime: "7 min",
    keywords: ["artificialisation des sols", "PLU", "urbanisme durable", "densification urbaine", "aménagement du territoire"]
  },
  {
    id: 8,
    title: "BIM obligatoire pour les marchés publics de construction supérieurs à 5 millions d'euros",
    description: "Une nouvelle directive rend obligatoire l'utilisation du Building Information Modeling (BIM) pour tous les marchés publics de construction dépassant un certain seuil.",
    content: "À partir de janvier 2025, tous les marchés publics de construction d'un montant supérieur à 5 millions d'euros devront intégrer une maquette numérique BIM de niveau 2. Cette obligation vise à améliorer la coordination entre les différents intervenants, réduire les erreurs de conception et optimiser les coûts sur l'ensemble du cycle de vie du bâtiment. Les professionnels non formés à cette technologie risquent d'être exclus des appels d'offres publics importants.",
    date: "2024-04-15",
    category: "construction",
    source: "Ministère de l'Économie",
    readTime: "4 min",
    keywords: ["BIM", "maquette numérique", "marché public", "construction digitale", "appel d'offres"]
  },
  {
    id: 9,
    title: "Nouvelles normes parasismiques pour les constructions en zone 3",
    description: "Les règles de construction parasismique évoluent pour les zones à risque modéré, avec des exigences renforcées pour certains types de structures.",
    content: "La réglementation parasismique pour les zones à risque modéré (zone 3) a été mise à jour avec de nouvelles exigences pour les bâtiments à ossature bois et les structures mixtes. Les coefficients de comportement ont été révisés, imposant des dispositions constructives plus strictes pour les éléments de contreventement. Ces modifications visent à améliorer la résilience du bâti face aux séismes de magnitude moyenne, particulièrement pour les ERP et bâtiments collectifs.",
    date: "2024-04-10",
    category: "sécurité",
    source: "BRGM",
    readTime: "5 min",
    keywords: ["norme parasismique", "construction bois", "zone sismique", "Eurocodes", "réglementation construction"]
  },
  {
    id: 10,
    title: "Nouvelle réglementation sur la qualité de l'air intérieur dans les ERP",
    description: "Le gouvernement renforce les exigences de surveillance et d'amélioration de la qualité de l'air intérieur dans les établissements recevant du public.",
    content: "Un nouveau décret étend l'obligation de surveillance de la qualité de l'air intérieur à tous les établissements recevant du public (ERP). Les gestionnaires devront mesurer régulièrement les concentrations de polluants (COV, formaldéhyde, particules fines) et mettre en œuvre un plan d'actions correctives si les seuils réglementaires sont dépassés. Les systèmes de ventilation devront faire l'objet d'un entretien documenté et d'un contrôle tous les 4 ans par un organisme accrédité.",
    date: "2024-04-05",
    category: "santé",
    source: "Ministère de la Santé",
    readTime: "5 min",
    keywords: ["qualité air intérieur", "QAI", "ventilation", "ERP", "polluants intérieurs"]
  },
  {
    id: 11,
    title: "Loi sur le permis d'expérimenter : innovation dans la construction",
    description: "Le cadre juridique du « permis d'expérimenter » s'élargit pour favoriser l'innovation architecturale et technique.",
    content: "Le permis d'expérimenter, introduit par la loi ESSOC, voit son champ d'application élargi. Il permet désormais de déroger à certaines règles de construction en démontrant que les solutions alternatives atteignent des résultats équivalents. Cette flexibilité encourage l'innovation dans l'utilisation de matériaux biosourcés, les techniques de construction alternatives et les systèmes énergétiques innovants, tout en maintenant le niveau de sécurité et de performance exigé par la réglementation.",
    date: "2024-03-30",
    category: "innovation",
    source: "Ministère de la Cohésion des Territoires",
    readTime: "6 min",
    keywords: ["permis d'expérimenter", "innovation construction", "dérogation réglementaire", "matériaux innovants", "solutions alternatives"]
  },
  {
    id: 12,
    title: "Nouveaux DTU pour les systèmes constructifs à ossature bois",
    description: "Les Documents Techniques Unifiés concernant les constructions à ossature bois ont été révisés pour intégrer les avancées techniques du secteur.",
    content: "La révision des DTU 31.2 et 31.4 relatifs aux systèmes constructifs à ossature bois introduit des évolutions majeures pour ce type de construction en plein essor. Les nouvelles prescriptions concernent notamment les assemblages structuraux, la protection contre l'humidité et les performances acoustiques. Ces documents de référence intègrent désormais les spécificités des bâtiments de moyenne hauteur (jusqu'à R+6) et les retours d'expérience des constructions récentes.",
    date: "2024-03-25",
    category: "construction",
    source: "FCBA",
    readTime: "4 min",
    keywords: ["construction bois", "DTU 31.2", "ossature bois", "règles professionnelles", "bâtiment durable"]
  },
  {
    id: 13,
    title: "Décret tertiaire : premiers résultats de la plateforme OPERAT",
    description: "Premier bilan des déclarations sur la plateforme OPERAT dans le cadre du dispositif Éco-énergie tertiaire.",
    content: "L'ADEME vient de publier les premiers résultats des déclarations sur la plateforme OPERAT dans le cadre du dispositif Éco-énergie tertiaire. Seulement 35% des bâtiments tertiaires de plus de 1000 m² ont respecté leur obligation de déclaration, révélant un retard préoccupant. Les bâtiments déclarés devront réduire leur consommation énergétique de 40% d'ici 2030 par rapport à leur année de référence. Des sanctions financières jusqu'à 7500€ pourraient être appliquées aux retardataires.",
    date: "2024-03-20",
    category: "réglementation",
    source: "ADEME",
    readTime: "5 min",
    keywords: ["décret tertiaire", "OPERAT", "économie énergie", "bâtiment tertiaire", "rénovation énergétique"]
  },
  {
    id: 14,
    title: "Évolution des contrats d'architecte : les nouvelles dispositions à connaître",
    description: "Les contrats-types de l'Ordre des Architectes ont été mis à jour pour intégrer les nouvelles responsabilités liées à la transition écologique.",
    content: "L'Ordre des Architectes a publié une mise à jour des contrats-types pour intégrer de nouvelles clauses liées aux enjeux environnementaux. Les architectes doivent désormais inclure une mission spécifique d'analyse du cycle de vie du bâtiment et de conseil en matériaux à faible impact carbone. Ces contrats renforcent également les obligations d'information du maître d'ouvrage concernant les aides financières disponibles pour les solutions écologiques et les risques juridiques liés au non-respect des nouvelles réglementations environnementales.",
    date: "2024-03-15",
    category: "profession",
    source: "Ordre des Architectes",
    readTime: "6 min",
    keywords: ["contrat architecte", "mission architecte", "responsabilité professionnelle", "maîtrise d'œuvre", "construction durable"]
  },
  {
    id: 15,
    title: "Réforme du calcul des surfaces en copropriété : impact sur les tantièmes",
    description: "Une nouvelle méthode de calcul des surfaces privatives en copropriété pourrait modifier la répartition des charges dans certains immeubles.",
    content: "Une réforme du calcul des surfaces privatives en copropriété entrera en vigueur en juillet 2024. La nouvelle méthode harmonise les pratiques en incluant systématiquement les surfaces sous hauteur réduite (1,80m au lieu de 2,20m précédemment) et en précisant le traitement des mezzanines et des vérandas. Cette modification pourrait entraîner une révision des tantièmes dans les copropriétés existantes, avec un impact direct sur la répartition des charges. Les syndics devront proposer une mise à jour des règlements de copropriété lors des prochaines assemblées générales.",
    date: "2024-03-10",
    category: "juridique",
    source: "FNAIM",
    readTime: "4 min",
    keywords: ["copropriété", "tantièmes", "surface Carrez", "charges copropriété", "règlement copropriété"]
  },
  {
    id: 16,
    title: "Le diagnostic déchets devient obligatoire pour toute démolition",
    description: "L'extension du diagnostic PEMD (Produits, Équipements, Matériaux et Déchets) à toutes les opérations de démolition vise à améliorer le recyclage dans le secteur du BTP.",
    content: "À partir de juillet 2024, le diagnostic PEMD sera obligatoire pour toute démolition, quelle que soit la surface du bâtiment concerné. Cette extension du dispositif vise à maximiser le réemploi et le recyclage des matériaux de construction. Le diagnostic devra être réalisé par un professionnel certifié qui identifiera les filières de valorisation pour chaque type de matériau. Les maîtres d'ouvrage devront transmettre ce diagnostic aux entreprises de démolition et déclarer les quantités réellement réemployées ou recyclées sur une plateforme nationale.",
    date: "2024-03-05",
    category: "environnement",
    source: "ADEME",
    readTime: "5 min",
    keywords: ["diagnostic déchets", "PEMD", "économie circulaire", "démolition", "recyclage matériaux"]
  },
  {
    id: 17,
    title: "Renforcement des règles de sécurité incendie pour les bâtiments à façade bois",
    description: "Suite à plusieurs incendies majeurs, la réglementation se durcit pour les constructions utilisant le bois en façade.",
    content: "Un arrêté modificatif de la réglementation incendie renforce les exigences pour les bâtiments utilisant le bois en façade. Pour les constructions de 3e et 4e famille, des dispositifs coupe-feu supplémentaires deviennent obligatoires aux jonctions entre étages et des restrictions sont imposées sur le pourcentage de surface en bois apparent. Les concepteurs devront également prévoir des solutions spécifiques pour limiter la propagation du feu par les cavités de ventilation. Ces mesures visent à concilier l'utilisation croissante du bois dans la construction avec les impératifs de sécurité.",
    date: "2024-02-28",
    category: "sécurité",
    source: "Ministère de l'Intérieur",
    readTime: "5 min",
    keywords: ["sécurité incendie", "façade bois", "réglementation feu", "construction bois", "propagation incendie"]
  },
  {
    id: 18,
    title: "Révolution dans le financement des infrastructures urbaines avec le projet de loi ZAN",
    description: "Le projet de loi sur le Zéro Artificialisation Nette introduit de nouveaux mécanismes de financement pour les équipements publics.",
    content: "Le projet de loi d'application de l'objectif ZAN (Zéro Artificialisation Nette) intègre un dispositif innovant de participation financière pour l'aménagement urbain. Ce mécanisme permettra aux collectivités d'imposer aux promoteurs une contribution proportionnelle à la surface construite pour financer les équipements publics nécessaires à la densification (écoles, transports, espaces verts). Ce système remplacera partiellement la taxe d'aménagement, avec un calcul plus transparent et une affectation directe aux quartiers concernés par les projets immobiliers.",
    date: "2024-02-25",
    category: "urbanisme",
    source: "Ministère de la Cohésion des Territoires",
    readTime: "7 min",
    keywords: ["ZAN", "financement urbain", "équipements publics", "densification", "participation aménagement"]
  }
];

// Simulation de l'IA qui publie 3 articles par semaine
const WorkspaceReglementation = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<typeof actualites>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<typeof actualites>([]);
  const [categoryFilter, setCategoryFilter] = useState("tous");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [nextScheduledUpdate, setNextScheduledUpdate] = useState<string>("");
  const itemsPerPage = 5;
  
  useEffect(() => {
    // Simulation de l'IA qui met à jour les articles
    const now = new Date();
    
    // Format pour la dernière mise à jour
    const formatLastUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
    
    // Calcul de la prochaine mise à jour (prochains jours de la semaine : lundi, mercredi, vendredi)
    const daysToAdd = [1, 3, 5]; // Lundi, Mercredi, Vendredi (0 = dimanche, 1 = lundi, etc.)
    const currentDay = now.getDay();
    
    let nextUpdateDay = daysToAdd.find(day => day > currentDay);
    if (!nextUpdateDay) nextUpdateDay = daysToAdd[0] + 7; // Si on dépasse vendredi, on va au lundi suivant
    
    const daysUntilNext = nextUpdateDay - currentDay;
    const nextUpdate = new Date(now);
    nextUpdate.setDate(now.getDate() + (daysUntilNext <= 0 ? daysUntilNext + 7 : daysUntilNext));
    nextUpdate.setHours(8, 0, 0, 0); // 8h du matin
    
    const formatNextUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(nextUpdate);
    
    setArticles(actualites);
    setFilteredArticles(actualites);
    setLastUpdate(formatLastUpdate);
    setNextScheduledUpdate(formatNextUpdate);
  }, []);
  
  // Filtrage des articles
  useEffect(() => {
    let result = [...articles];
    
    // Filtrage par catégorie
    if (categoryFilter !== "tous") {
      result = result.filter(article => article.category === categoryFilter);
    }
    
    // Filtrage par terme de recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(search) || 
          article.description.toLowerCase().includes(search) ||
          article.content.toLowerCase().includes(search) ||
          article.keywords.some(keyword => keyword.toLowerCase().includes(search))
      );
    }
    
    setFilteredArticles(result);
    setPage(1); // Réinitialiser à la première page après filtrage
  }, [searchTerm, categoryFilter, articles]);
  
  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  // Liste des catégories uniques
  const categories = ["tous", ...Array.from(new Set(articles.map(article => article.category)))];
  
  // Icônes pour les catégories
  const getCategoryIcon = (category) => {
    switch(category) {
      case "réglementation": return <FileText className="h-4 w-4" />;
      case "financement": return <Receipt className="h-4 w-4" />;
      case "diagnostic": return <Search className="h-4 w-4" />;
      case "fiscalité": return <Receipt className="h-4 w-4" />;
      case "urbanisme": return <Building className="h-4 w-4" />;
      case "construction": return <HardHat className="h-4 w-4" />;
      case "sécurité": return <Shield className="h-4 w-4" />;
      case "profession": return <Bookmark className="h-4 w-4" />;
      case "juridique": return <Landmark className="h-4 w-4" />;
      case "environnement": return <Ruler className="h-4 w-4" />;
      case "innovation": return <Ruler2 className="h-4 w-4" />;
      case "santé": return <FileWarning className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Traduire les catégories pour l'affichage
  const translateCategory = (category) => {
    const translations = {
      "tous": "Toutes catégories",
      "réglementation": "Réglementation",
      "financement": "Financement",
      "diagnostic": "Diagnostic",
      "fiscalité": "Fiscalité",
      "urbanisme": "Urbanisme",
      "construction": "Construction",
      "sécurité": "Sécurité",
      "profession": "Profession",
      "juridique": "Juridique",
      "environnement": "Environnement",
      "innovation": "Innovation",
      "santé": "Santé"
    };
    return translations[category] || category;
  };
  
  return (
    <div className="space-y-6">
      {/* SEO Enhancement - Invisible for users, visible for search engines */}
      <SEO 
        title="Veille réglementaire construction et immobilier | PACA | Progineer"
        description="Actualités et veille juridique pour les professionnels de la construction, architectes et maîtres d'œuvre. Nouvelles lois, règlements et normes du secteur de l'immobilier en PACA."
        keywords="veille réglementaire construction, actualité immobilier, nouvelles normes bâtiment, réglementation architecte, RE2020, loi climat résilience, DPE, PACA, Marseille"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Veille réglementaire de Progineer",
          "description": "Articles de veille juridique et réglementaire pour les professionnels de la construction et de l'immobilier en PACA",
          "publisher": {
            "@type": "Organization",
            "name": "Progineer",
            "logo": {
              "@type": "ImageObject",
              "url": "https://progineer.fr/images/progineer-logo.png"
            }
          },
          "blogPost": actualites.slice(0, 5).map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.description,
            "datePublished": article.date,
            "author": {
              "@type": "Organization",
              "name": "Progineer"
            },
            "keywords": article.keywords.join(", ")
          }))
        }}
      />

      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Veille réglementaire</h1>
        <p className="text-gray-600">L'actualité juridique et réglementaire du secteur de la construction et de l'immobilier, mise à jour régulièrement par notre intelligence artificielle spécialisée.</p>
      </div>
      
      <Alert className="bg-khaki-50 border-khaki-200 mb-6">
        <Bell className="h-4 w-4 text-khaki-700" />
        <AlertTitle className="text-khaki-800">Publication automatisée par IA</AlertTitle>
        <AlertDescription className="text-khaki-700">
          Notre système d'intelligence artificielle analyse les sources officielles et publie automatiquement 3 articles par semaine sur les nouvelles réglementations affectant la construction et l'immobilier.
          <div className="mt-2 text-sm flex flex-col sm:flex-row sm:gap-4 text-khaki-600">
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" /> Dernière mise à jour : {lastUpdate}
            </span>
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Prochaine publication : {nextScheduledUpdate}
            </span>
          </div>
        </AlertDescription>
      </Alert>
      
      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par mots-clés, titre ou contenu..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-nowrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                categoryFilter === category 
                  ? 'bg-khaki-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category)}
              <span className="ml-1.5">{translateCategory(category)}</span>
            </button>
          ))}
        </div>
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Search className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Aucun résultat trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedArticles.map((article) => (
            <Card key={article.id} className="border-l-4 border-l-khaki-500 border-t border-r border-b border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center bg-khaki-100 text-khaki-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {getCategoryIcon(article.category)}
                    <span className="ml-1">{translateCategory(article.category)}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="mt-2 text-xl font-semibold">{article.title}</CardTitle>
                <CardDescription className="mt-1 text-gray-600">{article.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2">
                <p className="text-gray-700 text-sm">{article.content.substring(0, 200)}...</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {article.keywords.map((keyword, idx) => (
                    <span key={idx} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                      #{keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  <span className="mx-2">•</span>
                  <span className="italic">{article.source}</span>
                </div>
                <Button variant="outline" size="sm" className="text-khaki-600 border-khaki-200">
                  Lire l'article
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="bg-khaki-50 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-3 text-khaki-800">Documents réglementaires essentiels</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Mise à jour</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">RE2020 - Guide d'application complet</TableCell>
              <TableCell>Mars 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DTU 20.1 - Ouvrages en maçonnerie</TableCell>
              <TableCell>Janvier 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Loi Climat et Résilience - Texte intégral</TableCell>
              <TableCell>Décembre 2023</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Guide MaPrimeRénov' 2024</TableCell>
              <TableCell>Février 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Réglementation Zéro Artificialisation Nette</TableCell>
              <TableCell>Avril 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      {/* Articles liés SEO (caché visuellement) pour le référencement */}
      <div className="sr-only">
        <h2>Articles récents sur la réglementation immobilière et construction</h2>
        <ul>
          {actualites.slice(0, 5).map(article => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <p>Mots-clés: {article.keywords.join(", ")}</p>
            </li>
          ))}
        </ul>
        
        <h2>Ressources réglementaires pour les professionnels de la construction en PACA</h2>
        <p>
          Retrouvez toutes les actualités réglementaires essentielles pour les architectes, 
          maîtres d'œuvre et professionnels du bâtiment exerçant à Marseille, Nice, Toulon 
          et dans toute la région Provence-Alpes-Côte d'Azur. Notre veille juridique couvre 
          les nouvelles normes de construction, les évolutions des aides à la rénovation, 
          et les changements législatifs impactant vos projets.
        </p>
      </div>
      
      {/* SEO Footer Text */}
      <SEOFooter 
        text="Veille réglementaire construction et immobilier – Architecte et maître d'œuvre en PACA, Marseille, Nice, Toulon – Suivez l'actualité des normes, lois et réglementations de la construction avec Progineer, votre expert en maîtrise d'œuvre. Restez informé sur la RE2020, les évolutions du DPE, MaPrimeRénov', la loi Climat et Résilience, et toutes les actualités impactant vos projets de construction et rénovation en région Provence-Alpes-Côte d'Azur."
      />
    </div>
  );
};

export default WorkspaceReglementation;
