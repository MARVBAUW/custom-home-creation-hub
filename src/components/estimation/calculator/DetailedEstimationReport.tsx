
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EstimationFormData, PDFGenerationOptions } from './types';

interface DetailedEstimationReportProps {
  formData: EstimationFormData;
  estimation: any;
  includeTerrainPrice?: boolean;
  options?: PDFGenerationOptions;
}

const DetailedEstimationReport: React.FC<DetailedEstimationReportProps> = ({
  formData,
  estimation,
  includeTerrainPrice = false,
  options = {}
}) => {
  const handleDownloadPDF = () => {
    alert('Téléchargement du PDF en cours... (fonctionnalité en développement)');
  };

  const handleSendByEmail = () => {
    alert('Envoi par email en cours... (fonctionnalité en développement)');
  };

  const handleViewDetails = () => {
    alert('Affichage des détails en cours... (fonctionnalité en développement)');
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Rapport d'Estimation Détaillée</h2>
        
        {estimation ? (
          <div className="space-y-2">
            <p>Estimation totale HT: {estimation.totalHT} €</p>
            <p>Estimation totale TTC: {estimation.totalTTC} €</p>
            {includeTerrainPrice && <p>Estimation avec terrain: {estimation.coutTotalAvecTerrain} €</p>}
            
            <h3 className="text-lg font-medium">Détails par poste</h3>
            <ul className="list-disc list-inside">
              <li>Terrassement: {estimation.terrassement} €</li>
              <li>Fondations: {estimation.fondations} €</li>
              <li>Élévation des murs: {estimation.elevationMurs} €</li>
              <li>Charpente: {estimation.charpente} €</li>
              <li>Couverture: {estimation.couverture} €</li>
              <li>Menuiseries extérieures: {estimation.menuiseriesExterieures} €</li>
              <li>Isolation: {estimation.isolation} €</li>
              <li>Plomberie: {estimation.plomberie} €</li>
              <li>Électricité: {estimation.electricite} €</li>
              <li>Chauffage: {estimation.chauffage} €</li>
              <li>Plâtrerie: {estimation.platrerie} €</li>
              <li>Menuiseries intérieures: {estimation.menuiseriesInterieures} €</li>
              <li>Revêtements de sol: {estimation.revetementsSol} €</li>
              <li>Peinture: {estimation.peinture} €</li>
              <li>Aménagements extérieurs: {estimation.amenagementExt} €</li>
              <li>Honoraires: {estimation.honoraires} €</li>
            </ul>
          </div>
        ) : (
          <p>Aucune estimation disponible.</p>
        )}
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleViewDetails}>
            <Eye className="h-4 w-4 mr-2" />
            Voir les détails
          </Button>
          <Button variant="secondary" onClick={handleSendByEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Envoyer par email
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedEstimationReport;
