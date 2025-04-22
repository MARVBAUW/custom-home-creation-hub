
import React from "react";
import Container from "@/components/common/Container";

interface ValueType {
  title: string;
  description: string;
  icon: string;
}

interface ValuesSectionProps {
  values: ValueType[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => (
  <section className="py-16 bg-stone-50">
    <Container>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold mb-4">Nos valeurs</h2>
        <p className="text-gray-600">
          Ces principes guident chacune de nos actions et définissent notre approche professionnelle.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {values.map((value, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4" aria-hidden="true">{value.icon}</span>
              <h3 className="text-xl font-semibold">{value.title}</h3>
            </div>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default ValuesSection;
