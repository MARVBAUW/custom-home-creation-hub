
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { cn } from '@/lib/utils';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
    
    // Get projects from localStorage
    try {
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      setProjects(savedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }, []);
  
  // Toggle admin mode
  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    localStorage.setItem('adminMode', newMode.toString());
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  // Check if user is admin
  const isAdmin = user?.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(user.email);

  return (
    <>
      <Helmet>
        <title>Mes Projets | Espace Client Progineer</title>
        <meta name="description" content="Consultez tous vos projets en cours avec Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Mes Projets
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Projets en cours
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Retrouvez ici tous vos projets en cours avec Progineer.
              </p>
            </div>
            
            {/* Admin Mode Switch for admins only */}
            {isAdmin && (
              <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-8 md:mb-0">
                <Switch
                  id="admin-mode"
                  checked={isAdminMode}
                  onCheckedChange={toggleAdminMode}
                />
                <Label htmlFor="admin-mode" className={cn(
                  "text-sm font-medium",
                  isAdminMode ? "text-khaki-800" : "text-gray-600"
                )}>
                  {isAdminMode ? "Mode Admin actif" : "Mode Admin inactif"}
                </Label>
              </div>
            )}
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
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Vos projets ({projects.length})</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project: any) => (
                      <div 
                        key={project.id}
                        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-medium">{project.projectName}</h3>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            project.status === 'active' 
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          )}>
                            {project.status === 'active' ? 'En cours' : 'En attente'}
                          </span>
                        </div>
                        
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-khaki-600" />
                            <span>Dossier: {project.fileNumber || 'Non défini'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-khaki-600" />
                            <span>Créé le: {new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-khaki-700 border-khaki-200 hover:bg-khaki-50"
                            onClick={() => {
                              // Navigate to project detail
                              window.location.href = `/workspace/client-area/projects/${project.id}`;
                            }}
                          >
                            Voir les détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Mes projets</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Vous n'avez pas encore de projet associé à votre compte.
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
