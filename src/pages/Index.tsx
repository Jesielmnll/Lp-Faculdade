import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ManifestoSection from '@/components/ManifestoSection';
import CommitmentSection from '@/components/CommitmentSection';
import SocialProofSection from '@/components/SocialProofSection';
import CtaFinalSection from '@/components/CtaFinalSection';
import Footer from '@/components/Footer';

/* Página principal — Home institucional da Faculdade i9 Educação */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Faculdade i9 Educação — Democratizando o ensino superior</title>
        <meta name="description" content="Faculdade i9 Educação: democratizando o ensino superior e transformando vidas com cursos de graduação, pós-graduação e extensão acessíveis." />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ManifestoSection />
        <CommitmentSection />
        <SocialProofSection />
        <CtaFinalSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
