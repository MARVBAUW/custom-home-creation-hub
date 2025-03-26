
import React from 'react';
import Container from '@/components/common/Container';
import { CheckCircle } from 'lucide-react';

interface HistoryData {
  paragraphs: string[];
  guarantees: string[];
  conclusion: string;
}

interface AboutStoryProps {
  history?: HistoryData;
}

const AboutStory: React.FC<AboutStoryProps> = ({ history }) => {
  // Si l'histoire n'est pas fournie, utilisez l'histoire par défaut
  const storyData = history || {
    paragraphs: [
      "Fondée en 2022, Progineer est née de la passion et de l'expertise de ses fondateurs pour l'architecture et la construction de qualité.",
      "Après plusieurs années d'expérience dans différentes structures d'architecture et de maîtrise d'œuvre, nos fondateurs ont décidé d'unir leurs compétences pour créer une entreprise qui place l'humain et la qualité au centre de chaque projet.",
      "Aujourd'hui, Progineer s'est imposée comme un acteur incontournable de la construction et rénovation sur mesure dans la région PACA, notamment à Marseille, Toulon et Nice."
    ],
    guarantees: [
      "Un service personnalisé adapté à vos besoins spécifiques",
      "Une expertise technique et architecturale de haut niveau",
      "Un respect scrupuleux des délais et des budgets"
    ],
    conclusion: "Notre histoire continue de s'écrire avec chaque nouveau projet, chaque nouvelle rencontre, et chaque défi relevé pour nos clients."
  };

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Notre histoire</h2>
            <div className="w-20 h-1 bg-progineer-gold mx-auto"></div>
          </div>
          
          <div className="space-y-6 text-lg text-gray-700">
            {storyData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <div className="bg-stone-50 p-8 rounded-xl mt-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Progineer garantit :</h3>
              <ul className="space-y-4">
                {storyData.guarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-progineer-gold mr-3 mt-1 flex-shrink-0" />
                    <span>{guarantee}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="font-medium text-center">{storyData.conclusion}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutStory;
