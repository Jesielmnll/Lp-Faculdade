import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Quais são as formas de pagamento disponíveis?',
    answer: 'Oferecemos diversas opções de pagamento: cartão de crédito (parcelamento em até 12x), boleto bancário, PIX com desconto especial, e financiamento estudantil. Entre em contato com nossa equipe para encontrar a melhor opção para você.',
  },
  {
    question: 'O diploma é reconhecido pelo MEC?',
    answer: 'Sim! A Faculdade i9 Educação é uma instituição credenciada pelo MEC. Todos os nossos cursos de graduação e pós-graduação possuem reconhecimento oficial, garantindo a validade do seu diploma em todo o território nacional.',
  },
  {
    question: 'Como funciona a metodologia de ensino?',
    answer: 'Nossa metodologia combina teoria e prática através de uma plataforma moderna e intuitiva. Você terá acesso a videoaulas, materiais complementares, fóruns de discussão, atividades práticas e suporte de tutores especializados durante toda a jornada.',
  },
  {
    question: 'Qual a duração dos cursos?',
    answer: 'A duração varia de acordo com o tipo de formação: cursos de graduação têm duração de 2 a 4 anos, enquanto as pós-graduações variam entre 6 a 18 meses. Consulte a página do curso desejado para informações específicas.',
  },
  {
    question: 'Posso estudar no meu próprio ritmo?',
    answer: 'Absolutamente! Nossos cursos são 100% online e flexíveis. Você pode acessar o conteúdo a qualquer momento, de qualquer lugar, e organizar seus estudos de acordo com sua rotina. Apenas fique atento aos prazos de entrega das atividades.',
  },
  {
    question: 'Há suporte ao aluno durante o curso?',
    answer: 'Sim! Oferecemos suporte completo através de múltiplos canais: tutores especializados nas disciplinas, secretaria online, chat de atendimento, e-mail e telefone. Nossa equipe está sempre pronta para ajudar em sua jornada acadêmica.',
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-secondary/30 relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Perguntas <span className="text-gradient-neon">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tire suas dúvidas sobre a i9 Educação
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "bg-gradient-card rounded-2xl border border-border/50 px-6 overflow-hidden transition-all duration-300 hover:border-primary/30 data-[state=open]:border-primary/50 data-[state=open]:glow-neon-soft",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-foreground hover:text-primary transition-colors py-6 hover:no-underline [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
