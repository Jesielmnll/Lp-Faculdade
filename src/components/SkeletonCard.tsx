import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  variant?: 'blog' | 'simple';
}

const SkeletonCard = ({ className, variant = 'blog' }: SkeletonCardProps) => {
  if (variant === 'simple') {
    return (
      <div className={cn("rounded-2xl bg-gradient-card border border-border/50 p-6 animate-pulse", className)}>
        <div className="h-4 bg-muted rounded w-3/4 mb-3" />
        <div className="h-3 bg-muted rounded w-full mb-2" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl overflow-hidden bg-gradient-card border border-border/50 animate-pulse", className)}>
      <div className="h-48 bg-muted" />
      <div className="p-6">
        <div className="h-3 bg-muted rounded w-24 mb-3" />
        <div className="h-5 bg-muted rounded w-3/4 mb-3" />
        <div className="h-3 bg-muted rounded w-full mb-2" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  );
};

export default SkeletonCard;
