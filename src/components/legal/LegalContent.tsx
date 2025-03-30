
import React from 'react';
import Container from '@/components/common/Container';
import { cn } from '@/lib/utils';
import GoogleBusinessData from '@/components/common/GoogleBusinessData';

interface LegalContentProps {
  children: React.ReactNode;
  className?: string;
  showBusinessData?: boolean;
}

const LegalContent = ({ children, className, showBusinessData = true }: LegalContentProps) => {
  return (
    <Container fullBleed={true} size="full">
      <div className={cn("prose prose-stone max-w-none py-12", className)}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="md:col-span-8 bg-white rounded-xl shadow-sm border border-stone-100 p-6 md:p-8 lg:p-10">
            {children}
          </div>
          
          {showBusinessData && (
            <div className="md:col-span-4">
              <div className="sticky top-24">
                <GoogleBusinessData showHours={true} className="mb-6" />
                
                <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4">
                  <h3 className="text-lg font-medium mb-3">Contact direct</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-stone-500">Email:</span>
                      <a href="mailto:progineer.moe@gmail.com" className="text-progineer-gold hover:underline">
                        progineer.moe@gmail.com
                      </a>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Téléphone:</span>
                      <a href="tel:+33783762156" className="text-progineer-gold hover:underline">
                        +33 7 83 76 21 56
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default LegalContent;
