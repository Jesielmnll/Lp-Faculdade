import { Instagram, Linkedin, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  courses: [
    { label: 'Recursos Humanos', href: '#' },
    { label: 'MBA Gestão de Pessoas', href: '#' },
    { label: 'Liderança', href: '#' },
    { label: 'Gestão de Projetos', href: '#' },
  ],
  support: [
    { label: 'FAQ', href: '#' },
    { label: 'Ouvidoria', href: '#ouvidoria' },
    { label: 'Secretaria Online', href: '#' },
    { label: 'Biblioteca', href: '#' },
  ],
  portal: [
    { label: 'Área do Aluno', href: '#' },
    { label: 'Área do Professor', href: '#' },
    { label: 'Estágio', href: '#estagio' },
    { label: 'Nupeci', href: '#nupeci' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center glow-neon-soft">
                <span className="text-primary-foreground font-display font-bold text-2xl">i9</span>
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                Educação
              </span>
            </a>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Desenvolvendo pessoas e transformando histórias através de uma educação 
              inovadora e de excelência.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:glow-neon-soft transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Nossos Cursos</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Portal do Aluno</h4>
            <ul className="space-y-3">
              {footerLinks.portal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Credentials */}
        <div className="border-t border-border/50 pt-10 mb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">E-mail</h5>
                <a href="mailto:contato@i9educacao.edu.br" className="text-muted-foreground hover:text-primary transition-colors link-underline">
                  contato@i9educacao.edu.br
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Telefone</h5>
                <a href="tel:+5511999999999" className="text-muted-foreground hover:text-primary transition-colors link-underline">
                  (11) 99999-9999
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Endereço</h5>
                <p className="text-muted-foreground">
                  Av. Paulista, 1000 - São Paulo, SP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="border-t border-border/50 pt-10 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* e-MEC Badge */}
            <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-foreground text-xs text-center">e-MEC<br/>✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Instituição Credenciada</p>
                <p className="text-xs text-muted-foreground">Consulte no e-MEC</p>
              </div>
            </div>

            {/* Reclame Aqui Badge */}
            <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-primary text-2xl">RA</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Reclame Aqui</p>
                <p className="text-xs text-muted-foreground">Nota: Ótimo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Faculdade i9 Educação. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors link-underline">
              Política de Privacidade
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors link-underline">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
