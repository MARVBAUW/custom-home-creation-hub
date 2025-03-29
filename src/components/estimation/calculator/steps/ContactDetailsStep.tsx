
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ContactDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  // Initialize with form data or defaults
  const [firstName, setFirstName] = React.useState<string>(formData.firstName || '');
  const [lastName, setLastName] = React.useState<string>(formData.lastName || '');
  const [email, setEmail] = React.useState<string>(formData.email || '');
  const [phone, setPhone] = React.useState<string>(formData.phone || '');
  const [message, setMessage] = React.useState<string>(formData.message || '');
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(formData.termsAccepted || false);

  const handleSubmit = () => {
    updateFormData({ 
      firstName,
      lastName,
      email,
      phone,
      message,
      termsAccepted
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Vos coordonnées</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">Prénom</Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last-name">Nom</Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06 XX XX XX XX"
            />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Label htmlFor="message">Message (facultatif)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Précisions sur votre projet..."
            rows={4}
          />
        </div>
        
        <div className="mt-4 flex items-start space-x-3">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <div>
            <Label htmlFor="terms" className="text-sm">
              J'accepte que mes données soient utilisées pour me contacter concernant mon projet
            </Label>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleSubmit}
          className="w-full"
          disabled={!firstName || !lastName || !email || !termsAccepted}
        >
          Obtenir mon estimation détaillée
        </Button>
      </div>
    </div>
  );
};

export default ContactDetailsStep;
