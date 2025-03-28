
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/use-media-query';
import Button from '@/components/common/Button';
import EstimationCalculator from './EstimationCalculator';
import { Construction } from 'lucide-react';

const EstimationForm = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#787346] hover:bg-[#787346]/90 text-white !text-white group transition-all duration-300 transform hover:scale-105">
            <Construction className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            Estimer gratuitement mon projet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[850px] h-[92vh] overflow-y-auto bg-white/95 backdrop-blur-sm border border-progineer-gold/20 shadow-lg">
          <DialogTitle className="text-2xl text-progineer-gold font-rare">Estimation de votre projet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Estimez le coût de votre projet de construction ou rénovation en quelques étapes simples.
          </DialogDescription>
          <EstimationCalculator />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-[#787346] hover:bg-[#787346]/90 text-white !text-white group transition-all duration-300 transform hover:scale-105">
          <Construction className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
          Estimer gratuitement mon projet
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[92vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-t border-progineer-gold/20">
        <div className="px-4 py-6">
          <h2 className="text-2xl text-progineer-gold font-rare text-center mb-4">Estimation de votre projet</h2>
          <p className="text-muted-foreground text-center mb-6">
            Estimez le coût de votre projet de construction ou rénovation en quelques étapes simples.
          </p>
          <EstimationCalculator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EstimationForm;
