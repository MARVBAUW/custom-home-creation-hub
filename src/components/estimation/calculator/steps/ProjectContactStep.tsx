
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseFormProps } from '../types/formTypes';
import { ArrowLeftIcon, ArrowRightIcon, UserIcon, AtSign, Phone } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { ensureString } from '../utils/typeConversions';

const ProjectContactStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [firstName, setFirstName] = React.useState<string>(formData.firstName || '');
  const [lastName, setLastName] = React.useState<string>(formData.lastName || '');
  const [email, setEmail] = React.useState<string>(formData.email || '');
  const [phone, setPhone] = React.useState<string>(formData.phone || '');
  const [consentGiven, setConsentGiven] = React.useState<boolean>(formData.consentGiven || false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'Veuillez entrer votre prénom';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Veuillez entrer votre nom';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Veuillez entrer votre email';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Veuillez entrer votre numéro de téléphone';
    }
    
    if (!consentGiven) {
      newErrors.consent = 'Veuillez accepter les conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData({
        firstName: ensureString(firstName),
        lastName: ensureString(lastName),
        email: ensureString(email),
        phone: ensureString(phone),
        consentGiven
      });
      
      goToNextStep();
    }
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Vos coordonnées</h2>
      <p className="text-gray-600 mb-6">Pour recevoir votre estimation détaillée</p>
      
      <Card>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  Prénom <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  Nom <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Votre nom"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <AtSign className="h-4 w-4 mr-1" />
                Email <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Téléphone <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="consent" 
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked === true)}
              />
              <Label htmlFor="consent" className="text-sm">
                J'accepte de recevoir mon estimation et d'être contacté par un expert Progineer <span className="text-red-500">*</span>
              </Label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs">{errors.consent}</p>
            )}
          </form>
        </CardContent>
      </Card>
      
      <div className="text-xs text-gray-500">
        <p>
          Les données collectées sont uniquement destinées à l'élaboration de votre estimation et à vous mettre en contact avec un expert Progineer. 
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
        </p>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          Finaliser l'estimation
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectContactStep;
