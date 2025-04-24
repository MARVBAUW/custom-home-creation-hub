
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileSpreadsheet, Download, X, Maximize2, Minimize2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { handleFileDownload } from '@/utils/downloadUtils';
import FilePreviewTable from './FilePreviewTable';
import FileProperties from './FileProperties';
import FileMacroWarning from './FileMacroWarning';
import { generateSampleData, getMacroNote } from './fileViewerUtils';
import { useToast } from '@/hooks/use-toast';

interface FileViewerProps {
  file: {
    title: string;
    filename: string;
    version: string;
    lastUpdate: string;
    url?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkspaceFileViewer = ({ file, isOpen, onClose }: FileViewerProps) => {
  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState('aperçu');
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!file) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const sampleData = generateSampleData(file);
  const macroNote = getMacroNote(file);

  const handleDownloadClick = async () => {
    if (!file?.url) {
      toast({
        title: "Erreur",
        description: "URL du fichier non disponible",
        variant: 'destructive'
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const result = await handleFileDownload(file.url, file.title, {
        showToast: true,
        fileName: file.filename,
        contentType: determineContentType(file.filename)
      });
      
      if (result.success) {
        toast({
          title: "Téléchargement réussi",
          description: `Le fichier "${file.title}" a été téléchargé avec succès.`
        });
        onClose();
      } else {
        toast({
          title: "Erreur de téléchargement",
          description: result.error || "Une erreur est survenue lors du téléchargement. Veuillez réessayer.",
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.",
        variant: 'destructive'
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Helper to determine content type based on filename
  const determineContentType = (filename: string): string => {
    if (!filename) return 'application/pdf';
    
    const extension = filename.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf': return 'application/pdf';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'txt': return 'text/plain';
      default: return 'application/octet-stream';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={isFullscreen ? "max-w-full h-screen m-0 rounded-none" : "max-w-4xl p-0"}>
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-khaki-600" />
            <h2 className="text-base font-medium m-0">{file.title}</h2>
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
                  <FilePreviewTable sampleData={sampleData} />
                </div>
                <FileMacroWarning macroNote={macroNote} />
              </div>
            </div>
          ) : (
            <FileProperties file={file} />
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{file.version}</span>
            <span className="mx-2">•</span>
            <span>Mise à jour: {file.lastUpdate}</span>
          </div>
          <Button 
            onClick={handleDownloadClick} 
            className="bg-khaki-600 hover:bg-khaki-700"
            disabled={isDownloading}
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? 'Téléchargement...' : 'Télécharger'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceFileViewer;
