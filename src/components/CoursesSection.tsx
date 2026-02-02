import { GraduationCap, Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const CoursesSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-background relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-gradient-neon">Cursos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formação completa para sua carreira profissional
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Graduação Card */}
          <div
            className={cn(
              "p-8 lg:p-10 rounded-2xl bg-gradient-card border border-border/50 transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Graduação</span>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Recursos Humanos
                </h3>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Prepare-se para liderar equipes e desenvolver talentos. Nosso curso de Gestão de 
              Recursos Humanos forma profissionais completos, capacitados para atuar em todas 
              as áreas do RH moderno, desde recrutamento e seleção até gestão estratégica de pessoas.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Users, label: 'Turmas Reduzidas' },
                { icon: BookOpen, label: 'Material Atualizado' },
                { icon: Award, label: 'Certificação MEC' },
                { icon: GraduationCap, label: 'Corpo Docente PhD' },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            <Button variant="neonOutline" className="w-full sm:w-auto group">
              Saiba Mais
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Pós-Graduação Card */}
          <div
            className={cn(
              "p-8 lg:p-10 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden transition-all duration-500 group",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs text-primary-foreground/70 uppercase tracking-wider">Pós-Graduação</span>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    Especializações
                  </h3>
                </div>
              </div>

              <p className="text-primary-foreground/90 leading-relaxed mb-8">
                Potencialize sua carreira com nossas especializações. Cursos desenvolvidos 
                para profissionais que buscam se destacar no mercado com conhecimentos 
                avançados e certificação reconhecida nacionalmente.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'MBA em Gestão de Pessoas',
                  'Especialização em Liderança',
                  'Gestão de Projetos',
                  'Consultoria Organizacional',
                ].map((course) => (
                  <div key={course} className="flex items-center gap-2 text-primary-foreground/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="secondary" 
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 group"
              >
                Ver Todas as Especializações
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
