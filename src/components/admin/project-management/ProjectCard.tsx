
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, User, Clock, MapPin, Building, DollarSign } from "lucide-react";
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: string;
  projectName: string;
  fileNumber: string;
  clientName?: string;
  clientAssigned: boolean;
  createdAt: string;
  projectType: string;
  location: string;
  budget?: string;
  status: 'draft' | 'active' | 'completed' | 'on-hold';
  progress?: number;
}

const statusColors = {
  'draft': 'bg-gray-100 text-gray-800',
  'active': 'bg-green-100 text-green-800',
  'completed': 'bg-blue-100 text-blue-800',
  'on-hold': 'bg-amber-100 text-amber-800'
};

const projectTypeLabels = {
  'residential': 'Résidentiel',
  'commercial': 'Commercial',
  'industrial': 'Industriel',
  'public': 'Établissement public',
  'mixed': 'Mixte',
  'other': 'Autre'
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const ProjectCard = ({
  id,
  projectName,
  fileNumber,
  clientName,
  clientAssigned,
  createdAt,
  projectType,
  location,
  budget,
  status,
  progress = 0
}: ProjectCardProps) => {
  return (
    <Card className="border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">{projectName}</CardTitle>
            <CardDescription className="flex items-center space-x-1">
              <FileText className="h-3.5 w-3.5" />
              <span>{fileNumber}</span>
            </CardDescription>
          </div>
          <Badge className={statusColors[status] || 'bg-gray-100'}>
            {status === 'draft' && 'Brouillon'}
            {status === 'active' && 'En cours'}
            {status === 'completed' && 'Terminé'}
            {status === 'on-hold' && 'En attente'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <User className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
            {clientAssigned ? (
              <span>{clientName || 'Client assigné'}</span>
            ) : (
              <span className="text-amber-600">Non assigné</span>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
            <span>{projectTypeLabels[projectType as keyof typeof projectTypeLabels] || projectType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
            <span>{location}</span>
          </div>
          {budget && (
            <div className="flex items-center text-gray-600 col-span-2">
              <DollarSign className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
              <span>{budget}</span>
            </div>
          )}
        </div>
        
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs text-gray-600">Progression</div>
              <div className="text-xs font-medium">{progress}%</div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-khaki-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-3 flex justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Créé le {formatDate(createdAt)}</span>
        </div>
        <div className="flex space-x-2">
          {!clientAssigned && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8 border-khaki-200"
              asChild
            >
              <Link to={`/workspace/client-area/admin/projects/${id}/assign-client`}>
                Assigner
              </Link>
            </Button>
          )}
          <Button 
            size="sm" 
            className="text-xs h-8 bg-khaki-600 hover:bg-khaki-700 text-white"
            asChild
          >
            <Link to={`/workspace/client-area/admin/projects/${id}`}>
              Gérer
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
