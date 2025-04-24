
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Building, MapPin, Calendar } from "lucide-react";

interface ClientContactCardProps {
  client: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
    registrationDate: string;
    projectType: string;
    projectLocation: string;
    projectBudget: string;
  };
}

const ClientContactCard: React.FC<ClientContactCardProps> = ({ client }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
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
  );
};

export default ClientContactCard;
