
import React from 'react';
import Container from '@/components/common/Container';
import { Home, Building, Clock, Award } from 'lucide-react';

const AdvantagesSection = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
      
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Avantage 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
            <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-progineer-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Construction sur mesure</h3>
            <p className="text-gray-600">Des maisons personnalisées selon vos besoins et votre style de vie</p>
          </div>
          
          {/* Avantage 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
            <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-progineer-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expertise architecturale</h3>
            <p className="text-gray-600">Une équipe d'architectes et d'ingénieurs qualifiés à votre service</p>
          </div>
          
          {/* Avantage 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
            <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-progineer-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
            <p className="text-gray-600">Un accompagnement constant tout au long de votre projet de construction</p>
          </div>
          
          {/* Avantage 4 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
            <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-progineer-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
            <p className="text-gray-600">Des matériaux et finitions de haute qualité pour un résultat exceptionnel</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdvantagesSection;
