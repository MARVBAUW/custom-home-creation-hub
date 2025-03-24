
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Container from '@/components/common/Container';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { navLinks } from './navbar/types';

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
        isScrolled ? "bg-white/90 shadow-sm py-1.5" : "bg-transparent py-3"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-serif font-bold text-khaki-800">PROGINEER</span>
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
            className="md:hidden p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
