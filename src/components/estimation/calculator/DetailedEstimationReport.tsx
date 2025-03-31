import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Printer, Mail } from 'lucide-react';
import { FormData, EstimationResponseData, PDFGenerationOptions } from './types';
import { formatCurrency } from '@/utils/formatters';
import { generateEstimationPDF } from './utils/pdfGenerator';

interface DetailedEstimationReportProps {
  formData: FormData;
  estimationResult: number;
  onPrint?: () => void;
  onSendEmail?: () => void;
}

const DetailedEstimationReport: React.FC<DetailedEstimationReportProps> = ({
  formData,
  estimationResult,
  onPrint,
  onSendEmail
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  
  // Calculate breakdown percentages
  const breakdown = {
    grosOeuvre: estimationResult * 0.35,
    secondOeuvre: estimationResult * 0.25,
    lotsTechniques: estimationResult * 0.20,
    amenagements: estimationResult * 0.10,
    honoraires: estimationResult * 0.08,
    divers: estimationResult * 0.02
  };
  
  // Calculate VAT and total
  const vat = estimationResult * 0.2;
  const totalTTC = estimationResult + vat;
  
  // Calculate price per square meter
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  const pricePerSqm = surface > 0 ? Math.round(estimationResult / surface) : 0;
  
  // Generate PDF document
  const handleDownloadPDF = () => {
    const pdfBlob = generateEstimationPDF(formData, estimationResult, {
      includeDetails: true,
      includeBreakdown: true,
      includeTerrainPrice: true,
      includeTimeline: true,
      clientInfo: true,
      companyLogo: true
    });
    
    // Create a URL for the blob and trigger download
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `estimation-progineer-${formData.projectType || 'projet'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle print action
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };
  
  // Handle email action
  const handleSendEmail = () => {
    if (onSendEmail) {
      onSendEmail();
    } else {
      alert('Fonctionnalité d\'envoi par email en développement');
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Estimation détaillée de votre projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">PDF</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Imprimer</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendEmail} className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Résumé</TabsTrigger>
            <TabsTrigger value="breakdown">Détail</TabsTrigger>
            <TabsTrigger value="timeline">Calendrier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">Estimation totale</h3>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(estimationResult)}
                </div>
                <p className="text-sm text-gray-500">Hors taxes</p>
                
                <div className="mt-2">
                  <div className="text-xl font-semibold">
                    {formatCurrency(totalTTC)}
                  </div>
                  <p className="text-sm text-gray-500">TTC (TVA 20%)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-2 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Prix au m²</p>
                  <p className="font-medium">{formatCurrency(pricePerSqm)}/m²</p>
                </div>
                <div className="text-center p-2 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Surface</p>
                  <p className="font-medium">{surface} m²</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Informations du projet</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Type de projet:</span>
                  <span className="ml-1 font-medium">{formData.projectType || 'Non spécifié'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Ville:</span>
                  <span className="ml-1 font-medium">{formData.city || 'Non spécifiée'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Type de terrain:</span>
                  <span className="ml-1 font-medium">{formData.terrainType || 'Non spécifié'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Niveau de finition:</span>
                  <span className="ml-1 font-medium">{formData.finishingLevel || 'Standard'}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium">Répartition des coûts</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Gros œuvre</span>
                  <span className="font-medium">{formatCurrency(breakdown.grosOeuvre)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Second œuvre</span>
                  <span className="font-medium">{formatCurrency(breakdown.secondOeuvre)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Lots techniques</span>
                  <span className="font-medium">{formatCurrency(breakdown.lotsTechniques)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Aménagements extérieurs</span>
                  <span className="font-medium">{formatCurrency(breakdown.amenagements)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Honoraires et études</span>
                  <span className="font-medium">{formatCurrency(breakdown.honoraires)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Divers et imprévus</span>
                  <span className="font-medium">{formatCurrency(breakdown.divers)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
              
              <div className="pt-2 border-t mt-2">
                <div className="flex justify-between items-center font-medium">
                  <span>Total HT</span>
                  <span>{formatCurrency(estimationResult)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>TVA (20%)</span>
                  <span>{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between items-center font-bold mt-1">
                  <span>Total TTC</span>
                  <span>{formatCurrency(totalTTC)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium">Calendrier prévisionnel</h3>
              
              <div className="space-y-4">
                <div className="relative pb-12">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-gray-200"></div>
                  </div>
                  
                  <div className="relative flex items-center mb-8">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-medium">1</span>
                    </div>
                    <div className="ml-4 bg-white p-3 rounded-lg shadow-sm border w-full">
                      <h4 className="font-medium">Conception et études</h4>
                      <p className="text-sm text-gray-500">1 à 3 mois</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center mb-8">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-medium">2</span>
                    </div>
                    <div className="ml-4 bg-white p-3 rounded-lg shadow-sm border w-full">
                      <h4 className="font-medium">Autorisations administratives</h4>
                      <p className="text-sm text-gray-500">2 à 5 mois</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center mb-8">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-medium">3</span>
                    </div>
                    <div className="ml-4 bg-white p-3 rounded-lg shadow-sm border w-full">
                      <h4 className="font-medium">Consultation des entreprises</h4>
                      <p className="text-sm text-gray-500">1 à 2 mois</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-500 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-medium">4</span>
                    </div>
                    <div className="ml-4 bg-white p-3 rounded-lg shadow-sm border w-full">
                      <h4 className="font-medium">Réalisation des travaux</h4>
                      <p className="text-sm text-gray-500">6 à 12 mois</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Durée totale estimée:</span> 10 à 22 mois selon la complexité du projet
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-gray-500 mt-4">
          Cette estimation est fournie à titre indicatif et peut varier en fonction des spécificités du projet.
          Pour une estimation plus précise, contactez un expert Progineer.
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedEstimationReport;
