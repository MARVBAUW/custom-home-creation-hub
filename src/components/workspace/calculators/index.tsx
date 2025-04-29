
import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

const WorkspaceCalculateurs = () => {
  const calculators: CalculatorCard[] = [
    {
      id: 'surface-habitable',
      title: 'Calculateur de surface habitable',
      description: 'Calculez la surface habitable conforme à la loi Carrez',
      icon: <Calculator className="h-6 w-6" />,
      path: '/workspace/calculateurs/surface-habitable',
      isNew: true,
    },
    {
      id: 'rentabilite-projet',
      title: 'Rentabilité d\'un projet immobilier',
      description: 'Analysez la rentabilité potentielle d\'un investissement immobilier',
      icon: <Calculator className="h-6 w-6" />,
      path: '/workspace/calculateurs/rentabilite',
      comingSoon: true,
    },
    {
      id: 'isolation-thermique',
      title: 'Performance isolation thermique',
      description: 'Calculez les performances thermiques d\'une paroi ou d\'une isolation',
      icon: <Calculator className="h-6 w-6" />,
      path: '/workspace/calculateurs/isolation-thermique',
      comingSoon: true,
    },
    {
      id: 'cout-travaux',
      title: 'Budget travaux estimatif',
      description: 'Estimation budgétaire de vos travaux de construction ou rénovation',
      icon: <Calculator className="h-6 w-6" />,
      path: '/workspace/calculateurs/cout-travaux',
      comingSoon: true,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium mb-2">Calculateurs et outils</h2>
        <p className="text-gray-600 mb-6">
          Utilisez nos outils de calcul pour faciliter vos projets de construction et rénovation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calculator) => (
            <Card 
              key={calculator.id} 
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="bg-stone-100 p-3 rounded-lg text-khaki-600">
                    {calculator.icon}
                  </div>
                  <div className="space-x-2">
                    {calculator.isNew && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                        Nouveau
                      </Badge>
                    )}
                    {calculator.comingSoon && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                        Bientôt disponible
                      </Badge>
                    )}
                  </div>
                </div>
                
                <h3 className="font-medium text-lg mt-4 mb-2">{calculator.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{calculator.description}</p>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={calculator.comingSoon}
                  asChild={!calculator.comingSoon}
                >
                  {!calculator.comingSoon ? (
                    <a href={calculator.path}>
                      Accéder <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span>
                      Bientôt disponible <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-khaki-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Besoin d'un calculateur personnalisé ?</h3>
          <p className="text-gray-600 mb-4">
            Nous pouvons développer des outils spécifiques adaptés à vos projets et besoins particuliers.
            Contactez-nous pour en discuter.
          </p>
          <Button asChild>
            <a href="/contact">Nous contacter</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCalculateurs;
