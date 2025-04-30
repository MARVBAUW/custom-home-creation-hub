
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogArticleDetail from '@/components/blog/BlogArticleDetail';

const BlogArticle: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <BlogArticleDetail />
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
