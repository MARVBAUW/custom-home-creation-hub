
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

const MobileNav = ({ isOpen, navLinks }: MobileNavProps) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-white/98 backdrop-blur-md overflow-auto">
      <Container className="flex flex-col h-[calc(100vh-4rem)] py-2">
        <ul className="space-y-0.5 overflow-y-auto">
          {navLinks.map((item) => (
            <React.Fragment key={item.name}>
              {/* Main menu item */}
              <li className="border-b border-stone-200">
                <Link
                  to={item.path}
                  className="block py-1.5 text-xs font-medium text-stone-800 hover:text-khaki-800"
                >
                  {item.name}
                </Link>
              </li>
              
              {/* Sub-links if they exist */}
              {item.subLinks && (
                <li className="pl-3 mb-1">
                  <ul className="space-y-0.5 border-l border-stone-200 pl-2">
                    {item.subLinks.map((subLink) => (
                      <li key={subLink.name}>
                        <Link
                          to={subLink.path}
                          className="block py-1 text-xs text-stone-600 hover:text-khaki-800"
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
        
        <div className="mt-1 space-y-1.5 pt-1">
          <div className="flex flex-col space-y-0.5">
            <a href="tel:+33783762156" className="flex items-center py-1 text-stone-700">
              <Phone className="h-2.5 w-2.5 mr-1 text-khaki-600" />
              <span className="text-xs">+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-1 text-stone-700">
              <Mail className="h-2.5 w-2.5 mr-1 text-khaki-600" />
              <span className="text-xs">progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button href="/contact" className="w-full justify-center py-1 text-xs">
              Demander un devis
            </Button>
            <Button href="/estimation" variant="outline" className="w-full justify-center py-1 text-xs">
              Estimer mon projet
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
