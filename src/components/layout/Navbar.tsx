
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Container from '@/components/common/Container';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { navLinks } from './navbar/types';
import ThemeToggle from '@/components/theme/ThemeToggle';
import Logo from '@/components/common/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleDropdown = (name: string | null) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm shadow-md",
        isScrolled || isOpen
          ? "bg-white/95 dark:bg-gray-900/95 py-1.5 border-b border-stone-200/80 dark:border-gray-700/50" 
          : "bg-white/80 py-2 border-b border-stone-200/50"
      )}
    >
      <Container size="lg" className="px-4">
        <nav className="flex items-center justify-between w-full">
          {/* Logo - Home Button */}
          <div className="flex-shrink-0 relative z-50 mr-4">
            <Logo 
              variant="metallic" 
              size="sm" 
              asLink={true}
            />
          </div>

          {/* Desktop Navigation & Controls */}
          <div className="flex-grow flex items-center justify-between">
            <DesktopNav 
              navLinks={navLinks} 
              openDropdown={openDropdown} 
              toggleDropdown={toggleDropdown} 
            />
            
            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center gap-2 relative z-50 md:ml-2">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-1.5 rounded-md text-stone-600 dark:text-gray-300 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100/50 dark:hover:bg-gray-800/50"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isOpen} 
        navLinks={navLinks} 
        openDropdown={openDropdown} 
        toggleDropdown={toggleDropdown} 
      />
    </header>
  );
};

export default Navbar;
