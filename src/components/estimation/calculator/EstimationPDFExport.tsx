
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileDown, Printer } from 'lucide-react';
import { generateEstimationPDF } from './utils/pdfGenerator';
import { FormData, PDFGenerationOptions } from './types';

interface EstimationPDFExportProps {
  formData: FormData;
  estimation?: any;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({ formData, estimation }) => {
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeContactInfo, setIncludeContactInfo] = useState(true);
  const [includeBreakdown, setIncludeBreakdown] = useState(true);
  const [includeTerrainPrice, setIncludeTerrainPrice] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeDetailedBreakdown, setIncludeDetailedBreakdown] = useState(false);
  const [clientInfo, setClientInfo] = useState(true);
  const [companyLogo, setCompanyLogo] = useState(true);

  const handleExportPDF = () => {
    if (!estimation) return;

    const options: PDFGenerationOptions = {
      includeDetails,
      includeLogo,
      includeContactInfo,
      includeBreakdown,
      includeTerrainPrice,
      includeTimeline,
      includeDetailedBreakdown,
      clientInfo,
      companyLogo,
    };

    const doc = generateEstimationPDF(formData, estimation, options);
    doc.save(`estimation-projet-${formData.clientType}-${Date.now()}.pdf`);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Exporter votre estimation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDetails" 
              checked={includeDetails} 
              onCheckedChange={(checked) => setIncludeDetails(checked === true)}
            />
            <label htmlFor="includeDetails">Inclure les détails du projet</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeLogo" 
              checked={includeLogo} 
              onCheckedChange={(checked) => setIncludeLogo(checked === true)}
            />
            <label htmlFor="includeLogo">Inclure le logo</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeContactInfo" 
              checked={includeContactInfo} 
              onCheckedChange={(checked) => setIncludeContactInfo(checked === true)}
            />
            <label htmlFor="includeContactInfo">Inclure vos coordonnées</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeBreakdown" 
              checked={includeBreakdown} 
              onCheckedChange={(checked) => setIncludeBreakdown(checked === true)}
            />
            <label htmlFor="includeBreakdown">Ventilation par corps d'état</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeTerrainPrice" 
              checked={includeTerrainPrice} 
              onCheckedChange={(checked) => setIncludeTerrainPrice(checked === true)}
            />
            <label htmlFor="includeTerrainPrice">Intégrer le prix du terrain</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeTimeline" 
              checked={includeTimeline} 
              onCheckedChange={(checked) => setIncludeTimeline(checked === true)}
            />
            <label htmlFor="includeTimeline">Calendrier prévisionnel</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDetailedBreakdown" 
              checked={includeDetailedBreakdown} 
              onCheckedChange={(checked) => setIncludeDetailedBreakdown(checked === true)}
            />
            <label htmlFor="includeDetailedBreakdown">Détail technique</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="clientInfo" 
              checked={clientInfo} 
              onCheckedChange={(checked) => setClientInfo(checked === true)}
            />
            <label htmlFor="clientInfo">Informations client</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="companyLogo" 
              checked={companyLogo} 
              onCheckedChange={(checked) => setCompanyLogo(checked === true)}
            />
            <label htmlFor="companyLogo">Logo de l'entreprise</label>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
          <Button 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleExportPDF}
          >
            <FileDown className="h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationPDFExport;
