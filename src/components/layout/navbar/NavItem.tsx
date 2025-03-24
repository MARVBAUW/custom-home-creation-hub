
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
              "flex items-center px-1 py-0.5 text-xs font-medium rounded hover:text-khaki-800 transition-colors whitespace-nowrap",
              isActive ? "text-khaki-800" : "text-gray-700",
            )}
          >
            {item.name}
            <ChevronDown className={cn(
              "ml-0.5 h-3 w-3 transition-transform",
              openDropdown === item.name ? "rotate-180" : ""
            )} />
          </button>
          {openDropdown === item.name && (
            <div className="absolute left-0 top-full mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-md z-50">
              <ul className="py-1">
                {item.subLinks.map((subLink) => (
                  <li key={subLink.name}>
                    <Link
                      to={subLink.path}
                      className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-khaki-50"
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
            "block px-1 py-0.5 text-xs font-medium rounded hover:text-khaki-800 transition-colors whitespace-nowrap",
            isActive ? "text-khaki-800" : "text-gray-700",
          )}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
};

export default NavItem;
