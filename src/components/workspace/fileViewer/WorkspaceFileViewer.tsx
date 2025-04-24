
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileSpreadsheet, X, Maximize2, Minimize2 } from 'lucide-react';
import Button from '@/components/common/Button';
import FileViewer from '@/components/workspace/FileViewer';
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

  const getFileType = (filename: string = ''): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return extension;
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
          {currentTab === 'aperçu' && (
            <div className="overflow-x-auto">
              {file.url ? (
                <FileViewer
                  fileUrl={file.url}
                  fileName={file.filename}
                  fileType={getFileType(file.filename)}
                />
              ) : (
                <div className="bg-white border rounded-md shadow-sm">
                  <div className="overflow-x-auto">
                    <FilePreviewTable sampleData={sampleData} />
                  </div>
                  <FileMacroWarning macroNote={macroNote} />
                </div>
              )}
            </div>
          )}
          {currentTab === 'propriétés' && (
            <FileProperties file={file} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceFileViewer;
