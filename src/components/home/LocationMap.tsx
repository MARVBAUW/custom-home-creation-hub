
import React, { useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { MapPin, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import './animations.css';

// Icônes Leaflet
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

// Définition d'une icône personnalisée
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
  });
};

const locations = [
  { 
    name: 'Marseille', 
    lat: 43.296482, 
    lng: 5.36978, 
    color: '#E57373', 
    radius: 30000,
    projects: 42,
    highlight: true
  },
  { 
    name: 'Saint-Tropez', 
    lat: 43.2727, 
    lng: 6.6407, 
    color: '#FFB74D', 
    radius: 15000, 
    projects: 18
  },
  { 
    name: 'Toulon', 
    lat: 43.1242, 
    lng: 5.9279, 
    color: '#4FC3F7', 
    radius: 25000, 
    projects: 35
  },
  { 
    name: 'Nice', 
    lat: 43.7102, 
    lng: 7.2620, 
    color: '#AED581', 
    radius: 20000, 
    projects: 27
  },
  { 
    name: 'Cannes', 
    lat: 43.5528, 
    lng: 7.0174, 
    color: '#FF8A65', 
    radius: 18000, 
    projects: 22
  },
  { 
    name: 'Fréjus', 
    lat: 43.4331, 
    lng: 6.7370, 
    color: '#9575CD', 
    radius: 15000, 
    projects: 15
  }
];

const LocationMap = () => {
  const mapRef = useRef(null);

  // Style personnalisé pour la carte
  useEffect(() => {
    // Style CSS injecté pour le fond de carte personnalisé
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-tile-pane {
        filter: saturate(0.8) brightness(1.05) contrast(1.05);
      }
      
      .map-container {
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid rgba(225, 225, 225, 0.5);
      }
      
      .leaflet-marker-icon {
        transition: transform 0.3s ease;
      }
      
      .leaflet-marker-icon:hover {
        transform: scale(1.3) !important;
      }
      
      .custom-marker-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .custom-popup .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .custom-popup .leaflet-popup-tip {
        background: rgba(255, 255, 255, 0.95);
      }
      
      .map-popup-content {
        padding: 12px 16px;
        min-width: 150px;
      }
      
      .map-popup-title {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 4px;
        color: #333;
      }
      
      .map-popup-stats {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .pulse-circle {
        animation: pulse 2s infinite;
        transform-origin: center;
      }
      
      @keyframes pulse {
        0% {
          opacity: 0.7;
          transform: scale(0.9);
        }
        70% {
          opacity: 0.2;
          transform: scale(1.1);
        }
        100% {
          opacity: 0.7;
          transform: scale(0.9);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Popup personnalisé avec les données
  const CustomPopup = ({ name, projects }) => (
    <div className="map-popup-content">
      <div className="map-popup-title">{name}</div>
      <div className="map-popup-stats">
        <Info size={14} /> {projects} projets réalisés
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-stone-100 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-50 to-transparent"></div>
      <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-khaki-100/30 blur-3xl"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-khaki-100/20 blur-3xl"></div>
      
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Zones d'intervention
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-semibold mb-4">
              Nous intervenons dans toute la région PACA
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-600 text-lg">
              Notre équipe de maîtres d'œuvre et d'architectes se déplace dans tout le sud de la France pour réaliser vos projets.
            </motion.p>
          </div>

          <motion.div 
            variants={itemVariants}
            className="relative w-full h-[600px] rounded-xl overflow-hidden map-container bg-stone-100"
          >
            <MapContainer 
              ref={mapRef}
              center={[43.4, 6.0]} 
              zoom={8} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              className="z-10"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              />
              
              {locations.map((location, index) => (
                <React.Fragment key={index}>
                  {/* Cercle de zone d'influence */}
                  <Circle
                    center={[location.lat, location.lng]}
                    pathOptions={{ 
                      fillColor: location.color, 
                      fillOpacity: 0.15, 
                      weight: 1, 
                      color: location.color,
                      opacity: 0.6
                    }}
                    radius={location.radius}
                    className={location.highlight ? "pulse-circle" : ""}
                  />
                  
                  {/* Marqueur avec popup */}
                  <Marker 
                    position={[location.lat, location.lng]}
                    icon={createCustomIcon(location.color)}
                  >
                    <Popup className="custom-popup">
                      <CustomPopup name={location.name} projects={location.projects} />
                    </Popup>
                  </Marker>
                </React.Fragment>
              ))}
            </MapContainer>
            
            {/* Overlay avec effet de vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-100 to-transparent opacity-20"></div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-10 text-center text-gray-600 max-w-3xl mx-auto"
          >
            <p className="mb-4">
              En tant que maître d'œuvre et architecte basé à Marseille, nous couvrons toute la région Provence-Alpes-Côte d'Azur 
              pour vos projets de construction, rénovation et extension.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {locations.map((location, index) => (
                <div 
                  key={index}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-stone-100"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: location.color }}
                  ></div>
                  <span className="text-sm font-medium">{location.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LocationMap;
