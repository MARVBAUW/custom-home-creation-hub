
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

interface ResultsFormProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: any[];
  goToPreviousStep: () => void;
}

const ResultsForm: React.FC<ResultsFormProps> = ({ 
  formData, 
  estimationResult,
  categoriesAmounts,
  goToPreviousStep
}) => {
  const [activeTab, setActiveTab] = useState("summary");
  
  // Simuler les données d'estimation
  const estimationData = {
    totalHT: estimationResult || 0,
    totalTTC: (estimationResult || 0) * 1.2,
    vat: (estimationResult || 0) * 0.2,
    coutGlobalHT: (estimationResult || 0) * 1.15,
    coutGlobalTTC: (estimationResult || 0) * 1.15 * 1.2,
    honorairesHT: (estimationResult || 0) * 0.1,
    taxeAmenagement: (estimationResult || 0) * 0.03,
    garantieDecennale: (estimationResult || 0) * 0.01,
    etudesGeotechniques: (estimationResult || 0) * 0.005,
    etudeThermique: (estimationResult || 0) * 0.005,
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
  
  return (
    <div className="space-y-4">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-progineer-gold" />
            <h3 className="text-xl font-semibold">Résultats de votre estimation</h3>
          </div>
          
          <div className="text-lg mb-4">
            Montant estimatif HT : <span className="font-bold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(estimationResult || 0)}</span>
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
              onClick={() => {
                const pdfBlob = new Blob(['Estimation détaillée'], { type: 'application/pdf' });
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Estimation_${formData.projectType || 'Projet'}_${new Date().toISOString().slice(0, 10)}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
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
        
        <TabsContent value="summary" className="mt-4">
          <EstimationSummaryReport 
            formData={formData}
            estimationResult={estimationResult}
            categoriesAmounts={categoriesAmounts}
          />
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <DetailedEstimationReport 
            formData={formData}
            estimation={{
              totalHT: estimationResult || 0,
              totalTTC: (estimationResult || 0) * 1.2,
              terrassement: categoriesAmounts.find(cat => cat.category === 'Terrassement')?.amount || 0,
              fondations: categoriesAmounts.find(cat => cat.category === 'Fondations')?.amount || 0,
              elevationMurs: categoriesAmounts.find(cat => cat.category === 'Élévation des murs')?.amount || 0,
              charpente: categoriesAmounts.find(cat => cat.category === 'Charpente')?.amount || 0,
              couverture: categoriesAmounts.find(cat => cat.category === 'Couverture')?.amount || 0,
              menuiseriesExterieures: categoriesAmounts.find(cat => cat.category === 'Menuiseries extérieures')?.amount || 0,
              isolation: categoriesAmounts.find(cat => cat.category === 'Isolation')?.amount || 0,
              plomberie: categoriesAmounts.find(cat => cat.category === 'Plomberie')?.amount || 0,
              electricite: categoriesAmounts.find(cat => cat.category === 'Électricité')?.amount || 0,
              chauffage: categoriesAmounts.find(cat => cat.category === 'Chauffage')?.amount || 0,
              revetementSol: categoriesAmounts.find(cat => cat.category === 'Revêtements de sol')?.amount || 0,
              revetementMural: categoriesAmounts.find(cat => cat.category === 'Revêtements muraux')?.amount || 0,
              peinture: categoriesAmounts.find(cat => cat.category === 'Peinture')?.amount || 0,
              amenagementsExterieurs: categoriesAmounts.find(cat => cat.category === 'Aménagements extérieurs')?.amount || 0,
              fraisAnnexes: categoriesAmounts.find(cat => cat.category === 'Frais annexes')?.amount || 0,
              honorairesArchitecte: categoriesAmounts.find(cat => cat.category === 'Honoraires architecte')?.amount || 0,
              taxeAmenagement: categoriesAmounts.find(cat => cat.category === 'Taxe aménagement')?.amount || 0,
              etudesGeotechniques: categoriesAmounts.find(cat => cat.category === 'Études géotechniques')?.amount || 0,
              etudeThermique: categoriesAmounts.find(cat => cat.category === 'Étude thermique')?.amount || 0,
              garantieDecennale: categoriesAmounts.find(cat => cat.category === 'Garantie décennale')?.amount || 0,
              fraisNotaire: formData.landPrice ? formData.landPrice * 0.08 : 0,
              coutTotalAvecTerrain: (estimationResult || 0) * 1.2 + (formData.landPrice || 0) + (formData.landPrice ? formData.landPrice * 0.08 : 0)
            }}
            includeTerrainPrice={!!formData.landPrice}
          />
        </TabsContent>
        
        <TabsContent value="charts" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Visualisation des coûts</h3>
              </div>
              
              <EstimationReport 
                estimation={estimationData}
                formData={formData}
                includeTerrainPrice={!!formData.landPrice}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quote" className="mt-4">
          <ProfessionalQuoteReport 
            formData={formData}
            estimationResult={estimationResult}
            onPrint={handlePrint}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsForm;
