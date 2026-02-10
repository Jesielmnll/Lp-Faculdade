import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePosts } from '@/hooks/useWordPress';
import SkeletonCard from '@/components/SkeletonCard';
import { cn } from '@/lib/utils';
import type { WPPost } from '@/services/api';

// Fallback mock data when API is unavailable
const fallbackPosts = [
  {
    id: 1,
    title: { rendered: 'O Futuro do RH: Tendências para 2025' },
    excerpt: { rendered: 'Descubra as principais tendências que estão moldando o futuro da gestão de pessoas.' },
    slug: 'futuro-do-rh',
    date: '2025-01-15T00:00:00',
    featured_media: 0,
    content: { rendered: '' },
  },
  {
    id: 2,
    title: { rendered: 'Como Desenvolver Líderes na Era Digital' },
    excerpt: { rendered: 'Estratégias práticas para desenvolver lideranças adaptáveis e preparadas.' },
    slug: 'lideres-era-digital',
    date: '2025-01-10T00:00:00',
    featured_media: 0,
    content: { rendered: '' },
  },
  {
    id: 3,
    title: { rendered: 'People Analytics: Decisões Baseadas em Dados' },
    excerpt: { rendered: 'Aprenda como usar dados para tomar decisões mais inteligentes na gestão de talentos.' },
    slug: 'people-analytics',
    date: '2025-01-05T00:00:00',
    featured_media: 0,
    content: { rendered: '' },
  },
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
];

function getFeaturedImage(post: WPPost, index: number): string {
  return post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || fallbackImages[index % fallbackImages.length];
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const BlogSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { data, isLoading, isError } = usePosts(1, 3);

  const posts = data?.posts || (isError ? fallbackPosts as unknown as WPPost[] : []);

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
          <Link to="/blog">
            <Button variant="neonOutline" className="self-start md:self-auto group">
              Ver Todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className={cn(
                  "group rounded-2xl overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer card-hover-elevate",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getFeaturedImage(post, index)}
                    alt={stripHtml(post.title.rendered)}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3
                    className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {stripHtml(post.excerpt.rendered)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Ler mais
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
