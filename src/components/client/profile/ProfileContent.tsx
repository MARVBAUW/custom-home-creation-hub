
import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

interface ProfileContentProps {
  profileData: ProfileData;
  onUpdateProfile: (data: ProfileData) => void;
}

const ProfileContent = ({ profileData, onUpdateProfile }: ProfileContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={profileData.fullName} />
            <AvatarFallback className="bg-khaki-200 text-khaki-800 text-xl">
              {profileData.fullName?.charAt(0) || profileData.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{profileData.fullName || 'Utilisateur'}</CardTitle>
            <CardDescription>{profileData.email}</CardDescription>
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
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Société</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
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
                  <p>{profileData.fullName || 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-khaki-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{profileData.email || 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-khaki-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p>{profileData.phone || 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 text-khaki-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Société</p>
                  <p>{profileData.company || 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-khaki-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Adresse</p>
                  <p>{profileData.address || 'Non spécifié'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileContent;
