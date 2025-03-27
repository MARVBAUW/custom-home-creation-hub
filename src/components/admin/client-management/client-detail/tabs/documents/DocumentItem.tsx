
import React from 'react';
import { FileText, FileImage, FileArchive, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Document, DocumentCategory, documentCategories } from './types';

interface DocumentItemProps {
  document: Document;
  onDelete: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  const category = documentCategories.find(cat => cat.id === document.category);
  
  // Function to determine icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        {getFileIcon(document.type)}
        <div>
          <p className="font-medium">{document.name}</p>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <span>{document.size}</span>
            <span>•</span>
            <span>{document.date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className={category?.color}>{category?.name}</Badge>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 text-gray-500"
          onClick={() => onDelete(document.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;
