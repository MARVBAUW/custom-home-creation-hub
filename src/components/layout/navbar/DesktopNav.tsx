
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavItem } from './types';

interface DesktopNavProps {
  navItems: NavItem[];
  toggleDrawer?: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const location = useLocation();
  
  // Add Blog to nav items if not already there
  const updatedNavItems = [...navItems];
  if (!updatedNavItems.some(item => item.href === '/blog')) {
    // Find the index of the "Équipe" item or fallback to before the last item
    const equipIndex = updatedNavItems.findIndex(item => item.href === '/equipe-maitrise-oeuvre');
    const insertIndex = equipIndex !== -1 ? equipIndex + 1 : updatedNavItems.length - 1;
    
    // Insert the Blog item at the appropriate position
    updatedNavItems.splice(insertIndex, 0, {
      label: 'Blog',
      href: '/blog'
    });
  }
  
  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {updatedNavItems.map((item, index) => {
        const isActive = location.pathname === item.href;
        
        return (
          <div key={index} className="relative">
            <Link 
              to={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
