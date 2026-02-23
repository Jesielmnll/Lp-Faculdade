import { Star, Heart, ExternalLink, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const testimonials = [
  { name: 'Maria Silva', role: 'Aluna de Pedagogia', text: 'A i9 mudou a minha vida. Consegui realizar o sonho de ter um diploma sem abrir mão do trabalho e da família.' },
  { name: 'Prof. Carlos Andrade', role: 'Docente', text: 'É gratificante ensinar em uma instituição que realmente acredita na transformação social pela educação.' },
  { name: 'Joana Mendes', role: 'Aluna de Direito', text: 'Com o Preparatório OAB da i9, me senti preparada e confiante. Passei na primeira tentativa!' },
  { name: 'Rafael Costa', role: 'Aluno de Administração', text: 'O suporte da i9 foi fundamental para eu continuar estudando mesmo nos momentos mais difíceis.' },
];

const credLinks = [
  { label: 'Credenciamento MEC', href: '#' },
  { label: 'Portarias Institucionais', href: '#' },
  { label: 'Documentos (PDI/Regimento)', href: '#' },
  { label: 'Ouvidoria', href: '/ouvidoria' },
];

const SocialProofSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Prova Social</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Educação que gera <span className="text-gradient-neon">impacto real</span>
          </h2>
        </div>

        {/* i9 para Todos highlight */}
        <div
          className={cn(
            "max-w-3xl mx-auto text-center bg-card/50 border border-primary/15 rounded-2xl p-8 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Projeto i9 para Todos</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Bolsas de estudo, apoio psicopedagógico e ações comunitárias para garantir que o acesso à educação superior chegue a quem mais precisa.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={cn(
            "max-w-2xl mx-auto mb-16 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="bg-card/60 border border-border/50 rounded-2xl p-8 md:p-10 text-center relative">
            <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-6 min-h-[80px]">
              "{testimonials[idx].text}"
            </p>
            <p className="font-display font-semibold text-foreground">{testimonials[idx].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[idx].role}</p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {testimonials.map((_, i) => (
                <span key={i} className={cn("w-2 h-2 rounded-full transition-colors", i === idx ? "bg-primary" : "bg-muted")} />
              ))}
              <button onClick={next} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        )}>
          {[{ name: 'Google', rating: '4.8' }, { name: 'Reclame Aqui', rating: '8.5' }].map((r) => (
            <div key={r.name} className="flex items-center gap-3 bg-card/50 border border-border/50 rounded-xl px-6 py-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <span className="font-display font-bold text-foreground">{r.rating}</span>
              <span className="text-sm text-muted-foreground">{r.name}</span>
            </div>
          ))}
        </div>

        {/* Credibility links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {credLinks.map((link) => (
            <Button key={link.label} variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs gap-1" asChild>
              <a href={link.href}>
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
