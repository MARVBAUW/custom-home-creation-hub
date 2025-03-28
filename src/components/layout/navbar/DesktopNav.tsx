
import React from 'react';
import { Phone } from 'lucide-react';
import Button from '@/components/common/Button';
import NavItem from './NavItem';
import { NavLink } from './types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/auth/LogoutButton';

interface DesktopNavProps {
  navLinks: NavLink[];
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const DesktopNav = ({ navLinks, openDropdown, toggleDropdown }: DesktopNavProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (item: NavLink) => {
    if (location.pathname === item.path) return true;
    
    if (item.subLinks) {
      // Pour les éléments avec sous-liens, vérifier si un sous-lien correspond à la location actuelle
      return item.subLinks.some(subLink => {
        const [path, hash] = subLink.path.split('#');
        return location.pathname === path && (!hash || location.hash === `#${hash}`);
      });
    }
    
    return false;
  };

  return (
    <div className="hidden md:flex items-center justify-between w-full px-1">
      <ul className="flex items-center space-x-1 flex-shrink-0">
        {navLinks.map((item) => (
          <NavItem 
            key={item.name} 
            item={item}
            isActive={isActive(item)}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
          />
        ))}
      </ul>

      {/* Contact Info & CTAs - Desktop */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <a href="tel:+33783762156" className="flex items-center text-xs text-stone-600 hover:text-khaki-800 whitespace-nowrap">
          <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>+33 7 83 76 21 56</span>
        </a>
        
        {user ? (
          <div className="flex items-center space-x-2">
            <Button href="/workspace/client-area" size="sm" className="bg-khaki-600 hover:bg-khaki-700 text-white !text-white whitespace-nowrap">
              Mon espace
            </Button>
            <LogoutButton variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600" />
          </div>
        ) : (
          <>
            <Button href="/estimation" size="sm" className="bg-khaki-600 hover:bg-khaki-700 text-white !text-white whitespace-nowrap">
              Estimer mon projet
            </Button>
            <Button href="/contact" size="sm" variant="outline" className="border-khaki-200 hover:bg-khaki-50 text-stone-700 whitespace-nowrap">
              Contact
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
