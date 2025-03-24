
import React from 'react';
import { Phone } from 'lucide-react';
import Button from '@/components/common/Button';
import NavItem from './NavItem';
import { NavLink } from './types';
import { useLocation } from 'react-router-dom';

interface DesktopNavProps {
  navLinks: NavLink[];
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const DesktopNav = ({ navLinks, openDropdown, toggleDropdown }: DesktopNavProps) => {
  const location = useLocation();

  const isActive = (item: NavLink) => {
    if (location.pathname === item.path) return true;
    
    if (item.subLinks) {
      // For items with sublinks, check if any sublink path matches current location
      return item.subLinks.some(subLink => {
        const [path, hash] = subLink.path.split('#');
        return location.pathname === path && (!hash || location.hash === `#${hash}`);
      });
    }
    
    return false;
  };

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <ul className="flex items-center space-x-3">
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

      {/* Contact Info - Desktop */}
      <div className="flex items-center space-x-3">
        <a href="tel:+33783762156" className="flex items-center text-xs text-gray-600 hover:text-khaki-800">
          <Phone className="h-3 w-3 mr-1" />
          <span>+33 7 83 76 21 56</span>
        </a>
        <Button href="/estimation" size="sm">Estimer mon projet</Button>
      </div>
    </div>
  );
};

export default DesktopNav;
