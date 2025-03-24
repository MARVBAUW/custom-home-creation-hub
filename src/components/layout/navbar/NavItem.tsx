
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
              "flex items-center px-2 py-1 text-sm font-medium rounded hover:text-khaki-800 transition-colors",
              isActive ? "text-khaki-800" : "text-gray-700",
            )}
          >
            {item.name}
            <ChevronDown className={cn(
              "ml-1 h-4 w-4 transition-transform",
              openDropdown === item.name ? "rotate-180" : ""
            )} />
          </button>
          {openDropdown === item.name && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-md z-50">
              <ul className="py-1">
                {item.subLinks.map((subLink) => (
                  <li key={subLink.name}>
                    <Link
                      to={subLink.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-khaki-50"
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
            "block px-2 py-1 text-sm font-medium rounded hover:text-khaki-800 transition-colors",
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
