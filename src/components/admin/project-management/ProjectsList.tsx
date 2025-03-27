
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import ProjectCard, { ProjectCardProps } from './ProjectCard';
import { Link } from 'react-router-dom';

// Mock data for demo purposes
const mockProjects: ProjectCardProps[] = [
  {
    id: "1",
    projectName: "Villa Méditerranée",
    fileNumber: "PRJ-2023-001",
    clientName: "Jean Dupont",
    clientAssigned: true,
    createdAt: "2023-06-15",
    projectType: "residential",
    location: "Marseille",
    budget: "450 000 €",
    status: "active",
    progress: 65
  },
  {
    id: "2",
    projectName: "Commerce Centre-Ville",
    fileNumber: "PRJ-2023-002",
    clientName: "Marie Martin",
    clientAssigned: true,
    createdAt: "2023-07-22",
    projectType: "commercial",
    location: "Aix-en-Provence",
    budget: "280 000 €",
    status: "active",
    progress: 30
  },
  {
    id: "3",
    projectName: "Bureau Open Space",
    fileNumber: "PRJ-2023-003",
    clientAssigned: false,
    createdAt: "2023-08-10",
    projectType: "commercial",
    location: "Nice",
    budget: "320 000 €",
    status: "draft",
    progress: 0
  },
  {
    id: "4",
    projectName: "Rénovation Appartement",
    fileNumber: "PRJ-2023-004",
    clientName: "Sophie Lefebvre",
    clientAssigned: true,
    createdAt: "2023-09-05",
    projectType: "residential",
    location: "Toulon",
    budget: "120 000 €",
    status: "completed",
    progress: 100
  },
  {
    id: "5",
    projectName: "Entrepôt Logistique",
    fileNumber: "PRJ-2023-005",
    clientAssigned: false,
    createdAt: "2023-09-18",
    projectType: "industrial",
    location: "Fos-sur-Mer",
    budget: "780 000 €",
    status: "on-hold",
    progress: 15
  }
];

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');

  // Filter projects based on search and filters
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = 
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.clientName && project.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.projectType === typeFilter;
    const matchesClient = clientFilter === 'all' || 
      (clientFilter === 'assigned' && project.clientAssigned) ||
      (clientFilter === 'unassigned' && !project.clientAssigned);
    
    return matchesSearch && matchesStatus && matchesType && matchesClient;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Rechercher un projet..."
            className="pl-9 bg-white border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="active">En cours</SelectItem>
              <SelectItem value="on-hold">En attente</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
              <Building className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="residential">Résidentiel</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industriel</SelectItem>
              <SelectItem value="public">Établissement public</SelectItem>
              <SelectItem value="mixed">Mixte</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
              <User className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              <SelectItem value="assigned">Avec client</SelectItem>
              <SelectItem value="unassigned">Sans client</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            size="sm" 
            className="bg-khaki-600 hover:bg-khaki-700 text-white"
            asChild
          >
            <Link to="/workspace/client-area/admin/projects/create">
              <Plus className="h-4 w-4 mr-1" />
              Nouveau projet
            </Link>
          </Button>
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <SlidersHorizontal className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun projet trouvé</h3>
          <p className="text-gray-500 mb-4">Modifiez vos critères de recherche ou créez un nouveau projet.</p>
          <Button 
            className="bg-khaki-600 hover:bg-khaki-700 text-white"
            asChild
          >
            <Link to="/workspace/client-area/admin/projects/create">
              <Plus className="h-4 w-4 mr-2" />
              Créer un nouveau projet
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
