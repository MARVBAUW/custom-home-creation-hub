
import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const approachSteps = [
  {
    title: "Écoute et analyse",
    desc: "Nous prenons le temps de comprendre vos besoins, vos contraintes et vos aspirations.",
  },
  {
    title: "Conception et proposition",
    desc: "Nous élaborons des solutions adaptées à votre projet, avec plans et visualisations 3D.",
  },
  {
    title: "Planification détaillée",
    desc: "Nous établissons un planning précis, sélectionnons les intervenants et préparons les démarches administratives.",
  },
  {
    title: "Réalisation et suivi",
    desc: "Nous coordonnons les travaux, contrôlons la qualité et veillons au respect des délais et du budget.",
  },
  {
    title: "Livraison et suivi",
    desc: "Nous vous accompagnons lors de la réception des travaux et restons disponibles pour tout besoin ultérieur.",
  },
];

const ApproachSection: React.FC = () => (
  <section className="py-16">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Notre approche</h2>
          <p className="text-gray-700 mb-4">
            Chez Progineer, nous croyons qu&apos;un projet réussi commence par une <strong>écoute attentive</strong> de vos besoins et aspirations. 
            Notre approche collaborative nous permet de créer des espaces qui reflètent votre personnalité tout en respectant votre budget.
          </p>
          <p className="text-gray-700 mb-4">
            Nous mettons un point d&apos;honneur à maintenir une <strong>communication transparente</strong> tout au long du projet, 
            en vous tenant informé de chaque étape et en vous impliquant dans les décisions importantes.
          </p>
          <p className="text-gray-700 mb-6">
            Notre expertise technique et notre créativité se combinent pour vous offrir des solutions <strong>innovantes</strong> et <strong>durables</strong>, 
            adaptées aux spécificités de la région PACA et aux normes les plus exigeantes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact">Rencontrer notre équipe</Button>
            <Button href="/realisations-architecte-maison" variant="outline">Voir nos réalisations</Button>
          </div>
        </div>
        <div className="bg-stone-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Notre processus de travail</h3>
          <div className="space-y-4">
            {approachSteps.map((step, idx) => (
              <div className="flex items-start" key={step.title}>
                <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                  {idx+1}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default ApproachSection;
