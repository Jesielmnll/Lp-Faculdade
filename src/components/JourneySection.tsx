import { BookOpen, Award, BadgeCheck, Monitor, FileText, Layers } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const benefits = [
  {
    title: 'Material Exclusivo',
    description: '1 E-book por Unidade de Ensino, com conteúdo atualizado e desenvolvido por especialistas.',
    icon: FileText,
  },
  {
    title: 'Aulas Online',
    description: '384 horas de conteúdo em vídeo + materiais complementares para estudo flexível.',
    icon: Monitor,
  },
  {
    title: 'Certificado MEC',
    description: 'Certificado reconhecido pelo MEC, 100% gratuito ao concluir sua formação.',
    icon: Award,
  },
  {
    title: 'Microcertificações',
    description: 'A cada Unidade de Ensino concluída, receba um microcertificado específico para seu currículo.',
    icon: BadgeCheck,
  },
  {
    title: 'Avaliação Digital',
    description: 'Provas e avaliações 100% digitais, com feedback imediato e acompanhamento do progresso.',
    icon: Layers,
  },
  {
    title: 'Plataforma Responsiva',
    description: 'Estude de qualquer dispositivo — desktop, tablet ou celular — com a mesma experiência.',
    icon: BookOpen,
  },
];

const DiferenciaisSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-geometric opacity-30" />
      
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 relative z-10 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Diferenciais <span className="text-gradient-neon">i9</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo o que você precisa para uma formação completa e reconhecida
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={cn(
                "relative group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms`, transitionDuration: '600ms' }}
            >
              <div className="relative bg-gradient-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 card-hover-elevate h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisSection;
