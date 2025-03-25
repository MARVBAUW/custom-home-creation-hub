
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileLock, FileCheck, File, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Sample document data
const recentDocuments = [
  { 
    id: 1, 
    name: 'Devis travaux menuiserie', 
    type: 'Devis', 
    date: '10/07/2023', 
    status: 'Nouveau',
    fileType: 'PDF'
  },
  { 
    id: 2, 
    name: 'Plans modifiés RDC', 
    type: 'Plan', 
    date: '05/07/2023', 
    status: 'Mis à jour',
    fileType: 'DWG'
  },
  { 
    id: 3, 
    name: 'Compte-rendu réunion 28/06', 
    type: 'Rapport', 
    date: '30/06/2023', 
    status: 'Validé',
    fileType: 'PDF'
  },
  { 
    id: 4, 
    name: 'Planning travaux S29-S35', 
    type: 'Planning', 
    date: '28/06/2023', 
    status: 'Validé',
    fileType: 'PDF'
  },
];

const ClientAreaRecentDocuments = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Documents récents
            </CardTitle>
            <CardDescription>
              Derniers documents ajoutés à votre espace
            </CardDescription>
          </div>
          <Link to="/workspace/client-area/documents">
            <Button variant="ghost" size="sm" className="text-khaki-600 hover:text-khaki-800 hover:bg-khaki-50">
              Tous les documents
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Document</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {doc.fileType === 'PDF' ? (
                        <FileLock className="h-5 w-5 mr-3 text-red-500" />
                      ) : doc.fileType === 'DWG' ? (
                        <FileCheck className="h-5 w-5 mr-3 text-blue-500" />
                      ) : (
                        <File className="h-5 w-5 mr-3 text-gray-500" />
                      )}
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{doc.type}</td>
                  <td className="px-4 py-3 text-gray-600">{doc.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant={
                      doc.status === 'Nouveau' ? 'default' :
                      doc.status === 'Mis à jour' ? 'outline' :
                      doc.status === 'Validé' ? 'secondary' : 'default'
                    } className={
                      doc.status === 'Nouveau' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                      doc.status === 'Mis à jour' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                      doc.status === 'Validé' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                    }>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientAreaRecentDocuments;
