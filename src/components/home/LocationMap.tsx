
import React from 'react';
import Container from '@/components/common/Container';
import { MapPin } from 'lucide-react';

const locations = [
  { name: 'Marseille', x: '45%', y: '70%' },
  { name: 'Saint-Tropez', x: '65%', y: '65%' },
  { name: 'Toulon', x: '55%', y: '65%' },
  { name: 'Nice', x: '80%', y: '55%' },
  { name: 'Cannes', x: '70%', y: '55%' },
  { name: 'Fréjus', x: '60%', y: '60%' }
];

const LocationMap = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Zones d'intervention
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Nous intervenons dans toute la région PACA
          </h2>
          <p className="text-gray-600 text-lg">
            Notre équipe de maîtres d'œuvre et d'architectes se déplace dans tout le sud de la France pour réaliser vos projets.
          </p>
        </div>

        <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="absolute inset-0 bg-stone-50">
            {/* Map background with fallback color */}
            <div className="relative w-full h-full bg-stone-100">
              {/* Using a different map image source with higher resolution */}
              <img 
                src="https://i.imgur.com/HFqKRfB.jpg" 
                alt="Carte de la région PACA" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Map image failed to load');
                }}
              />
              
              {/* Map pins with improved visibility */}
              {locations.map((location) => (
                <div 
                  key={location.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: location.x, top: location.y }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <MapPin className="h-8 w-8 text-khaki-700 drop-shadow-md" />
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span className="mt-1 font-medium text-sm text-gray-800 bg-white/80 px-2 py-0.5 rounded shadow-sm">
                      {location.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            En tant que maître d'œuvre et architecte basé à Marseille, nous couvrons toute la région Provence-Alpes-Côte d'Azur pour vos projets de construction, rénovation et extension.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default LocationMap;
