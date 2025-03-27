
import React, { useState } from 'react';
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentItem from './DocumentItem';
import AddDocumentDialog from './AddDocumentDialog';
import { Document, documentCategories, mockDocuments } from './types';

const DocumentsTabContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [documents, setDocuments] = useState(mockDocuments);
  
  const handleAddDocument = (document: Document) => {
    setDocuments([...documents, document]);
  };
  
  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const filteredDocuments = activeCategory === "all" 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-medium">Documents</h3>
        <AddDocumentDialog onAddDocument={handleAddDocument} />
      </div>
      
      {documents.length > 0 ? (
        <Card className="border-gray-200">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
              <TabsTrigger value="all">
                Tous
              </TabsTrigger>
              {documentCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="p-4 space-y-3">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <DocumentItem 
                    key={doc.id} 
                    document={doc} 
                    onDelete={handleDeleteDocument} 
                  />
                ))
              ) : (
                <div className="text-center p-6 text-gray-500">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <p>Aucun document dans cette catégorie</p>
                </div>
              )}
            </div>
          </Tabs>
        </Card>
      ) : (
        <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
          <h4 className="font-medium mb-2">Aucun document</h4>
          <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de documents associés.</p>
          <AddDocumentDialog onAddDocument={handleAddDocument} />
        </div>
      )}
    </div>
  );
};

export default DocumentsTabContent;
