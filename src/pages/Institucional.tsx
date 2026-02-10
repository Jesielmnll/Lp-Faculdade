import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const Institucional = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div
          ref={ref}
          className={cn(
            "container mx-auto px-4 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
              Conheça a <span className="text-gradient-neon">i9 Educação</span>
            </h1>

            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-primary font-semibold">Faculdade i9 Educação</span> nasceu
                com o propósito de democratizar o acesso à educação de qualidade, oferecendo cursos
                que aliam teoria à prática com metodologias inovadoras.
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

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                {[
                  { title: 'Missão', text: 'Transformar vidas por meio da educação acessível, inovadora e de excelência.' },
                  { title: 'Visão', text: 'Ser referência nacional em educação corporativa e gestão de pessoas.' },
                  { title: 'Valores', text: 'Inovação, ética, compromisso social, excelência acadêmica e respeito à diversidade.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-gradient-card rounded-2xl p-6 border border-border/50"
                  >
                    <h3 className="font-display text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Institucional;
