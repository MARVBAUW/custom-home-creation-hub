
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, FolderPlus, Upload, File, FileArchive, 
  FileImage, FilePdf, FileCheck, Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Document categories
const documentCategories = [
  { id: "admin", name: "Administratif", color: "bg-blue-100 text-blue-800" },
  { id: "technical", name: "Technique", color: "bg-amber-100 text-amber-800" },
  { id: "contract", name: "Contrats", color: "bg-green-100 text-green-800" },
  { id: "financial", name: "Financier", color: "bg-purple-100 text-purple-800" },
  { id: "project", name: "Projet", color: "bg-khaki-100 text-khaki-800" },
];

// Mock document data for demonstration
const mockDocuments = [
  { 
    id: "1", 
    name: "Devis d'honoraires.pdf", 
    size: "245 KB", 
    category: "financial", 
    date: "15/07/2023",
    type: "pdf"
  },
  { 
    id: "2", 
    name: "Plans_DCE.pdf", 
    size: "1.2 MB", 
    category: "technical", 
    date: "20/07/2023",
    type: "pdf"
  },
  { 
    id: "3", 
    name: "Contrat_client.pdf", 
    size: "325 KB", 
    category: "contract", 
    date: "05/07/2023",
    type: "pdf"
  }
];

interface DocumentItemProps {
  document: {
    id: string;
    name: string;
    size: string;
    category: string;
    date: string;
    type: string;
  };
  onDelete: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  const category = documentCategories.find(cat => cat.id === document.category);
  
  // Function to determine icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdf className="h-5 w-5 text-red-500" />;
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

interface AddDocumentDialogProps {
  onAddDocument: (document: any) => void;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ onAddDocument }) => {
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  const handleSubmit = () => {
    if (fileName && category && file) {
      // In a real app, you would upload the file to a server here
      const newDocument = {
        id: Date.now().toString(),
        name: fileName,
        size: `${Math.round(file.size / 1024)} KB`,
        category,
        date: new Date().toLocaleDateString('fr-FR'),
        type: fileName.split('.').pop()?.toLowerCase() || 'unknown'
      };
      
      onAddDocument(newDocument);
      setFileName("");
      setCategory("");
      setFile(null);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-khaki-600 hover:bg-khaki-700">
          <Upload className="h-4 w-4 mr-2" />
          Ajouter un document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau document</DialogTitle>
          <DialogDescription>
            Téléchargez un document et associez-le à une catégorie
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file">Document</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          {fileName && (
            <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
              <FileCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-gray-500">
                  {file ? `${Math.round(file.size / 1024)} KB` : ''}
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!fileName || !category}
            className="bg-khaki-600 hover:bg-khaki-700"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DocumentsTabContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [documents, setDocuments] = useState(mockDocuments);
  
  const handleAddDocument = (document: any) => {
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
