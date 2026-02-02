import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MVVSection from '@/components/MVVSection';
import CoursesSection from '@/components/CoursesSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MVVSection />
        <CoursesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
