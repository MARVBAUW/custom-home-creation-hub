import React, { useEffect, useState } from 'react';
import Container from '@/components/common/Container';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { fetchGoogleBusinessData } from '@/utils/googleBusiness';
import Button from '@/components/common/Button';

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusinessInfo] = useState<any>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const businessData = await fetchGoogleBusinessData();
        if (businessData && businessData.reviews) {
          setReviews(businessData.reviews);
          setBusinessInfo(businessData);
        }
      } catch (error) {
        console.error('Error loading Google reviews:', error);
        setError('Impossible de charger les avis Google. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white relative">
      {/* Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
      
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
            Témoignages Clients
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ce que disent nos clients
          </h2>
          <div className="h-1 w-16 bg-progineer-gold mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Découvrez les avis authentiques de nos clients satisfaits dans toute la région PACA.
          </p>
          
          {business && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center">
                <div className="flex">
                  {Array(Math.round(business.rating || 5)).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">{business.rating}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{reviews.length} avis sur Google</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-center bg-red-50 rounded-lg p-6 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

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
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 text-progineer-gold opacity-20">
                  <Quote className="h-12 w-12" />
                </div>
                
                <div className="flex mb-4">
                  {Array(review.rating || 5)).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 relative z-10">"{review.text}"</p>
                
                <div className="flex items-center">
                  <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center text-gray-500 font-semibold mr-3">
                    {review.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{review.author_name}</div>
                    <div className="text-sm text-gray-500">{review.relative_time_description || "Client satisfait"}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button 
            href="https://g.page/r/CQrPRwGqQEJs/review" 
            isExternal={true}
            variant="outline" 
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Voir tous nos avis Google
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
