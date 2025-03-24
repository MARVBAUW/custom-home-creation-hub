
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const About = () => {
  return (
    <>
      <Helmet>
        <title>À propos | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Découvrez Progineer, entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA." />
        <meta name="keywords" content="à propos architecte, histoire maître d'œuvre, entreprise construction PACA, valeurs architecte Marseille" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              À propos
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Notre histoire et nos valeurs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez qui nous sommes et ce qui fait de Progineer un partenaire
              de confiance pour tous vos projets immobiliers.
            </p>
          </div>
        </Container>
      </section>

      {/* Story section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Notre histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondée en 2018 par Marvin Bauwens, ingénieur en génie civil passionné d'architecture, Progineer est née d'une vision : proposer un service complet et personnalisé combinant l'expertise technique de l'ingénierie et la créativité de l'architecture.
              </p>
              <p className="text-gray-600 mb-4">
                Face au constat que de nombreux projets immobiliers souffraient d'un manque de coordination entre les différents intervenants, Marvin a souhaité créer une structure capable d'accompagner les clients de A à Z, en assurant une cohérence globale et une communication fluide à toutes les étapes.
              </p>
              <p className="text-gray-600 mb-4">
                D'abord établie à Marseille, l'entreprise a rapidement étendu son activité à l'ensemble de la région PACA, portée par le bouche-à-oreille de clients satisfaits et une réputation d'excellence et de fiabilité.
              </p>
              <p className="text-gray-600">
                Aujourd'hui, Progineer est reconnue comme un acteur de référence dans le domaine de la maîtrise d'œuvre et de l'architecture en Provence-Alpes-Côte d'Azur, travaillant aussi bien pour des particuliers que pour des professionnels.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Maison conçue par Progineer" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Nos valeurs fondamentales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ces principes guident notre approche et notre travail au quotidien.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous nous engageons à atteindre l'excellence dans chaque aspect de notre travail, en accordant une attention particulière aux détails et à la qualité d'exécution.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fiabilité</h3>
              <p className="text-gray-600">
                Nous sommes fidèles à nos engagements en termes de qualité, de délais et de budget. Notre fiabilité est le fondement de la confiance que nos clients nous accordent.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparence</h3>
              <p className="text-gray-600">
                Nous privilégions une communication claire et honnête à toutes les étapes du projet, en expliquant nos choix et en tenant nos clients informés de l'avancement des travaux.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client au centre</h3>
              <p className="text-gray-600">
                Nous plaçons les besoins et les attentes de nos clients au cœur de notre démarche, en adoptant une approche personnalisée pour chaque projet.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Approach section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1517056338492-cb43f18f4208?q=80&w=2070&auto=format&fit=crop" 
                alt="Réunion d'équipe Progineer" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-semibold mb-6">Notre approche</h2>
              <p className="text-gray-600 mb-4">
                Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive. Nous prenons le temps de comprendre vos besoins, vos contraintes et vos aspirations afin de vous proposer des solutions sur mesure.
              </p>
              <p className="text-gray-600 mb-4">
                Nous adoptons une approche collaborative, en vous impliquant à chaque étape du processus et en vous aidant à prendre des décisions éclairées. Notre objectif est de vous guider tout au long du projet, en vous apportant notre expertise technique et créative.
              </p>
              <p className="text-gray-600 mb-4">
                La durabilité est au cœur de notre philosophie. Nous concevons des espaces qui non seulement répondent à vos besoins actuels, mais qui sont également adaptables, économes en énergie et respectueux de l'environnement.
              </p>
              <p className="text-gray-600">
                Enfin, nous accordons une grande importance à la coordination entre tous les intervenants du projet, en assurant une communication fluide et en anticipant les potentiels problèmes, pour une réalisation sans accroc.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-khaki-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment 
              notre expertise peut vous aider à la réaliser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation" className="bg-white text-khaki-800 hover:bg-white/90">
                Estimer mon projet
              </Button>
              <Button href="/contact" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Découvrez l'histoire et les valeurs de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
