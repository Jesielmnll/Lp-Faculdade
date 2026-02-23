import { ArrowRight, Sparkles, GraduationCap, BookOpen, Layers, PlayCircle, Scale, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/hero-bg.jpg';

const categories = [
  { icon: GraduationCap, label: 'Graduação', desc: 'Bacharelado e Licenciatura' },
  { icon: BookOpen, label: 'Pós-Graduação', desc: 'Especializações e MBAs' },
  { icon: Layers, label: 'Extensão Universitária', desc: 'Cursos complementares' },
  { icon: PlayCircle, label: 'Cursos Livres', desc: 'Capacitação rápida' },
  { icon: Film, label: 'i9Flix', desc: 'Plataforma de conteúdo' },
  { icon: Scale, label: 'Preparatório OAB', desc: 'Aprovação garantida' },
];

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background pointer-events-none" />

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
        <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Transforme seu futuro com a i9</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          Faculdade i9 Educação:{' '}
          <span className="text-gradient-neon glow-text-neon">Democratizando o ensino superior.</span>{' '}
          Transformando vidas.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          A i9 Educação nasceu para ampliar oportunidades, apoiar trajetórias e formar profissionais preparados para o mercado e para a vida.
        </p>

        <Button variant="neon" size="xl" className="group mb-16">
          Conheça nossos cursos
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* 6 Category Cards - Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={cn(
                "group bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 cursor-pointer card-hover-elevate transition-all duration-500",
                "hover:border-primary/40 hover:bg-card/80",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: `${i * 80 + 400}ms` }}
            >
              <cat.icon className="w-8 h-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-1">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
