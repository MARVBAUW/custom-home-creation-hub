
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Download, X, ChevronLeft, ChevronRight, Grid3X3, Maximize2, Minimize2 } from 'lucide-react';
import Button from '@/components/common/Button';

interface FileViewerProps {
  file: {
    title: string;
    filename: string;
    version: string;
    lastUpdate: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkspaceFileViewer = ({ file, isOpen, onClose }: FileViewerProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState('aperçu');

  if (!file) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Generates sample data for the spreadsheet preview
  const generateSampleData = () => {
    const columns = ['Libellé', 'Quantité', 'Prix unitaire', 'Total HT', 'TVA', 'Total TTC'];
    const rows = [];
    
    // Generate different types of data based on the file title
    if (file.title.includes('surface')) {
      return [
        ['Pièce', 'Longueur (m)', 'Largeur (m)', 'Surface (m²)', 'Commentaire'],
        ['Salon', '5.2', '4.8', '24.96', 'Parquet'],
        ['Cuisine', '3.8', '3.5', '13.3', 'Carrelage'],
        ['Chambre 1', '4.2', '3.6', '15.12', 'Parquet'],
        ['Chambre 2', '3.9', '3.2', '12.48', 'Parquet'],
        ['Salle de bain', '2.8', '2.2', '6.16', 'Carrelage'],
        ['WC', '1.5', '1.2', '1.8', 'Carrelage'],
        ['Entrée', '2.5', '1.8', '4.5', 'Carrelage'],
        ['TOTAL', '', '', '78.32', '']
      ];
    } else if (file.title.includes('locative')) {
      return [
        ['Type investissement', 'Prix acquisition', 'Frais notaire', 'Travaux', 'Loyer mensuel', 'Charges', 'Rentabilité'],
        ['Studio 25m²', '120 000 €', '9 600 €', '15 000 €', '650 €', '50 €', '4.92%'],
        ['T2 45m²', '185 000 €', '14 800 €', '22 000 €', '850 €', '80 €', '4.24%'],
        ['T3 65m²', '265 000 €', '21 200 €', '35 000 €', '1 100 €', '120 €', '3.68%'],
        ['T4 85m²', '340 000 €', '27 200 €', '45 000 €', '1 350 €', '150 €', '3.47%']
      ];
    } else if (file.title.includes('budget')) {
      return [
        ['Poste', 'Devis 1', 'Devis 2', 'Devis 3', 'Retenu', 'Commentaires'],
        ['Gros œuvre', '45 000 €', '52 000 €', '48 500 €', '48 500 €', 'Entreprise Martin'],
        ['Charpente', '22 000 €', '19 800 €', '23 500 €', '19 800 €', 'Entreprise Dubois'],
        ['Menuiseries', '18 500 €', '22 300 €', '20 100 €', '20 100 €', 'Entreprise Leroy'],
        ['Électricité', '12 800 €', '14 500 €', '11 900 €', '11 900 €', 'Entreprise Électris'],
        ['Plomberie', '9 600 €', '11 200 €', '10 300 €', '10 300 €', 'Entreprise Aquatech'],
        ['Isolation', '14 300 €', '15 800 €', '16 200 €', '15 800 €', 'Entreprise Isotherm'],
        ['Revêtements', '22 500 €', '19 900 €', '21 400 €', '19 900 €', 'Entreprise Déco Plus'],
        ['TOTAL', '144 700 €', '155 500 €', '151 900 €', '146 300 €', '']
      ];
    } else {
      // Default data for other file types
      return [
        ['Catégorie', 'Valeur 1', 'Valeur 2', 'Valeur 3', 'Résultat', 'Notes'],
        ['Ligne 1', '125', '250', '375', '750', 'Commentaire'],
        ['Ligne 2', '200', '400', '600', '1200', 'Commentaire'],
        ['Ligne 3', '150', '300', '450', '900', 'Commentaire'],
        ['Ligne 4', '175', '350', '525', '1050', 'Commentaire'],
        ['TOTAL', '650', '1300', '1950', '3900', '']
      ];
    }
    
    return rows;
  };

  const sampleData = generateSampleData();

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
      className={isFullscreen ? 'fixed inset-0 z-50' : ''}
    >
      <DialogContent className={`${isFullscreen ? 'max-w-full h-screen m-0 rounded-none' : 'max-w-4xl'} p-0`}>
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-khaki-600" />
            <DialogTitle className="text-base font-medium m-0">{file.title}</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleFullscreen} 
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setCurrentTab('aperçu')}
            className={`px-4 py-2 text-sm font-medium ${
              currentTab === 'aperçu' ? 'border-b-2 border-khaki-500 text-khaki-700' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Aperçu
          </button>
          <button 
            onClick={() => setCurrentTab('propriétés')}
            className={`px-4 py-2 text-sm font-medium ${
              currentTab === 'propriétés' ? 'border-b-2 border-khaki-500 text-khaki-700' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Propriétés
          </button>
        </div>
        
        <div className="p-4 overflow-auto" style={{ maxHeight: isFullscreen ? 'calc(100vh - 8rem)' : '70vh' }}>
          {currentTab === 'aperçu' ? (
            <div className="overflow-x-auto">
              <div className="bg-white border rounded-md shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {sampleData[0].map((header, index) => (
                          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sampleData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
                  <p className="text-xs text-gray-500">
                    Le contenu affiché est un aperçu générique. Téléchargez le fichier Excel complet pour accéder à toutes les fonctionnalités.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Informations sur le fichier</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
                  <div className="text-sm font-medium text-gray-500">Nom du fichier</div>
                  <div className="col-span-2 text-sm text-gray-900">{file.filename}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
                  <div className="text-sm font-medium text-gray-500">Version</div>
                  <div className="col-span-2 text-sm text-gray-900">{file.version}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
                  <div className="text-sm font-medium text-gray-500">Dernière mise à jour</div>
                  <div className="col-span-2 text-sm text-gray-900">{file.lastUpdate}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
                  <div className="text-sm font-medium text-gray-500">Type de fichier</div>
                  <div className="col-span-2 text-sm text-gray-900">Microsoft Excel (.xlsx)</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
                  <div className="text-sm font-medium text-gray-500">Créé par</div>
                  <div className="col-span-2 text-sm text-gray-900">Progineer</div>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-3">
                  <div className="text-sm font-medium text-gray-500">Compatibilité</div>
                  <div className="col-span-2 text-sm text-gray-900">Excel 2016 et versions ultérieures</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{file.version}</span>
            <span className="mx-2">•</span>
            <span>Mise à jour: {file.lastUpdate}</span>
          </div>
          <Button onClick={onClose} className="bg-khaki-600 hover:bg-khaki-700">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceFileViewer;
