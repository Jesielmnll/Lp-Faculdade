import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MVVSection from '@/components/MVVSection';
import DiferenciaisSection from '@/components/JourneySection';
import CoursesSection from '@/components/CoursesSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Faculdade i9 Educação — Cursos de Graduação e Pós</title>
        <meta name="description" content="Faculdade i9 Educação: cursos de graduação e pós-graduação com metodologias inovadoras. Transforme sua carreira com educação de qualidade." />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MVVSection />
        <DiferenciaisSection />
        <CoursesSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
