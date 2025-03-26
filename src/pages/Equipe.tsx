
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

      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Marvin Bauwens */}
              <div className="text-center md:text-left">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=774&auto=format&fit=crop" 
                    alt="Marvin Bauwens" 
                    className="w-64 h-64 object-cover rounded-full mx-auto md:mx-0"
                  />
                  <div className="absolute bottom-0 right-0 bg-progineer-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    PRÉSIDENT
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-2">Marvin Bauwens</h2>
                <h3 className="text-lg text-gray-700 mb-4">PRÉSIDENT DIRECTEUR GÉNÉRAL</h3>

                <div className="flex flex-col gap-2 max-w-md mx-auto md:mx-0">
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Master Génie Civil Architecture et Urbanisme</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Maîtrise d'œuvre, Maîtrise d'ouvrage, Économiste</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Tertiaire, Industrie, Résidentiel</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Tous corps d'état, Gros œuvre, Second œuvre, Charpente, CAO/DAO</span>
                  </div>
                </div>
              </div>

              {/* Mael Allano */}
              <div className="text-center md:text-left">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop" 
                    alt="Mael Allano" 
                    className="w-64 h-64 object-cover rounded-full mx-auto md:mx-0"
                  />
                  <div className="absolute bottom-0 right-0 bg-progineer-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    DIRECTEUR
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-2">Mael Allano</h2>
                <h3 className="text-lg text-gray-700 mb-4">DIRECTEUR GÉNÉRAL</h3>

                <div className="flex flex-col gap-2 max-w-md mx-auto md:mx-0">
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Master Génie Civil Architecture et Urbanisme</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Entreprise générale, Maîtrise d'œuvre, Contractant général</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Tertiaire, Industrie, Résidentiel</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-progineer-gold flex-shrink-0" />
                    <span className="text-sm">Conception architecturale, Ingénierie des structures, Gestion de projet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ExpertiseSection />

      <section className="py-16 bg-khaki-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Notre histoire
            </h2>
            <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-gray-700 space-y-6 text-lg">
            <p>
              Progineer est une entreprise d'architecture et de maîtrise d'œuvre travaillant sur des projets de construction, rénovation ou de modification du bâti existant. Nous réalisons les études, le dépôt des autorisations administratives, l'appel d'offre et le suivi des travaux.
            </p>
            
            <p>
              Nous intervenons principalement à Marseille et ses alentours, nous sommes également présent sur toute de la côte d'azur en passant par Saint Tropez, Toulon, Nice, Cannes, Fréjus.
            </p>
            
            <p>
              Progineer s'engage à mettre en œuvre des réalisations qui reflètent vos aspirations et vos besoins, en alliant innovation, savoir-faire et respect des délais.
            </p>
            
            <div className="bg-white rounded-lg p-6 border border-khaki-200 mt-8">
              <h3 className="text-xl font-semibold mb-4">Progineer garantit :</h3>
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
