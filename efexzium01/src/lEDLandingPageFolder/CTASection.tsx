
import { Sparkles, ArrowRight, Monitor } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="py-8 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-black">
      {/* Animated background gradients - adjusted size for mobile */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-full sm:w-1/2 h-1/3 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-full sm:w-1/2 h-1/3 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main CTA Container - increased padding for mobile */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mx-auto max-w-lg sm:max-w-none">
          {/* Content wrapper with improved mobile spacing */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
            {/* LED Sign Icon - adjusted size for mobile */}
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/20">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
            </div>

            {/* Heading - with improved text contrast */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 max-w-2xl px-4 text-white">
              Ready to unlock the power of
              <span className="relative mx-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  LED advertising
                </span>
                <span className="absolute inset-x-0 bottom-0 h-2 sm:h-3 bg-gradient-to-r from-purple-400/20 to-blue-400/20 transform -skew-x-12" />
              </span>
              ?
            </h2>

            {/* Subtext - adjusted for mobile */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-xl px-4">
              Sign up now and get your LED sign rental started!
            </p>

            {/* CTA Button Group - stacked on mobile */}
            <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-md justify-center items-center px-4">
              {/* Main CTA Button */}
              <button className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-base sm:text-lg group relative overflow-hidden shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your LED Sign Rental
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Secondary Action */}
              <button className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors py-2">
                Learn More
              </button>
            </div>

            {/* Trust Indicators - adjusted for mobile */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-sm border border-gray-700/50" />
        </div>
      </div>
    </div>
  );
}