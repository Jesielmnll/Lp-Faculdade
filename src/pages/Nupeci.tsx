import { AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const Nupeci = () => {
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient-neon">NUPECI</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
              Núcleo de Pesquisa Científica e Inovação da Faculdade i9 Educação
            </p>

            {/* Alert banner */}
            <div className="max-w-xl mx-auto bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <span className="font-display text-xl font-bold text-primary">Inscrições em Breve</span>
              </div>
              <p className="text-muted-foreground">
                O NUPECI está preparando novos programas de pesquisa e extensão.
                Em breve você poderá se inscrever e participar dos projetos.
              </p>
            </div>

            <div className="text-left space-y-6 text-muted-foreground leading-relaxed">
              <p>
                O NUPECI é responsável por fomentar a pesquisa e a inovação dentro da Faculdade i9,
                promovendo o desenvolvimento científico e tecnológico entre docentes e discentes.
              </p>
              <p>
                Nosso objetivo é criar um ambiente propício à investigação acadêmica,
                gerando conhecimento aplicável que contribua para o avanço da sociedade.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nupeci;
