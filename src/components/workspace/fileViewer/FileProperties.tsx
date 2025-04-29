
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, User, Clock, Tag } from 'lucide-react';

interface FilePropertiesProps {
  file: {
    title: string;
    filename: string;
    version?: string;
    lastUpdate: string;
    author?: string;
    size?: string;
    type?: string;
    category?: string;
    tags?: string[];
    description?: string;
  };
}

const FileProperties: React.FC<FilePropertiesProps> = ({ file }) => {
  // Get file extension from filename
  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    switch(ext) {
      case 'pdf': return 'Document PDF';
      case 'docx': return 'Document Word';
      case 'xlsx': return 'Feuille de calcul Excel';
      case 'pptx': return 'Présentation PowerPoint';
      case 'jpg':
      case 'jpeg':
      case 'png': return 'Image';
      case 'zip': return 'Archive ZIP';
      default: return ext.toUpperCase();
    }
  };

  const fileType = file.type || getFileType(file.filename);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Propriétés du fichier</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                <span>Nom du fichier</span>
              </div>
              <span className="font-medium">{file.filename}</span>
            </div>
            
            {file.version && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-gray-500">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Version</span>
                </div>
                <span>{file.version}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>Type de fichier</span>
              </div>
              <span>{fileType}</span>
            </div>
            
            {file.size && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-gray-500">
                  <span>Taille</span>
                </div>
                <span>{file.size}</span>
              </div>
            )}
            
            {file.author && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span>Auteur</span>
                </div>
                <span>{file.author}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Dernière modification</span>
              </div>
              <span>{file.lastUpdate}</span>
            </div>
            
            {file.category && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-gray-500">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Catégorie</span>
                </div>
                <span>{file.category}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {file.description && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-gray-600">{file.description}</p>
          </CardContent>
        </Card>
      )}
      
      {file.tags && file.tags.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {file.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileProperties;
