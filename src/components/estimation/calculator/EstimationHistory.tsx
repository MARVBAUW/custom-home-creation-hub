
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, FileText, Edit, Trash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const EstimationHistory: React.FC = () => {
  const { user } = useAuth();
  // Simulated history data - in a real app this would come from a database
  const mockHistory = [
    {
      id: '001',
      date: '2023-11-15',
      type: 'Construction neuve',
      surface: 120,
      cost: 264000,
      saved: true
    },
    {
      id: '002',
      date: '2023-12-03',
      type: 'Extension',
      surface: 45,
      cost: 78500,
      saved: true
    },
    {
      id: '003',
      date: '2024-01-21',
      type: 'Rénovation',
      surface: 85,
      cost: 112000,
      saved: false
    },
    {
      id: '004',
      date: '2024-04-02',
      type: 'Construction neuve',
      surface: 160,
      cost: 352000,
      saved: true
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Historique des estimations</h2>
            {user ? (
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Exporter l'historique
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Connexion requise
              </Button>
            )}
          </div>
          
          {user ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Surface</TableHead>
                    <TableHead>Estimation</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {new Date(item.date).toLocaleDateString('fr-FR')}
                        </div>
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.surface} m²</TableCell>
                      <TableCell>{item.cost.toLocaleString()} €</TableCell>
                      <TableCell>
                        {item.saved ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Enregistrée
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Temporaire
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <p className="text-gray-600 mb-4">Connectez-vous pour accéder à l'historique de vos estimations</p>
              <Button>Se connecter / S'inscrire</Button>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-blue-800 font-medium mb-2">À propos de l'historique</h3>
            <p className="text-blue-700 text-sm">
              L'historique des estimations est automatiquement sauvegardé pour les utilisateurs connectés.
              Les estimations temporaires sont conservées pendant 30 jours.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationHistory;
