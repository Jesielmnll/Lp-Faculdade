import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="institucional" className="py-24 bg-background relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Por que escolher a <span className="text-gradient-neon glow-text-neon">i9</span>?
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-lg font-semibold border border-primary/30">
                Faculdade i9 Educação
              </span> nasceu com o propósito de democratizar o acesso à educação de qualidade, 
              oferecendo cursos que aliam teoria à prática com metodologias inovadoras.
            </p>
            
            <p>
              Nossa abordagem única combina tecnologia de ponta com acompanhamento personalizado, 
              garantindo que cada aluno desenvolva as competências necessárias para se destacar 
              em um mercado cada vez mais competitivo e dinâmico.
            </p>
            
            <p>
              Com corpo docente altamente qualificado e infraestrutura moderna, proporcionamos 
              uma experiência de aprendizado transformadora que vai além da sala de aula tradicional.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary glow-neon" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
