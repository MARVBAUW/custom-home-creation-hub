
import React, { useState } from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, ArrowLeftIcon, PieChart, Download, Share2 } from 'lucide-react';
import EstimationReport from '../EstimationReport';
import DetailedEstimationReport from '../DetailedEstimationReport';
import EstimationSummaryReport from '../EstimationSummaryReport';
import ProfessionalQuoteReport from '../ProfessionalQuoteReport';
import { generateEstimationPDF } from '../utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { parseToNumber } from '../utils/typeConversions';

interface ResultsFormProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: { category: string; amount: number; }[];
  goToPreviousStep: () => void;
  animationDirection?: 'forward' | 'backward';
}

const ResultsForm: React.FC<ResultsFormProps> = ({ 
  formData, 
  estimationResult,
  categoriesAmounts,
  goToPreviousStep,
  animationDirection = 'forward'
}) => {
  const [activeTab, setActiveTab] = useState("summary");
  const { toast } = useToast();
  
  // Use parseToNumber to safely handle numeric conversions
  const resultAmount = parseToNumber(estimationResult, 0);
  const landPriceValue = parseToNumber(formData.landPrice, 0);
  
  // Simuler les données d'estimation
  const estimationData = {
    totalHT: resultAmount,
    totalTTC: resultAmount * 1.2,
    vat: resultAmount * 0.2,
    coutGlobalHT: resultAmount * 1.15,
    coutGlobalTTC: resultAmount * 1.15 * 1.2,
    honorairesHT: resultAmount * 0.1,
    taxeAmenagement: resultAmount * 0.03,
    garantieDecennale: resultAmount * 0.01,
    etudesGeotechniques: resultAmount * 0.005,
    etudeThermique: resultAmount * 0.005,
    // Include land price and notary fees
    terrainPrice: landPriceValue,
    fraisNotaire: landPriceValue * 0.08,
    coutTotalAvecTerrain: resultAmount * 1.2 + landPriceValue + (landPriceValue * 0.08),
    corpsEtat: categoriesAmounts.reduce((acc, cat) => ({
      ...acc,
      [cat.category]: {
        montantHT: cat.amount,
        details: [
          formData.projectType ? `Type de projet: ${formData.projectType}` : '',
          formData.surface ? `Surface concernée: ${formData.surface} m²` : '',
        ].filter(Boolean)
      }
    }), {})
  };
  
  // Fonction pour l'impression du devis/rapport
  const handlePrint = () => {
    window.print();
  };
  
  // Handle PDF download
  const handleDownloadPDF = () => {
    try {
      const pdfName = generateEstimationPDF(formData, estimationData.totalHT, !!formData.landPrice);
      toast({
        title: "PDF généré avec succès",
        description: `Votre estimation a été téléchargée sous le nom "${pdfName}"`,
        duration: 3000
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur de génération",
        description: "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.",
        duration: 3000,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-progineer-gold" />
            <h3 className="text-xl font-semibold">Résultats de votre estimation</h3>
          </div>
          
          <div className="text-lg mb-4">
            Montant estimatif HT : <span className="font-bold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(resultAmount)}</span>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            Retrouvez ci-dessous le détail complet de votre estimation adapté à votre projet 
            {formData.projectType ? ` de ${formData.projectType?.toLowerCase()}` : ''} 
            {formData.surface ? ` de ${formData.surface} m²` : ''} 
            {formData.city ? ` à ${formData.city}` : ''}.
          </div>
          
          <div className="flex space-x-2 mb-6">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={goToPreviousStep}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Modifier l'estimation
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Estimation ${formData.projectType || 'Projet'}`,
                    text: `Estimation détaillée pour un projet ${formData.projectType || ''} de ${formData.surface || ''} m²`
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Résumé</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="charts">Graphiques</TabsTrigger>
          <TabsTrigger value="quote">Devis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <EstimationSummaryReport 
            formData={formData}
            estimationResult={resultAmount}
            categoriesAmounts={categoriesAmounts}
          />
        </TabsContent>
        
        <TabsContent value="details">
          <DetailedEstimationReport 
            formData={formData}
            estimationResult={resultAmount}
            includeTerrainPrice={landPriceValue > 0}
          />
        </TabsContent>
        
        <TabsContent value="charts">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Répartition des coûts</h3>
              <p className="text-sm text-gray-500">Graphiques en cours de chargement...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quote">
          <ProfessionalQuoteReport 
            formData={formData}
            estimationResult={resultAmount}
            onPrint={handlePrint}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsForm;
