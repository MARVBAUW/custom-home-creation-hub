
import React, { useState } from 'react';
import { Upload, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Document, documentCategories } from './types';

interface AddDocumentDialogProps {
  onAddDocument: (document: Document) => void;
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
      const newDocument: Document = {
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

export default AddDocumentDialog;
