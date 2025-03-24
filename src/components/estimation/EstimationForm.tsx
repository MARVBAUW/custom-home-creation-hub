
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/use-media-query';
import Button from '@/components/common/Button';

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
        <DialogContent className="sm:max-w-[600px] h-[80vh]">
          <iframe
            title="Formulaire d'estimation de projet"
            src="https://tally.so/r/nGB6KO"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{ height: "calc(80vh - 80px)" }}
          ></iframe>
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
      <DrawerContent className="h-[80vh]">
        <iframe
          title="Formulaire d'estimation de projet mobile"
          src="https://tally.so/r/nGB6KO"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          style={{ height: "calc(80vh - 80px)" }}
        ></iframe>
      </DrawerContent>
    </Drawer>
  );
};

export default EstimationForm;
