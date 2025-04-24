
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, Save } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export interface PDFExportOptions {
  includeDetails?: boolean;
  includeBreakdown?: boolean;
  includeLogo?: boolean;
  includeContactInfo?: boolean;
  fileName?: string;
  title?: string;
}

interface PDFExporterProps {
  data: any;
  title: string;
  onSaveSimulation?: () => void;
  generatePDF: (options: PDFExportOptions) => jsPDF;
  defaultFileName?: string;
}

const PDFExporter: React.FC<PDFExporterProps> = ({
  data,
  title,
  onSaveSimulation,
  generatePDF,
  defaultFileName = 'export'
}) => {
  const [options, setOptions] = useState<PDFExportOptions>({
    includeDetails: true,
    includeBreakdown: true,
    includeLogo: true,
    includeContactInfo: true,
    fileName: defaultFileName,
    title: title
  });

  const handleOptionChange = (option: keyof PDFExportOptions) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGeneratePDF = () => {
    const pdf = generatePDF(options);
    pdf.save(`${options.fileName || defaultFileName}.pdf`);
  };

  return (
    <Card className="bg-slate-50/50">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Options d'export</h3>
          <p className="text-sm text-gray-600">Personnalisez votre document</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails" 
                checked={options.includeDetails} 
                onCheckedChange={() => handleOptionChange('includeDetails')} 
              />
              <Label htmlFor="includeDetails">Détails du calcul</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeBreakdown" 
                checked={options.includeBreakdown} 
                onCheckedChange={() => handleOptionChange('includeBreakdown')} 
              />
              <Label htmlFor="includeBreakdown">Détail des résultats</Label>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeContactInfo" 
                checked={options.includeContactInfo} 
                onCheckedChange={() => handleOptionChange('includeContactInfo')} 
              />
              <Label htmlFor="includeContactInfo">Coordonnées Progineer</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeLogo" 
                checked={options.includeLogo} 
                onCheckedChange={() => handleOptionChange('includeLogo')} 
              />
              <Label htmlFor="includeLogo">Logo Progineer</Label>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={handleGeneratePDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Télécharger PDF
          </Button>
          
          {onSaveSimulation && (
            <Button 
              variant="outline" 
              onClick={onSaveSimulation}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Sauvegarder la simulation
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFExporter;
