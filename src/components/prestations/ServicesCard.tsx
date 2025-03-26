
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface ServicesCardProps {
  service: Service;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ service }) => {
  return (
    <Card key={service.id} id={service.id} className="border-gray-200 hover:shadow-md transition-shadow duration-300 scroll-mt-32">
      <CardHeader>
        <div className="mb-4">{service.icon}</div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <CardDescription className="text-gray-600">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1 text-khaki-600">•</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button href="/contact" variant="outline" className="w-full justify-center">
          En savoir plus
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicesCard;
