import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Phone, Mail } from 'lucide-react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { NavLink } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/auth/LogoutButton';

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  openDropdown: string | null;
  toggleDropdown: (name: string | null) => void;
}

const MobileNav = ({
  isOpen,
  navLinks,
  openDropdown,
  toggleDropdown
}: MobileNavProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-white/98 backdrop-blur-md overflow-auto">
      <Container className="flex flex-col h-[calc(100vh-4rem)] py-6 space-y-4"> {/* Increased space-y-4 to add more vertical spacing */}
        <ul className="space-y-1 overflow-y-auto flex-grow"> {/* Added flex-grow to allow expansion */}
          {navLinks.map(item => (
            <React.Fragment key={item.name}>
              {/* Main menu item */}
              <li className="border-b border-stone-200">
                {item.subLinks ? (
                  <button 
                    onClick={() => toggleDropdown(openDropdown === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full text-base font-medium text-stone-800 hover:text-khaki-800 py-3 px-2"
                  >
                    <span>{item.name}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className="block text-base font-medium text-stone-800 hover:text-khaki-800 py-3 px-2"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
              
              {/* Sub-links if they exist and dropdown is open */}
              {item.subLinks && openDropdown === item.name && (
                <li className="pl-3 mb-3 bg-gray-50 rounded-md">
                  <ul className="space-y-1 border-l border-stone-200 pl-3 py-3">
                    {item.subLinks.map(subLink => (
                      <li key={subLink.name}>
                        <Link 
                          to={subLink.path} 
                          className="block py-2 px-3 text-sm text-stone-600 hover:text-khaki-800 hover:bg-gray-100 rounded-md"
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
        
        <div className="mt-auto space-y-4 pt-4 border-t border-gray-200"> {/* Added mt-auto to push this section to the bottom */}
          <div className="flex flex-col space-y-2">
            <a href="tel:+33783762156" className="flex items-center py-2 text-stone-700">
              <Phone className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">+33 7 83 76 21 56</span>
            </a>
            <a href="mailto:progineer.moe@gmail.com" className="flex items-center py-2 text-stone-700">
              <Mail className="h-4 w-4 mr-2 text-khaki-600" />
              <span className="text-sm">progineer.moe@gmail.com</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user ? (
              <>
                <Button href="/workspace/client-area" className="w-full justify-center py-2 text-sm">
                  Mon espace
                </Button>
                <LogoutButton 
                  variant="outline"
                  size="sm" 
                  className="w-full justify-center py-2 text-sm border-red-200 text-red-600"
                />
              </>
            ) : (
              <>
                <Button href="/contact" className="w-full justify-center py-2 text-sm">
                  Contact
                </Button>
                <Button href="/estimation" variant="outline" className="w-full justify-center py-2 text-sm bg-khaki-600 hover:bg-khaki-700 text-white !text-white">
                  Estimation
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNav;
