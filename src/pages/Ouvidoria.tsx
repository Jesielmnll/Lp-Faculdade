import { useState, useCallback } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSubmitOuvidoria } from '@/hooks/useWordPress';
import { RECAPTCHA_SITE_KEY } from '@/config/api';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { z } from 'zod';

const ouvidoriaSchema = z.object({
  nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail muito longo'),
  mensagem: z.string().trim().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(2000, 'Mensagem muito longa'),
});

type FormData = z.infer<typeof ouvidoriaSchema>;

const Ouvidoria = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [form, setForm] = useState<FormData>({ nome: '', email: '', mensagem: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitOuvidoria();

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = ouvidoriaSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // reCAPTCHA v2/v3 token
    let recaptchaToken = '';
    try {
      if (window.grecaptcha && RECAPTCHA_SITE_KEY) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: 'ouvidoria' })
              .then(resolve)
              .catch(reject);
          });
        });
      }
    } catch {
      // Continue without reCAPTCHA in dev
    }

    mutation.mutate(
      {
        nome: result.data.nome,
        email: result.data.email,
        mensagem: result.data.mensagem,
        recaptcha_token: recaptchaToken,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setForm({ nome: '', email: '', mensagem: '' });
        },
      }
    );
  };

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
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              <span className="text-gradient-neon">Ouvidoria</span>
            </h1>
            <p className="text-muted-foreground text-lg text-center mb-12">
              Sua opinião é muito importante para nós. Envie sua mensagem abaixo.
            </p>

            {submitted ? (
              <div className="text-center bg-primary/10 border border-primary/30 rounded-2xl p-10">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Mensagem Enviada!</h2>
                <p className="text-muted-foreground">Agradecemos seu contato. Retornaremos em breve.</p>
                <Button variant="neonOutline" className="mt-6" onClick={() => setSubmitted(false)}>
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-foreground mb-2 block">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={form.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Seu nome completo"
                    className={cn(errors.nome && "border-destructive")}
                  />
                  {errors.nome && <p className="text-destructive text-sm mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground mb-2 block">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className={cn(errors.email && "border-destructive")}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-foreground mb-2 block">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    rows={6}
                    value={form.mensagem}
                    onChange={(e) => handleChange('mensagem', e.target.value)}
                    placeholder="Descreva sua mensagem, sugestão ou reclamação..."
                    className={cn(errors.mensagem && "border-destructive")}
                  />
                  {errors.mensagem && <p className="text-destructive text-sm mt-1">{errors.mensagem}</p>}
                </div>

                {mutation.isError && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Erro ao enviar mensagem. Tente novamente.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="neon"
                  size="xl"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Enviando...' : 'Enviar Mensagem'}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Extend window for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default Ouvidoria;
