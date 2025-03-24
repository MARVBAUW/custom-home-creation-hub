
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ExternalLink } from 'lucide-react';
import Button from '@/components/common/Button';

const WorkspaceGuides = () => {
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
      size: "3.2 MB"
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
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkspaceGuides;
