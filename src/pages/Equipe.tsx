
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Briefcase, Building, School, Award, CheckCircle } from 'lucide-react';
import TeamHero from '@/components/team/TeamHero';
import ExpertiseSection from '@/components/team/ExpertiseSection';
import CTACTA from '@/components/common/CTACTA';
import SEOFooter from '@/components/common/SEOFooter';

const Equipe = () => {
  return (
    <>
      <Helmet>
        <title>Rencontrez Notre Équipe d'Experts en Maîtrise d'œuvre</title>
        <meta name="description" content="Découvrez l'équipe de Progineer, des professionnels expérimentés en architecture et maîtrise d'œuvre pour vos projets de construction et rénovation à Marseille et en PACA." />
        <meta name="keywords" content="équipe architecture, professionnels maîtrise d'œuvre, experts construction PACA, architectes Marseille" />
      </Helmet>

      <TeamHero />

      <section className="py-20 bg-white dark:bg-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Marvin Bauwens */}
              <div className="text-center md:text-left">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="/lovable-uploads/d674d37d-7176-457e-8dac-529981672eda.png" 
                    alt="Marvin Bauwens" 
                    className="w-64 h-64 object-cover rounded-full mx-auto md:mx-0"
                  />
                  <div className="absolute bottom-0 right-0 bg-progineer-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    PRÉSIDENT
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Marvin Bauwens</h2>
                <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">PRÉSIDENT DIRECTEUR GÉNÉRAL</h3>

                <div className="flex flex-col gap-2 max-w-md mx-auto md:mx-0">
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Master Génie Civil Architecture et Urbanisme</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Maîtrise d'œuvre, Maîtrise d'ouvrage, Économiste</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Tertiaire, Industrie, Résidentiel</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Tous corps d'état, Gros œuvre, Second œuvre, Charpente, CAO/DAO</span>
                  </div>
                </div>
              </div>

              {/* Mael Allano */}
              <div className="text-center md:text-left">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="/lovable-uploads/e861b499-9056-4f3d-9e51-ba393450c8ac.png" 
                    alt="Mael Allano" 
                    className="w-64 h-64 object-cover rounded-full mx-auto md:mx-0"
                  />
                  <div className="absolute bottom-0 right-0 bg-progineer-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    DIRECTEUR
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Mael Allano</h2>
                <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">DIRECTEUR GÉNÉRAL</h3>

                <div className="flex flex-col gap-2 max-w-md mx-auto md:mx-0">
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Master Génie Civil Architecture et Urbanisme</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Entreprise générale, Maîtrise d'œuvre, Contractant général</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Tertiaire, Industrie, Résidentiel</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300">Conception architecturale, Ingénierie des structures, Gestion de projet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ExpertiseSection />

      <section className="py-16 bg-khaki-50 dark:bg-gray-900">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
              Nos réalisations
            </h2>
            <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/8d532cc9-a94b-4199-b9a4-7fc8b3be4f0e.png" 
                alt="Maison contemporaine avec piscine" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Villa contemporaine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Construction neuve avec piscine</p>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/4e95bb0e-3e4c-48a0-b08b-9db77d6ee437.png" 
                alt="Cuisine moderne avec îlot central" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Aménagement intérieur</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cuisine ouverte avec îlot central</p>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/7853bb71-eac7-46a1-b29e-f843fb2017df.png" 
                alt="Salon moderne avec escalier" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Espace de vie</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Salon avec cheminée suspendue</p>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/07270ac3-7ab5-4a34-a094-bdb6453247dc.png" 
                alt="Esplanade urbaine" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Aménagement urbain</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Esplanade résidentielle</p>
              </div>
            </div>
            
            {/* Project 5 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/0d5258af-ddb8-4899-a647-cc2768c16f0b.png" 
                alt="Villa provençale avec piscine" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Villa néo-provençale</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Construction avec toiture en tuiles</p>
              </div>
            </div>
            
            {/* Project 6 */}
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/7f302166-d127-4673-b85a-26a2d1698c8f.png" 
                alt="Immeuble moderne" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Immeuble urbain</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Rénovation façade et structure</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button href="/realisations-architecte-maison" size="lg">
              Découvrir toutes nos réalisations
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-khaki-50 dark:bg-gray-800">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
              Notre histoire
            </h2>
            <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-6 text-lg">
            <p>
              Progineer est une entreprise d'architecture et de maîtrise d'œuvre travaillant sur des projets de construction, rénovation ou de modification du bâti existant. Nous réalisons les études, le dépôt des autorisations administratives, l'appel d'offre et le suivi des travaux.
            </p>
            
            <p>
              Nous intervenons principalement à Marseille et ses alentours, nous sommes également présent sur toute de la côte d'azur en passant par Saint Tropez, Toulon, Nice, Cannes, Fréjus.
            </p>
            
            <p>
              Progineer s'engage à mettre en œuvre des réalisations qui reflètent vos aspirations et vos besoins, en alliant innovation, savoir-faire et respect des délais.
            </p>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-khaki-200 dark:border-gray-600 mt-8">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Progineer garantit :</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-progineer-gold mr-2 mt-1" />
                  <span>Une écoute attentive, afin d'offrir un suivi personnalisé respectant au mieux vos besoins et votre budget.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-progineer-gold mr-2 mt-1" />
                  <span>Une communication transparente, pour assurer une coordination efficace entre vous et les entreprises partenaires de votre projet.</span>
                </li>
              </ul>
            </div>
            
            <p className="pt-4">
              Que vous soyez un particulier ou un professionnel, nous sommes à votre disposition pour vous accompagner dans la concrétisation de vos idées, afin d'obtenir un résultat à la hauteur de vos attentes.
            </p>
            
            <div className="pt-8 text-center">
              <Button href="/contact" size="lg">
                Contactez-nous pour échanger sur votre projet
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTACTA />
      
      <SEOFooter 
        text="Découvrez l'équipe de Progineer, des professionnels qualifiés en architecture et maîtrise d'œuvre. Nos experts en construction, rénovation et extension vous accompagnent dans tous vos projets immobiliers à Marseille et dans toute la région PACA."
      />
    </>
  );
};

export default Equipe;
