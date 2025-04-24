
import React from 'react';
import { Mail } from "lucide-react";

interface ClientHeaderProps {
  client: {
    name: string;
    email: string;
  };
}

const ClientHeader = ({ client }: ClientHeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">{client.name}</h2>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Mail className="h-4 w-4" />
        <span>{client.email}</span>
      </div>
    </div>
  );
};

export default ClientHeader;
