import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormData } from './types';
import { PDFGenerationOptions } from './types/pdf-types';

interface EstimationPDFExportProps {
  formData: FormData;
  onGeneratePDF: (options: PDFGenerationOptions) => void;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({ formData, onGeneratePDF }) => {
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeContactInfo, setIncludeContactInfo] = useState(true);
  const [includeBreakdown, setIncludeBreakdown] = useState(true);
  const [includeTerrainPrice, setIncludeTerrainPrice] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeDetailedBreakdown, setIncludeDetailedBreakdown] = useState(true);
  const [clientInfo, setClientInfo] = useState(true);
  const [companyLogo, setCompanyLogo] = useState(true);
  const [fileName, setFileName] = useState('estimation-report');

  const handleGenerate = () => {
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
      fileName,
    };
    onGeneratePDF(options);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Options d'export PDF</CardTitle>
        <CardDescription>Personnalisez votre rapport d'estimation avant de le générer.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="includeDetails" checked={includeDetails} onCheckedChange={setIncludeDetails} />
          <Label htmlFor="includeDetails">Inclure les détails du projet</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeLogo" checked={includeLogo} onCheckedChange={setIncludeLogo} />
          <Label htmlFor="includeLogo">Inclure le logo de l'entreprise</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeContactInfo" checked={includeContactInfo} onCheckedChange={setIncludeContactInfo} />
          <Label htmlFor="includeContactInfo">Inclure les informations de contact</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeBreakdown" checked={includeBreakdown} onCheckedChange={setIncludeBreakdown} />
          <Label htmlFor="includeBreakdown">Inclure la répartition des coûts</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeTerrainPrice" checked={includeTerrainPrice} onCheckedChange={setIncludeTerrainPrice} />
          <Label htmlFor="includeTerrainPrice">Inclure le prix du terrain</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeTimeline" checked={includeTimeline} onCheckedChange={setIncludeTimeline} />
          <Label htmlFor="includeTimeline">Inclure le calendrier prévisionnel</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="includeDetailedBreakdown" checked={includeDetailedBreakdown} onCheckedChange={setIncludeDetailedBreakdown} />
          <Label htmlFor="includeDetailedBreakdown">Inclure une répartition détaillée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="clientInfo" checked={clientInfo} onCheckedChange={setClientInfo} />
          <Label htmlFor="clientInfo">Inclure les informations du client</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="companyLogo" checked={companyLogo} onCheckedChange={setCompanyLogo} />
          <Label htmlFor="companyLogo">Inclure le logo de la compagnie</Label>
        </div>
        <div>
          <Label htmlFor="fileName">Nom du fichier</Label>
          <Input id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate}>Générer le PDF</Button>
      </CardFooter>
    </Card>
  );
};

export default EstimationPDFExport;
