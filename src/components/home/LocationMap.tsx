
import React, { useEffect, useRef, useState } from 'react';
import Container from '@/components/common/Container';
import { MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const locations = [
  { name: 'Marseille', lat: 43.296482, lng: 5.36978 },
  { name: 'Saint-Tropez', lat: 43.2727, lng: 6.6407 },
  { name: 'Toulon', lat: 43.1242, lng: 5.9279 },
  { name: 'Nice', lat: 43.7102, lng: 7.2620 },
  { name: 'Cannes', lat: 43.5528, lng: 7.0174 },
  { name: 'Fréjus', lat: 43.4331, lng: 6.7370 }
];

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // Fonction pour initialiser la carte
    const initializeMap = () => {
      if (!mapContainer.current || !mapboxToken) return;

      if (map.current) return; // Ne pas initialiser plusieurs fois

      mapboxgl.accessToken = mapboxToken;
      
      // Création de la carte
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [5.9, 43.5], // Centre sur la région PACA
        zoom: 7.5,
        pitch: 10,
        attributionControl: true
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Ajouter les marqueurs pour chaque ville
      locations.forEach(location => {
        // Créer un élément DOM personnalisé pour le marqueur
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
            <span class="mt-1 font-medium text-sm text-gray-800 bg-white/90 px-2 py-0.5 rounded shadow-sm">
              ${location.name}
            </span>
          </div>
        `;

        // Ajouter le marqueur à la carte
        new mapboxgl.Marker({
          element: markerEl,
          anchor: 'bottom',
        })
          .setLngLat([location.lng, location.lat])
          .addTo(map.current);
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Gestion du token Mapbox
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('mapboxToken') as HTMLInputElement;
    if (input.value) {
      setMapboxToken(input.value);
      localStorage.setItem('mapboxToken', input.value);
    }
  };

  // Récupérer le token depuis localStorage au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem('mapboxToken');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

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
          {!mapboxToken ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-stone-50">
              <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Configuration de la carte</h3>
                <p className="text-gray-600 mb-4">
                  Pour afficher la carte interactive, vous devez fournir un token public Mapbox. 
                  Vous pouvez en obtenir un gratuitement sur <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-khaki-700 underline">mapbox.com</a>.
                </p>
                <form onSubmit={handleTokenSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="mapboxToken" className="block text-sm font-medium text-gray-700 mb-1">
                      Token public Mapbox
                    </label>
                    <input
                      type="text"
                      id="mapboxToken"
                      name="mapboxToken"
                      placeholder="pk.eyJ1Ijoi..."
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-khaki-500 focus:border-khaki-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-khaki-700 text-white py-2 px-4 rounded-md hover:bg-khaki-800 transition-colors focus:outline-none focus:ring-2 focus:ring-khaki-500 focus:ring-offset-2"
                  >
                    Afficher la carte
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="w-full h-full" />
          )}
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
