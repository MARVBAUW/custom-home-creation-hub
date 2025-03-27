
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
  Calculator,
  FileSpreadsheet,
  ReceiptText,
  Hammer
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
  
  const navItems = [
    { 
      href: '/workspace/client-area', 
      icon: <Home className="w-5 h-5" />, 
      label: 'Tableau de bord' 
    },
    { 
      href: '/workspace/client-area/projects', 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Mes projets' 
    },
    { 
      href: '/workspace/client-area/messages', 
      icon: <MessageSquare className="w-5 h-5" />, 
      label: 'Messages' 
    },
    { 
      href: '/workspace/client-area/budget', 
      icon: <CreditCard className="w-5 h-5" />, 
      label: 'Budget & Paiements' 
    },
    { 
      href: '/workspace/client-area/planning', 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Planning' 
    },
    { 
      href: '/workspace/client-area/profile', 
      icon: <User className="w-5 h-5" />, 
      label: 'Mon profil' 
    },
  ];

  // Ajouter les éléments de navigation pour les outils
  const outilsNavItems = [
    { 
      href: '/workspace/client-area/estimation-travaux', 
      icon: <Calculator className="w-5 h-5" />, 
      label: 'Estimation travaux' 
    },
    { 
      href: '/workspace/client-area/devis-honoraires', 
      icon: <ReceiptText className="w-5 h-5" />, 
      label: 'Devis honoraires' 
    },
  ];

  // Ajouter les éléments de navigation administrateur si l'utilisateur est administrateur ou en mode admin
  const adminNavItems = (isAdmin || isAdminMode) ? [
    { 
      href: '/workspace/client-area/admin', 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Admin Dashboard' 
    },
    { 
      href: '/workspace/client-area/admin/clients', 
      icon: <Users className="w-5 h-5" />, 
      label: 'Gestion Clients' 
    },
    { 
      href: '/workspace/client-area/admin/projects', 
      icon: <FileSpreadsheet className="w-5 h-5" />, 
      label: 'Gestion Projets' 
    },
  ] : [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <Link to="/" className="flex items-center py-4 px-4 mb-4">
          <span className="text-xl font-semibold text-khaki-800">Progineer</span>
          <span className="ml-1 text-sm text-gray-500">Espace client</span>
        </Link>
        
        <nav className="space-y-1 px-3">
          {/* Éléments de navigation principaux */}
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
          
          {/* Séparateur pour les outils */}
          <div className="pt-4 pb-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Outils
            </h3>
          </div>
          
          {/* Éléments de navigation pour les outils */}
          <div className="mb-6">
            {outilsNavItems.map(item => (
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
          
          {/* Éléments de navigation administrateur (si applicable) */}
          {adminNavItems.length > 0 && (
            <>
              <div className="pt-4 pb-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Administration
                </h3>
              </div>
              <div>
                {adminNavItems.map(item => (
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
            </>
          )}
        </nav>
      </div>
      
      {/* Section utilisateur et déconnexion */}
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
