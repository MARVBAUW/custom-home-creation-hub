
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const faqItems = [
  {
    question: "Quelle est la différence entre un maître d'œuvre, un architecte et une entreprise générale ?",
    answer: "Un maître d'œuvre est un professionnel qui coordonne et supervise l'ensemble des travaux de construction ou de rénovation. Il fait le lien entre le client et les différents corps de métier. Un architecte est principalement chargé de la conception et du design du bâtiment, avec une approche plus artistique et technique. Une entreprise générale, quant à elle, réalise directement les travaux avec ses propres équipes ou des sous-traitants. Chez Progineer, nous combinons les compétences de maîtrise d'œuvre et d'architecture pour vous offrir un service complet."
  },
  {
    question: "Quelles sont les obligations administratives pour mon projet de construction ?",
    answer: "Les obligations administratives dépendent de la nature et de l'ampleur de votre projet. Pour une construction neuve, vous devez généralement obtenir un permis de construire. Pour une extension ou une rénovation, selon la surface créée et la modification de l'aspect extérieur, une déclaration préalable de travaux peut suffire. D'autres autorisations peuvent être nécessaires comme l'autorisation de travaux pour les établissements recevant du public (ERP). Progineer se charge de toutes ces démarches administratives pour vous, en constituant les dossiers nécessaires et en assurant le suivi avec les services d'urbanisme."
  },
  {
    question: "Quel est le délai moyen pour obtenir un permis de construire ?",
    answer: "Le délai légal d'instruction d'un permis de construire est généralement de 2 mois pour une maison individuelle et de 3 mois pour les autres constructions. Ce délai peut être prolongé si votre projet est situé dans un secteur protégé ou nécessite des consultations spécifiques. Il faut également prévoir du temps pour la préparation du dossier en amont. Chez Progineer, nous optimisons ce processus grâce à notre expertise et notre connaissance des réglementations locales."
  },
  {
    question: "Quel est le budget moyen pour une extension de maison ?",
    answer: "Le budget d'une extension varie considérablement selon plusieurs facteurs : la surface, le type de construction (à toit plat, à deux pans, etc.), les matériaux utilisés, la complexité technique, et la région. En moyenne, pour une extension de qualité en région PACA, il faut compter entre 1 500 et 2 500 €/m². Une extension en ossature bois peut coûter entre 1 800 et 2 200 €/m², tandis qu'une extension traditionnelle en maçonnerie peut varier de 1 500 à 2 500 €/m². Ces prix incluent le gros œuvre et les finitions standards, mais peuvent augmenter avec des matériaux haut de gamme ou des contraintes techniques particulières."
  },
  {
    question: "Comment estimer le coût d'un projet de construction ?",
    answer: "L'estimation d'un projet de construction prend en compte plusieurs éléments : la surface habitable, le type de construction, la qualité des matériaux, la complexité architecturale, les équipements, l'emplacement géographique et les contraintes du terrain. Pour une maison individuelle de qualité en PACA, le budget moyen oscille entre 1 800 et 3 000 €/m², hors terrain. Ce prix peut augmenter pour des constructions haut de gamme ou avec des particularités techniques. Progineer propose une estimation personnalisée qui tient compte de tous ces facteurs et de vos besoins spécifiques."
  },
  {
    question: "Quelle est la durée moyenne d'un chantier de construction ?",
    answer: "La durée d'un chantier de construction dépend de la taille et de la complexité du projet. Pour une maison individuelle standard, comptez entre 8 et 12 mois de travaux effectifs. Ce délai comprend les différentes phases : terrassement, fondations, gros œuvre, charpente, toiture, menuiseries, électricité, plomberie, isolation, cloisons, revêtements et finitions. Des facteurs comme les intempéries, la disponibilité des artisans ou les modifications en cours de projet peuvent allonger cette durée. Chez Progineer, nous établissons un planning précis et assurons un suivi rigoureux pour respecter au mieux les délais prévus."
  },
  {
    question: "Quelles aides financières sont disponibles pour mes travaux de rénovation énergétique ?",
    answer: "Plusieurs aides financières existent pour la rénovation énergétique : MaPrimeRénov', Éco-prêt à taux zéro (éco-PTZ), TVA à taux réduit (5,5%), Certificats d'économie d'énergie (CEE), aides de l'Anah (Agence nationale de l'habitat), aides locales des collectivités territoriales. L'éligibilité à ces aides dépend de vos revenus, du type de travaux et des économies d'énergie réalisées. Progineer vous accompagne dans l'identification des aides auxquelles vous pouvez prétendre et vous aide à constituer les dossiers nécessaires."
  },
  {
    question: "Comment choisir les bons matériaux pour ma construction ?",
    answer: "Le choix des matériaux dépend de plusieurs critères : votre budget, vos préférences esthétiques, les performances thermiques souhaitées, l'impact environnemental, la durabilité et l'entretien. Il faut également tenir compte du climat local et de l'orientation de votre bâtiment. Chez Progineer, nous vous conseillons sur les meilleurs matériaux adaptés à votre projet, en tenant compte de tous ces facteurs. Nous privilégions, quand c'est possible, les matériaux durables et écologiques qui offrent un bon compromis entre performance, esthétique et coût."
  },
  {
    question: "Quelles sont les étapes d'un projet de construction ?",
    answer: "Un projet de construction se déroule généralement en plusieurs phases : 1) Études préliminaires (définition des besoins, budget) 2) Conception (esquisses, avant-projet, plans définitifs) 3) Démarches administratives (permis de construire) 4) Consultation des entreprises et attribution des marchés 5) Préparation du chantier 6) Réalisation des travaux (gros œuvre puis second œuvre) 7) Réception des travaux et levée des réserves. Progineer vous accompagne à chaque étape, en assurant la coordination entre tous les intervenants et en veillant au respect de la qualité, des délais et du budget."
  },
  {
    question: "Comment optimiser l'espace dans un petit logement ?",
    answer: "Pour optimiser un petit espace, plusieurs stratégies sont efficaces : privilégier un aménagement ouvert pour fluidifier la circulation, utiliser des meubles multifonctionnels, exploiter la hauteur avec des rangements verticaux, intégrer des rangements sur mesure dans les espaces perdus, choisir des couleurs claires et maximiser la lumière naturelle. Chez Progineer, nos architectes sont spécialisés dans l'optimisation d'espace et proposent des solutions créatives adaptées à vos besoins spécifiques, transformant même les espaces les plus restreints en lieux fonctionnels et agréables à vivre."
  },
  {
    question: "Quelles sont les tendances actuelles en architecture et design d'intérieur ?",
    answer: "Les tendances actuelles en architecture et design d'intérieur incluent : le biophilic design (intégration d'éléments naturels), la durabilité et l'éco-responsabilité, les espaces multifonctionnels adaptables, les intérieurs minimalistes mais chaleureux, les matériaux bruts et authentiques (bois, pierre, béton ciré), l'automatisation et la domotique, les grandes ouvertures et la connexion intérieur-extérieur. Les couleurs neutres et terreuses sont privilégiées, avec des accents de teintes plus vives. Chez Progineer, nous intégrons ces tendances tout en créant des espaces qui reflètent votre personnalité et résistent à l'épreuve du temps."
  }
];

const FAQContent = () => {
  return (
    <section className="py-16">
      <Container size="md">
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Vous n'avez pas trouvé la réponse à votre question ? 
            N'hésitez pas à nous contacter directement.
          </p>
          <Button href="/contact">Nous contacter</Button>
        </div>
      </Container>
    </section>
  );
};

export default FAQContent;
