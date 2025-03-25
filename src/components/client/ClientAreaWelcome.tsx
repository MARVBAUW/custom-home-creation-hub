
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, Calendar, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';

const ClientAreaWelcome = () => {
  const { user } = useUser();
  const firstName = user?.firstName || 'Client';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Bienvenue dans votre espace client</CardTitle>
        <CardDescription>
          Voici un aperçu des fonctionnalités disponibles pour suivre votre projet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-1">Documents</h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              Accédez à tous vos documents contractuels et techniques
            </p>
            <Link to="/workspace/client-area/documents">
              <Button variant="outline" size="sm" className="mt-auto">
                Voir les documents
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-center mb-1">Suivi de projet</h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              Suivez l'avancement de votre projet en temps réel
            </p>
            <Link to="/workspace/client-area/projects">
              <Button variant="outline" size="sm" className="mt-auto">
                Voir le projet
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-center mb-1">Messages</h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              Échangez avec votre chef de projet et votre équipe
            </p>
            <Link to="/workspace/client-area/messages">
              <Button variant="outline" size="sm" className="mt-auto">
                Voir les messages
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-khaki-50 border border-khaki-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-khaki-100 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-khaki-700" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-khaki-800">Prochaine étape de votre projet</h3>
              <p className="text-sm text-khaki-700 mt-1">
                Réunion de chantier prévue le 12/07/2023 à 10h00 sur site
              </p>
              <Link to="/workspace/client-area/projects" className="inline-flex items-center text-khaki-700 hover:text-khaki-900 font-medium text-sm mt-2">
                Voir le calendrier complet
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-blue-800">Besoin d'aide ?</h3>
              <p className="text-sm text-blue-700 mt-1">
                Consultez notre documentation complète pour découvrir toutes les fonctionnalités disponibles.
              </p>
              <Link to="/workspace/client-documentation" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium text-sm mt-2">
                Accéder à la documentation
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientAreaWelcome;
