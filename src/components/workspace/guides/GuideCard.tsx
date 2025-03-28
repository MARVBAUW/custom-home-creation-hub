
import React from 'react';
import { FileText, Video, Book } from 'lucide-react';
import { GuideDocument } from './types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GuideCardProps {
  document: GuideDocument;
  onClick: (document: GuideDocument) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ document, onClick }) => {
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'text':
        return <Book className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card 
      key={document.id} 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(document)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className={`p-2 rounded-md ${
            document.type === 'pdf' ? 'bg-blue-50 text-blue-600' : 
            document.type === 'video' ? 'bg-red-50 text-red-600' : 
            'bg-khaki-50 text-khaki-600'
          }`}>
            {getDocumentIcon(document.type)}
          </div>
          <div className="flex space-x-2">
            {document.isNew && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Nouveau
              </Badge>
            )}
          </div>
        </div>
        <h4 className="font-medium mb-2 line-clamp-2">{document.title}</h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{document.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Mis à jour le {document.lastUpdated}</span>
          <span>{document.fileSize || document.duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};
