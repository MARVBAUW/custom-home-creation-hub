import React, { useState } from 'react';
import { EstimationFormData, FormData } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Send } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface QuickContactStepProps {
  formData: EstimationFormData | FormData;
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  finalizeEstimation: () => void;
}

const QuickContactStep: React.FC<QuickContactStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  finalizeEstimation
}) => {
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState<string>(formData.firstName || '');
  const [lastName, setLastName] = useState<string>(formData.lastName || '');
  const [email, setEmail] = useState<string>(formData.email || '');
  const [phone, setPhone] = useState<string>(formData.phone || '');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(formData.acceptTerms || false);
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!lastName) newErrors.lastName = "Le nom est requis";
    if (!phone) newErrors.phone = "Le numéro de téléphone est requis";
    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    if (!acceptTerms) newErrors.acceptTerms = "Vous devez accepter les conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update form data with contact information
      updateFormData({
        firstName,
        lastName,
        email,
        phone,
        acceptTerms
      });
      
      // Call the finalize function to complete the estimation
      finalizeEstimation();
      
      // Show success message
      toast({
        title: "Estimation envoyée !",
        description: "Nous avons bien reçu votre demande d'estimation.",
      });
      
      // Go to thank you page (results)
      goToNextStep();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Renseignez vos coordonnés pour accéder à votre estimation gratuite</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prénom */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
            />
          </div>
          
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="flex items-center">
              Nom <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Votre nom"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
          </div>
        </div>
        
        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center">
            N° téléphone <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="phone" 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Votre numéro de téléphone"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center">
            Email <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        
        {/* Terms acceptance */}
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="acceptTerms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            className={errors.acceptTerms ? "border-red-500" : ""}
          />
          <Label 
            htmlFor="acceptTerms" 
            className="text-sm font-normal cursor-pointer"
          >
            J'accepte que mes données soient utilisées pour me recontacter concernant mon projet. *
          </Label>
        </div>
        {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}
        
        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </Button>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuickContactStep;
