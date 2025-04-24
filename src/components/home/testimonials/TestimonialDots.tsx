
interface TestimonialDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number, currentActive: number) => void;
  setAutoplay: (value: boolean) => void;
}

export const TestimonialDots = ({ total, active, onDotClick, setAutoplay }: TestimonialDotsProps) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(total)].map((_, index) => (
        <button
          key={index}
          onClick={() => {
            onDotClick(index, active);
            setAutoplay(false);
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === active 
              ? "bg-white scale-125" 
              : "bg-white/30 hover:bg-white/60"
          }`}
          aria-label={`Témoignage ${index + 1}`}
        />
      ))}
    </div>
  );
};
