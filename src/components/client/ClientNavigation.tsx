
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Clock, 
  User, 
  MessageSquare, 
  CreditCard, 
  Settings,
  Users,
  FileSpreadsheet,
  ChevronLeft,
  BarChart,
  FileCheck,
  Building,
  Bell,
  Calculator
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/auth/LogoutButton';

interface ClientNavigationProps {
  isAdminMode?: boolean;
}

const ClientNavigation = ({ isAdminMode = false }: ClientNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Vérifier si l'email est un email administrateur
  const isAdmin = user?.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(user.email);
  
  // Navigation items for clients only - simplified for better UX
  const clientNavItems = [
    { 
      href: '/workspace/client-area', 
      icon: <Home className="w-5 h-5" />, 
      label: 'Tableau de bord',
    },
    { 
      href: '/workspace/client-area/projects', 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Mon projet',
    },
    { 
      href: '/workspace/client-area/messages', 
      icon: <MessageSquare className="w-5 h-5" />, 
      label: 'Messages',
    },
    { 
      href: '/workspace/client-area/planning', 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Planning',
    },
    { 
      href: '/workspace/client-area/profile', 
      icon: <User className="w-5 h-5" />, 
      label: 'Mon profil',
    },
    { 
      href: '/workspace/client-area/settings', 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Paramètres',
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    { 
      href: '/workspace/client-area/admin', 
      icon: <BarChart className="w-5 h-5" />, 
      label: 'Dashboard',
    },
    { 
      href: '/workspace/client-area/admin/clients', 
      icon: <Users className="w-5 h-5" />, 
      label: 'Clients',
    },
    { 
      href: '/workspace/client-area/admin/projects', 
      icon: <FileSpreadsheet className="w-5 h-5" />, 
      label: 'Projets',
    },
    { 
      href: '/workspace/client-area/admin/partners', 
      icon: <Building className="w-5 h-5" />, 
      label: 'Partenaires',
    },
    { 
      href: '/workspace/client-area/admin/documents', 
      icon: <FileCheck className="w-5 h-5" />, 
      label: 'Documents',
    },
    { 
      href: '/workspace/client-area/admin/notifications', 
      icon: <Bell className="w-5 h-5" />, 
      label: 'Notifications',
    },
    { 
      href: '/workspace/client-area/admin/settings', 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Paramètres',
    }
  ];

  // Use appropriate navigation items based on user role and mode
  const navItems = isAdminMode && isAdmin ? adminNavItems : clientNavItems;

  // Back button function to return to client area
  const backButton = location.pathname.includes('/admin') && isAdmin && (
    <Link
      to="/workspace/client-area"
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-khaki-800 hover:bg-khaki-100 rounded-md mb-4"
    >
      <ChevronLeft className="w-5 h-5 mr-2" />
      Retour à l'espace client
    </Link>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <Link to="/" className="flex items-center py-4 px-4 mb-4">
          <span className="text-xl font-semibold text-khaki-800">Progineer</span>
          <span className="ml-1 text-sm text-gray-500">Espace {isAdminMode && isAdmin ? 'admin' : 'client'}</span>
        </Link>
        
        {backButton}
        
        <nav className="space-y-1 px-3">
          {/* Navigation elements */}
          <div className="mb-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-khaki-100 hover:text-khaki-800",
                  location.pathname === item.href 
                    ? "bg-khaki-100 text-khaki-800" 
                    : "text-gray-600"
                )}
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      
      {/* User information and logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-khaki-200 flex items-center justify-center text-khaki-800 font-semibold">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 truncate w-40">
              {user?.user_metadata?.full_name || user?.email || 'Utilisateur'}
            </p>
            <p className="text-xs text-gray-500 truncate w-40">
              {user?.email}
            </p>
          </div>
        </div>
        
        <LogoutButton 
          variant="outline"
          size="default"
          className="w-full justify-start text-gray-700 hover:text-red-700 hover:bg-red-50"
        />
      </div>
    </div>
  );
};

export default ClientNavigation;
