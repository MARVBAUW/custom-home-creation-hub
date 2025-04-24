
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SnowLoadCalculator from "./climate/SnowLoadCalculator";
import WindPressureCalculator from "./climate/WindPressureCalculator";

const ClimateCalculator = () => {
  const [activeTab, setActiveTab] = useState("snow");

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-gray-800 font-medium mb-2">Calculateurs climatiques (Eurocode 1)</h3>
        <p className="text-gray-600 text-sm">
          Calculez les actions climatiques (neige et vent) selon les Eurocodes EN 1991-1-3 (neige) et EN 1991-1-4 (vent).
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="snow">Charge de neige (EN 1991-1-3)</TabsTrigger>
          <TabsTrigger value="wind">Charge de vent (EN 1991-1-4)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="snow">
          <SnowLoadCalculator />
        </TabsContent>
        
        <TabsContent value="wind">
          <WindPressureCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClimateCalculator;
