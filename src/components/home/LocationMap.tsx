
import React from 'react';
import Container from '@/components/common/Container';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'leaflet/dist/leaflet.css';

const locations = [
  { name: 'Marseille', lat: 43.296482, lng: 5.36978, projects: 150 },
  { name: 'Saint-Tropez', lat: 43.2727, lng: 6.6407, projects: 75 },
  { name: 'Toulon', lat: 43.1242, lng: 5.9279, projects: 120 },
  { name: 'Nice', lat: 43.7102, lng: 7.2620, projects: 95 },
  { name: 'Cannes', lat: 43.5528, lng: 7.0174, projects: 85 },
  { name: 'Fréjus', lat: 43.4331, lng: 6.7370, projects: 65 }
];

// Créer un marqueur personnalisé
const customIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="marker-pin"></div>
         <div class="marker-pulse"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const LocationMap = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <Container>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-700 text-sm font-medium"
          >
            Zones d'intervention
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Nous intervenons dans toute la région PACA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg"
          >
            Notre équipe de maîtres d'œuvre se déplace dans tout le sud de la France pour réaliser vos projets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-lg"
            >
              <MapContainer 
                center={[43.5, 5.9]} 
                zoom={8} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                className="z-10"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                  <Marker 
                    key={index} 
                    position={[location.lat, location.lng]}
                    icon={customIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2">
                        <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.projects} projets réalisés</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-khaki-50 p-6 rounded-xl border border-khaki-100"
            >
              <h3 className="text-xl font-semibold mb-4">Nos principales zones d'intervention</h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-khaki-600 mr-3" />
                      <span className="font-medium">{location.name}</span>
                    </div>
                    <span className="text-sm text-khaki-600">{location.projects} projets</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx global>{`
          .custom-div-icon {
            background: transparent;
            border: none;
          }
          
          .marker-pin {
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            background: #c1a16a;
            position: absolute;
            transform: rotate(-45deg);
            left: 50%;
            top: 50%;
            margin: -15px 0 0 -15px;
          }

          .marker-pin::after {
            content: '';
            width: 24px;
            height: 24px;
            margin: 3px 0 0 3px;
            background: #fff;
            position: absolute;
            border-radius: 50%;
          }

          .marker-pulse {
            background: rgba(193, 161, 106, 0.2);
            border-radius: 50%;
            height: 14px;
            width: 14px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -7px 0 0 -7px;
            transform: rotateX(55deg);
            z-index: -2;
          }

          .marker-pulse:after {
            content: "";
            border-radius: 50%;
            height: 40px;
            width: 40px;
            position: absolute;
            margin: -13px 0 0 -13px;
            animation: pulsate 1s ease-out;
            animation-iteration-count: infinite;
            opacity: 0;
            box-shadow: 0 0 1px 2px #c1a16a;
            animation: pulsate 1s ease-out;
            animation-iteration-count: infinite;
            opacity: 0;
          }

          @keyframes pulsate {
            0% {
              transform: scale(0.1, 0.1);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: scale(1.2, 1.2);
              opacity: 0;
            }
          }

          .custom-popup .leaflet-popup-content-wrapper {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </Container>
    </section>
  );
};

export default LocationMap;
