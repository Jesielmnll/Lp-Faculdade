import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const CtaFinalSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-geometric opacity-20" />
      <div
        className={cn(
          "container mx-auto px-4 text-center relative z-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
          Se a educação transforma vidas, qual será a sua{' '}
          <span className="text-gradient-neon glow-text-neon">próxima conquista</span>?
        </h2>
        <Button variant="neon" size="xl" className="group">
          Faça parte da i9
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default CtaFinalSection;
