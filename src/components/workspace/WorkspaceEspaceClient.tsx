
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCode, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '@/components/common/Button';

const WorkspaceEspaceClient = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulation d'envoi d'email
      setIsSubmitted(true);
    }
  };
  
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
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Espace client</h2>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actualités du projet</CardTitle>
                <CardDescription>Restez informé des dernières mises à jour</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Dans votre espace client, vous recevez des notifications pour chaque 
                  étape importante de votre projet : réunions de chantier, validations 
                  d'étapes, modifications techniques, etc.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents contractuels</CardTitle>
                <CardDescription>Tous vos documents importants centralisés</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Retrouvez tous vos documents importants : contrats, plans, devis, 
                  factures, attestations d'assurance et garanties dans un espace 
                  sécurisé accessible 24h/24.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card className="border-khaki-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Accès à votre espace</CardTitle>
              <CardDescription>
                Connectez-vous pour accéder à votre espace personnel sécurisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <Alert className="bg-green-50 border-green-200">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-700">Email envoyé</AlertTitle>
                  <AlertDescription className="text-green-600">
                    Un lien de connexion a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Votre adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votreemail@exemple.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki-500"
                      required
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Recevoir un lien de connexion
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-0">
              <div className="text-sm text-gray-500 mt-4">
                <p>Pas encore de compte ?</p>
                <p className="mt-1">Contactez votre chargé de projet pour obtenir vos identifiants.</p>
              </div>
            </CardFooter>
          </Card>
          
          <Alert className="mt-4 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-700">En développement</AlertTitle>
            <AlertDescription className="text-amber-600">
              De nouvelles fonctionnalités seront bientôt disponibles dans votre espace client. 
              Restez informé en vous inscrivant à notre newsletter.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
