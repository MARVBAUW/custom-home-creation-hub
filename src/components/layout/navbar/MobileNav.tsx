
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Phone, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from './types';
import IconLogo from '@/components/common/logos/IconLogo';
import { LogoSize, getSizeClasses } from '@/components/common/logos/LogoConstants';

interface MobileNavProps {
  navItems: NavLink[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, open, setOpen }) => {
  const location = useLocation();
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] max-w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center mt-4">
            <IconLogo 
              size="md" 
              getSizeClasses={() => getSizeClasses('md', 'icon')} 
            />
            <span className="ml-2 text-xl font-bold">Progineer</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-3">
          {/* Phone number */}
          <a href="tel:0783762156" className="flex items-center justify-center py-2 mb-2 text-khaki-700">
            <Phone className="h-4 w-4 mr-2" />
            <span className="font-medium">07 83 76 21 56</span>
          </a>
          
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={index}
                to={item.href}
                className="relative"
                onClick={() => setOpen(false)}
              >
                <div
                  className={`px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-khaki-700 bg-khaki-50'
                      : 'text-gray-700 hover:text-khaki-700 hover:bg-khaki-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-khaki-700 rounded-full"
                      layoutId="navbar-mobile-indicator"
                    />
                  )}
                </div>
              </Link>
            );
          })}

          {/* CTA Buttons */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">Contact</h3>
            <div className="space-y-2">
              <Link to="/estimation" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Estimer mon projet
                </Button>
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full justify-start bg-khaki-600 hover:bg-khaki-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
