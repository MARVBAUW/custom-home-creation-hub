
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, Phone, Mail } from 'lucide-react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { NavLink } from './types';

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  openDropdown: string | null;
  toggleDropdown: (name: string | null) => void;
}

const MobileNav = ({ isOpen, navLinks, openDropdown, toggleDropdown }: MobileNavProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-40 bg-white mt-16 overflow-auto">
      <Container className="flex flex-col h-full pt-4 pb-20">
        <ul className="space-y-1">
          {navLinks.map((item) => (
            <li key={item.name} className="border-b border-stone-100 pb-2">
              {item.subLinks ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name === openDropdown ? null : item.name)}
                    className="flex items-center justify-between w-full py-2 text-stone-800 font-medium"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform text-stone-500",
                      openDropdown === item.name ? "rotate-180" : ""
                    )} />
                  </button>
                  {openDropdown === item.name && (
                    <ul className="ml-4 mt-2 space-y-2 mb-2">
                      {item.subLinks.map((subLink) => (
                        <li key={subLink.name}>
                          <Link
                            to={subLink.path}
                            className="block py-2 text-stone-700 hover:text-khaki-800"
                            onClick={() => toggleDropdown(null)}
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
                  className="block py-2 text-stone-800 font-medium hover:text-khaki-800"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto space-y-6 pt-6">
          <div className="flex flex-col space-y-4">
            <a href="tel:+33783762156" className="flex items-center py-2 text-stone-700">
              <Phone className="h-5 w-5 mr-2 text-khaki-600" />
              <span>+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-2 text-stone-700">
              <Mail className="h-5 w-5 mr-2 text-khaki-600" />
              <span>progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Button href="/contact" className="w-full justify-center">
              Contact
            </Button>
            <Button href="/estimation" variant="outline" className="w-full justify-center">
              Estimer mon projet
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
