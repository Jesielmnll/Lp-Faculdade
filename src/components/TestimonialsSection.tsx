import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Gestora de RH',
    company: 'Tech Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'A i9 transformou minha carreira! O curso de RH me deu todas as ferramentas necessárias para crescer profissionalmente. Os professores são incríveis e o suporte é excepcional.',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Analista de Pessoas',
    company: 'StartupXYZ',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Estudar na i9 foi a melhor decisão da minha vida. A metodologia prática e o networking que construí abriram portas que eu nem imaginava. Recomendo muito!',
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    role: 'Coordenadora de T&D',
    company: 'Grupo Alpha',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'A pós-graduação em Liderança da i9 superou todas as minhas expectativas. Professores renomados, conteúdo atualizado e uma experiência de aprendizado única.',
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    role: 'Diretor de RH',
    company: 'Multinacional Corp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'A formação que recebi na i9 foi fundamental para minha ascensão profissional. Hoje, como diretor, aplico diariamente os conhecimentos adquiridos durante o curso.',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-32 bg-background relative">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que dizem nossos <span className="text-gradient-neon">i9Lovers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Histórias reais de transformação e sucesso profissional
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial card */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 relative card-hover-elevate">
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary glow-neon-soft"
                      />
                      <div>
                        <h4 className="font-display text-lg font-bold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-foreground/90 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary hover:glow-neon-soft transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary hover:glow-neon-soft transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-8 glow-neon"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
