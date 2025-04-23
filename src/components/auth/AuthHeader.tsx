
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/common/Container';

const AuthHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="mb-6">
            <Link to="/workspace" className="flex items-center text-sm font-medium text-gray-600 hover:text-khaki-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au workspace
            </Link>
          </div>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Espace Client
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{subtitle}</p>
        </div>
      </Container>
    </section>
  );
};

export default AuthHeader;
