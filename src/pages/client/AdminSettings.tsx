
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Settings, Save, Globe, Database, Lock, Bell, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const AdminSettings = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();

  // Form states
  const [siteTitle, setSiteTitle] = useState('Progineer - Maîtrise d\'oeuvre');
  const [contactEmail, setContactEmail] = useState('contact@progineer.fr');
  const [backupEnabled, setBackupEnabled] = useState(true);

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

  // Handle save settings
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres généraux ont été mis à jour avec succès.",
    });
  };

  // Handle backup settings
  const handleSaveBackupSettings = () => {
    toast({
      title: "Paramètres de sauvegarde mis à jour",
      description: `Les sauvegardes automatiques sont maintenant ${backupEnabled ? 'activées' : 'désactivées'}.`,
    });
  };

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
        <title>Paramètres administration | Progineer</title>
        <meta name="description" content="Configurez les paramètres de l'application." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Paramètres du système
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Configurez les paramètres globaux de la plateforme.
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
              <Tabs defaultValue="general">
                <TabsList className="mb-6">
                  <TabsTrigger value="general">
                    <Settings className="h-4 w-4 mr-2" />
                    Général
                  </TabsTrigger>
                  <TabsTrigger value="database">
                    <Database className="h-4 w-4 mr-2" />
                    Base de données
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Lock className="h-4 w-4 mr-2" />
                    Sécurité
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres généraux</CardTitle>
                      <CardDescription>Configurez les paramètres de base du site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="site-title">Titre du site</Label>
                        <Input 
                          id="site-title" 
                          value={siteTitle} 
                          onChange={(e) => setSiteTitle(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email de contact</Label>
                        <Input 
                          id="contact-email" 
                          type="email" 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="theme-mode">Mode d'affichage</Label>
                        <div className="flex items-center space-x-3">
                          <ThemeToggle />
                          <span className="text-sm text-gray-500">Changer entre thème clair et sombre</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Configuration du site</h3>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="maintenance-mode" className="font-medium">Mode maintenance</Label>
                            <p className="text-sm text-gray-500">Mettre le site en mode maintenance</p>
                          </div>
                          <Switch id="maintenance-mode" />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="cache-enabled" className="font-medium">Cache activé</Label>
                            <p className="text-sm text-gray-500">Améliore les performances du site</p>
                          </div>
                          <Switch id="cache-enabled" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        className="bg-khaki-600 hover:bg-khaki-700"
                        onClick={handleSaveGeneralSettings}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="database" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de base de données</CardTitle>
                      <CardDescription>Gérez la base de données et les sauvegardes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Sauvegarde</h3>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="backup-enabled" className="font-medium">Sauvegarde automatique</Label>
                            <p className="text-sm text-gray-500">Activer les sauvegardes quotidiennes</p>
                          </div>
                          <Switch 
                            id="backup-enabled" 
                            checked={backupEnabled}
                            onCheckedChange={setBackupEnabled}
                          />
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="backup-time">Heure de sauvegarde</Label>
                          <Input 
                            id="backup-time" 
                            type="time" 
                            defaultValue="02:00" 
                            disabled={!backupEnabled}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Maintenance</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline">Optimiser la base de données</Button>
                          <Button variant="outline">Vider le cache</Button>
                          <Button variant="outline">Exporter les données</Button>
                          <Button variant="outline">Réinitialiser les indexes</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        className="bg-khaki-600 hover:bg-khaki-700"
                        onClick={handleSaveBackupSettings}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de sécurité</CardTitle>
                      <CardDescription>Configurez les options de sécurité</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Authentification</h3>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="two-factor" className="font-medium">Authentification à deux facteurs</Label>
                            <p className="text-sm text-gray-500">Exiger 2FA pour les administrateurs</p>
                          </div>
                          <Switch id="two-factor" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="password-expiry" className="font-medium">Expiration des mots de passe</Label>
                            <p className="text-sm text-gray-500">Forcer le changement périodique</p>
                          </div>
                          <Switch id="password-expiry" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Politique des mots de passe</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="min-length">Longueur minimale</Label>
                            <Input 
                              id="min-length" 
                              type="number" 
                              defaultValue="8" 
                              className="w-20"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="special-chars">Caractères spéciaux requis</Label>
                            <Switch id="special-chars" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="uppercase">Majuscules requises</Label>
                            <Switch id="uppercase" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Journal d'activité</h3>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="activity-log" className="font-medium">Activer le journal</Label>
                            <p className="text-sm text-gray-500">Enregistrer toutes les actions administratives</p>
                          </div>
                          <Switch id="activity-log" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="bg-khaki-600 hover:bg-khaki-700">
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de notification</CardTitle>
                      <CardDescription>Configurez les notifications système</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Email</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="smtp-server">Serveur SMTP</Label>
                            <Input id="smtp-server" defaultValue="smtp.example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-port">Port</Label>
                            <Input id="smtp-port" defaultValue="587" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-username">Nom d'utilisateur</Label>
                            <Input id="smtp-username" defaultValue="notifications@progineer.fr" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-password">Mot de passe</Label>
                            <Input id="smtp-password" type="password" defaultValue="********" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <Label htmlFor="email-encryption" className="font-medium">Utiliser TLS</Label>
                            <p className="text-sm text-gray-500">Sécuriser les connexions SMTP</p>
                          </div>
                          <Switch id="email-encryption" defaultChecked />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Modèles d'email</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 px-4 border rounded-md">
                            <div>
                              <p className="font-medium">Bienvenue nouvel utilisateur</p>
                              <p className="text-sm text-gray-500">Email envoyé lors de l'inscription</p>
                            </div>
                            <Button variant="outline" size="sm">Éditer</Button>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 px-4 border rounded-md">
                            <div>
                              <p className="font-medium">Mise à jour de projet</p>
                              <p className="text-sm text-gray-500">Notification de changement d'étape</p>
                            </div>
                            <Button variant="outline" size="sm">Éditer</Button>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 px-4 border rounded-md">
                            <div>
                              <p className="font-medium">Réinitialisation du mot de passe</p>
                              <p className="text-sm text-gray-500">Email avec lien de réinitialisation</p>
                            </div>
                            <Button variant="outline" size="sm">Éditer</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Test d'envoi</h3>
                        <div className="flex space-x-4">
                          <Input placeholder="email@example.com" className="flex-1" />
                          <Button variant="outline">Envoyer un test</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="bg-khaki-600 hover:bg-khaki-700">
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </CardFooter>
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

export default AdminSettings;
