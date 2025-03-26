
import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { calculatePhaseDates } from '@/utils/projectDateUtils';
import { ProjectDetails, ProjectPhase } from '@/types/project';

const ProjectDateForm = () => {
  const { watch, setValue, control } = useFormContext<ProjectDetails>();
  const selectedPhases = watch('phases');
  const automaticDates = watch('automaticDates');
  const workAmount = watch('workAmount');
  const globalStartDate = watch('dates.global.startDate');
  
  // Recalculate dates when automatic is toggled or relevant data changes
  useEffect(() => {
    if (automaticDates && workAmount && globalStartDate) {
      const workAmountNum = parseFloat(workAmount) || 0;
      const phaseDates = calculatePhaseDates(globalStartDate, workAmountNum, selectedPhases);
      setValue('dates', phaseDates);
    }
  }, [automaticDates, workAmount, globalStartDate, selectedPhases, setValue]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Dates des Phases</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="dates.global.startDate"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="global-start-date">Date de début globale</Label>
              <FormControl>
                <Input
                  type="date"
                  id="global-start-date"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="dates.global.endDate"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="global-end-date">Date de fin globale</Label>
              <FormControl>
                <Input
                  type="date"
                  id="global-end-date"
                  {...field}
                  disabled={automaticDates}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      {Object.entries(selectedPhases).map(([phase, isSelected]) => 
        isSelected && (
          <div key={phase}>
            <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">
              {phase.toUpperCase()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`dates.${phase}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={`${phase}-start-date`}>Date de début</Label>
                    <FormControl>
                      <Input
                        type="date"
                        id={`${phase}-start-date`}
                        disabled={automaticDates}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`dates.${phase}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={`${phase}-end-date`}>Date de fin</Label>
                    <FormControl>
                      <Input
                        type="date"
                        id={`${phase}-end-date`}
                        disabled={automaticDates}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectDateForm;
