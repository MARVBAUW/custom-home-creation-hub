
import React from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRound, ArrowLeftIcon, ArrowRightIcon, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
    } = {};
    
    if (!formData.name) {
      newErrors.name = "Le nom est requis";
    }
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      goToNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <UserRound className="h-5 w-5 text-progineer-gold" />
              <h3 className="text-xl font-semibold">Vos coordonnées</h3>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              Nous avons besoin de quelques informations pour finaliser votre estimation et vous la transmettre.
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex">
                  Nom et prénom
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input 
                  id="name" 
                  value={formData.name || ''} 
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="Jean Dupont"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
              </div>

              <div>
                <Label htmlFor="email" className="flex">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email || ''} 
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="jean.dupont@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>

              <div>
                <Label htmlFor="phone" className="flex">
                  Téléphone
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input 
                  id="phone" 
                  value={formData.phone || ''} 
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
              </div>

              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input 
                  id="address" 
                  value={formData.address || ''} 
                  onChange={(e) => updateFormData({ address: e.target.value })}
                  placeholder="1 rue de la Paix"
                />
              </div>

              <div>
                <Label htmlFor="postalCode">Code postal</Label>
                <Input 
                  id="postalCode" 
                  value={formData.postalCode || ''} 
                  onChange={(e) => updateFormData({ postalCode: e.target.value })}
                  placeholder="75000"
                />
              </div>

              <div>
                <Label htmlFor="message">Message (facultatif)</Label>
                <Textarea 
                  id="message" 
                  value={formData.message || ''} 
                  onChange={(e) => updateFormData({ message: e.target.value })}
                  placeholder="Précisez ici toute information complémentaire concernant votre projet"
                  rows={4}
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeTerms" 
                    checked={formData.agreeTerms || false}
                    onCheckedChange={(checked) => updateFormData({ agreeTerms: checked === true })}
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    J'accepte que mes informations soient utilisées pour me contacter
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={formData.newsletter || false}
                    onCheckedChange={(checked) => updateFormData({ newsletter: checked === true })}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Je souhaite recevoir des informations et offres par email
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          type="submit"
          className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
        >
          Finaliser
          <CheckCircle className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
