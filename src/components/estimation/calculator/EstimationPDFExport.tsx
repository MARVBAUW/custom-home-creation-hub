
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileText, Send, Share } from 'lucide-react';
import { FormData } from './types';
import { PDFGenerationOptions } from './types/pdf-types';
import { generateEstimationPDF } from './utils/pdfGenerator';

interface EstimationPDFExportProps {
  formData: FormData;
  estimation: any;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({ formData, estimation }) => {
  const [options, setOptions] = useState<PDFGenerationOptions>({
    includeBreakdown: true,
    includeLogo: true,
    includeContactInfo: true,
    includeDetails: true,
    includeTerrainPrice: !!formData.landPrice,
    includeTimeline: true,
    fileName: `Estimation_${formData.clientType}_${formData.projectType}_${new Date().toISOString().split('T')[0]}`
  });

  const handleOptionChange = (option: keyof PDFGenerationOptions) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGeneratePDF = () => {
    const pdf = generateEstimationPDF(formData, estimation, options);
    pdf.save(`${options.fileName || 'Estimation'}.pdf`);
  };

  const handleSendEmail = () => {
    // Email sending logic would go here
    alert('Fonctionnalité d\'envoi par email en cours de développement');
  };

  return (
    <Card className="bg-blue-50/50">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Options d'export</h3>
          <p className="text-sm text-gray-600">Personnalisez votre document d'estimation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails" 
                checked={options.includeDetails} 
                onCheckedChange={() => handleOptionChange('includeDetails')} 
              />
              <Label htmlFor="includeDetails">Détails du projet</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeBreakdown" 
                checked={options.includeBreakdown} 
                onCheckedChange={() => handleOptionChange('includeBreakdown')} 
              />
              <Label htmlFor="includeBreakdown">Détail par corps d'état</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeTimeline" 
                checked={options.includeTimeline} 
                onCheckedChange={() => handleOptionChange('includeTimeline')} 
              />
              <Label htmlFor="includeTimeline">Planning prévisionnel</Label>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeContactInfo" 
                checked={options.includeContactInfo} 
                onCheckedChange={() => handleOptionChange('includeContactInfo')} 
              />
              <Label htmlFor="includeContactInfo">Coordonnées client</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeLogo" 
                checked={options.includeLogo} 
                onCheckedChange={() => handleOptionChange('includeLogo')} 
              />
              <Label htmlFor="includeLogo">Logo Progineer</Label>
            </div>
            
            {formData.landPrice && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeTerrainPrice" 
                  checked={options.includeTerrainPrice} 
                  onCheckedChange={() => handleOptionChange('includeTerrainPrice')} 
                />
                <Label htmlFor="includeTerrainPrice">Prix du terrain</Label>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={handleGeneratePDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Télécharger PDF
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSendEmail}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Envoyer par email
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => alert('Fonctionnalité de partage en cours de développement')}
          >
            <Share className="h-4 w-4" />
            Partager
          </Button>
        </div>
        
        <div className="flex items-start mt-6 bg-blue-100 p-3 rounded-md">
          <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            Ce document d'estimation est généré à titre indicatif. Pour obtenir une estimation détaillée et personnalisée, nous vous recommandons de prendre rendez-vous avec un de nos experts Progineer.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationPDFExport;
