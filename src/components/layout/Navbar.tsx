
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Container from '@/components/common/Container';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { navLinks } from './navbar/types';
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

  // Close mobile menu when route changes
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
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm",
        isScrolled 
          ? "bg-white/30 py-1.5 border-b border-stone-200/30" 
          : "bg-transparent py-2"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-6">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-md text-stone-600 hover:text-stone-800 hover:bg-stone-100/50"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
