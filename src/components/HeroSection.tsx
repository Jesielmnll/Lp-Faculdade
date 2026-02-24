import { ArrowRight, Sparkles, GraduationCap, BookOpen, Layers, PlayCircle, Scale, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/hero-bg.jpg';

/* Categorias de acesso rápido — Bento Grid */
const categorias = [
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
      {/* Imagem de fundo com estudantes */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Sobreposição gradiente para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background pointer-events-none" />

      {/* Partículas decorativas flutuantes */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }} />

      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 text-center relative z-10 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {/* Badge de destaque */}
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-5 py-2.5 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/80">Educação como ferramenta de vida</span>
        </div>

        {/* Headline principal */}
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          Faculdade i9 Educação:{' '}
          <span className="text-gradient-neon glow-text-neon">Democratizando o ensino superior.</span>{' '}
          Transformando vidas.
        </h1>

        {/* Subheadline humanizada */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Nascemos para ampliar o acesso, garantir a permanência e gerar mobilidade social. 
          A educação é o caminho para transformar sonhos em realidade.
        </p>

        {/* CTA principal */}
        <Button variant="neon" size="xl" className="group mb-16 animate-pulse-glow">
          Conheça nossos cursos
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Grid de Acesso Rápido — Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categorias.map((cat, i) => (
            <div
              key={cat.label}
              className={cn(
                "group relative bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl p-6 cursor-pointer card-hover-elevate transition-all duration-500",
                "hover:border-primary/50 hover:bg-card/70 hover:shadow-neon-soft",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: `${i * 100 + 400}ms` }}
            >
              {/* Glow sutil no hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <cat.icon className="relative w-8 h-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="relative font-display text-sm md:text-base font-semibold text-foreground mb-1">{cat.label}</h3>
              <p className="relative text-xs text-muted-foreground">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradiente de transição para a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
