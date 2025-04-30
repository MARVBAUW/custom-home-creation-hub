
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from './types';
import IconLogo from '@/components/common/logos/IconLogo';

interface MobileNavProps {
  navItems: NavItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, open, setOpen }) => {
  const location = useLocation();
  
  // Add Blog to nav items if not already there
  const updatedNavItems = [...navItems];
  if (!updatedNavItems.some(item => item.href === '/blog')) {
    // Find the index of the "Équipe" item or fallback to before the last item
    const equipIndex = updatedNavItems.findIndex(item => item.href === '/equipe-maitrise-oeuvre');
    const insertIndex = equipIndex !== -1 ? equipIndex + 1 : updatedNavItems.length - 1;
    
    // Insert the Blog item at the appropriate position
    updatedNavItems.splice(insertIndex, 0, {
      label: 'Blog',
      href: '/blog'
    });
  }
  
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
            <IconLogo width={40} height={40} />
            <span className="ml-2 text-xl font-bold">Progineer</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-3">
          {updatedNavItems.map((item, index) => {
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
