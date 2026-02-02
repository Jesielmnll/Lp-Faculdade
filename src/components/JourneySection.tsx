import { ClipboardCheck, BookOpen, Award } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Inscrição Online',
    description: 'Faça sua inscrição de forma rápida e prática pelo nosso portal. Em poucos minutos você estará matriculado.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Acesso à Plataforma',
    description: 'Receba suas credenciais e tenha acesso imediato a todo o conteúdo, materiais e recursos exclusivos.',
    icon: BookOpen,
  },
  {
    number: '03',
    title: 'Certificação Profissional',
    description: 'Complete sua jornada e receba seu certificado reconhecido pelo MEC para impulsionar sua carreira.',
    icon: Award,
  },
];

const JourneySection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
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
            Sua Jornada na <span className="text-gradient-neon">i9</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um caminho simples e direto para transformar sua carreira
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "relative group",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 200}ms`, transitionDuration: '600ms' }}
              >
                {/* Card */}
                <div className="relative bg-gradient-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 card-hover-elevate z-10">
                  {/* Background number */}
                  <div className="absolute top-4 right-4 font-display text-8xl font-bold text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:glow-neon-soft transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Step number badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <span className="font-display text-sm font-bold text-primary">Passo {step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
