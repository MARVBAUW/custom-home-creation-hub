
import React from 'react';
import Container from '@/components/common/Container';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

const locations = [
  { name: 'Marseille', lat: 43.296482, lng: 5.36978 },
  { name: 'Saint-Tropez', lat: 43.2727, lng: 6.6407 },
  { name: 'Toulon', lat: 43.1242, lng: 5.9279 },
  { name: 'Nice', lat: 43.7102, lng: 7.2620 },
  { name: 'Cannes', lat: 43.5528, lng: 7.0174 },
  { name: 'Fréjus', lat: 43.4331, lng: 6.7370 }
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

        <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <MapContainer 
            center={[43.5, 5.9]} 
            zoom={8} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location, index) => (
              <Marker 
                key={index} 
                position={[location.lat, location.lng]}
              >
                <Popup>
                  <div className="font-medium">{location.name}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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
