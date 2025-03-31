
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Filter, Plus } from 'lucide-react';

const documents = [
  { id: 1, name: "Rapport Chantier Paris", type: "PDF", date: "03/04/2023", size: "1.2 MB", category: "Rapport" },
  { id: 2, name: "Contrat Client Durand", type: "DOCX", date: "02/04/2023", size: "0.8 MB", category: "Contrat" },
  { id: 3, name: "Devis Rénovation Marseille", type: "PDF", date: "01/04/2023", size: "2.4 MB", category: "Devis" },
  { id: 4, name: "Photos Chantier Lyon", type: "ZIP", date: "29/03/2023", size: "15.7 MB", category: "Photos" },
  { id: 5, name: "Plan Aménagement Nantes", type: "PDF", date: "28/03/2023", size: "3.5 MB", category: "Plan" },
];

const AdminDocuments = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Documents</CardTitle>
              <CardDescription>
                Gérez tous vos documents et fichiers professionnels
              </CardDescription>
            </div>
            <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Rechercher un document..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="flex items-center md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-khaki-600" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-xs text-gray-500">
            Affichage de 1 à 5 sur 12 documents
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDocuments;
