
import React, { useState } from 'react';
import { DTU } from './types';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, Printer, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '@/hooks/use-toast';

interface DTUSelectionManagerProps {
  dtus: DTU[];
  setDtus: React.Dispatch<React.SetStateAction<DTU[]>>;
}

export const DTUSelectionManager: React.FC<DTUSelectionManagerProps> = ({ 
  dtus,
  setDtus
}) => {
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);
  
  const selectedDTUs = dtus.filter(dtu => dtu.selected);
  const hasSelection = selectedDTUs.length > 0;

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setDtus(dtus.map(dtu => ({ ...dtu, selected: newSelectAll })));
  };

  const clearSelection = () => {
    setSelectAll(false);
    setDtus(dtus.map(dtu => ({ ...dtu, selected: false })));
  };

  const exportSelectedToPDF = () => {
    if (selectedDTUs.length === 0) {
      toast({
        title: "Aucune fiche sélectionnée",
        description: "Veuillez sélectionner au moins une fiche DTU à exporter",
        variant: "destructive"
      });
      return;
    }

    const doc = new jsPDF();
    let yPos = 20;

    // Titre du document
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Fiches DTU sélectionnées", 14, yPos);
    yPos += 10;

    // Informations générales
    doc.setFontSize(10);
    doc.text(`Date d'export: ${new Date().toLocaleDateString('fr-FR')}`, 14, yPos);
    yPos += 10;
    doc.text(`Nombre de fiches: ${selectedDTUs.length}`, 14, yPos);
    yPos += 15;

    // Pour chaque DTU
    selectedDTUs.forEach((dtu, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      // Titre du DTU
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(dtu.title, 14, yPos);
      yPos += 8;

      // Catégorie et date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Catégorie: ${dtu.category} | Dernière mise à jour: ${dtu.lastUpdate}`, 14, yPos);
      yPos += 8;

      // Description
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(dtu.description, 14, yPos, { maxWidth: 180 });
      yPos += 15;

      // Règles principales
      if (dtu.rules.length > 0) {
        autoTable(doc, {
          head: [['Règle', 'Description']],
          body: dtu.rules.map(rule => [rule.title, rule.content]),
          startY: yPos,
          theme: 'grid',
          headStyles: {
            fillColor: [242, 242, 242] as [number, number, number],
            textColor: [51, 51, 51] as [number, number, number],
            fontStyle: 'bold' as 'bold',
            halign: 'center' as 'center'
          },
          columnStyles: {
            0: { fontStyle: 'bold' as 'bold', cellWidth: 60 },
            1: { cellWidth: 'auto' }
          }
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 10;
      }

      // Séparateur entre les DTUs
      if (index < selectedDTUs.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(14, yPos, 196, yPos);
        yPos += 15;
      }

      // Nouvelle page si nécessaire
      if (yPos > 260 && index < selectedDTUs.length - 1) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Footer
    const pageCount = (doc as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.getWidth() - 35, doc.internal.pageSize.getHeight() - 10);
    }

    // Téléchargement du PDF
    doc.save('fiches-dtu-selection.pdf');
    
    toast({
      title: "Export réussi",
      description: `${selectedDTUs.length} fiches DTU exportées au format PDF`,
    });
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg border mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectAll}
            onCheckedChange={handleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {selectAll ? "Désélectionner tout" : "Sélectionner tout"}
          </label>
          
          {hasSelection && (
            <span className="text-sm text-muted-foreground ml-2">
              ({selectedDTUs.length} fiche{selectedDTUs.length > 1 ? 's' : ''} sélectionnée{selectedDTUs.length > 1 ? 's' : ''})
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {hasSelection && (
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Effacer la sélection
            </Button>
          )}
          
          <Button 
            onClick={exportSelectedToPDF}
            disabled={!hasSelection}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Exporter la sélection
          </Button>
        </div>
      </div>
    </div>
  );
};
