import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks/useWordPress';
import SkeletonCard from '@/components/SkeletonCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import type { WPPost } from '@/services/api';

function getFeaturedImage(post: WPPost): string {
  return post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop';
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const Blog = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePosts(page, 9);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog — Faculdade i9 Educação</title>
        <meta name="description" content="Artigos, insights e novidades sobre educação, gestão e carreira no blog da Faculdade i9." />
      </Helmet>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog <span className="text-gradient-neon">i9</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Artigos, insights e novidades do mundo da educação e gestão
            </p>
          </div>

          {/* Posts grid */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Não foi possível carregar os posts. Tente novamente mais tarde.</p>
            </div>
          )}

          {data && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.posts.map((post, index) => (
                  <Link
                    to={`/blog/${post.slug}`}
                    key={post.id}
                    className={cn(
                      "group rounded-2xl overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 card-hover-elevate"
                    )}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={getFeaturedImage(post)}
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

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <Button
                    variant="neonOutline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  <span className="text-muted-foreground text-sm">
                    Página {page} de {data.totalPages}
                  </span>
                  <Button
                    variant="neonOutline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
