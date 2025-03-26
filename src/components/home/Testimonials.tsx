
import React, { useEffect, useState } from 'react';
import Container from '@/components/common/Container';
import { Star, Quote } from 'lucide-react';
import { fetchGoogleBusinessData } from '@/utils/googleBusiness';

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const businessData = await fetchGoogleBusinessData();
        if (businessData && businessData.reviews) {
          setReviews(businessData.reviews);
        }
      } catch (error) {
        console.error('Error loading Google reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="py-20 bg-stone-50">
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Placeholder loaders while fetching reviews
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-5 w-5 mr-1 bg-gray-200 rounded-full" />
                  ))}
                </div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            reviews.slice(0, 3).map((review, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative"
              >
                <div className="absolute top-6 right-6 text-khaki-200 opacity-30">
                  <Quote className="h-12 w-12" />
                </div>
                
                <div className="flex mb-4">
                  {Array(review.rating || 5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 relative z-10">"{review.text}"</p>
                
                <div>
                  <div className="font-semibold">{review.author_name}</div>
                  <div className="text-sm text-gray-500">{review.relative_time_description || "Client satisfait"}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
