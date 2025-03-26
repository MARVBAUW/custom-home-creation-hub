
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Building, Construction, Wrench, Settings, Plus, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';

const subLinks = [
  { id: 'overview', name: 'Aperçu', icon: <Info className="h-4 w-4 mr-2" /> },
  { id: 'construction', name: 'Construction sur mesure', icon: <Building className="h-4 w-4 mr-2" /> },
  { id: 'renovation', name: 'Rénovation énergétique', icon: <Wrench className="h-4 w-4 mr-2" /> },
  { id: 'extension', name: 'Extension & agrandissement', icon: <Plus className="h-4 w-4 mr-2" /> },
  { id: 'optimisation', name: 'Optimisation d\'espace', icon: <Settings className="h-4 w-4 mr-2" /> },
  { id: 'design', name: 'Design d\'espace', icon: <Construction className="h-4 w-4 mr-2" /> },
];

const PrestationsSubNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Extraire le hash de l'URL et définir l'onglet actif au chargement et lors du changement d'URL
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    setActiveTab(hash || 'overview');
  }, [location]);

  // Gérer le changement d'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/prestations-maitre-oeuvre#${value}`);
    
    // Faire défiler vers la section avec un comportement fluide
    const element = document.getElementById(value);
    if (element) {
      // Ajouter un petit délai pour s'assurer que le DOM est mis à jour
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="sticky top-20 z-30 w-full bg-gradient-to-r from-stone-50 to-white dark:from-stone-900 dark:to-stone-800 shadow-md border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-screen-xl mx-auto px-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="h-12 p-1 rounded-md bg-stone-100/50 dark:bg-stone-800/50 w-full flex justify-start overflow-x-auto">
            {subLinks.map((link) => (
              <TabsTrigger 
                key={link.id} 
                value={link.id}
                className={cn(
                  "flex items-center whitespace-nowrap px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700 data-[state=active]:text-progineer-dark dark:data-[state=active]:text-white transition-all",
                  activeTab === link.id 
                    ? "text-progineer-dark dark:text-white font-medium shadow-sm" 
                    : "text-stone-600 dark:text-stone-300 hover:text-progineer-dark dark:hover:text-white"
                )}
              >
                {link.icon}
                {link.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default PrestationsSubNav;
