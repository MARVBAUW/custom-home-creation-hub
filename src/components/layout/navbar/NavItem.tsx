
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { NavLink } from './types';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  item: NavLink;
  isActive: boolean;
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const NavItem = ({ item, isActive, openDropdown, toggleDropdown }: NavItemProps) => {
  if (item.subLinks) {
    return (
      <li className="relative">
        <DropdownMenu open={openDropdown === item.name} onOpenChange={() => toggleDropdown(item.name)}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center px-2 py-1 text-[0.85rem] font-medium rounded-md transition-colors whitespace-nowrap",
                isActive 
                  ? "text-khaki-800 bg-khaki-100/50" 
                  : "text-stone-700 hover:text-khaki-800 hover:bg-stone-50/50",
              )}
            >
              {item.name}
              <ChevronDown className={cn(
                "ml-0.5 h-3.5 w-3.5 transition-transform",
                openDropdown === item.name ? "rotate-180" : ""
              )} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-60 rounded-md border border-stone-200/60 bg-white shadow-lg z-50 mt-1"
          >
            {item.subLinks.map((subLink) => (
              <DropdownMenuItem key={subLink.name} asChild>
                <Link
                  to={subLink.path}
                  className="block px-4 py-2 text-sm text-stone-700 hover:bg-khaki-50/70 hover:text-khaki-800 cursor-pointer"
                >
                  {subLink.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    );
  }
  
  return (
    <li className="relative">
      <Link
        to={item.path}
        className={cn(
          "block px-2 py-1 text-[0.85rem] font-medium rounded-md transition-colors whitespace-nowrap",
          isActive 
            ? "text-khaki-800 bg-khaki-100/50" 
            : "text-stone-700 hover:text-khaki-800 hover:bg-stone-50/50",
        )}
      >
        {item.name}
      </Link>
    </li>
  );
};

export default NavItem;
