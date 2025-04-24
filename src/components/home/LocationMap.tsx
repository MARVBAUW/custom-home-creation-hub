
import React from 'react';
import Container from '@/components/common/Container';
import { MapPin, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Corriger les problèmes d'icône de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Définir les icônes par défaut pour Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icon - idéalement, on utiliserait un logo personnalisé
const customIcon = L.divIcon({
  className: 'custom-map-marker',
  html: `<div class="marker-pin bg-khaki-500">
           <div class="marker-icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
               <path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"></path>
             </svg>
           </div>
         </div>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -40]
});

const locations = [
  { 
    name: 'Marseille', 
    lat: 43.296482, 
    lng: 5.36978,
    projects: 25,
    highlight: true 
  },
  { 
    name: 'Saint-Tropez', 
    lat: 43.2727, 
    lng: 6.6407,
    projects: 12,
    highlight: false 
  },
  { 
    name: 'Toulon', 
    lat: 43.1242, 
    lng: 5.9279,
    projects: 18,
    highlight: true 
  },
  { 
    name: 'Nice', 
    lat: 43.7102, 
    lng: 7.2620,
    projects: 15,
    highlight: true 
  },
  { 
    name: 'Cannes', 
    lat: 43.5528, 
    lng: 7.0174,
    projects: 10,
    highlight: false 
  },
  { 
    name: 'Fréjus', 
    lat: 43.4331, 
    lng: 6.7370,
    projects: 8,
    highlight: false 
  }
];

const LocationMap = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 8
      }
    }
  };

  // Ajout de CSS inline pour le style du marker personnalisé
  const mapStyles = `
    .custom-map-marker {
      position: relative;
    }
    .marker-pin {
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      position: absolute;
      transform: rotate(-45deg);
      left: 50%;
      top: 50%;
      margin: -20px 0 0 -15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .marker-icon-container {
      transform: rotate(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  `;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
      <style>{mapStyles}</style>
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      <Container>
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Zones d'intervention
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Nous intervenons dans toute la région PACA
            </h2>
            <p className="text-gray-600 text-lg">
              Notre équipe de maîtres d'œuvre et d'architectes se déplace dans tout le sud de la France pour réaliser vos projets.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative w-full h-[550px] rounded-xl overflow-hidden border border-gray-200 shadow-lg"
          >
            <div className="absolute top-4 right-4 z-[400] bg-white p-3 rounded-lg shadow-md border border-gray-200 flex items-center gap-2">
              <Info className="h-5 w-5 text-khaki-600" />
              <span className="text-sm font-medium text-gray-700">Cliquez sur les marqueurs pour plus d'informations</span>
            </div>
            
            <MapContainer 
              center={[43.5, 5.9]} 
              zoom={8} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {locations.map((location, index) => (
                <Marker 
                  key={index} 
                  position={[location.lat, location.lng]}
                  icon={customIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-1">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <div className="text-khaki-700 font-medium">{location.projects} projets réalisés</div>
                      <div className="mt-2 text-sm">
                        Construction, rénovation et extension
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {locations.map((location, index) => (
              <div 
                key={index} 
                className={`p-3 ${location.highlight ? 'bg-khaki-50 border-khaki-200' : 'bg-white border-gray-100'} rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
              >
                <div className="flex justify-center items-center mb-2">
                  <MapPin className={`h-5 w-5 ${location.highlight ? 'text-khaki-600' : 'text-gray-500'}`} />
                </div>
                <p className={`font-medium text-center ${location.highlight ? 'text-khaki-800' : 'text-gray-700'}`}>{location.name}</p>
                <p className="text-xs text-center text-gray-500">{location.projects} projets</p>
              </div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center text-gray-600 bg-white/50 p-4 rounded-lg border border-gray-100"
          >
            <p>
              En tant que maître d'œuvre et architecte basé à Marseille, nous couvrons toute la région Provence-Alpes-Côte d'Azur pour vos projets de construction, rénovation et extension.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LocationMap;
