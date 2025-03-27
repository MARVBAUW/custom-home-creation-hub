
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, FolderKanban, Calendar, FileText, 
  Settings, GanttChart, CreditCard, MessageSquare, User, FilePlus2
} from 'lucide-react';

interface ClientNavigationProps {
  isAdminMode?: boolean;
}

const ClientNavigation: React.FC<ClientNavigationProps> = ({ isAdminMode = false }) => {
  return (
    <Card className="border-gray-200 shadow-sm overflow-hidden sticky top-24">
      <CardContent className="p-0">
        <nav className="flex flex-col">
          {isAdminMode ? (
            // Admin navigation
            <>
              <NavLink 
                to="/workspace/client-area/admin"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <LayoutDashboard className="h-4 w-4 mr-3" />
                Tableau de bord
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/admin/clients"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <Users className="h-4 w-4 mr-3" />
                Clients
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/admin/projects"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <FolderKanban className="h-4 w-4 mr-3" />
                Projets
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/admin/projects/create"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <FilePlus2 className="h-4 w-4 mr-3" />
                Nouveau projet
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/admin/planning"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <GanttChart className="h-4 w-4 mr-3" />
                Planning
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/admin/reports"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <FileText className="h-4 w-4 mr-3" />
                Rapports
              </NavLink>

              <NavLink 
                to="/workspace/client-area/admin/settings"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <Settings className="h-4 w-4 mr-3" />
                Paramètres
              </NavLink>
            </>
          ) : (
            // Client navigation
            <>
              <NavLink 
                to="/workspace/client-area"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
                end
              >
                <LayoutDashboard className="h-4 w-4 mr-3" />
                Tableau de bord
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/projects"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <FolderKanban className="h-4 w-4 mr-3" />
                Mes projets
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/calendar"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <Calendar className="h-4 w-4 mr-3" />
                Calendrier
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/documents"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <FileText className="h-4 w-4 mr-3" />
                Documents
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/payments"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <CreditCard className="h-4 w-4 mr-3" />
                Paiements
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/messages"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Messages
              </NavLink>
              
              <NavLink 
                to="/workspace/client-area/account"
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm",
                  "hover:bg-gray-50 transition-colors border-l-2",
                  isActive 
                    ? "border-l-khaki-500 bg-khaki-50 text-khaki-900 font-medium" 
                    : "border-l-transparent text-gray-700"
                )}
              >
                <User className="h-4 w-4 mr-3" />
                Mon compte
              </NavLink>
            </>
          )}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ClientNavigation;
