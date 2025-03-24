
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

interface NavLink {
  name: string;
  path: string;
  subLinks?: { name: string; path: string }[];
}

const navLinks: NavLink[] = [
  { name: 'Accueil', path: '/' },
  { name: 'Estimer mon projet', path: '/estimation' },
  { 
    name: 'Nos prestations', 
    path: '/prestations-maitre-oeuvre',
    subLinks: [
      { name: 'Construction sur mesure', path: '/prestations-maitre-oeuvre#construction' },
      { name: 'Rénovation énergétique', path: '/prestations-maitre-oeuvre#renovation' },
      { name: 'Extension & agrandissement', path: '/prestations-maitre-oeuvre#extension' },
      { name: 'Optimisation d\'espace', path: '/prestations-maitre-oeuvre#optimisation' },
      { name: 'Design d\'espace', path: '/prestations-maitre-oeuvre#design' },
    ]
  },
  { name: 'Nos réalisations', path: '/realisations-architecte-maison' },
  { name: 'Notre équipe', path: '/equipe-maitrise-oeuvre' },
  { name: 'Contact', path: '/contact' },
];

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

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const NavItem = ({ item }: { item: NavLink }) => {
    const isActive = location.pathname === item.path ||
      (item.subLinks && item.subLinks.some(subLink => location.pathname === subLink.path));
    
    return (
      <li className="relative">
        {item.subLinks ? (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(item.name)}
              className={cn(
                "flex items-center px-2 py-1 text-sm font-medium rounded hover:text-khaki-800 transition-colors",
                isActive ? "text-khaki-800" : "text-gray-700",
              )}
            >
              {item.name}
              <ChevronDown className={cn(
                "ml-1 h-4 w-4 transition-transform",
                openDropdown === item.name ? "rotate-180" : ""
              )} />
            </button>
            {openDropdown === item.name && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-md z-50">
                <ul className="py-1">
                  {item.subLinks.map((subLink) => (
                    <li key={subLink.name}>
                      <Link
                        to={subLink.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-khaki-50"
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.path}
            className={cn(
              "block px-2 py-1 text-sm font-medium rounded hover:text-khaki-800 transition-colors",
              isActive ? "text-khaki-800" : "text-gray-700",
            )}
          >
            {item.name}
          </Link>
        )}
      </li>
    );
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm",
        isScrolled ? "bg-white/90 shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-serif font-bold text-khaki-800">PROGINEER</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>

          {/* Contact Info - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+33783762156" className="flex items-center text-sm text-gray-600 hover:text-khaki-800">
              <Phone className="h-4 w-4 mr-1" />
              <span>+33 7 83 76 21 56</span>
            </a>
            <Button href="/estimation" size="sm">Estimer mon projet</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white mt-16">
          <Container className="flex flex-col h-full pt-4 pb-20">
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.name} className="border-b border-gray-100 pb-2">
                  {item.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full py-2 text-gray-700"
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "h-5 w-5 transition-transform",
                          openDropdown === item.name ? "rotate-180" : ""
                        )} />
                      </button>
                      {openDropdown === item.name && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {item.subLinks.map((subLink) => (
                            <li key={subLink.name}>
                              <Link
                                to={subLink.path}
                                className="block py-2 text-sm text-gray-600 hover:text-khaki-800"
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="block py-2 text-gray-700 hover:text-khaki-800"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="mt-auto space-y-4">
              <div className="flex flex-col space-y-2">
                <a href="tel:+33783762156" className="flex items-center py-2 text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+33 7 83 76 21 56</span>
                </a>
                <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-2 text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>progineer.moe@gmail.com</span>
                </a>
              </div>
              <Button href="/estimation" className="w-full">Estimer mon projet</Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
