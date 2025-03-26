
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
      <Container className="flex flex-col h-[90vh] pt-4 pb-6">
        <ul className="space-y-3 overflow-y-auto max-h-[70vh]">
          {navLinks.map((item) => (
            <li key={item.name} className="border-b border-stone-200 pb-3">
              {item.subLinks ? (
                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown(item.name === openDropdown ? null : item.name)}
                    className="flex items-center justify-between w-full py-4 text-stone-800 text-sm font-medium"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform text-stone-500",
                      openDropdown === item.name ? "rotate-180" : ""
                    )} />
                  </button>
                  {openDropdown === item.name && (
                    <ul className="ml-3 my-2 space-y-2 bg-khaki-50/80 rounded-md p-3">
                      {item.subLinks.map((subLink) => (
                        <li key={subLink.name}>
                          <Link
                            to={subLink.path}
                            className="block py-3 px-3 text-xs text-stone-700 hover:text-khaki-800 hover:bg-khaki-50 rounded"
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
                  className="block py-4 text-sm font-medium text-stone-800 hover:text-khaki-800"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="mt-4 space-y-4 pt-3">
          <div className="flex flex-col space-y-3">
            <a href="tel:+33783762156" className="flex items-center py-3 text-stone-700">
              <Phone className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-3 text-stone-700">
              <Mail className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button href="/contact" className="w-full justify-center py-3 text-sm">
              Contact
            </Button>
            <Button href="/workspace" variant="outline" className="w-full justify-center py-3 text-sm">
              Espace
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
