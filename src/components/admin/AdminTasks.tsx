
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const tasks = [
  { id: 1, title: "Visite chantier Marseille", dueDate: "04/04/2023", assignee: "Jean Dupont", priority: "high", status: "pending", project: "Rénovation Villa" },
  { id: 2, title: "Appel client Durand", dueDate: "05/04/2023", assignee: "Marie Martin", priority: "medium", status: "completed", project: "Appartement Paris" },
  { id: 3, title: "Finaliser devis Lyon", dueDate: "06/04/2023", assignee: "Pierre Legrand", priority: "high", status: "pending", project: "Construction Bureaux" },
  { id: 4, title: "Réunion équipe projet Nantes", dueDate: "07/04/2023", assignee: "Sophie Leroy", priority: "low", status: "planned", project: "Extension Maison" },
  { id: 5, title: "Revue de plans Strasbourg", dueDate: "08/04/2023", assignee: "Thomas Bernard", priority: "medium", status: "pending", project: "Rénovation Boutique" },
];

const AdminTasks = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Tâches</CardTitle>
              <CardDescription>
                Gérez vos tâches, échéances et suivis de projets
              </CardDescription>
            </div>
            <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle tâche
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Rechercher une tâche..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="flex items-center md:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
            <Button variant="outline" className="flex items-center md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tâche</TableHead>
                  <TableHead>Projet</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Assignée à</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' :
                        task.priority === 'medium' ? 'default' : 'outline'
                      }>
                        {task.priority === 'high' ? 'Haute' : 
                         task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : task.status === 'planned' ? (
                          <Clock className="h-4 w-4 text-blue-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span>
                          {task.status === 'completed' ? 'Terminée' : 
                           task.status === 'planned' ? 'Planifiée' : 'En attente'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-xs text-gray-500">
            Affichage de 1 à 5 sur 12 tâches
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

export default AdminTasks;
