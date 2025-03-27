
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';

const EstimationCalculator: React.FC = () => {
  const { toast } = useToast();

  // Composant temporaire utilisant Tally.so
  React.useEffect(() => {
    // Fonction pour charger le script Tally.so
    const loadTallyScript = () => {
      if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]') === null) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.onload = initTally;
        script.onerror = initTally;
        document.body.appendChild(script);
      } else {
        initTally();
      }
    };

    // Fonction pour initialiser les iframes Tally
    const initTally = () => {
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe: any) => {
          iframe.src = iframe.dataset.tallySrc;
        });
      }
    };

    loadTallyScript();

    // Message informant l'utilisateur du changement temporaire
    setTimeout(() => {
      toast({
        title: "Formulaire d'estimation",
        description: "Notre outil d'estimation est en cours d'amélioration. Merci de votre compréhension.",
      });
    }, 1000);
  }, [toast]);

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <InfoIcon className="h-5 w-5 mr-2 text-blue-500" />
          Estimation de votre projet
        </CardTitle>
        <CardDescription>
          Veuillez compléter le formulaire ci-dessous pour obtenir une estimation de votre projet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Version temporaire avec iframe Tally.so */}
          <iframe 
            data-tally-src="https://tally.so/embed/nGB6KO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="lazy" 
            width="100%" 
            height="631" 
            frameBorder="0" 
            title="ESTIMER VOTRE PROJET"
          ></iframe>
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
