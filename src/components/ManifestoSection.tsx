import { Play } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const ManifestoSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Nosso Manifesto</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            O que nos <span className="text-gradient-neon">move</span>
          </h2>
        </div>

        <div
          className={cn(
            "grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-card border border-border/50 rounded-2xl overflow-hidden group cursor-pointer card-hover-elevate">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </div>
            <span className="absolute bottom-4 left-4 text-xs text-muted-foreground font-medium">
              Manifesto da Marca
            </span>
          </div>

          {/* Manifesto Text */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-light">
              "Acreditamos que cada aluno carrega um sonho. Nosso papel é garantir que esse sonho não seja interrompido 
              por barreiras financeiras, geográficas ou sociais."
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Quando uma pessoa acessa o ensino superior, uma família inteira muda de futuro. 
              É por isso que existimos: para ser a ponte entre o talento e a transformação.
            </p>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
