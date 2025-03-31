
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Save, Printer, Share2, RefreshCw, UserPlus } from 'lucide-react';
import { DTU } from './types';

interface DTUSelectionManagerProps {
  dtus: DTU[];
  setDtus: React.Dispatch<React.SetStateAction<DTU[]>>;
}

export const DTUSelectionManager: React.FC<DTUSelectionManagerProps> = ({ dtus, setDtus }) => {
  const selectedCount = dtus.filter(dtu => dtu.selected).length;
  
  const handleSelectAll = () => {
    setDtus(dtus.map(dtu => ({ ...dtu, selected: true })));
  };
  
  const handleUnselectAll = () => {
    setDtus(dtus.map(dtu => ({ ...dtu, selected: false })));
  };
  
  const handleExportPDF = () => {
    // Fonction à implémenter
    alert('Export PDF à implémenter');
  };
  
  const handleShare = () => {
    // Fonction à implémenter
    alert('Partage à implémenter');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h3 className="font-medium">DTUs sélectionnés : <span className="font-bold">{selectedCount}</span></h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer" onClick={handleSelectAll}>
            Tout sélectionner
          </Badge>
          <Badge variant="outline" className="cursor-pointer" onClick={handleUnselectAll}>
            Tout désélectionner
          </Badge>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={handleExportPDF}>
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">Exporter</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Partager</span>
        </Button>
      </div>
    </div>
  );
};
