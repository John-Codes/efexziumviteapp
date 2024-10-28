import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, Sparkles, Target } from 'lucide-react';

// Import SVGs from assets
import SarahAvatar from "../assets/testimonials/sarah.svg";
import MichaelAvatar from "../assets/testimonials/michael.svg";
import EmilyAvatar from "../assets/testimonials/emily.svg";

// Types
interface Metric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
  metric: Metric;
}

// Optional: Add loading and error handling for images
interface ImageState {
  isLoading: boolean;
  hasError: boolean;
}

export default function TestimonialsSection(): JSX.Element {
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      quote: "Our LED sign rental from 914AI has increased foot traffic and sales by 20%!",
      author: "Sarah Johnson",
      position: "Owner, The Coffee House",
      avatar: SarahAvatar,
      rating: 5,
      metric: {
        label: "Sales Increase",
        value: "20%",
        icon: <TrendingUp className="w-5 h-5" />
      }
    },
    {
      quote: "The art and video creation services were top-notch and really made our ad stand out",
      author: "Michael Chen",
      position: "Marketing Director, Urban Fitness",
      avatar: MichaelAvatar,
      rating: 5,
      metric: {
        label: "Creative Services",
        value: "Premium",
        icon: <Sparkles className="w-5 h-5" />
      }
    },
    {
      quote: "We've tried other advertising methods, but this is by far the most effective and cost-efficient way to reach our target audience",
      author: "Emily Rodriguez",
      position: "CEO, Local Eats",
      avatar: EmilyAvatar,
      rating: 5,
      metric: {
        label: "ROI Rating",
        value: "Excellent",
        icon: <Target className="w-5 h-5" />
      }
    }
  ];

  const handleImageLoad = (index: number): void => {
    setImageStates(prev => ({
      ...prev,
      [index]: { isLoading: false, hasError: false }
    }));
  };

  const handleImageError = (index: number): void => {
    setImageStates(prev => ({
      ...prev,
      [index]: { isLoading: false, hasError: true }
    }));
  };

  const nextTestimonial = (): void => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = (): void => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderAvatar = (testimonial: Testimonial, index: number): JSX.Element => {
    const imageState = imageStates[index] || { isLoading: true, hasError: false };

    return (
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-purple-500/50 overflow-hidden relative">
        {imageState.isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        {imageState.hasError ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
            {testimonial.author.charAt(0)}
          </div>
        ) : (
          <img
            src={testimonial.avatar}
            alt={`${testimonial.author} - ${testimonial.position}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageState.isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageError(index)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 sm:py-12 md:py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Success Stories
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto px-4">
            See how businesses like yours are achieving remarkable results
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm mx-auto">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 sm:-left-4 p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full">
                <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Content */}
              <div className="mb-6 sm:mb-8">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 italic mb-6 sm:mb-8 mt-4">
                  "{testimonials[activeIndex].quote}"
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                  {testimonials[activeIndex].metric.icon}
                  <span className="text-sm sm:text-base text-gray-400">{testimonials[activeIndex].metric.label}:</span>
                  <span className="text-sm sm:text-base text-green-400 font-semibold">{testimonials[activeIndex].metric.value}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                {renderAvatar(testimonials[activeIndex], activeIndex)}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white">
                    {testimonials[activeIndex].author}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400">
                    {testimonials[activeIndex].position}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Desktop */}
            <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="transform -translate-x-1/2 p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white pointer-events-auto hover:shadow-lg hover:shadow-purple-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="transform translate-x-1/2 p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white pointer-events-auto hover:shadow-lg hover:shadow-purple-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6 sm:hidden">
          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Join these successful businesses</p>
          <button 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Start Your Success Story
          </button>
        </div>
      </div>
    </div>
  );
}