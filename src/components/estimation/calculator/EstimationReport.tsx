
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, PieChart as PieChartIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormData } from './types';
import { useToast } from '@/hooks/use-toast';

// Cette fonction génère un PDF avec les détails de l'estimation
const generatePDF = (estimation: any, formData: FormData) => {
  // Importation dynamique de jsPDF pour éviter les problèmes côté serveur
  import('jspdf').then(({ default: jsPDF }) => {
    try {
      // Créer un nouveau document PDF
      const doc = new jsPDF();
      
      // Ajouter un titre
      doc.setFontSize(18);
      doc.text('Estimation détaillée de votre projet', 105, 15, { align: 'center' });
      
      // Ajouter les informations du projet
      doc.setFontSize(12);
      doc.text(`Type de projet: ${formData.projectType || ''}`, 14, 30);
      doc.text(`Surface: ${formData.surface || ''} m²`, 14, 37);
      doc.text(`Ville: ${formData.city || ''}`, 14, 44);
      doc.text(`Date d'estimation: ${new Date().toLocaleDateString('fr-FR')}`, 14, 51);
      
      // Ajouter les résultats principaux
      doc.setFontSize(14);
      doc.text('Estimation globale', 14, 65);
      
      doc.setFontSize(12);
      doc.text(`Coût total HT: ${estimation.totalHT.toLocaleString('fr-FR')} €`, 14, 75);
      doc.text(`TVA: ${estimation.vat.toLocaleString('fr-FR')} €`, 14, 82);
      doc.text(`Coût total TTC: ${estimation.totalTTC.toLocaleString('fr-FR')} €`, 14, 89);
      
      // Ajouter le détail par corps d'état
      doc.setFontSize(14);
      doc.text('Détail par corps d\'état', 14, 105);
      
      let yPos = 115;
      doc.setFontSize(12);
      
      // Parcourir les corps d'état
      Object.entries(estimation.corpsEtat).forEach(([nom, data]: [string, any]) => {
        if (yPos > 270) {
          // Ajouter une nouvelle page si on arrive en bas
          doc.addPage();
          yPos = 20;
        }
        
        doc.text(`${nom}: ${data.montantHT.toLocaleString('fr-FR')} € HT`, 14, yPos);
        yPos += 7;
      });
      
      // Ajouter les frais annexes
      if (yPos > 250) {
        // Ajouter une nouvelle page si on arrive en bas
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.text('Frais annexes', 14, yPos + 10);
      
      yPos += 20;
      doc.setFontSize(12);
      doc.text(`Honoraires maîtrise d'œuvre: ${estimation.honorairesHT.toLocaleString('fr-FR')} € HT`, 14, yPos);
      yPos += 7;
      doc.text(`Taxe d'aménagement: ${estimation.taxeAmenagement.toLocaleString('fr-FR')} €`, 14, yPos);
      yPos += 7;
      doc.text(`Garantie décennale: ${estimation.garantieDecennale.toLocaleString('fr-FR')} €`, 14, yPos);
      yPos += 7;
      doc.text(`Études géotechniques: ${estimation.etudesGeotechniques.toLocaleString('fr-FR')} €`, 14, yPos);
      yPos += 7;
      doc.text(`Étude thermique: ${estimation.etudeThermique.toLocaleString('fr-FR')} €`, 14, yPos);
      
      // Si le prix du terrain est inclus
      if (estimation.terrainPrice && estimation.coutTotalAvecTerrain) {
        yPos += 14;
        doc.setFontSize(14);
        doc.text('Coût global avec terrain', 14, yPos);
        
        yPos += 10;
        doc.setFontSize(12);
        doc.text(`Prix du terrain: ${estimation.terrainPrice.toLocaleString('fr-FR')} €`, 14, yPos);
        yPos += 7;
        doc.text(`Coût total avec terrain: ${estimation.coutTotalAvecTerrain.toLocaleString('fr-FR')} €`, 14, yPos);
      }
      
      // Pied de page
      yPos = 280;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Cette estimation est fournie à titre indicatif et pourrait varier selon les spécificités de votre projet.', 105, yPos, { align: 'center' });
      doc.text('© Progineer - Estimation générée le ' + new Date().toLocaleDateString('fr-FR'), 105, yPos + 5, { align: 'center' });
      
      // Sauvegarder le PDF
      const filename = `Estimation_${formData.projectType}_${formData.surface}m2_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      return false;
    }
  });
};

interface EstimationReportProps {
  estimation: any;
  formData: FormData;
  includeTerrainPrice?: boolean;
}

const EstimationReport: React.FC<EstimationReportProps> = ({ 
  estimation, 
  formData, 
  includeTerrainPrice 
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();
  
  // Si includeTerrainPrice est true et que le prix du terrain existe
  let totalAvecTerrain = estimation.coutGlobalTTC;
  if (includeTerrainPrice && formData.landPrice) {
    totalAvecTerrain = estimation.coutGlobalTTC + (formData.landPrice as number);
    estimation.terrainPrice = formData.landPrice;
    estimation.coutTotalAvecTerrain = totalAvecTerrain;
  }
  
  // Préparer les données pour le graphique de répartition
  const distributionData = Object.entries(estimation.corpsEtat).map(([name, data]: [string, any]) => ({
    name,
    value: data.montantHT
  }));
  
  // Couleurs pour le graphique
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A28554', '#FF6B6B', '#6A7FDB'];
  
  const handleDownload = () => {
    const success = generatePDF(estimation, formData);
    toast({
      title: "Exportation en cours",
      description: "Votre rapport d'estimation est en cours de téléchargement",
      duration: 3000
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-blue-500" />
          Rapport d'estimation détaillée
        </h3>
        <Button 
          onClick={handleDownload} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Télécharger le PDF
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-5">
            <div className="text-sm text-blue-700 font-medium">Estimation HT</div>
            <div className="text-2xl font-bold">{estimation.totalHT.toLocaleString('fr-FR')} €</div>
          </CardContent>
        </Card>
        
        <Card className="bg-khaki-50 border-khaki-100">
          <CardContent className="pt-5">
            <div className="text-sm text-khaki-700 font-medium">Estimation TTC</div>
            <div className="text-2xl font-bold">{estimation.totalTTC.toLocaleString('fr-FR')} €</div>
          </CardContent>
        </Card>
        
        {includeTerrainPrice && formData.landPrice && (
          <Card className="bg-green-50 border-green-100">
            <CardContent className="pt-5">
              <div className="text-sm text-green-700 font-medium">Total avec terrain</div>
              <div className="text-2xl font-bold">{totalAvecTerrain.toLocaleString('fr-FR')} €</div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="summary">Récapitulatif</TabsTrigger>
          <TabsTrigger value="detail">Détail par poste</TabsTrigger>
          <TabsTrigger value="chart">Répartition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-3">Information du projet</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Type de projet</div>
                <div className="font-medium">{formData.projectType}</div>
                
                <div className="text-gray-500">Surface</div>
                <div className="font-medium">{formData.surface} m²</div>
                
                <div className="text-gray-500">Localisation</div>
                <div className="font-medium">{formData.city}</div>
                
                {formData.levels && (
                  <>
                    <div className="text-gray-500">Niveaux</div>
                    <div className="font-medium">{formData.levels}</div>
                  </>
                )}
                
                {formData.finishLevel && (
                  <>
                    <div className="text-gray-500">Niveau de finition</div>
                    <div className="font-medium">{formData.finishLevel}</div>
                  </>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <h4 className="font-medium mb-3">Estimation globale</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Coût des travaux (HT)</span>
                  <span className="font-medium">{estimation.totalHT.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>TVA (20%)</span>
                  <span className="font-medium">{estimation.vat.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm font-medium">
                  <span>Coût des travaux (TTC)</span>
                  <span>{estimation.totalTTC.toLocaleString('fr-FR')} €</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Honoraires Maîtrise d'œuvre (HT)</span>
                  <span className="font-medium">{estimation.honorairesHT.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Taxe d'aménagement</span>
                  <span className="font-medium">{estimation.taxeAmenagement.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Garantie décennale</span>
                  <span className="font-medium">{estimation.garantieDecennale.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Études géotechniques</span>
                  <span className="font-medium">{estimation.etudesGeotechniques.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Étude thermique</span>
                  <span className="font-medium">{estimation.etudeThermique.toLocaleString('fr-FR')} €</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Coût global TTC</span>
                  <span>{estimation.coutGlobalTTC.toLocaleString('fr-FR')} €</span>
                </div>
                
                {includeTerrainPrice && formData.landPrice && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Prix du terrain</span>
                      <span className="font-medium">{(formData.landPrice as number).toLocaleString('fr-FR')} €</span>
                    </div>
                    
                    <div className="flex justify-between font-medium text-green-700">
                      <span>Coût total avec terrain</span>
                      <span>{totalAvecTerrain.toLocaleString('fr-FR')} €</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-gray-500 italic">
            * Cette estimation est fournie à titre indicatif et pourrait varier selon les spécificités de votre projet.
          </div>
        </TabsContent>
        
        <TabsContent value="detail">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Détail par corps d'état</h4>
              
              <div className="space-y-4">
                {Object.entries(estimation.corpsEtat).map(([name, data]: [string, any]) => (
                  <div key={name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{name}</span>
                      <span>{data.montantHT.toLocaleString('fr-FR')} € HT</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      {data.details.map((detail: string, index: number) => (
                        <div key={index}>{detail}</div>
                      ))}
                    </div>
                    
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-3">Répartition du budget par corps d'état</h4>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {distributionData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="text-xs">
                      <div>{item.name}</div>
                      <div className="font-medium">{item.value.toLocaleString('fr-FR')} €</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstimationReport;
