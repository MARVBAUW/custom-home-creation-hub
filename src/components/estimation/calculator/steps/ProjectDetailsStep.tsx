
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Hammer, ArrowRightLeft, Lightbulb, Scissors } from 'lucide-react';
import { BaseFormProps } from '../types/baseFormProps';

const ProjectDetailsStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep
}) => {
  const [projectType, setProjectType] = React.useState<string>(
    formData.projectType || ''
  );

  const handleChange = (value: string) => {
    setProjectType(value);
    updateFormData({ projectType: value });
    
    // Automatically go to next step after selection
    setTimeout(() => {
      if (goToNextStep) goToNextStep();
    }, 500);
  };

  // Different project types based on client type
  const isIndividual = formData.clientType === 'individual';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center mb-6">
        {isIndividual 
          ? 'Quel type de projet souhaitez-vous réaliser ?' 
          : 'Quel est le type de projet de votre entreprise ?'
        }
      </h2>
      
      <RadioGroup 
        value={projectType} 
        onValueChange={handleChange}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectTypeCard
          value="construction"
          icon={<Home className="h-10 w-10 text-blue-500" />}
          title="Construction"
          description="Construction neuve"
          selected={projectType === 'construction'}
          onClick={() => handleChange('construction')}
        />
        
        <ProjectTypeCard
          value="renovation"
          icon={<Hammer className="h-10 w-10 text-blue-500" />}
          title="Rénovation"
          description="Rénovation d'un bien existant"
          selected={projectType === 'renovation'}
          onClick={() => handleChange('renovation')}
        />
        
        <ProjectTypeCard
          value="extension"
          icon={<ArrowRightLeft className="h-10 w-10 text-blue-500" />}
          title="Extension"
          description="Agrandissement d'un bien existant"
          selected={projectType === 'extension'}
          onClick={() => handleChange('extension')}
        />
        
        <ProjectTypeCard
          value="optimization"
          icon={<Lightbulb className="h-10 w-10 text-blue-500" />}
          title="Optimisation"
          description="Amélioration d'un projet existant"
          selected={projectType === 'optimization'}
          onClick={() => handleChange('optimization')}
        />
        
        <ProjectTypeCard
          value="division"
          icon={<Scissors className="h-10 w-10 text-blue-500" />}
          title="Division"
          description="Division d'un bien en plusieurs lots"
          selected={projectType === 'division'}
          onClick={() => handleChange('division')}
        />
      </RadioGroup>
    </div>
  );
};

interface ProjectTypeCardProps {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ProjectTypeCard: React.FC<ProjectTypeCardProps> = ({
  value,
  icon,
  title,
  description,
  selected,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${selected ? 'border-blue-500 bg-blue-50' : ''}`}
      onClick={onClick}
    >
      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
        {icon}
        <RadioGroupItem value={value} id={`project-${value}`} className="sr-only" />
        <Label htmlFor={`project-${value}`} className="text-lg font-medium mt-4">{title}</Label>
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsStep;
