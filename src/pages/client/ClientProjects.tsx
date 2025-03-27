
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { cn } from '@/lib/utils';
import { FileText, Clock, CheckCircle, AlertCircle, Building, MapPin, CalendarRange } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const ClientProjects = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [projects, setProjects] = useState([]);
  
  // Check localStorage for admin mode and projects
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
    
    // Get projects from localStorage or use demo data if empty
    try {
      let savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      
      // If no projects in localStorage, create a sample project for demo
      if (savedProjects.length === 0) {
        savedProjects = [{
          id: "demo-project-1",
          projectName: "Villa Méditerranée",
          fileNumber: "PRJ-2023-001",
          location: "Marseille, PACA",
          type: "Construction neuve",
          status: "active",
          progress: 35,
          startDate: "2023-06-20",
          endDate: "2024-05-15",
          createdAt: new Date().toISOString()
        }];
      }
      
      setProjects(savedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }, []);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Mon Projet | Espace Client Progineer</title>
        <meta name="description" content="Consultez votre projet en cours avec Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
              Mon Projet
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
              Suivi de projet
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Retrouvez ici toutes les informations concernant votre projet en cours avec Progineer.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {projects.length > 0 ? (
                <div className="space-y-8">
                  {projects.map((project: any) => (
                    <Card 
                      key={project.id}
                      className="border-gray-200 hover:border-khaki-300 transition-colors"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl">{project.projectName}</CardTitle>
                          <div className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            project.status === 'active' 
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          )}>
                            {project.status === 'active' ? 'En cours' : 'En attente'}
                          </div>
                        </div>
                        <CardDescription>
                          <div className="flex items-center text-sm text-gray-500">
                            <FileText className="w-4 h-4 mr-2 text-khaki-600" />
                            <span>Dossier: {project.fileNumber || 'Non défini'}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <Building className="w-4 h-4 mr-2 text-khaki-600" />
                              <span className="text-gray-600">Type: {project.type || 'Construction'}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-2 text-khaki-600" />
                              <span className="text-gray-600">Localisation: {project.location || 'Non définie'}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <CalendarRange className="w-4 h-4 mr-2 text-khaki-600" />
                              <span className="text-gray-600">
                                Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 mr-2 text-khaki-600" />
                              <span className="text-gray-600">
                                Fin prévue: {new Date(project.endDate).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm text-gray-600">Avancement du projet</div>
                            <div className="text-sm font-medium">{project.progress}%</div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-khaki-500 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex justify-end">
                        <Button 
                          variant="default"
                          size="sm"
                          className="bg-khaki-600 hover:bg-khaki-700 text-white"
                          asChild
                        >
                          <Link to={`/workspace/client-area/projects/${project.id}`}>
                            Voir les détails
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                  <div className="mx-auto w-16 h-16 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-khaki-600" />
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Aucun projet associé</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    Vous n'avez pas encore de projet associé à votre compte. Contactez-nous pour démarrer un nouveau projet.
                  </p>
                  <Button 
                    className="bg-khaki-600 hover:bg-khaki-700 text-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Demander un devis
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientProjects;
