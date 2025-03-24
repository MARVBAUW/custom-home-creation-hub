
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/use-media-query';
import Button from '@/components/common/Button';
import EstimationCalculator from './EstimationCalculator';

const EstimationForm = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-progineer-gold hover:bg-progineer-gold/90 text-white">
            Estimer gratuitement mon projet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto">
          <EstimationCalculator />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-progineer-gold hover:bg-progineer-gold/90 text-white">
          Estimer gratuitement mon projet
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] overflow-y-auto">
        <div className="px-4 py-6">
          <EstimationCalculator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EstimationForm;
