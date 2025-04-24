
import React, { useState } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface FileViewerProps {
  fileUrl: string;
  fileName: string;
  fileType: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, fileName, fileType }) => {
  const [loadError, setLoadError] = useState(false);
  const { toast } = useToast();

  const handleLoadError = () => {
    setLoadError(true);
    toast({
      title: "Erreur de chargement",
      description: "Impossible de charger l'aperçu du document. Vous pouvez le télécharger directement.",
      variant: "destructive"
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Succès",
        description: "Le document a été téléchargé avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement du document.",
        variant: "destructive"
      });
    }
  };

  if (fileType === 'pdf') {
    return (
      <div className="w-full h-full min-h-[500px] relative">
        {loadError ? (
          <div className="p-6 flex flex-col items-center justify-center space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Le document PDF n'a pas pu être chargé. Cela peut être dû à des restrictions de sécurité du navigateur 
                ou à un problème d'accès au fichier.
              </AlertDescription>
            </Alert>
            <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Télécharger le document
            </Button>
          </div>
        ) : (
          <>
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full min-h-[500px]"
              onError={handleLoadError}
            >
              <iframe
                src={`${fileUrl}#toolbar=0`}
                className="w-full h-full border-0"
                onError={handleLoadError}
                title={fileName}
              />
            </object>
            <div className="absolute bottom-4 right-4">
              <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Handle other file types
  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">
        L'aperçu n'est pas disponible pour ce type de fichier.
      </p>
      <Button onClick={handleDownload} variant="outline" className="mt-4 flex items-center gap-2">
        <Download className="h-4 w-4" />
        Télécharger le fichier
      </Button>
    </div>
  );
};

export default FileViewer;
