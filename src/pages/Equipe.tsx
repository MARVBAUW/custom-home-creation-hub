
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Equipe = () => {
  return (
    <>
      <Helmet>
        <title>Notre équipe | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Découvrez l'équipe de Progineer, experts en architecture et maîtrise d'œuvre pour vos projets de construction et rénovation en région PACA." />
        <meta name="keywords" content="équipe architecte, maître d'œuvre PACA, experts construction, ingénieurs bâtiment Marseille" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Notre équipe
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Une équipe d'experts à votre service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez les professionnels qui donnent vie à vos projets avec passion,
              expertise et créativité.
            </p>
          </div>
        </Container>
      </section>

      {/* Team section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
            {/* Team Member - Marvin Bauwens */}
            <div className="flex flex-col lg:flex-row gap-8 items-start bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="lg:w-1/3">
                <div className="rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Marvin Bauwens" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-khaki-700 mr-2" />
                    <a href="mailto:m.bauwens@progineer.fr" className="text-gray-600 hover:text-khaki-700">
                      m.bauwens@progineer.fr
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-khaki-700 mr-2" />
                    <a href="tel:+33783762156" className="text-gray-600 hover:text-khaki-700">
                      +33 7 83 76 21 56
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-khaki-700 mr-2" />
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-khaki-700">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-1">Marvin Bauwens</h2>
                  <p className="text-khaki-700 font-medium">Président – Directeur Général</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Expertise</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-khaki-500 mr-2"></div>
                        <span>Économie de la construction</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-khaki-500 mr-2"></div>
                        <span>Voirie & réseaux divers</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-khaki-500 mr-2"></div>
                        <span>Clos couvert, CAO/DAO</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-khaki-500 mr-2"></div>
                        <span>Tertiaire, industrie, résidentiel</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Formation</h3>
                    <p>Master Génie Civil, Architecture et Urbanisme</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Parcours</h3>
                    <p className="text-gray-600 mb-4">
                      Fort de plus de 10 ans d'expérience dans le secteur de la construction, Marvin a travaillé sur divers projets allant des maisons individuelles aux bâtiments tertiaires. Sa vision holistique de l'architecture allie fonctionnalité, esthétique et durabilité.
                    </p>
                    <p className="text-gray-600">
                      En fondant Progineer, il a souhaité mettre son expertise au service des particuliers et des professionnels de la région PACA, avec une approche personnalisée et un accompagnement sur mesure pour chaque client.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Philosophie</h3>
                    <p className="text-gray-600 italic">
                      "L'architecture n'est pas seulement une question d'esthétique, mais aussi de fonctionnalité et de bien-être. Chaque projet doit être pensé comme un écosystème où l'humain est au centre."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-8">
              Notre équipe s'agrandit ! D'autres experts en architecture et maîtrise d'œuvre rejoindront prochainement Progineer pour vous accompagner dans vos projets.
            </p>
            <Button href="/contact">Nous contacter</Button>
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Nos valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ces principes guident notre approche et notre travail au quotidien.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans chaque projet, en accordant une attention particulière aux détails et à la qualité d'exécution.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Nous intégrons les dernières innovations techniques et environnementales pour créer des espaces durables et avant-gardistes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Écoute</h3>
              <p className="text-gray-600">
                Nous plaçons l'écoute et la compréhension des besoins de nos clients au cœur de notre démarche.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Notre équipe d'architectes et d'ingénieurs vous accompagne de A à Z dans tous vos projets immobiliers en région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Equipe;
