
import React from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Calendar, MessageSquare } from 'lucide-react';

const ClientNavigation = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-medium">Navigation</h2>
      </div>
      <div className="p-2">
        <Link to="/workspace/client-area" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
          <User className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Tableau de bord</span>
        </Link>
        <Link to="/workspace/client-area/documents" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
          <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Documents</span>
        </Link>
        <Link to="/workspace/client-area/projects" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
          <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Suivi de projet</span>
        </Link>
        <Link to="/workspace/client-area/messages" className="flex items-center p-3 rounded-md bg-khaki-50 text-khaki-800 font-medium">
          <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Messages</span>
        </Link>
      </div>
    </div>
  );
};

export default ClientNavigation;
