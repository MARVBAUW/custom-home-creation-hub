
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCode, Lock, Mail, ArrowRight, AlertCircle, User, Calendar, MessageSquare, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Button from '@/components/common/Button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const WorkspaceEspaceClient = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // Add debugging logs
  useEffect(() => {
    console.log('WorkspaceEspaceClient: Authentication State', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);
  
  // If user is already signed in, redirect to client area
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User already signed in, redirecting to client area');
      toast({
        title: 'Session détectée',
        description: 'Redirection vers votre espace client...',
        variant: 'default',
      });
      navigate('/workspace/client-area');
    }
  }, [isLoaded, isSignedIn, navigate]);
  
  const features = [
    {
      title: "Documents sécurisés",
      description: "Tous vos documents contractuels et techniques stockés en toute sécurité dans un espace dédié.",
      icon: <Lock className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    },
    {
      title: "Suivi de projet",
      description: "Suivez l'avancement de votre projet en temps réel, avec les plannings et mises à jour automatiques.",
      icon: <ArrowRight className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    },
    {
      title: "Communication facilitée",
      description: "Échangez avec votre chef de projet et recevez des notifications pour chaque étape clé.",
      icon: <Mail className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    }
  ];
  
  const handleLogin = () => {
    console.log('Login button clicked, navigating to sign-in page');
    navigate('/workspace/sign-in');
  };
  
  const handleSignUp = () => {
    console.log('Sign up button clicked, navigating to sign-up page');
    navigate('/workspace/sign-up');
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center">
          Espace client
          <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Disponible
          </Badge>
        </h2>
        <p className="text-gray-600">Accédez à votre espace personnel pour suivre votre projet et consulter vos documents.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-khaki-600 to-khaki-800 rounded-xl text-white p-8">
            <div className="mb-6">
              <FileCode className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Votre projet à portée de main</h3>
              <p className="opacity-90">
                L'espace client Progineer vous permet de suivre en temps réel l'avancement 
                de votre projet et d'accéder à l'ensemble de vos documents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="font-medium mb-1">{feature.title}</h4>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Tableau de bord</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Accédez à une vue d'ensemble de votre projet avec toutes les informations essentielles regroupées au même endroit.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Plannings & Événements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Consultez le calendrier des prochaines étapes et recevez des rappels pour les événements importants de votre projet.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Messagerie dédiée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Communiquez facilement avec tous les intervenants de votre projet via notre messagerie sécurisée intégrée.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card className="border-khaki-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 bg-khaki-50 rounded-t-xl">
              <CardTitle className="text-xl">Accès à votre espace</CardTitle>
              <CardDescription>
                Connectez-vous ou créez un compte pour accéder à votre espace personnel sécurisé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex flex-col space-y-3">
                <Link to="/workspace/sign-up" className="w-full">
                  <Button 
                    className="w-full bg-khaki-600 hover:bg-khaki-700"
                    onClick={handleSignUp}
                  >
                    Créer un compte
                  </Button>
                </Link>
                
                <Link to="/workspace/sign-in" className="w-full">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleLogin}
                  >
                    Se connecter
                  </Button>
                </Link>
              </div>
              
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">ou</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="space-y-3">
                <Link to="/workspace/sign-in" className="w-full block">
                  <Button className="w-full" variant="outline">
                    Accès page de connexion complète
                  </Button>
                </Link>
                
                <div className="border border-blue-200 bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                  <p className="font-medium">Compte administrateur</p>
                  <p className="mt-1">Email: progineer.moe@gmail.com</p>
                  <p>Mot de passe: Baullanowens1112</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-0">
              <div className="text-sm text-gray-500 mt-4">
                <p>Vous êtes un professionnel ?</p>
                <p className="mt-1">Contactez-nous pour créer votre compte partenaire.</p>
              </div>
            </CardFooter>
          </Card>
          
          <Alert className="mt-4 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-700">Accès sécurisé</AlertTitle>
            <AlertDescription className="text-amber-600">
              Vos données sont protégées et strictement confidentielles. 
              Seules les personnes autorisées peuvent accéder à votre espace client.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
