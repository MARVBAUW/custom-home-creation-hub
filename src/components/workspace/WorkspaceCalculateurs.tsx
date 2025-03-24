import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ChartBar, LineChart, Wallet, ArrowRightLeft, Check, Home } from 'lucide-react';
import Button from '@/components/common/Button';
import { useToast } from "@/components/ui/use-toast";
import WorkspaceFileViewer from './fileViewer/WorkspaceFileViewer';

const WorkspaceCalculateurs = () => {
  const { toast } = useToast();
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);

  const calculators = [
    {
      title: "Calculateur de surface habitable",
      description: "Estimez la surface habitable de votre bien selon les normes en vigueur.",
      icon: <Home className="h-8 w-8 text-khaki-600" />,
      version: "v2.3",
      lastUpdate: "15/04/2024",
      filename: "calculateur-surface-habitable-v2.3.xlsx"
    },
    {
      title: "Simulateur de rentabilité locative",
      description: "Analysez la rentabilité d'un investissement locatif en tenant compte de tous les paramètres.",
      icon: <ChartBar className="h-8 w-8 text-khaki-600" />,
      version: "v3.1",
      lastUpdate: "02/05/2024",
      filename: "simulateur-rentabilite-locative-v3.1.xlsx"
    },
    {
      title: "Budget travaux détaillé",
      description: "Estimez précisément le coût de vos travaux poste par poste avec comparatif des devis.",
      icon: <Calculator className="h-8 w-8 text-khaki-600" />,
      version: "v1.8",
      lastUpdate: "10/03/2024",
      filename: "budget-travaux-detaille-v1.8.xlsx"
    },
    {
      title: "Suivi de chantier et paiements",
      description: "Suivez l'avancement de votre chantier et les paiements associés aux différentes étapes.",
      icon: <LineChart className="h-8 w-8 text-khaki-600" />,
      version: "v2.5",
      lastUpdate: "22/04/2024",
      filename: "suivi-chantier-paiements-v2.5.xlsx"
    },
    {
      title: "Capacité d'emprunt",
      description: "Calculez votre capacité d'emprunt en fonction de vos revenus et charges mensuelles.",
      icon: <Wallet className="h-8 w-8 text-khaki-600" />,
      version: "v2.0",
      lastUpdate: "05/04/2024",
      filename: "capacite-emprunt-v2.0.xlsx"
    },
    {
      title: "Comparateur prêt immobilier",
      description: "Comparez les différentes offres de prêt immobilier et trouvez la plus avantageuse.",
      icon: <ArrowRightLeft className="h-8 w-8 text-khaki-600" />,
      version: "v1.4",
      lastUpdate: "19/03/2024",
      filename: "comparateur-pret-immobilier-v1.4.xlsx"
    }
  ];

  const handleDownload = (calculator) => {
    // Dans une application réelle, nous enverrions une requête au serveur
    // pour télécharger le fichier. Ici, nous simulons le téléchargement.
    
    // Vérifiez si le fichier a déjà été téléchargé
    if (downloadedFiles.includes(calculator.filename)) {
      // Si déjà téléchargé, nous ouvrons le visualiseur de fichier
      setSelectedFile(calculator);
      setIsFileViewerOpen(true);
    } else {
      // Simuler un délai de téléchargement
      setTimeout(() => {
        // Ajouter le fichier à la liste des téléchargés
        setDownloadedFiles([...downloadedFiles, calculator.filename]);
        
        toast({
          title: "Téléchargement réussi",
          description: `${calculator.title} a été téléchargé avec succès.`,
          duration: 3000,
        });
        
        // Ouvre automatiquement le visualiseur après le premier téléchargement
        setSelectedFile(calculator);
        setIsFileViewerOpen(true);
      }, 1000);
    }
  };

  const handleCloseFileViewer = () => {
    setIsFileViewerOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Calculateurs et outils Excel</h2>
        <p className="text-gray-600">Des outils professionnels pour faciliter la gestion de vos projets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {calculators.map((calculator, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                {calculator.icon}
                <div>
                  <CardTitle className="text-lg font-medium">{calculator.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{calculator.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between pt-2 text-sm text-gray-600 border-t">
              <div>
                <span className="text-khaki-700 font-medium">{calculator.version}</span>
                <span className="ml-2 text-gray-500">Màj: {calculator.lastUpdate}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownload(calculator)}
                className={downloadedFiles.includes(calculator.filename) ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                {downloadedFiles.includes(calculator.filename) ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Ouvrir le fichier
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Télécharger
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* File Viewer Dialog */}
      <WorkspaceFileViewer 
        file={selectedFile}
        isOpen={isFileViewerOpen}
        onClose={handleCloseFileViewer}
      />
    </div>
  );
};

export default WorkspaceCalculateurs;
