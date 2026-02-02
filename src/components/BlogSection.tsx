import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const blogPosts = [
  {
    id: 1,
    title: 'O Futuro do RH: Tendências para 2025',
    excerpt: 'Descubra as principais tendências que estão moldando o futuro da gestão de pessoas e como se preparar.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    category: 'Destaque',
    date: '15 Jan 2025',
  },
  {
    id: 2,
    title: 'Como Desenvolver Líderes na Era Digital',
    excerpt: 'Estratégias práticas para desenvolver lideranças adaptáveis e preparadas para os desafios modernos.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    category: 'Blog',
    date: '10 Jan 2025',
  },
  {
    id: 3,
    title: 'People Analytics: Decisões Baseadas em Dados',
    excerpt: 'Aprenda como usar dados para tomar decisões mais inteligentes na gestão de talentos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    category: 'Blog',
    date: '05 Jan 2025',
  },
];

const BlogSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="blog" className="py-32 bg-secondary/30 relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Conteúdos <span className="text-gradient-neon">Exclusivos</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Artigos, insights e novidades do mundo da educação e gestão
            </p>
          </div>
          <Button variant="neonOutline" className="self-start md:self-auto group">
            Ver Todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={cn(
                "group rounded-2xl overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer card-hover-elevate",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      post.category === 'Destaque'
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
