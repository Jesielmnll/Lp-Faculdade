import { Target, Eye, Heart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const mvvData = [
  {
    icon: Target,
    title: 'Missão',
    description: 'Formar profissionais capacitados e cidadãos conscientes, por meio de uma educação de excelência que valoriza a inovação, a ética e o compromisso social.',
  },
  {
    icon: Eye,
    title: 'Visão',
    description: 'Ser referência nacional em educação superior, reconhecida pela qualidade de ensino, inovação pedagógica e formação de líderes transformadores.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description: 'Ética, Inovação, Excelência, Responsabilidade Social, Respeito à Diversidade e Compromisso com o Desenvolvimento Humano.',
  },
];

const MVVSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-gradient-neon">Pilares</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Os fundamentos que guiam nossa jornada educacional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {mvvData.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-neon/20",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MVVSection;
