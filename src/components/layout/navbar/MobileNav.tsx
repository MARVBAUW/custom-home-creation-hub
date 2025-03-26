
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, Phone, Mail } from 'lucide-react';
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
    <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-md mt-16 overflow-auto">
      <Container className="flex flex-col h-full pt-5 pb-24">
        <ul className="space-y-3">
          {navLinks.map((item) => (
            <li key={item.name} className="border-b border-stone-200 pb-3">
              {item.subLinks ? (
                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown(item.name === openDropdown ? null : item.name)}
                    className="flex items-center justify-between w-full py-2.5 text-stone-800 text-base font-medium"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform text-stone-500",
                      openDropdown === item.name ? "rotate-180" : ""
                    )} />
                  </button>
                  {openDropdown === item.name && (
                    <ul className="ml-4 mt-2 space-y-2 mb-3 bg-khaki-50/80 rounded-md p-3">
                      {item.subLinks.map((subLink) => (
                        <li key={subLink.name}>
                          <Link
                            to={subLink.path}
                            className="block py-2.5 text-sm text-stone-700 hover:text-khaki-800"
                            onClick={() => toggleDropdown(null)}
                          >
                            {subLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="block py-2.5 text-base font-medium text-stone-800 hover:text-khaki-800"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto space-y-8 pt-8">
          <div className="flex flex-col space-y-4">
            <a href="tel:+33783762156" className="flex items-center py-2 text-stone-700">
              <Phone className="h-5 w-5 mr-3 text-khaki-600" />
              <span className="text-base">+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-2 text-stone-700">
              <Mail className="h-5 w-5 mr-3 text-khaki-600" />
              <span className="text-base">progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Button href="/contact" className="w-full justify-center py-3 text-base">
              Contact
            </Button>
            <Button href="/workspace" variant="outline" className="w-full justify-center py-3 text-base">
              Espace ressources
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
