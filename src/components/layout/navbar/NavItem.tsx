
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { NavLink } from './types';

interface NavItemProps {
  item: NavLink;
  isActive: boolean;
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const NavItem = ({ item, isActive, openDropdown, toggleDropdown }: NavItemProps) => {
  return (
    <li className="relative">
      {item.subLinks ? (
        <div className="relative">
          <button
            onClick={() => toggleDropdown(item.name)}
            className={cn(
              "flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              isActive 
                ? "text-khaki-800 bg-khaki-100/50" 
                : "text-stone-700 hover:text-khaki-800 hover:bg-stone-50/50",
            )}
          >
            {item.name}
            <ChevronDown className={cn(
              "ml-0.5 h-4 w-4 transition-transform",
              openDropdown === item.name ? "rotate-180" : ""
            )} />
          </button>
          {openDropdown === item.name && (
            <div className="absolute left-0 top-full mt-1 w-64 rounded-md border border-stone-200/60 bg-white shadow-lg z-50">
              <ul className="py-1.5">
                {item.subLinks.map((subLink) => (
                  <li key={subLink.name}>
                    <Link
                      to={subLink.path}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-khaki-50/70 hover:text-khaki-800"
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
            "block px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
            isActive 
              ? "text-khaki-800 bg-khaki-100/50" 
              : "text-stone-700 hover:text-khaki-800 hover:bg-stone-50/50",
          )}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
};

export default NavItem;
