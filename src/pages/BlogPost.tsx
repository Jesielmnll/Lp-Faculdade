import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { usePost } from '@/hooks/useWordPress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { WPPost } from '@/services/api';

function getFeaturedImage(post: WPPost): string {
  return post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
}

function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Equipe i9';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePost(slug || '');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>

          {isLoading && (
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-48 mb-8" />
              <div className="h-64 bg-muted rounded-2xl mb-8" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
                ))}
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Post não encontrado.</p>
            </div>
          )}

          {post && (
            <article className="max-w-3xl mx-auto">
              <h1
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{getAuthorName(post)}</span>
                </div>
              </div>

              {getFeaturedImage(post) && (
                <img
                  src={getFeaturedImage(post)}
                  alt=""
                  className="w-full rounded-2xl mb-10 object-cover max-h-[500px]"
                />
              )}

              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-foreground prose-headings:leading-tight
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-img:rounded-xl
                  prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                  prose-li:text-muted-foreground
                  prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-hr:border-border"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
