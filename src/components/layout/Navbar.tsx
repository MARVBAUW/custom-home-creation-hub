
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Container from '@/components/common/Container';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { navLinks } from './navbar/types';
import Logo from '@/components/common/Logo';
import ThemeToggle from '@/components/theme/ThemeToggle';

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
    // Vérifier l'état initial
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header 
      className={cn(
        "fixed top-[6rem] w-full z-50 transition-all duration-300 backdrop-blur-sm", // Change top positioning to top-[6rem]
        isScrolled || isOpen
          ? "bg-white/95 dark:bg-gray-900/95 py-2 border-b border-stone-200/50 dark:border-gray-700/50" 
          : "bg-transparent py-3"
      )}
    >
      <Container size="lg">
        <nav className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 relative z-50">
            <Logo 
              variant={isScrolled || location.pathname !== '/' ? 'metallic' : 'metallic'} 
              size="md" 
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav 
            navLinks={navLinks} 
            openDropdown={openDropdown} 
            toggleDropdown={toggleDropdown} 
          />

          {/* Theme Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-stone-600 dark:text-gray-300 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100/50 dark:hover:bg-gray-800/50"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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

