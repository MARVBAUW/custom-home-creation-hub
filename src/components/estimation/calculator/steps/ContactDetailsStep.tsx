
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, MapPin } from 'lucide-react';

interface ContactDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Initialize state with form data or defaults
  const [firstName, setFirstName] = React.useState<string>(formData.firstName || '');
  const [lastName, setLastName] = React.useState<string>(formData.lastName || '');
  const [email, setEmail] = React.useState<string>(formData.email || '');
  const [phone, setPhone] = React.useState<string>(formData.phone || '');
  const [city, setCity] = React.useState<string>(formData.city || '');

  const handleSubmit = () => {
    updateFormData({
      firstName,
      lastName,
      email,
      phone,
      city
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 pb-6">
          <h3 className="text-lg font-medium mb-6">Vos coordonnées</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="first-name" className="text-base flex items-center mb-2">
                  <User className="h-4 w-4 text-blue-500 mr-2" />
                  Prénom
                </Label>
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              
              <div>
                <Label htmlFor="last-name" className="text-base flex items-center mb-2">
                  <User className="h-4 w-4 text-blue-500 mr-2" />
                  Nom
                </Label>
                <Input
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-base flex items-center mb-2">
                <Mail className="h-4 w-4 text-blue-500 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-base flex items-center mb-2">
                <Phone className="h-4 w-4 text-blue-500 mr-2" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Votre numéro de téléphone"
              />
            </div>
            
            <div>
              <Label htmlFor="city" className="text-base flex items-center mb-2">
                <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                Ville du projet
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville où se situe votre projet"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
        >
          Précédent
        </Button>
        
        <Button
          type="button"
          onClick={handleSubmit}
        >
          Finaliser l'estimation
        </Button>
      </div>
    </div>
  );
};

export default ContactDetailsStep;
