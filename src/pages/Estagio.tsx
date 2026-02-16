import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrazilMap from '@/components/BrazilMap';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import type { EstagioItem } from '@/services/api';

// ── Dados estáticos dos órgãos conveniados ─────────────
const ORGAOS_CONVENIADOS: EstagioItem[] = [
  { estado_uf: 'CE', nome_orgao: 'Tribunal de Justiça do Ceará', contato: 'estagiotjce@tjce.jus.br' },
  { estado_uf: 'CE', nome_orgao: 'Ministério Público do Ceará', contato: '(85) 3452-3800' },
  { estado_uf: 'CE', nome_orgao: 'Defensoria Pública do Ceará', contato: 'estagio@defensoria.ce.gov.br' },
  { estado_uf: 'MT', nome_orgao: 'Tribunal de Justiça do Mato Grosso', contato: 'estagio@tjmt.jus.br' },
  { estado_uf: 'MT', nome_orgao: 'Ministério Público do Mato Grosso', contato: '(65) 3611-0000' },
  { estado_uf: 'SP', nome_orgao: 'Tribunal Regional do Trabalho - 2ª Região', contato: 'estagio@trt2.jus.br' },
  { estado_uf: 'RJ', nome_orgao: 'Tribunal de Justiça do Rio de Janeiro', contato: 'estagio@tjrj.jus.br' },
  { estado_uf: 'MG', nome_orgao: 'Tribunal de Justiça de Minas Gerais', contato: 'estagio@tjmg.jus.br' },
  { estado_uf: 'BA', nome_orgao: 'Ministério Público da Bahia', contato: 'estagio@mpba.mp.br' },
  { estado_uf: 'PA', nome_orgao: 'Tribunal de Justiça do Pará', contato: 'estagio@tjpa.jus.br' },
  { estado_uf: 'MA', nome_orgao: 'Defensoria Pública do Maranhão', contato: 'estagio@defensoria.ma.gov.br' },
  { estado_uf: 'GO', nome_orgao: 'Tribunal de Justiça de Goiás', contato: 'estagio@tjgo.jus.br' },
  { estado_uf: 'PE', nome_orgao: 'Tribunal de Justiça de Pernambuco', contato: 'estagio@tjpe.jus.br' },
  { estado_uf: 'DF', nome_orgao: 'Tribunal de Justiça do Distrito Federal', contato: 'estagio@tjdft.jus.br' },
];

const Estagio = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedUF, setSelectedUF] = useState<string | null>(null);

  const filtered = useMemo(
    () => selectedUF ? ORGAOS_CONVENIADOS.filter((e) => e.estado_uf === selectedUF.toUpperCase()) : [],
    [selectedUF]
  );

  const availableUFs = useMemo(
    () => [...new Set(ORGAOS_CONVENIADOS.map((e) => e.estado_uf))],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Estágio i9 — Órgãos Conveniados</title>
        <meta name="description" content="Encontre órgãos conveniados para estágio em todo o Brasil. Selecione seu estado e veja as oportunidades disponíveis." />
      </Helmet>
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
                availableUFs={availableUFs}
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

              {selectedUF && filtered.length === 0 && (
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
                        {item.contato && item.contato.includes('@') && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <a href={`mailto:${item.contato}`} className="hover:text-primary transition-colors link-underline">
                              {item.contato}
                            </a>
                          </div>
                        )}
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
