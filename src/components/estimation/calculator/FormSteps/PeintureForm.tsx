import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PeintureFormProps } from '../types/formTypes';

const formSchema = z.object({
  basicPaintPercentage: z.string(),
  decorativePaintPercentage: z.string(),
  wallpaperPercentage: z.string(),
  woodCladPercentage: z.string(),
  stoneCladPercentage: z.string(),
}).refine((data) => {
  const total = parseInt(data.basicPaintPercentage) + 
                parseInt(data.decorativePaintPercentage) + 
                parseInt(data.wallpaperPercentage) + 
                parseInt(data.woodCladPercentage) + 
                parseInt(data.stoneCladPercentage);
  return total <= 100;
}, {
  message: "Le total des pourcentages ne peut pas dépasser 100%",
  path: ["basicPaintPercentage"],
});

type FormValues = z.infer<typeof formSchema>;

const PeintureForm: React.FC<PeintureFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicPaintPercentage: defaultValues?.basicPaintPercentage?.toString() || '50',
      decorativePaintPercentage: defaultValues?.decorativePaintPercentage?.toString() || '20',
      wallpaperPercentage: defaultValues?.wallpaperPercentage?.toString() || '10',
      woodCladPercentage: defaultValues?.woodCladPercentage?.toString() || '10',
      stoneCladPercentage: defaultValues?.stoneCladPercentage?.toString() || '10',
    },
  });

  const basicPaintPercentage = form.watch('basicPaintPercentage');
  const decorativePaintPercentage = form.watch('decorativePaintPercentage');
  const wallpaperPercentage = form.watch('wallpaperPercentage');
  const woodCladPercentage = form.watch('woodCladPercentage');
  const stoneCladPercentage = form.watch('stoneCladPercentage');

  const totalPercentage = parseInt(basicPaintPercentage) + 
                         parseInt(decorativePaintPercentage) + 
                         parseInt(wallpaperPercentage) + 
                         parseInt(woodCladPercentage) + 
                         parseInt(stoneCladPercentage);

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Peinture & Revêtements muraux</h2>
        <p className="text-muted-foreground text-sm">
          Définissez les proportions des différents revêtements muraux
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">Total des revêtements: {totalPercentage}%</p>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="flex h-full">
                <div 
                  className="bg-blue-400" 
                  style={{width: `${basicPaintPercentage}%`}}
                  title="Peinture basique"
                ></div>
                <div 
                  className="bg-purple-400" 
                  style={{width: `${decorativePaintPercentage}%`}}
                  title="Peinture décorative"
                ></div>
                <div 
                  className="bg-green-400" 
                  style={{width: `${wallpaperPercentage}%`}}
                  title="Papier peint"
                ></div>
                <div 
                  className="bg-amber-400" 
                  style={{width: `${woodCladPercentage}%`}}
                  title="Lambris bois"
                ></div>
                <div 
                  className="bg-gray-400" 
                  style={{width: `${stoneCladPercentage}%`}}
                  title="Parement pierre"
                ></div>
              </div>
            </div>
            {totalPercentage > 100 && (
              <p className="text-destructive text-xs mt-1">Le total dépasse 100%. Veuillez ajuster les pourcentages.</p>
            )}
          </div>

          <FormField
            control={form.control}
            name="basicPaintPercentage"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    Peinture basique
                  </FormLabel>
                  <span className="text-sm">{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="decorativePaintPercentage"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    Peinture décorative
                  </FormLabel>
                  <span className="text-sm">{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wallpaperPercentage"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    Papier peint
                  </FormLabel>
                  <span className="text-sm">{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="woodCladPercentage"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    Lambris bois
                  </FormLabel>
                  <span className="text-sm">{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stoneCladPercentage"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    Parement pierre
                  </FormLabel>
                  <span className="text-sm">{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Précédent
            </Button>
            <Button 
              type="submit"
              disabled={totalPercentage > 100}
            >
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </AnimatedStepTransition>
  );
};

export default PeintureForm;
