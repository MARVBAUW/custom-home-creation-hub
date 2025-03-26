
import React from 'react';
import Container from '@/components/common/Container';
import { Briefcase, Building, School, Award } from 'lucide-react';

const TeamProfiles = () => {
  return (
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
  );
};

export default TeamProfiles;
