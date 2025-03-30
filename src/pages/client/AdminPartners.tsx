
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminPartners = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();

  // Handle admin mode toggle
  const handleAdminModeToggle = (checked: boolean) => {
    setIsAdminMode(checked);
    localStorage.setItem('adminMode', checked.toString());
    toast({
      title: checked ? "Mode administrateur activé" : "Mode client activé",
      description: checked 
        ? "Vous pouvez maintenant gérer les dossiers et les clients." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };

  // Mock data for partners
  const partners = [
    {
      id: '1',
      name: 'Construction Dupont',
      type: 'Entrepreneur général',
      contact: 'Jean Dupont',
      email: 'contact@construction-dupont.fr',
      phone: '06 12 34 56 78',
      location: 'Marseille'
    },
    {
      id: '2',
      name: 'Martin Électricité',
      type: 'Électricien',
      contact: 'Sophie Martin',
      email: 'info@martin-elec.fr',
      phone: '06 23 45 67 89',
      location: 'Aix-en-Provence'
    },
    {
      id: '3',
      name: 'Plomberie Bernard',
      type: 'Plombier',
      contact: 'Pierre Bernard',
      email: 'contact@plomberie-bernard.fr',
      phone: '06 34 56 78 90',
      location: 'Toulon'
    }
  ];

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des partenaires | Progineer</title>
        <meta name="description" content="Gérez tous les partenaires dans l'espace administration." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Gestion des partenaires
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Consultez et gérez tous les partenaires de la plateforme.
              </p>
            </div>
            
            {/* Admin Switch */}
            <div className="md:mt-0 mt-4 flex items-center gap-3">
              <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
              <ThemeToggle />
            </div>
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
            <div className="lg:col-span-3 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Partenaires</h2>
                <Button variant="default" className="bg-khaki-600 hover:bg-khaki-700">
                  Ajouter un partenaire
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                      </div>
                      <CardDescription>{partner.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">{partner.contact}</p>
                        <div className="text-gray-500 space-y-1">
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-1.5" />
                            <span>{partner.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3.5 w-3.5 mr-1.5" />
                            <span>{partner.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            <span>{partner.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminPartners;
