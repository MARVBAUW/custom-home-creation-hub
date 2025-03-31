
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';

const ClientSettings = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [documentNotifications, setDocumentNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for admin mode
  React.useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
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
        <title>Paramètres | Espace Client Progineer</title>
        <meta name="description" content="Gérez les paramètres de votre compte Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
              Paramètres
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
              Paramètres du compte
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Personnalisez les paramètres de votre espace client selon vos préférences.
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
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Notifications par email</Label>
                        <p className="text-sm text-gray-500">Recevez des notifications par email concernant votre projet.</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                        <p className="text-sm text-gray-500">Recevez des notifications par SMS pour les mises à jour importantes.</p>
                      </div>
                      <Switch 
                        id="sms-notifications" 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="document-notifications">Notifications de documents</Label>
                        <p className="text-sm text-gray-500">Recevez des notifications lorsque de nouveaux documents sont disponibles.</p>
                      </div>
                      <Switch 
                        id="document-notifications" 
                        checked={documentNotifications} 
                        onCheckedChange={setDocumentNotifications}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apparence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Thème de l'interface</Label>
                        <p className="text-sm text-gray-500">Choisissez entre le mode clair et sombre.</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Mot de passe</h3>
                        <p className="text-sm text-gray-500 mb-3">Modifiez votre mot de passe à tout moment pour garder votre compte sécurisé.</p>
                        <Button variant="outline">Changer le mot de passe</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-1">Adresse email</h3>
                        <p className="text-sm text-gray-500 mb-3">Mettez à jour votre adresse email associée à votre compte.</p>
                        <Button variant="outline">Mettre à jour l'email</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end mt-6">
                  <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
                    Enregistrer les modifications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientSettings;
