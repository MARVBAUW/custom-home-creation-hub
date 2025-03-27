
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, Book, CheckCircle, Calendar, ArrowDownToLine, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Types for our guide data
interface GuideCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface GuideDocument {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'text';
  fileSize?: string;
  duration?: string;
  lastUpdated: string;
  url: string;
  categoryId: string;
  featured?: boolean;
  isNew?: boolean;
}

const WorkspaceGuides = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<GuideDocument | null>(null);

  // Define categories with icons
  const categories: GuideCategory[] = [
    { id: "all", name: "Tous les guides", icon: <FileText className="h-4 w-4" /> },
    { id: "construction", name: "Construction", icon: <Book className="h-4 w-4" /> },
    { id: "renovation", name: "Rénovation", icon: <Video className="h-4 w-4" /> },
    { id: "regulations", name: "Réglementation", icon: <CheckCircle className="h-4 w-4" /> },
    { id: "planning", name: "Planification", icon: <Calendar className="h-4 w-4" /> },
  ];

  // Our guides data
  const guides: GuideDocument[] = [
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
      isNew: true
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

  // Filter guides based on active category and search query
  const filteredGuides = guides.filter(guide => {
    const matchesCategory = activeCategory === "all" || guide.categoryId === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured guides
  const featuredGuides = guides.filter(guide => guide.featured);

  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'text':
        return <Book className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Handle document view/download
  const handleDocumentClick = (document: GuideDocument) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  // Handle document download
  const handleDownload = (url: string, title: string) => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Téléchargement démarré",
      description: `Le document "${title}" a commencé à se télécharger.`,
      duration: 5000
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Guides pratiques et ressources</h2>
        <p className="text-gray-600">
          Consultez notre bibliothèque de guides et ressources pour vous aider dans vos projets de construction et rénovation.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Rechercher un guide ou une ressource..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-khaki-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute right-3 top-2.5 text-gray-400">
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </span>
      </div>

      {/* Featured guides section */}
      {featuredGuides.length > 0 && !searchQuery && activeCategory === "all" && (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Guides recommandés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredGuides.map(guide => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleDocumentClick(guide)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-khaki-100 rounded-md">
                      {getDocumentIcon(guide.type)}
                    </div>
                    <div className="flex space-x-2">
                      {guide.isNew && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2 line-clamp-2">{guide.title}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{guide.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                    <span>Mis à jour le {guide.lastUpdated}</span>
                    <span>{guide.fileSize || guide.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories tabs */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-muted mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {filteredGuides.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500">Aucun document trouvé</h3>
                <p className="text-gray-400 mt-2">
                  Essayez de modifier votre recherche ou de changer de catégorie
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGuides.map(document => (
                  <Card 
                    key={document.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleDocumentClick(document)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-md ${
                          document.type === 'pdf' ? 'bg-blue-50 text-blue-600' : 
                          document.type === 'video' ? 'bg-red-50 text-red-600' : 
                          'bg-khaki-50 text-khaki-600'
                        }`}>
                          {getDocumentIcon(document.type)}
                        </div>
                        <div className="flex space-x-2">
                          {document.isNew && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                      </div>
                      <h4 className="font-medium mb-2 line-clamp-2">{document.title}</h4>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{document.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Mis à jour le {document.lastUpdated}</span>
                        <span>{document.fileSize || document.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Resource stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-khaki-100 mr-4">
              <FileText className="h-6 w-6 text-khaki-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{guides.filter(g => g.type === 'pdf').length}</p>
              <p className="text-sm text-gray-500">Guides PDF</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <Video className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{guides.filter(g => g.type === 'video').length}</p>
              <p className="text-sm text-gray-500">Tutoriels vidéo</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500">Dernière mise à jour</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information about updates */}
      <Card className="bg-khaki-50 border-khaki-100">
        <CardContent className="p-6">
          <h3 className="font-medium mb-2 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-khaki-600" />
            Mise à jour automatique
          </h3>
          <p className="text-sm text-gray-600">
            Nos guides et ressources sont mis à jour régulièrement pour refléter les dernières réglementations et meilleures pratiques du secteur. 
            Vous avez toujours accès aux versions les plus récentes.
          </p>
        </CardContent>
      </Card>

      {/* Document preview dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDocument.title}</DialogTitle>
                <DialogDescription>
                  {selectedDocument.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedDocument.type === 'video' ? (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                      <Video className="h-12 w-12 opacity-70" />
                      <span className="ml-2 text-lg">Prévisualisation de la vidéo</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">
                      {selectedDocument.type === 'pdf' ? 'Document PDF' : 
                        selectedDocument.type === 'video' ? 'Vidéo' : 'Texte'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Taille:</span>
                    <span className="font-medium">{selectedDocument.fileSize || selectedDocument.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mise à jour:</span>
                    <span className="font-medium">{selectedDocument.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Catégorie:</span>
                    <span className="font-medium">
                      {categories.find(c => c.id === selectedDocument.categoryId)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Fermer
                  </Button>
                  <Button
                    onClick={() => handleDownload(selectedDocument.url, selectedDocument.title)}
                    className="bg-khaki-600 hover:bg-khaki-700 text-white"
                  >
                    <ArrowDownToLine className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                  {selectedDocument.type === 'video' && (
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Voir en plein écran
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceGuides;
