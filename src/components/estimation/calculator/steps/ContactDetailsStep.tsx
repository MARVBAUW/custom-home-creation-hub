
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftIcon, SendIcon } from 'lucide-react';
import { FormData } from '../types';

interface ContactDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
  onSubmit?: (data: any) => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const [firstName, setFirstName] = React.useState<string>(formData.firstName || '');
  const [lastName, setLastName] = React.useState<string>(formData.lastName || '');
  const [email, setEmail] = React.useState<string>(formData.email || '');
  const [phone, setPhone] = React.useState<string>(formData.phone || '');
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(formData.termsAccepted as boolean || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      termsAccepted
    };
    
    updateFormData(contactData);
    
    if (onSubmit) {
      onSubmit(contactData);
    }
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Vos coordonnées</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-base font-medium">Prénom</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-base font-medium">Nom</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                className="w-full"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06 XX XX XX XX"
              className="w-full"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="termsAccepted" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              required
            />
            <Label htmlFor="termsAccepted" className="text-sm cursor-pointer">
              J'accepte de recevoir une estimation détaillée et d'être contacté par un expert Progineer
            </Label>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Obtenir mon estimation
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactDetailsStep;
