
import React, { useState } from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Info } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectContactStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  finalizeEstimation: () => any;
}

const ProjectContactStep: React.FC<ProjectContactStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  finalizeEstimation
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create state for form fields
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [city, setCity] = useState(formData.city || '');
  const [projectDescription, setProjectDescription] = useState(formData.projectDescription || '');
  const [projectType, setProjectType] = useState(formData.projectType || '');
  const [projectPurpose, setProjectPurpose] = useState(formData.projectPurpose || '');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(formData.termsAccepted === true);
  const [commercialAccepted, setCommercialAccepted] = useState<boolean>(formData.commercialAccepted === true);
  
  // Validation function
  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      projectDescription.trim() !== '' &&
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
      email,
      phone,
      city,
      projectDescription,
      projectType,
      projectPurpose,
      termsAccepted,
      commercialAccepted,
      formCompleted: true
    });
    
    // Calculate the estimation if needed
    finalizeEstimation();
    
    // Simulate submission delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      // Proceed to next step
      goToNextStep();
    }, 1000);
  };
  
  // Generate the appropriate title based on the project type
  const getFormTitle = () => {
    if (formData.projectType === 'design') {
      return "Votre projet de design d'espace";
    } else if (formData.projectType === 'optimization') {
      return "Votre projet d'optimisation";
    }
    return "Votre projet";
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{getFormTitle()}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Veuillez nous fournir quelques informations pour que nous puissions vous contacter à propos de votre projet de {formData.projectType === 'design' ? "design d'espace" : "d'optimisation"}.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-blue-700">
                {formData.projectType === 'design' 
                  ? "Ce type de projet nécessite une étude personnalisée. Un de nos designers vous contactera sous 24h pour discuter des détails."
                  : "Un conseiller spécialisé en optimisation d'espace vous contactera sous 24h pour discuter de votre projet."}
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
            
            <div className="space-y-2">
              <Label htmlFor="projectPurpose">Objectif principal du projet</Label>
              <Select value={projectPurpose} onValueChange={setProjectPurpose}>
                <SelectTrigger id="projectPurpose">
                  <SelectValue placeholder="Sélectionnez l'objectif principal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esthétique">Amélioration esthétique</SelectItem>
                  <SelectItem value="fonctionnel">Amélioration fonctionnelle</SelectItem>
                  <SelectItem value="agrandissement">Optimisation de l'espace</SelectItem>
                  <SelectItem value="rénovation">Rénovation complète</SelectItem>
                  <SelectItem value="valorisation">Valorisation immobilière</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Description du projet <span className="text-red-500">*</span></Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                placeholder={`Décrivez brièvement votre projet de ${formData.projectType === 'design' ? "design d'espace" : "d'optimisation"}...`}
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

export default ProjectContactStep;
