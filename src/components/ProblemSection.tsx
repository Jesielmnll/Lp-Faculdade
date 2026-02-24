import { HandHeart, Users } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Fundo geométrico sutil */}
      <div className="absolute inset-0 bg-geometric opacity-30" />
      {/* Faixa de fundo diferenciada (soft dark) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center bg-card/60 backdrop-blur-md border border-primary/20 rounded-3xl p-10 md:p-16 transition-all duration-700",
            "glow-neon-soft",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {/* Frase de impacto */}
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-gradient-neon glow-text-neon">"O ensino superior deve ser oportunidade,</span>{' '}
            não privilégio."
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            Muitos brasileiros adiam sonhos por falta de apoio. A i9 nasceu para mudar essa realidade. 
            Acreditamos que talento não depende de renda e que a educação é a principal ferramenta de mobilidade social.
          </p>

          {/* Ícones de Causa Social e Histórias Reais */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-3">
              <HandHeart className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Causa Social</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Histórias Reais</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
