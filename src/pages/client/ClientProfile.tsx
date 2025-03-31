
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail, MapPin, Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/layout/Navbar';

const ClientProfile = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Check localStorage for admin mode and load user data
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }

    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.user_metadata?.address || '');
      setCompany(user.user_metadata?.company || '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    // Here we would implement the profile update logic using Supabase
    // For now, just toggle the editing state
    setIsEditing(false);
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Mon profil | Espace Client Progineer</title>
        <meta name="description" content="Gérez votre profil et vos informations personnelles." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
              Mon profil
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
              Profil utilisateur
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Gérez vos informations personnelles et vos préférences.
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
                  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={fullName} />
                        <AvatarFallback className="bg-khaki-200 text-khaki-800 text-xl">
                          {fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{fullName || 'Utilisateur'}</CardTitle>
                        <CardDescription>{email}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Annuler' : 'Modifier le profil'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Société</Label>
                            <Input
                              id="company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button 
                            className="bg-khaki-600 hover:bg-khaki-700 text-white"
                            onClick={handleSaveProfile}
                          >
                            Enregistrer
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-khaki-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Nom complet</p>
                              <p>{fullName || 'Non spécifié'}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-khaki-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p>{email || 'Non spécifié'}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-khaki-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Téléphone</p>
                              <p>{phone || 'Non spécifié'}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Building className="h-5 w-5 text-khaki-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Société</p>
                              <p>{company || 'Non spécifié'}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-khaki-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Adresse</p>
                              <p>{address || 'Non spécifié'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientProfile;
