
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ExternalLink, Check, Eye } from 'lucide-react';
import Button from '@/components/common/Button';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WorkspaceGuides = () => {
  const { toast } = useToast();
  const [downloadedGuides, setDownloadedGuides] = useState<string[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const categories = [
    { id: 'construction', label: 'Construction' },
    { id: 'renovation', label: 'Rénovation' },
    { id: 'admin', label: 'Administratif' },
    { id: 'financement', label: 'Financement' }
  ];

  const guides = [
    {
      title: "Guide complet du permis de construire",
      description: "Tous les détails pour préparer et déposer votre permis de construire dans les règles.",
      category: "construction",
      downloadable: true,
      size: "3.2 MB",
      content: `
# Guide complet du permis de construire

## Introduction
Le permis de construire est une autorisation d'urbanisme délivrée par la mairie. Il est obligatoire pour toutes les constructions nouvelles, même sans fondation, de plus de 20 m² de surface de plancher ou d'emprise au sol.

## Quand faut-il demander un permis de construire ?
- Pour toute construction nouvelle de plus de 20 m²
- Pour des travaux sur une construction existante qui modifient son volume ou créent une surface de plancher supérieure à 40 m² en zone urbaine
- Pour un changement de destination accompagné de travaux modifiant les structures porteuses ou la façade
- Pour les piscines couvertes de plus de 100 m² ou dont la couverture fait plus de 1,80 m de hauteur

## Constitution du dossier
### Documents obligatoires
1. Formulaire CERFA n°13406*07 (construction de maison individuelle) ou n°13409*07 (autres constructions)
2. Plan de situation du terrain
3. Plan de masse des constructions
4. Plan de coupe du terrain et de la construction
5. Notice descriptive du projet
6. Plan des façades et des toitures
7. Document graphique d'insertion dans l'environnement
8. Photographie permettant de situer le terrain dans son environnement proche
9. Photographie permettant de situer le terrain dans son environnement lointain

### Documents complémentaires selon les cas
- Attestation RT2020
- Étude de sol pour les terrains en zone argileuse
- Étude d'impact environnemental
- Attestation PPR (Plan de Prévention des Risques)

## Dépôt de la demande
Le dossier complet doit être déposé en mairie en 4 exemplaires, accompagné des pièces nécessaires. Un récépissé de dépôt vous sera remis.

## Délais d'instruction
- 2 mois pour une maison individuelle
- 3 mois pour les autres constructions
- Délais prolongés si le projet est situé dans un secteur protégé ou nécessite des consultations spécifiques

## Affichage et recours
Une fois le permis obtenu, un panneau d'affichage réglementaire doit être placé sur le terrain, visible depuis la voie publique. Le délai de recours des tiers est de 2 mois à compter du premier jour d'affichage.

## Validité et prolongation
- Validité de 3 ans
- Possibilité de prolongation d'un an, deux fois maximum
- La demande de prolongation doit être faite 2 mois avant l'expiration du délai de validité

## Déclaration d'ouverture de chantier
À déposer en mairie dès le commencement des travaux.

## Déclaration attestant l'achèvement et la conformité des travaux (DAACT)
À déposer en mairie à la fin des travaux. La mairie dispose alors de 3 à 5 mois pour contester la conformité.
      `
    },
    {
      title: "Les fondamentaux d'une construction de qualité",
      description: "Découvrez les étapes clés et points de vigilance pour une construction durable.",
      category: "construction",
      downloadable: true,
      size: "4.8 MB"
    },
    {
      title: "Rénovation énergétique : guide pratique",
      description: "Comment améliorer la performance énergétique de votre logement étape par étape.",
      category: "renovation",
      downloadable: true,
      size: "2.6 MB"
    },
    {
      title: "Réussir la rénovation de votre maison ancienne",
      description: "Conseils d'experts pour préserver le cachet tout en modernisant votre habitat.",
      category: "renovation",
      downloadable: true,
      size: "5.1 MB"
    },
    {
      title: "Dossier complet sur les aides financières 2024",
      description: "Toutes les aides disponibles pour vos projets immobiliers expliquées simplement.",
      category: "financement",
      downloadable: true,
      size: "1.9 MB"
    },
    {
      title: "Checklist des démarches administratives",
      description: "Ne ratez aucune étape dans vos démarches administratives liées à la construction.",
      category: "admin",
      downloadable: true,
      size: "0.8 MB"
    }
  ];

  const handleDownloadGuide = (guide) => {
    // Vérifier si le guide a déjà été téléchargé
    if (downloadedGuides.includes(guide.title)) {
      // Si déjà téléchargé, on ouvre le guide
      setSelectedGuide(guide);
      setIsGuideOpen(true);
    } else {
      // Simuler un téléchargement
      setTimeout(() => {
        // Ajouter le guide à la liste des téléchargés
        setDownloadedGuides([...downloadedGuides, guide.title]);
        
        toast({
          title: "Guide téléchargé",
          description: `"${guide.title}" a été téléchargé avec succès.`,
          duration: 3000,
        });
        
        // Ouvre le guide après le premier téléchargement
        setSelectedGuide(guide);
        setIsGuideOpen(true);
      }, 800);
    }
  };

  const handleCloseGuide = () => {
    setIsGuideOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Guides pratiques</h2>
        <p className="text-gray-600">Des ressources complètes pour vous accompagner dans vos projets.</p>
      </div>

      <Tabs defaultValue="construction" className="w-full">
        <TabsList className="mb-6 bg-khaki-50">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-khaki-100 data-[state=active]:text-khaki-800"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides
                .filter(guide => guide.category === category.id)
                .map((guide, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-khaki-300 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-medium">{guide.title}</CardTitle>
                        <FileText className="h-5 w-5 text-khaki-600" />
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-2 text-sm text-gray-600">
                      <span>{guide.size}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadGuide(guide)}
                        className={downloadedGuides.includes(guide.title) ? "bg-green-50 text-green-600 border-green-200" : ""}
                      >
                        {downloadedGuides.includes(guide.title) ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Consulter
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Guide Viewer Dialog */}
      {selectedGuide && (
        <Dialog open={isGuideOpen} onOpenChange={handleCloseGuide}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">{selectedGuide.title}</DialogTitle>
              <DialogDescription className="text-base">{selectedGuide.description}</DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              {selectedGuide.content ? (
                <div className="prose prose-khaki max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedGuide.content.replace(/\n/g, '<br />').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^- (.*$)/gm, '<li>$1</li>') }} />
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    Contenu en cours de chargement ou non disponible en aperçu.
                    <br />
                    Veuillez télécharger le guide complet pour accéder à l'ensemble du contenu.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Format PDF • {selectedGuide.size}
              </div>
              <Button onClick={handleCloseGuide}>
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WorkspaceGuides;
