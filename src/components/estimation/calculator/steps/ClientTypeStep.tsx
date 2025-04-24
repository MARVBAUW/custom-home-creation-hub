
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Building2 } from 'lucide-react';
import { BaseFormProps } from '../types/baseFormProps';

const ClientTypeStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep
}) => {
  const [clientType, setClientType] = React.useState<string>(
    formData.clientType || ''
  );

  const handleContinue = () => {
    updateFormData({ clientType: clientType as 'individual' | 'professional' });
    if (goToNextStep) goToNextStep();
  };

  const handleChange = (value: string) => {
    setClientType(value);
    updateFormData({ clientType: value as 'individual' | 'professional' });
    
    // Automatically go to next step after selection
    setTimeout(() => {
      if (goToNextStep) goToNextStep();
    }, 500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center mb-6">Vous êtes...</h2>
      
      <RadioGroup 
        value={clientType} 
        onValueChange={handleChange}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'individual' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleChange('individual')}
        >
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <User className="h-12 w-12 text-blue-500 mb-4" />
            <RadioGroupItem value="individual" id="client-individual" className="sr-only" />
            <Label htmlFor="client-individual" className="text-lg font-medium">Un particulier</Label>
            <p className="text-sm text-gray-500 mt-2">
              Pour votre projet personnel de construction ou rénovation
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'professional' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleChange('professional')}
        >
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Building2 className="h-12 w-12 text-blue-500 mb-4" />
            <RadioGroupItem value="professional" id="client-professional" className="sr-only" />
            <Label htmlFor="client-professional" className="text-lg font-medium">Un professionnel</Label>
            <p className="text-sm text-gray-500 mt-2">
              Pour un projet d'entreprise ou d'investissement immobilier
            </p>
          </CardContent>
        </Card>
      </RadioGroup>
    </div>
  );
};

export default ClientTypeStep;
