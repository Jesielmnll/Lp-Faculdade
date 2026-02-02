import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface StatItemProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const StatItem = ({ value, suffix, prefix = '', label, description, isVisible, delay }: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentValue = Math.floor(value * easeProgress);
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);
    }
  }, [isVisible, value, delay]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <div
      className={cn(
        "text-center p-8 lg:p-10 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 card-hover-elevate group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary glow-text-neon mb-3 group-hover:scale-110 transition-transform duration-300">
        {prefix}{suffix === '%' ? displayValue : formatNumber(displayValue)}{suffix !== '%' && '+'}{suffix === '%' && suffix}
      </div>
      <div className="font-display text-lg font-semibold text-foreground mb-1">
        {label}
      </div>
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
};

const stats = [
  { value: 2500, suffix: 'K', prefix: '+', label: 'Horas de Conteúdo', description: 'Material didático completo', displayValue: '2.5K' },
  { value: 2000000, suffix: 'M', prefix: '+', label: 'Aulas Ministradas', description: 'Experiência comprovada', displayValue: '2M' },
  { value: 48000, suffix: 'K', prefix: '+', label: 'i9Lovers', description: 'Comunidade ativa', displayValue: '48K' },
  { value: 100, suffix: '%', prefix: '', label: 'Satisfação', description: 'Avaliação dos alunos', displayValue: '100' },
];

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
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
          <StatItem
            value={2500}
            suffix=""
            prefix="+"
            label="Horas de Conteúdo"
            description="Material didático completo"
            isVisible={isVisible}
            delay={0}
          />
          <StatItem
            value={2}
            suffix="M"
            prefix="+"
            label="Aulas Ministradas"
            description="Experiência comprovada"
            isVisible={isVisible}
            delay={100}
          />
          <StatItem
            value={48}
            suffix="K"
            prefix="+"
            label="i9Lovers"
            description="Comunidade ativa"
            isVisible={isVisible}
            delay={200}
          />
          <StatItem
            value={100}
            suffix="%"
            prefix=""
            label="Satisfação"
            description="Avaliação dos alunos"
            isVisible={isVisible}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
