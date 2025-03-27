
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, User, Mail, Phone, Building, MapPin, Calendar, FileText, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock client data
const mockClient = {
  id: 'demo-user-1',
  name: 'Marc Dubois',
  email: 'marc.dubois@example.com',
  phone: '06 12 34 56 78',
  address: '123 Avenue des Champs-Élysées, 75008 Paris',
  company: 'Dubois Constructions',
  registrationDate: '2023-10-15T10:30:00.000Z',
  projectDescription: 'Construction d\'une villa contemporaine avec piscine et aménagement paysager. Le projet inclut un espace de vie ouvert, 4 chambres, et un bureau à domicile.',
  projectType: 'residential',
  projectLocation: 'Aix-en-Provence',
  projectBudget: '650 000 €',
  hasProjects: false,
  projects: [] as any[]
};

// Mock projects to associate
const availableProjects = [
  { id: 'proj-1', title: 'Villa Méditerranée', location: 'Marseille', type: 'Construction neuve', status: 'En attente' },
  { id: 'proj-2', title: 'Rénovation bureaux', location: 'Lyon', type: 'Rénovation', status: 'Planifié' },
  { id: 'proj-3', title: 'Extension maison', location: 'Nice', type: 'Extension', status: 'En attente' }
];

interface ClientDetailViewProps {
  clientId: string;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // In a real app, fetch client details based on clientId
  const client = mockClient;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild className="h-9">
            <Link to="/workspace/client-area/admin/clients">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour à la liste
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{client.name}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span>{client.email}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!client.hasProjects && (
            <Button 
              size="sm" 
              className="h-9 bg-khaki-600 hover:bg-khaki-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assigner un projet
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Voir les devis
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">Coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 text-khaki-600 mr-2" />
                  <span className="font-medium">{client.name}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-khaki-600 mr-2" />
                  <span>{client.email}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-khaki-600 mr-2" />
                  <span>{client.phone}</span>
                </div>
                
                {client.company && (
                  <div className="flex items-center text-sm">
                    <Building className="h-4 w-4 text-khaki-600 mr-2" />
                    <span>{client.company}</span>
                  </div>
                )}
                
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>{client.address}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-khaki-600 mr-2" />
                  <span>Inscrit le {formatDate(client.registrationDate)}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Projet souhaité</h3>
                <div className="text-sm space-y-2">
                  <div>
                    <span className="font-medium">Type:</span> {client.projectType === 'residential' ? 'Résidentiel' : client.projectType}
                  </div>
                  <div>
                    <span className="font-medium">Localisation:</span> {client.projectLocation}
                  </div>
                  <div>
                    <span className="font-medium">Budget estimé:</span> {client.projectBudget}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">Projets associés</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {client.projects && client.projects.length > 0 ? (
                <div className="space-y-3">
                  {client.projects.map(project => (
                    <Link 
                      key={project.id} 
                      to={`/workspace/client-area/admin/projects/${project.id}`}
                      className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      <div className="font-medium text-sm">{project.title}</div>
                      <div className="text-xs text-gray-500">{project.type} - {project.location}</div>
                      <Badge variant="outline" className="mt-1 text-xs">{project.status}</Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 mb-3">Aucun projet associé</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                  >
                    Assigner un projet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-0">
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-0 w-full md:w-auto justify-start">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Projets
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
                    Documents
                  </TabsTrigger>
                </TabsList>
              
                <TabsContent value="profile" className="m-0 pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Description du projet</h3>
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <p className="text-sm text-gray-700">{client.projectDescription}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-3">Notes internes</h3>
                      <textarea 
                        className="w-full min-h-[120px] p-3 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent outline-none"
                        placeholder="Ajoutez des notes internes sur ce client ici..."
                      />
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
                          Enregistrer les notes
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="m-0 pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Projets associés</h3>
                      {client.projects && client.projects.length > 0 ? (
                        <div className="space-y-4">
                          {client.projects.map(project => (
                            <Card key={project.id} className="border-gray-200">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{project.title}</h4>
                                    <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
                                    <Badge className="mt-2" variant="outline">{project.status}</Badge>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    asChild
                                  >
                                    <Link to={`/workspace/client-area/admin/projects/${project.id}`}>
                                      Voir le projet
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
                          <h4 className="font-medium mb-2">Aucun projet associé</h4>
                          <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de projet associé.</p>
                          <div className="space-y-4">
                            <Button className="bg-khaki-600 hover:bg-khaki-700">
                              Assigner un projet existant
                            </Button>
                            <div className="text-center">
                              <span className="text-sm text-gray-500">ou</span>
                            </div>
                            <Button 
                              variant="outline"
                              asChild
                            >
                              <Link to="/workspace/client-area/admin/projects/create">
                                Créer un nouveau projet
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!client.hasProjects && (
                      <div className="pt-6">
                        <h3 className="text-lg font-medium mb-3">Projets disponibles</h3>
                        <div className="space-y-3">
                          {availableProjects.map(project => (
                            <div 
                              key={project.id}
                              className="p-4 border border-gray-200 rounded-md flex justify-between items-center hover:bg-gray-50"
                            >
                              <div>
                                <h4 className="font-medium">{project.title}</h4>
                                <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
                                <Badge className="mt-1" variant="outline">{project.status}</Badge>
                              </div>
                              <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
                                Assigner
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="m-0 pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Documents</h3>
                      <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
                        <h4 className="font-medium mb-2">Aucun document</h4>
                        <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de documents associés.</p>
                        <Button className="bg-khaki-600 hover:bg-khaki-700">
                          Ajouter un document
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent className="p-6">
              {/* Content now rendered inside TabsContent components */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailView;
