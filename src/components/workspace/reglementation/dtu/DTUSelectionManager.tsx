
import React from 'react';
import { Button } from "@/components/ui/button";
import { DTU } from './types';
import { Download, Printer, Trash, X, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DTUSelectionManagerProps {
  dtus: DTU[];
  setDtus: (dtus: DTU[]) => void;
}

export const DTUSelectionManager: React.FC<DTUSelectionManagerProps> = ({ dtus, setDtus }) => {
  const selectedDtus = dtus.filter(dtu => dtu.selected);
  const selectedCount = selectedDtus.length;
  
  const handleClearSelection = () => {
    setDtus(dtus.map(dtu => ({ ...dtu, selected: false })));
  };
  
  const handleSelectAll = () => {
    setDtus(dtus.map(dtu => ({ ...dtu, selected: true })));
  };
  
  const handlePrint = () => {
    // Implementation for printing selected DTUs
    const printContent = selectedDtus.map(dtu => `
      <div style="margin-bottom: 30px; page-break-after: always;">
        <h1 style="font-size: 20px; margin-bottom: 10px;">${dtu.title}</h1>
        <p style="margin-bottom: 15px;">${dtu.description}</p>
        <h2 style="font-size: 16px; margin-bottom: 10px;">Règles principales</h2>
        <ul>
          ${dtu.rules.map(rule => `
            <li style="margin-bottom: 10px;">
              <strong>${rule.title}</strong>: ${rule.content}
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>DTUs sélectionnés</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          <h1>DTUs sélectionnés (${selectedCount})</h1>
          ${printContent}
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };
  
  const handleExport = () => {
    // Implementation for exporting selected DTUs as PDF
    alert('Export en PDF non disponible pour le moment. Cette fonctionnalité sera disponible prochainement.');
  };
  
  if (selectedCount === 0) {
    return null;
  }
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-200 text-blue-800">
            {selectedCount} DTU{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}
          </Badge>
          <span className="text-sm text-blue-700">
            {selectedCount < dtus.length ? (
              <Button 
                variant="link" 
                size="sm" 
                className="text-blue-700 p-0 h-auto" 
                onClick={handleSelectAll}
              >
                <Check className="h-3 w-3 mr-1" />
                Tout sélectionner
              </Button>
            ) : (
              <Button 
                variant="link" 
                size="sm" 
                className="text-blue-700 p-0 h-auto" 
                onClick={handleClearSelection}
              >
                <X className="h-3 w-3 mr-1" />
                Effacer la sélection
              </Button>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleClearSelection}
          >
            <Trash className="h-4 w-4 mr-2" />
            Effacer
          </Button>
        </div>
      </div>
    </div>
  );
};
