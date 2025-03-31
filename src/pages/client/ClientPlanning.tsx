
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronLeft, ChevronRight, Clock, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';

const ClientPlanning = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedView, setSelectedView] = useState("month");
  
  // Mock data for planning events
  const [events] = useState([
    {
      id: 1,
      title: "Début des travaux de fondation",
      date: "2025-04-15",
      status: "upcoming",
      type: "milestone"
    },
    {
      id: 2,
      title: "Réunion de chantier",
      date: "2025-04-10",
      time: "14:30",
      status: "upcoming",
      type: "meeting"
    },
    {
      id: 3,
      title: "Livraison des matériaux",
      date: "2025-04-08",
      status: "upcoming",
      type: "delivery"
    },
    {
      id: 4,
      title: "Validation des plans définitifs",
      date: "2025-03-25",
      status: "completed",
      type: "milestone"
    },
    {
      id: 5,
      title: "Réunion d'avancement",
      date: "2025-03-15",
      time: "10:00",
      status: "completed",
      type: "meeting"
    }
  ]);
  
  // Generate dummy calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Adjust for starting the week on Monday (0 = Sunday, 1 = Monday, etc.)
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6; // If Sunday (-1), set to 6 (last day of week)
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push({ day: "", date: null, isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      days.push({
        day: i,
        date: date,
        isCurrentMonth: true,
        isToday: i === today.getDate(),
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === i &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        })
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Check localStorage for admin mode
  React.useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-green-100 text-green-800 border-green-200";
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Flag className="h-3 w-3 mr-1" />;
      case "meeting":
        return <Clock className="h-3 w-3 mr-1" />;
      case "delivery":
        return <Calendar className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  const renderCalendarView = () => {
    if (selectedView === "month") {
      return (
        <div className="mt-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-gray-800 p-2 min-h-[100px] ${
                  day.isToday ? 'ring-2 ring-khaki-500 ring-inset' : ''
                } ${!day.isCurrentMonth ? 'opacity-50' : ''}`}
              >
                {day.day && (
                  <>
                    <div className="text-right">
                      <span className={`inline-block w-6 h-6 rounded-full text-center leading-6 text-sm ${
                        day.isToday ? 'bg-khaki-500 text-white' : ''
                      }`}>
                        {day.day}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {day.events?.map(event => (
                        <div 
                          key={event.id}
                          className="text-xs font-medium p-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                            {getEventIcon(event.type)}
                            {event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // List view
      return (
        <div className="space-y-4 mt-6">
          <div className="text-lg font-medium">Événements à venir</div>
          {events
            .filter(event => event.status === "upcoming")
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(event => (
              <div 
                key={event.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      {event.time && (
                        <>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                    {getEventIcon(event.type)}
                    {event.type === "milestone" ? "Étape clé" : 
                      event.type === "meeting" ? "Réunion" : 
                      event.type === "delivery" ? "Livraison" : event.type}
                  </Badge>
                </div>
              </div>
            ))}
            
          <div className="text-lg font-medium mt-8">Événements passés</div>
          {events
            .filter(event => event.status === "completed")
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(event => (
              <div 
                key={event.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors opacity-80"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      {event.time && (
                        <>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                    {getEventIcon(event.type)}
                    {event.type === "milestone" ? "Étape clé" : 
                      event.type === "meeting" ? "Réunion" : 
                      event.type === "delivery" ? "Livraison" : event.type}
                  </Badge>
                </div>
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Planning | Espace Client Progineer</title>
        <meta name="description" content="Consultez le planning de votre projet de construction." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
              Planning
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
              Planning du projet
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Consultez les étapes et les rendez-vous importants de votre projet.
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
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Planning</CardTitle>
                    <Select value={selectedView} onValueChange={setSelectedView}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Vue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Mois</SelectItem>
                        <SelectItem value="list">Liste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedView === "month" && (
                    <div className="flex justify-between items-center">
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h2 className="text-lg font-medium">
                        {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </h2>
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  
                  {renderCalendarView()}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientPlanning;
