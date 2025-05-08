
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavLink } from './types';
import { Button } from "@/components/ui/button";
import { FileText, Phone, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  navItems: NavLink[];
  openDropdown?: string | null;
  toggleDropdown?: (name: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems, openDropdown, toggleDropdown }) => {
  const location = useLocation();
  
  return (
    <div className="hidden lg:flex items-center justify-between w-full">
      {/* Main Navigation */}
      <nav className="flex items-center space-x-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          if (item.subLinks && item.subLinks.length > 0) {
            return (
              <div key={index} className="relative">
                <DropdownMenu open={openDropdown === item.label} onOpenChange={() => toggleDropdown && toggleDropdown(item.label)}>
                  <DropdownMenuTrigger className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative flex items-center ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-100 hover:text-white hover:bg-white/10'
                  }`}>
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-white rounded-md shadow-lg">
                    {item.subLinks.map((subLink, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link to={subLink.href} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }
          
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
      
      {/* Téléphone et CTA Buttons */}
      <div className="flex items-center gap-3">
        <a href="tel:0783762156" className="flex items-center text-white hover:text-khaki-200 transition-colors">
          <Phone className="h-4 w-4 mr-1" />
          <span className="font-medium">07 83 76 21 56</span>
        </a>
        
        <Link to="/estimation">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Estimer mon projet
          </Button>
        </Link>
        <Link to="/contact">
          <Button className="bg-khaki-500 hover:bg-khaki-600 text-white">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
