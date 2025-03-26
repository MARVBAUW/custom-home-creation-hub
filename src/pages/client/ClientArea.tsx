
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  Bell, 
  User, 
  LogOut 
} from 'lucide-react';
import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientAreaWelcome from '@/components/client/ClientAreaWelcome';
import ClientAreaNotifications from '@/components/client/ClientAreaNotifications';
import ClientAreaRecentDocuments from '@/components/client/ClientAreaRecentDocuments';
import ClientAreaProjectProgress from '@/components/client/ClientAreaProjectProgress';
import { useClientAuth } from '@/hooks/useClientAuth';

const ClientArea = () => {
  // Use the custom auth hook with redirection if unauthenticated
  const { isLoaded, isSignedIn, user } = useClientAuth({ 
    redirectIfUnauthenticated: true,
    redirectTo: '/workspace/sign-in'
  });

  // Show loading spinner while authentication is being checked
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  // Protect the route - if not signed in, this should never render due to the redirect
  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Accédez à votre espace client personnalisé Progineer pour suivre l'avancement de vos projets et consulter vos documents." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Espace Client
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Bienvenue, {user?.firstName || 'Client'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Retrouvez ici tous les éléments relatifs à votre projet.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-khaki-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-khaki-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</div>
                  <div className="text-xs text-gray-500">Client</div>
                </div>
              </div>
              <SignOutButton>
                <Button variant="outline" size="sm" className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </SignOutButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-medium">Navigation</h2>
                </div>
                <div className="p-2">
                  <Link to="/workspace/client-area" className="flex items-center p-3 rounded-md bg-khaki-50 text-khaki-800 font-medium">
                    <User className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Tableau de bord</span>
                  </Link>
                  <Link to="/workspace/client-area/documents" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Documents</span>
                  </Link>
                  <Link to="/workspace/client-area/projects" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Suivi de projet</span>
                  </Link>
                  <Link to="/workspace/client-area/messages" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Messages</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-white border border-gray-200 p-1">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="documents">Documents récents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <ClientAreaWelcome />
                  <ClientAreaProjectProgress />
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <ClientAreaNotifications />
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-6">
                  <ClientAreaRecentDocuments />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientArea;
