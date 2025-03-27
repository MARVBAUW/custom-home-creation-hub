
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, MoreVertical, User2, Building2, FileText, Mail, UserPlus, Calendar, MapPin } from 'lucide-react';

// Mock data for clients
const mockClients = [
  {
    id: 'demo-user-1',
    name: 'Marc Dubois',
    email: 'marc.dubois@example.com',
    phone: '06 12 34 56 78',
    company: 'Dubois Constructions',
    location: 'Paris',
    projectType: 'residential',
    hasProjects: false,
    registrationDate: '2023-10-15T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '07 23 45 67 89',
    company: '',
    location: 'Lyon',
    projectType: 'commercial',
    hasProjects: true,
    registrationDate: '2023-10-10T14:45:00.000Z',
  },
  {
    id: '3',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    phone: '06 34 56 78 90',
    company: 'Bernard & Fils',
    location: 'Marseille',
    projectType: 'residential',
    hasProjects: false,
    registrationDate: '2023-10-05T09:15:00.000Z',
  },
  {
    id: '4',
    name: 'Julie Petit',
    email: 'julie.petit@example.com',
    phone: '07 45 67 89 01',
    company: '',
    location: 'Bordeaux',
    projectType: 'industrial',
    hasProjects: true,
    registrationDate: '2023-09-28T16:20:00.000Z',
  }
];

const ClientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'withProject', 'withoutProject'
  const { toast } = useToast();
  
  // Filter clients based on search and tabs
  const filteredClients = mockClients.filter(client => {
    // Search filter
    if (searchTerm && !client.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !client.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !client.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'withProject' && !client.hasProjects) return false;
    if (activeTab === 'withoutProject' && client.hasProjects) return false;
    
    return true;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Clients</h2>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un client..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'all' ? 'border-b-2 border-khaki-600 text-khaki-800' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          Tous les clients
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'withProject' ? 'border-b-2 border-khaki-600 text-khaki-800' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('withProject')}
        >
          Avec projet
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'withoutProject' ? 'border-b-2 border-khaki-600 text-khaki-800' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('withoutProject')}
        >
          Sans projet
        </button>
      </div>
      
      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="p-4 md:p-6 flex-1">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border border-gray-200 hidden md:flex">
                        <AvatarFallback className="bg-khaki-100 text-khaki-700">
                          {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="font-medium">{client.name}</h3>
                          <div className="flex items-center">
                            {client.hasProjects ? (
                              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                Projets associés
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                Aucun projet
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-1.5" />
                            {client.email}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            Inscrit le {formatDate(client.registrationDate)}
                          </div>
                          {client.company && (
                            <div className="flex items-center">
                              <Building2 className="h-3.5 w-3.5 mr-1.5" />
                              {client.company}
                            </div>
                          )}
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            {client.location}
                          </div>
                          <div className="flex items-center md:col-span-2">
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            {client.projectType === 'residential' ? 'Projet résidentiel' : 
                             client.projectType === 'commercial' ? 'Projet commercial' : 
                             client.projectType === 'industrial' ? 'Projet industriel' : 'Autre projet'}
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to={`/workspace/client-area/admin/clients/${client.id}`} className="w-full cursor-pointer">
                              Voir les détails
                            </Link>
                          </DropdownMenuItem>
                          {!client.hasProjects && (
                            <DropdownMenuItem asChild>
                              <Link to={`/workspace/client-area/admin/clients/${client.id}?tab=projects`} className="w-full cursor-pointer">
                                Assigner un projet
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Action en cours de développement",
                              description: "Cette fonctionnalité sera bientôt disponible.",
                            });
                          }}>
                            Modifier
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="border-t md:border-t-0 md:border-l border-gray-100 p-3 md:pl-6 md:pr-6 flex justify-center md:justify-end">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/workspace/client-area/admin/clients/${client.id}`}>
                          <User2 className="h-3.5 w-3.5 mr-1.5" />
                          Détails
                        </Link>
                      </Button>
                      
                      {!client.hasProjects && (
                        <Button 
                          size="sm"
                          className="bg-khaki-600 hover:bg-khaki-700 text-white"
                          asChild
                        >
                          <Link to={`/workspace/client-area/admin/clients/${client.id}?tab=projects`}>
                            <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                            Assigner projet
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Aucun client ne correspond aux critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsList;
