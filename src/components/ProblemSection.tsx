import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-geometric opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center bg-card/70 backdrop-blur-sm border border-primary/20 rounded-3xl p-10 md:p-16 transition-all duration-700",
            "glow-neon-soft",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-gradient-neon glow-text-neon">"O ensino superior deve ser oportunidade,</span>{' '}
            não privilégio."
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Muitos brasileiros adiam sonhos por falta de apoio. A i9 nasceu para mudar essa realidade. 
            Acreditamos que talento não depende de renda e que a educação é a principal ferramenta de mobilidade social.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
