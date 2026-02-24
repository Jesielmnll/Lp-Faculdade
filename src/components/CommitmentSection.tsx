import { DoorOpen, HeartHandshake, Rocket } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

/* Os 3 pilares de compromisso da i9 */
const pilares = [
  {
    icon: DoorOpen,
    title: 'Acesso',
    desc: 'Mensalidades acessíveis e políticas de inclusão para que ninguém fique de fora.',
    destaque: 'Mensalidades acessíveis',
  },
  {
    icon: HeartHandshake,
    title: 'Permanência',
    desc: 'Atendimento humanizado e acompanhamento contínuo da jornada acadêmica.',
    destaque: 'Atendimento humanizado',
  },
  {
    icon: Rocket,
    title: 'Transformação',
    desc: 'Formação prática conectada ao mercado de trabalho e ao desenvolvimento pessoal.',
    destaque: 'Conexão real com o mercado',
  },
];

const CommitmentSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-geometric opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Nosso Compromisso</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            3 pilares que nos <span className="text-gradient-neon">definem</span>
          </h2>
        </div>

        {/* Cards com efeito Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pilares.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "relative bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-8 text-center card-hover-elevate transition-all duration-500",
                "hover:border-primary/40 hover:bg-card/50 hover:shadow-neon-soft",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Brilho de fundo no card */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <p.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-primary text-sm font-medium mb-3">{p.destaque}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
