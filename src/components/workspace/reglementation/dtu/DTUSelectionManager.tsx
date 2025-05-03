
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Download, Save, Share2 } from "lucide-react";
import { DTU } from './types';

interface DTUSelectionManagerProps {
  dtus: DTU[];
  setDtus: React.Dispatch<React.SetStateAction<DTU[]>>;
}

export const DTUSelectionManager: React.FC<DTUSelectionManagerProps> = ({ dtus, setDtus }) => {
  const selectedCount = dtus.filter(dtu => dtu.selected).length;
  
  const clearSelection = () => {
    setDtus(dtus.map(dtu => ({ ...dtu, selected: false })));
  };
  
  const downloadSelection = () => {
    const selectedDtus = dtus.filter(dtu => dtu.selected);
    
    // Format the selected DTUs as text
    const content = selectedDtus.map(dtu => {
      return `
===== ${dtu.title} (${dtu.category}) =====
Dernière mise à jour: ${dtu.lastUpdate}

Description:
${dtu.description}

Règles essentielles:
${dtu.rules.map(rule => `- ${rule.title}: ${rule.content}`).join('\n')}
      `.trim();
    }).join('\n\n' + '='.repeat(50) + '\n\n');
    
    // Create a blob and download link
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selection-dtu.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const saveSelection = () => {
    const selectedIds = dtus.filter(dtu => dtu.selected).map(dtu => dtu.id);
    localStorage.setItem('savedDtuSelection', JSON.stringify(selectedIds));
    
    alert('Votre sélection a été enregistrée !');
  };
  
  const loadSavedSelection = () => {
    try {
      const savedSelection = localStorage.getItem('savedDtuSelection');
      if (savedSelection) {
        const selectedIds = JSON.parse(savedSelection) as string[];
        setDtus(dtus.map(dtu => ({
          ...dtu,
          selected: selectedIds.includes(dtu.id)
        })));
        return true;
      }
    } catch (e) {
      console.error('Erreur lors du chargement de la sélection:', e);
    }
    return false;
  };
  
  return (
    <div className={`
      sticky top-0 z-10 p-4 rounded-lg mb-6
      ${selectedCount > 0 ? 'bg-khaki-50 border border-khaki-200' : 'bg-gray-50 border border-gray-200'}
      transition-colors duration-200
    `}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="font-medium">
            {selectedCount === 0 ? (
              "Aucun DTU sélectionné"
            ) : (
              `${selectedCount} DTU${selectedCount > 1 ? 's' : ''} sélectionné${selectedCount > 1 ? 's' : ''}`
            )}
          </p>
          <p className="text-sm text-gray-500">
            Sélectionnez les DTUs qui vous intéressent pour les exporter ou sauvegarder
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            onClick={clearSelection}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Effacer
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            onClick={saveSelection}
          >
            <Save className="h-4 w-4 mr-1" />
            Sauvegarder
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const hasLoaded = loadSavedSelection();
              if (!hasLoaded) {
                alert('Aucune sélection sauvegardée trouvée.');
              }
            }}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Charger
          </Button>
          
          <Button
            size="sm"
            className="bg-khaki-600 hover:bg-khaki-700"
            disabled={selectedCount === 0}
            onClick={downloadSelection}
          >
            <Download className="h-4 w-4 mr-1" />
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
};
