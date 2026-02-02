import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-geometric"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />

      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 text-center relative z-10 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Transforme seu futuro com a i9</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          Desenvolvendo Pessoas e{' '}
          <span className="text-gradient-neon glow-text-neon">Transformando Histórias</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Uma instituição comprometida com a excelência acadêmica e o desenvolvimento integral de seus alunos, preparando-os para os desafios do mercado.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="neon" size="xl" className="group">
            Conheça Nossos Cursos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="neonOutline" size="xl">
            Fale Conosco
          </Button>
        </div>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto">
          {[
            { value: '+2.5K', label: 'Horas de Conteúdo' },
            { value: '+2M', label: 'Aulas Ministradas' },
            { value: '+48K', label: 'i9Lovers' },
            { value: '100%', label: 'Satisfação' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-primary glow-text-neon">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
