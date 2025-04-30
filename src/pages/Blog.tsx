
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogArticlesList from '@/components/blog/BlogArticlesList';

const Blog: React.FC = () => {
  return (
    <>
      <SEO 
        title="Blog | Maître d'œuvre Progineer en PACA"
        description="Découvrez nos conseils d'experts sur la construction, la rénovation, et la maîtrise d'œuvre en PACA. Articles rédigés par des professionnels de la construction."
        keywords="blog maître d'œuvre, conseils construction PACA, articles rénovation, expertise bâtiment, conseils immobilier"
        canonicalUrl="https://progineer.fr/blog"
      />

      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Blog Progineer
              </h1>
              <p className="text-lg text-gray-600">
                Conseils d'experts, tendances et informations sur la construction et la maîtrise d'œuvre en région PACA
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <BlogArticlesList showPagination showFilters />
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Blog;
