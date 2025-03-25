
import React from 'react';
import { Helmet } from 'react-helmet';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  User, 
  Clock,
  Check,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import Container from '@/components/common/Container';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample project data
const projectStages = [
  { id: 1, name: 'Conception', status: 'completed', date: '15/03/2023', progress: 100 },
  { id: 2, name: 'Dépôt de permis', status: 'completed', date: '10/04/2023', progress: 100 },
  { id: 3, name: 'Obtention du permis', status: 'completed', date: '15/06/2023', progress: 100 },
  { id: 4, name: 'Préparation chantier', status: 'in-progress', date: '05/07/2023', progress: 70 },
  { id: 5, name: 'Gros œuvre', status: 'upcoming', date: 'Prévu 20/08/2023', progress: 0 },
  { id: 6, name: 'Second œuvre', status: 'upcoming', date: 'Prévu 05/10/2023', progress: 0 },
  { id: 7, name: 'Finitions', status: 'upcoming', date: 'Prévu 20/11/2023', progress: 0 },
  { id: 8, name: 'Livraison', status: 'upcoming', date: 'Prévu 15/12/2023', progress: 0 },
];

const upcomingEvents = [
  { id: 1, title: 'Réunion de chantier', date: '12/07/2023', time: '10:00', location: 'Sur site', status: 'upcoming' },
  { id: 2, title: 'Validation des matériaux', date: '18/07/2023', time: '14:30', location: 'Agence Progineer', status: 'upcoming' },
  { id: 3, title: 'Commande des menuiseries', date: '25/07/2023', time: '11:00', location: 'En ligne', status: 'urgent' },
];

const ClientProjects = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // Calculate overall progress
  const completedStages = projectStages.filter(stage => stage.status === 'completed').length;
  const totalStages = projectStages.length;
  const overallProgress = Math.round((completedStages / totalStages) * 100);
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/workspace/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Suivi de Projet | Espace Client Progineer</title>
        <meta name="description" content="Suivez l'avancement de votre projet Progineer en temps réel." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Espace Client
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Suivi de Projet
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Consultez l'avancement de votre projet en temps réel.
              </p>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Avancement global</div>
              <div className="text-3xl font-bold text-khaki-700 mb-2">{overallProgress}%</div>
              <Progress value={overallProgress} className="h-2 w-32" />
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
                  <Link to="/workspace/client-area" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Tableau de bord</span>
                  </Link>
                  <Link to="/workspace/client-area/documents" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Documents</span>
                  </Link>
                  <Link to="/workspace/client-area/projects" className="flex items-center p-3 rounded-md bg-khaki-50 text-khaki-800 font-medium">
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
              <Tabs defaultValue="timeline" className="space-y-6">
                <TabsList className="bg-white border border-gray-200 p-1">
                  <TabsTrigger value="timeline">Chronologie</TabsTrigger>
                  <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Étapes du projet</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {projectStages.map((stage, index) => (
                          <div key={stage.id} className="relative">
                            {/* Line connector */}
                            {index < projectStages.length - 1 && (
                              <div className="absolute top-6 left-3.5 w-0.5 h-full bg-gray-200 -z-10"></div>
                            )}
                            
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                                stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                                stage.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-gray-100 text-gray-500'
                              }`}>
                                {stage.status === 'completed' ? (
                                  <Check className="h-4 w-4" />
                                ) : stage.status === 'in-progress' ? (
                                  <Clock className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs font-medium">{index + 1}</span>
                                )}
                              </div>
                              
                              <div className="ml-4 flex-grow">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h3 className="text-base font-medium">{stage.name}</h3>
                                    <p className="text-sm text-gray-500">{stage.date}</p>
                                  </div>
                                  <Badge variant="outline" className={`mt-2 sm:mt-0 ${
                                    stage.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                    stage.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    'bg-gray-50 text-gray-600'
                                  }`}>
                                    {stage.status === 'completed' ? 'Terminé' :
                                     stage.status === 'in-progress' ? 'En cours' :
                                     'À venir'}
                                  </Badge>
                                </div>
                                
                                {stage.status === 'in-progress' && (
                                  <div className="mt-3">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                      <span>Progression</span>
                                      <span>{stage.progress}%</span>
                                    </div>
                                    <Progress value={stage.progress} className="h-2" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="calendar" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Évènements à venir</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              event.status === 'urgent' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              {event.status === 'urgent' ? (
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                              ) : (
                                <Calendar className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            
                            <div className="ml-4 flex-grow">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="text-base font-medium">{event.title}</h3>
                                    {event.status === 'urgent' && (
                                      <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium">{event.date}</span> à {event.time}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">Lieu: {event.location}</p>
                                </div>
                                <button className="mt-3 sm:mt-0 text-khaki-600 hover:text-khaki-800 text-sm font-medium flex items-center">
                                  Détails
                                  <ArrowRight className="h-4 w-4 ml-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientProjects;
