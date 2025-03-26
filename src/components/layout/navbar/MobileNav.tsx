
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Phone, Mail } from 'lucide-react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { NavLink } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  openDropdown: string | null;
  toggleDropdown: (name: string | null) => void;
}

const MobileNav = ({ isOpen, navLinks, openDropdown, toggleDropdown }: MobileNavProps) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-14 left-0 right-0 bottom-0 z-40 bg-white/98 backdrop-blur-md overflow-auto">
      <Container className="flex flex-col h-[calc(100vh-3.5rem)] py-2 px-4">
        <ul className="space-y-0.5 overflow-y-auto flex-1">
          {navLinks.map((item) => (
            <React.Fragment key={item.name}>
              {/* Main menu item */}
              <li className="border-b border-stone-200">
                <Link
                  to={item.path}
                  className="block py-2 px-2 text-sm font-medium text-stone-800 hover:text-khaki-800"
                >
                  {item.name}
                </Link>
              </li>
              
              {/* Sub-links if they exist */}
              {item.subLinks && (
                <li className="pl-3 mb-2">
                  <ul className="space-y-1 border-l border-stone-200 pl-2">
                    {item.subLinks.map((subLink) => (
                      <li key={subLink.name}>
                        <Link
                          to={subLink.path}
                          className="block py-1.5 px-2 text-sm text-stone-600 hover:text-khaki-800"
                        >
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
        
        <div className="mt-4 space-y-4 pt-2 border-t border-stone-200">
          <div className="flex flex-col space-y-2">
            <a href="tel:+33783762156" className="flex items-center py-1.5 text-stone-700">
              <Phone className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-1.5 text-stone-700">
              <Mail className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Button href="/contact" className="w-full justify-center py-1.5 text-sm">
              Demander un devis
            </Button>
            <Button href="/estimation" variant="outline" className="w-full justify-center py-1.5 text-sm">
              Estimer mon projet
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
