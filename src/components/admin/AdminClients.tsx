
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const clients = [
  { id: "client-1", name: "Jean Dupont", email: "jean.dupont@example.com", phone: "06 12 34 56 78", status: "active", projects: 3, company: "Dupont & Fils" },
  { id: "client-2", name: "Marie Martin", email: "marie.martin@example.com", phone: "06 98 76 54 32", status: "inactive", projects: 1, company: "Martin SARL" },
  { id: "client-3", name: "Pierre Durand", email: "pierre.durand@example.com", phone: "07 11 22 33 44", status: "active", projects: 2, company: null },
  { id: "client-4", name: "Sophie Leroy", email: "sophie.leroy@example.com", phone: "06 55 44 33 22", status: "pending", projects: 0, company: "Leroy Constructions" },
  { id: "client-5", name: "Thomas Bernard", email: "thomas.bernard@example.com", phone: "07 99 88 77 66", status: "active", projects: 4, company: "Bernard Architectes" },
];

const AdminClients = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-xl">Clients</CardTitle>
            <Button asChild className="bg-khaki-600 hover:bg-khaki-700 text-white">
              <Link to="/workspace/client-area/admin/clients/new">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un client
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Rechercher un client..."
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
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Projets</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`} alt={client.name} />
                          <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        client.status === 'active' ? 'default' :
                        client.status === 'inactive' ? 'secondary' : 'outline'
                      }>
                        {client.status === 'active' ? 'Actif' : 
                         client.status === 'inactive' ? 'Inactif' : 'En attente'}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.projects}</TableCell>
                    <TableCell>{client.company || 'Particulier'}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
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
            Affichage de 1 à 5 sur 5 clients
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" disabled>
              Suivant
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminClients;
