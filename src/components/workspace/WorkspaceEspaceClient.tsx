
import React from 'react';
import { LockKeyhole, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const WorkspaceEspaceClient = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium mb-2">Espace client</h2>
        <p className="text-gray-600 mb-6">
          Accédez à votre espace personnel pour suivre vos projets et échanger avec notre équipe.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-khaki-50 to-stone-100 border-2 border-khaki-100">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div className="bg-khaki-100 p-3 rounded-full text-khaki-600">
                  <User className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-medium mt-4 mb-3">Clients existants</h3>
              <p className="text-gray-600 mb-8">
                Si vous êtes déjà client, connectez-vous pour accéder à votre espace personnel et suivre l'avancement de votre projet.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/workspace/sign-in">
                  <LogIn className="mr-2 h-5 w-5" />
                  Se connecter
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-stone-50 to-gray-50 border-2 border-dashed border-stone-200">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div className="bg-stone-100 p-3 rounded-full text-gray-500">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-medium mt-4 mb-3">Nouveaux clients</h3>
              <p className="text-gray-600 mb-8">
                Vous n'avez pas encore de compte ? Créez votre profil pour accéder à nos services exclusifs et préparer votre projet.
              </p>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/workspace/sign-up">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Créer un compte
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
          <div className="flex items-start gap-4">
            <div className="bg-stone-100 p-3 rounded-full text-stone-600 shrink-0">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Confidentialité et sécurité</h3>
              <p className="text-sm text-gray-600">
                Votre espace client est sécurisé et vos informations sont traitées selon notre politique de confidentialité.
                Nous utilisons le chiffrement SSL pour protéger vos données et garantir la confidentialité de vos échanges avec notre équipe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
