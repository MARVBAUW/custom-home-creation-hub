
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, File, Plus, Upload, Trash2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  path: string;
  size?: number;
  created_at: string;
  parent_folder?: string;
}

const ClientFileManager = ({ projectId, clientId }: { projectId?: string; clientId?: string }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{name: string, path: string | null}[]>([{ name: 'Racine', path: null }]);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
  }, [currentFolder, projectId, clientId]);

  const loadFiles = async () => {
    let path = currentFolder ? currentFolder : '';
    if (projectId) path = `projects/${projectId}/${path}`;
    if (clientId) path = `clients/${clientId}/${path}`;
    
    // Simulation des données pour ce composant de démonstration
    // Dans une implémentation réelle, vous feriez une requête à Supabase ici
    const mockFiles: FileItem[] = [
      { 
        id: '1', 
        name: 'Documents', 
        type: 'folder', 
        path: currentFolder ? `${currentFolder}/Documents` : 'Documents',
        created_at: new Date().toISOString(),
        parent_folder: currentFolder
      },
      { 
        id: '2', 
        name: 'Plans', 
        type: 'folder', 
        path: currentFolder ? `${currentFolder}/Plans` : 'Plans',
        created_at: new Date().toISOString(),
        parent_folder: currentFolder
      },
      { 
        id: '3', 
        name: 'Contrat.pdf', 
        type: 'file', 
        path: currentFolder ? `${currentFolder}/Contrat.pdf` : 'Contrat.pdf',
        size: 1200000, // ~1.2MB
        created_at: new Date().toISOString(),
        parent_folder: currentFolder
      },
      { 
        id: '4', 
        name: 'Devis.docx', 
        type: 'file', 
        path: currentFolder ? `${currentFolder}/Devis.docx` : 'Devis.docx',
        size: 850000, // ~850KB
        created_at: new Date().toISOString(),
        parent_folder: currentFolder
      }
    ];
    
    setFiles(mockFiles);
  };

  const navigateToFolder = (folderPath: string | null, folderName: string) => {
    setCurrentFolder(folderPath);
    
    if (folderPath === null) {
      // Retour à la racine
      setBreadcrumbs([{ name: 'Racine', path: null }]);
    } else {
      // Ajouter le dossier actuel aux breadcrumbs
      const newBreadcrumbs = [...breadcrumbs.filter(b => b.path !== folderPath), { name: folderName, path: folderPath }];
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Nom invalide",
        description: "Veuillez entrer un nom de dossier valide.",
        variant: "destructive"
      });
      return;
    }

    // Dans une implémentation réelle, vous créeriez le dossier dans Supabase ici
    // Pour cette démo, nous ajoutons simplement à la liste locale
    
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: 'folder',
      path: currentFolder ? `${currentFolder}/${newFolderName}` : newFolderName,
      created_at: new Date().toISOString(),
      parent_folder: currentFolder
    };
    
    setFiles([...files, newFolder]);
    setNewFolderName('');
    setIsNewFolderDialogOpen(false);
    
    toast({
      title: "Dossier créé",
      description: `Le dossier "${newFolderName}" a été créé avec succès.`
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Simulation d'un chargement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dans une implémentation réelle, vous téléchargeriez le fichier dans Supabase ici
      // Pour cette démo, nous ajoutons simplement à la liste locale
      
      const newFiles = Array.from(uploadedFiles).map(file => ({
        id: Date.now().toString() + file.name,
        name: file.name,
        type: 'file' as const,
        path: currentFolder ? `${currentFolder}/${file.name}` : file.name,
        size: file.size,
        created_at: new Date().toISOString(),
        parent_folder: currentFolder
      }));
      
      setFiles([...files, ...newFiles]);
      
      toast({
        title: "Fichier(s) téléchargé(s)",
        description: `${uploadedFiles.length} fichier(s) ont été téléchargés avec succès.`
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur s'est produite lors du téléchargement des fichiers.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (item: FileItem) => {
    // Dans une implémentation réelle, vous supprimeriez de Supabase ici
    setFiles(files.filter(f => f.id !== item.id));
    
    toast({
      title: `${item.type === 'folder' ? 'Dossier' : 'Fichier'} supprimé`,
      description: `"${item.name}" a été supprimé avec succès.`
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <Card className="border-gray-200 shadow-sm h-full">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Gestion des fichiers</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsNewFolderDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" /> Nouveau dossier
            </Button>
            
            <label className="cursor-pointer">
              <Button 
                variant="default" 
                size="sm"
                className="bg-khaki-600 hover:bg-khaki-700"
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-1" /> Télécharger
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  multiple 
                  disabled={isUploading}
                />
              </Button>
            </label>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Breadcrumb navigation */}
        <div className="px-4 py-2 border-b bg-gray-50 flex items-center text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
              <button
                className="text-khaki-600 hover:text-khaki-800"
                onClick={() => navigateToFolder(crumb.path, crumb.name)}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>
        
        {/* File list */}
        <div className="divide-y">
          {files.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>Ce dossier est vide</p>
              <p className="text-sm mt-1">Téléchargez des fichiers ou créez un dossier pour commencer</p>
            </div>
          ) : (
            files.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div 
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() => item.type === 'folder' ? navigateToFolder(item.path, item.name) : null}
                >
                  {item.type === 'folder' ? (
                    <Folder className="h-5 w-5 text-khaki-600 mr-3" />
                  ) : (
                    <File className="h-5 w-5 text-blue-600 mr-3" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.type === 'file' ? formatFileSize(item.size) : 'Dossier'} • 
                      {new Date(item.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.type === 'file' && (
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      {/* Nouveau dossier dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau dossier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nom du dossier"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleCreateFolder}
              className="bg-khaki-600 hover:bg-khaki-700"
            >
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClientFileManager;
