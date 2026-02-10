import { useState } from 'react';
import { MapPin, Phone, Mail, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrazilMap from '@/components/BrazilMap';
import { useEstagios } from '@/hooks/useWordPress';
import SkeletonCard from '@/components/SkeletonCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import type { EstagioItem } from '@/services/api';

const Estagio = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedUF, setSelectedUF] = useState<string | null>(null);
  const { data: estagios, isLoading } = useEstagios();

  const filtered: EstagioItem[] = selectedUF
    ? (estagios || []).filter((e) => e.estado_uf.toUpperCase() === selectedUF.toUpperCase())
    : [];

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
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Estágio <span className="text-gradient-neon">i9</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Clique em um estado no mapa para ver os órgãos conveniados disponíveis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <div className="flex justify-center">
              <BrazilMap
                selectedUF={selectedUF}
                onSelectUF={(uf) => setSelectedUF(uf === selectedUF ? null : uf)}
                availableUFs={(estagios || []).map((e) => e.estado_uf.toUpperCase())}
              />
            </div>

            {/* Results panel */}
            <div>
              {!selectedUF && (
                <div className="text-center py-16 bg-gradient-card rounded-2xl border border-border/50">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Selecione um estado no mapa para ver as opções de estágio.</p>
                </div>
              )}

              {selectedUF && isLoading && (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} variant="simple" />
                  ))}
                </div>
              )}

              {selectedUF && !isLoading && filtered.length === 0 && (
                <div className="text-center py-16 bg-gradient-card rounded-2xl border border-border/50">
                  <p className="text-muted-foreground">Nenhum órgão conveniado encontrado para <strong className="text-foreground">{selectedUF}</strong>.</p>
                </div>
              )}

              {selectedUF && filtered.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Resultados para <span className="text-primary">{selectedUF}</span>
                  </h2>
                  {filtered.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gradient-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 card-hover-elevate"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Building className="w-5 h-5 text-primary mt-0.5" />
                        <h3 className="font-display text-lg font-bold text-foreground">{item.nome_orgao}</h3>
                      </div>
                      <div className="space-y-2 ml-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{item.contato}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <a href={`mailto:${item.email}`} className="hover:text-primary transition-colors link-underline">
                            {item.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Estagio;
