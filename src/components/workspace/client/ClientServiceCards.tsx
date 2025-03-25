
import React from 'react';
import { User, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ClientServiceCards = () => {
  const services = [
    {
      title: "Tableau de bord",
      description: "Accédez à une vue d'ensemble de votre projet avec toutes les informations essentielles regroupées au même endroit.",
      icon: <User className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Plannings & Événements",
      description: "Consultez le calendrier des prochaines étapes et recevez des rappels pour les événements importants de votre projet.",
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Messagerie dédiée",
      description: "Communiquez facilement avec tous les intervenants de votre projet via notre messagerie sécurisée intégrée.",
      icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-100"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <Card key={index}>
          <CardHeader className="space-y-1">
            <div className={`${service.bgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
              {service.icon}
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {service.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientServiceCards;
