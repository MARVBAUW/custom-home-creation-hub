
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

  // Extract hash from URL and set active tab on load and URL change
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    setActiveTab(hash || 'overview');
  }, [location]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/prestations-maitre-oeuvre#${value}`);
    
    // Scroll to the section with smooth behavior
    const element = document.getElementById(value);
    if (element) {
      // Add a small delay to ensure the DOM is updated
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="sticky top-20 z-30 w-full bg-gradient-to-r from-stone-50 to-white shadow-sm border-b border-stone-200">
      <div className="max-w-screen-xl mx-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="h-14 p-0 bg-transparent w-full flex justify-start overflow-x-auto no-scrollbar">
            {subLinks.map((link) => (
              <TabsTrigger 
                key={link.id} 
                value={link.id}
                className={cn(
                  "flex items-center whitespace-nowrap px-4 py-3 rounded-none border-b-2 data-[state=active]:border-progineer-gold data-[state=active]:text-progineer-dark border-transparent transition-all hover:bg-stone-100/50",
                  activeTab === link.id 
                    ? "text-progineer-dark font-medium" 
                    : "text-stone-600 hover:text-progineer-dark"
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
