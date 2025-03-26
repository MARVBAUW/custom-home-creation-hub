
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, FileText, Calendar, MessageSquare, Users, ChartGantt, 
  Image, DollarSign, ClipboardList, Building, Settings, FileDigit
} from 'lucide-react';

interface ClientNavigationProps {
  isAdminMode?: boolean;
}

const ClientNavigation = ({ isAdminMode = false }: ClientNavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const linkClass = (path: string) => {
    return isActive(path) 
      ? "flex items-center p-3 rounded-md bg-khaki-100 text-khaki-800 dark:bg-khaki-800/50 dark:text-khaki-200 font-medium" 
      : "flex items-center p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50";
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <h2 className="font-medium text-gray-800 dark:text-gray-100">{isAdminMode ? 'Administration' : 'Navigation'}</h2>
      </div>
      <div className="p-2 space-y-1">
        <Link to="/workspace/client-area" className={linkClass("/workspace/client-area")}>
          <User className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Tableau de bord</span>
        </Link>
        
        <Link to="/workspace/client-area/documents" className={linkClass("/workspace/client-area/documents")}>
          <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Documents</span>
        </Link>
        
        <Link to="/workspace/client-area/projects" className={linkClass("/workspace/client-area/projects")}>
          <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Suivi de projet</span>
        </Link>
        
        <Link to="/workspace/client-area/messages" className={linkClass("/workspace/client-area/messages")}>
          <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Messages</span>
        </Link>
        
        <Link to="/workspace/client-area/budget" className={linkClass("/workspace/client-area/budget")}>
          <DollarSign className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Suivi budgétaire</span>
        </Link>
        
        {/* Options supplémentaires en mode admin */}
        {isAdminMode && (
          <>
            <div className="my-2 border-t border-gray-200 dark:border-gray-600"></div>
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Administration</div>
            
            <Link to="/workspace/client-area/admin/clients" className={linkClass("/workspace/client-area/admin/clients")}>
              <Users className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Gestion des clients</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/projects" className={linkClass("/workspace/client-area/admin/projects")}>
              <ClipboardList className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Création de projet</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/planning" className={linkClass("/workspace/client-area/admin/planning")}>
              <ChartGantt className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Planification Gantt</span>
            </Link>

            <Link to="/workspace/client-area/admin/projects-overview" className={linkClass("/workspace/client-area/admin/projects-overview")}>
              <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Vue d'ensemble projets</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/gallery" className={linkClass("/workspace/client-area/admin/gallery")}>
              <Image className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Galerie photos</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/contractors" className={linkClass("/workspace/client-area/admin/contractors")}>
              <Building className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Corps de métiers</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/budget" className={linkClass("/workspace/client-area/admin/budget")}>
              <DollarSign className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Gestion budgétaire</span>
            </Link>

            <Link to="/workspace/client-area/admin/quotes" className={linkClass("/workspace/client-area/admin/quotes")}>
              <FileDigit className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Génération de devis</span>
            </Link>
            
            <Link to="/workspace/client-area/admin/settings" className={linkClass("/workspace/client-area/admin/settings")}>
              <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>Paramètres</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientNavigation;
