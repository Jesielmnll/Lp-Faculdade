import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const stats = [
  { value: '+2.5K', label: 'Horas de Conteúdo', description: 'Material didático completo' },
  { value: '+2M', label: 'Aulas Ministradas', description: 'Experiência comprovada' },
  { value: '+48K', label: 'i9Lovers', description: 'Comunidade ativa' },
  { value: '100%', label: 'Satisfação', description: 'Avaliação dos alunos' },
];

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-geometric opacity-50" />
      
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 relative z-10 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-gradient-neon">Números</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados que demonstram nosso compromisso com a excelência
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-neon/20 group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary glow-text-neon mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="font-display text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
