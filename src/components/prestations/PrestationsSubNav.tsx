
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '@/components/common/Container';
import { cn } from '@/lib/utils';

interface PrestationsSubNavProps {
  activeService?: string;
}

const services = [
  {
    id: 'construction-neuve',
    name: 'Construction neuve',
    path: '/prestations-maitre-oeuvre/construction-neuve',
    icon: '🏡'
  },
  {
    id: 'renovation',
    name: 'Rénovation',
    path: '/prestations-maitre-oeuvre/renovation',
    icon: '🔨'
  },
  {
    id: 'extension',
    name: 'Extension',
    path: '/prestations-maitre-oeuvre/extension',
    icon: '🏗️'
  },
  {
    id: 'optimisation-espace',
    name: 'Optimisation d\'espace',
    path: '/prestations-maitre-oeuvre/optimisation-espace',
    icon: '📐'
  },
  {
    id: 'design-interieur',
    name: 'Design d\'intérieur',
    path: '/prestations-maitre-oeuvre/design-interieur',
    icon: '🎨'
  }
];

const PrestationsSubNav: React.FC<PrestationsSubNavProps> = ({ activeService }) => {
  const location = useLocation();
  
  return (
    <div className="sticky top-16 z-20 bg-white border-b border-gray-200">
      <Container size="lg">
        <div className="flex items-center justify-between overflow-x-auto py-2 scrollbar-hide">
          <nav className="flex space-x-1 w-full justify-center">
            <Link
              to="/prestations-maitre-oeuvre"
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/prestations-maitre-oeuvre"
                  ? "bg-khaki-100 text-khaki-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              Toutes nos prestations
            </Link>
            
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                  (activeService === service.id || location.pathname === service.path)
                    ? "bg-khaki-100 text-khaki-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span className="mr-2" aria-hidden="true">{service.icon}</span>
                {service.name}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default PrestationsSubNav;
