
import React from 'react';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';
import Button from '@/components/common/Button';

interface ConstructionNeuveContentProps {
  city?: string;
}

const ConstructionNeuveContent: React.FC<ConstructionNeuveContentProps> = ({ city }) => {
  const cityName = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {cityName ? `Construction de maison à ${cityName}` : 'Construction sur mesure de votre maison individuelle'}
        </h2>
        <p className="text-gray-600 mb-4">
          <InternalLinkText
            text={cityName ? 
              `Progineer est votre partenaire de confiance pour la construction de maisons individuelles à ${cityName} et dans toute la région PACA. Notre expertise en maîtrise d'œuvre vous assure un accompagnement complet et personnalisé pour votre projet.` :
              `Progineer vous accompagne dans la réalisation de votre projet de construction neuve. De l'étude de faisabilité jusqu'à la livraison de votre maison, nous assurons un suivi rigoureux à chaque étape.`
            }
          />
        </p>
        <p className="text-gray-600 mb-4">
          <InternalLinkText
            text={cityName ? 
              `En tant que maître d'œuvre reconnu à ${cityName}, nous prenons en charge l'ensemble de votre projet : conception architecturale, dépôt du permis de construire, consultation des entreprises, suivi de chantier et livraison finale de votre maison.` :
              `Notre équipe conçoit des maisons qui s'adaptent parfaitement à vos besoins, à votre budget et à l'environnement de votre terrain. Nous privilégions une approche personnalisée pour créer un habitat qui vous ressemble.`
            }
          />
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" 
          alt="Construction d'une maison moderne par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Villa contemporaine réalisée par notre équipe à Marseille</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {cityName ? `Pourquoi choisir Progineer pour construire à ${cityName} ?` : 'Notre approche de la construction neuve'}
        </h2>
        <p className="text-gray-600 mb-4">
          <InternalLinkText
            text={cityName ? 
              `La construction d'une maison à ${cityName} nécessite une connaissance approfondie des spécificités locales, des réglementations urbaines et des contraintes techniques propres à la région. Notre expertise locale vous garantit un projet parfaitement adapté au contexte de ${cityName}.` :
              `Notre processus de construction est basé sur une méthodologie éprouvée qui garantit la qualité, le respect des délais et la maîtrise du budget de votre projet.`
            }
          />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-khaki-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Conception personnalisée</h3>
            <p className="text-gray-600">
              <InternalLinkText
                text={cityName ? 
                  `Des plans sur mesure adaptés à votre terrain à ${cityName}, à vos besoins et à votre budget.` :
                  `Des plans sur mesure adaptés à votre terrain, à vos besoins et à votre budget.`
                }
              />
            </p>
          </div>
          <div className="bg-khaki-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Maîtrise du budget</h3>
            <p className="text-gray-600">
              <InternalLinkText
                text="Consultation des entreprises et contrôle rigoureux des coûts tout au long du projet."
              />
            </p>
          </div>
          <div className="bg-khaki-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Suivi de chantier</h3>
            <p className="text-gray-600">
              <InternalLinkText
                text={cityName ? 
                  `Coordination des artisans et des entreprises de ${cityName} et suivi hebdomadaire des travaux.` :
                  `Coordination des artisans et suivi hebdomadaire des travaux pour garantir la qualité d'exécution.`
                }
              />
            </p>
          </div>
          <div className="bg-khaki-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Qualité garantie</h3>
            <p className="text-gray-600">
              <InternalLinkText
                text="Contrôle régulier de la conformité des travaux et validation à chaque étape clé."
              />
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {cityName ? `Votre projet de construction à ${cityName}` : 'Votre projet de construction neuve'}
        </h2>
        <p className="text-gray-600 mb-4">
          <InternalLinkText
            text={cityName ? 
              `Chez Progineer, nous sommes spécialisés dans la construction de maisons individuelles à ${cityName} et nous adaptons notre approche à chaque projet. Que vous souhaitiez une maison contemporaine, traditionnelle ou écologique, nous vous accompagnons dans la réalisation d'un habitat qui correspond à vos attentes.` :
              `Chez Progineer, nous sommes spécialisés dans la construction de maisons individuelles et nous adaptons notre approche à chaque projet. Que vous souhaitiez une maison contemporaine, traditionnelle ou écologique, nous vous accompagnons dans la réalisation d'un habitat qui correspond à vos attentes.`
            }
          />
        </p>
        <div className="mt-6">
          <Button href="/contact" className="mr-4">
            Demander un devis gratuit
          </Button>
          <Button href="/estimation" variant="outline">
            Estimer votre projet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConstructionNeuveContent;
