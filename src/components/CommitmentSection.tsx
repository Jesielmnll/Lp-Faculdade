import { DoorOpen, HeartHandshake, Rocket } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const pillars = [
  {
    icon: DoorOpen,
    title: 'Acesso',
    desc: 'Mensalidades acessíveis e políticas de inclusão para que ninguém fique de fora.',
  },
  {
    icon: HeartHandshake,
    title: 'Permanência',
    desc: 'Atendimento humanizado e acompanhamento contínuo da jornada acadêmica.',
  },
  {
    icon: Rocket,
    title: 'Transformação',
    desc: 'Formação prática conectada ao mercado de trabalho e ao desenvolvimento pessoal.',
  },
];

const CommitmentSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-geometric opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Nosso Compromisso</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            3 pilares que nos <span className="text-gradient-neon">definem</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center card-hover-elevate transition-all duration-500",
                "hover:border-primary/30",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
