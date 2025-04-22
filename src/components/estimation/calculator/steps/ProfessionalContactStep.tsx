
import React, { useState } from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Info } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ensureNumber } from '../utils/typeConversions';

interface ProfessionalContactStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

const ProfessionalContactStep: React.FC<ProfessionalContactStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create state for form fields
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [companyName, setCompanyName] = useState(formData.companyName || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [city, setCity] = useState(formData.city || '');
  const [projectDescription, setProjectDescription] = useState(formData.projectDescription || '');
  const [startDate, setStartDate] = useState(formData.startDate || '');
  const [budget, setBudget] = useState(typeof formData.budget === 'undefined' ? '' : String(formData.budget));
  const [termsAccepted, setTermsAccepted] = useState<boolean>(formData.termsAccepted === true);
  const [commercialAccepted, setCommercialAccepted] = useState<boolean>(formData.commercialAccepted === true);
  
  // Validation function
  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      termsAccepted
    );
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Champs obligatoires",
        description: "Veuillez remplir tous les champs obligatoires et accepter les conditions générales.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Update form data with all fields
    updateFormData({
      firstName,
      lastName,
      companyName,
      email,
      phone,
      city,
      projectDescription,
      startDate,
      budget: budget ? ensureNumber(budget) : undefined,
      termsAccepted,
      commercialAccepted,
      formCompleted: true
    });
    
    // Simulate submission delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      // Proceed to next step
      goToNextStep();
    }, 1000);
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Informations de contact professionnelles</h2>
          <p className="text-sm text-gray-500 mb-6">
            Veuillez remplir ce formulaire pour que notre équipe de professionnels vous contacte rapidement concernant votre projet.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-blue-700">
                Un conseiller spécialisé vous contactera sous 24h pour discuter de votre projet professionnel et vous proposer une solution adaptée.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom <span className="text-red-500">*</span></Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom <span className="text-red-500">*</span></Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise <span className="text-red-500">*</span></Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ville du projet</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date souhaitée de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget estimé (€)</Label>
                <Input
                  id="budget"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ex: 150000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Description du projet <span className="text-red-500">*</span></Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                placeholder="Décrivez brièvement votre projet professionnel..."
                required
              />
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted} 
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                J'accepte les <a href="/cgu" target="_blank" className="text-blue-600 hover:underline">Conditions Générales d'Utilisation</a> <span className="text-red-500">*</span>
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="commercial" 
                checked={commercialAccepted} 
                onCheckedChange={(checked) => setCommercialAccepted(checked as boolean)}
              />
              <Label htmlFor="commercial" className="text-sm cursor-pointer">
                J'accepte de recevoir des informations commerciales de Progineer
              </Label>
            </div>
            
            <div className="flex justify-between pt-4">
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
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className="flex items-center gap-2"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Valider et envoyer'}
                {!isSubmitting && <ArrowRightIcon className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalContactStep;
