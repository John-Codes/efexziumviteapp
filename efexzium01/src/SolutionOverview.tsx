import { Paintbrush, Music, Video, DollarSign } from 'lucide-react';

export default function SolutionOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 sm:py-20 relative overflow-hidden">
      {/* Animated LED light strips */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute h-0.5 w-full top-0 animate-slide-right bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute h-0.5 w-full bottom-0 animate-slide-left bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Revolutionary LED Advertising
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto px-4">
            Transform your business visibility with our all-inclusive LED sign solution
          </p>
        </div>

        {/* Main feature showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* LED Sign Preview */}
          <div className="relative">
            <div className="aspect-video rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-8 border border-gray-700/50 overflow-hidden">
              {/* Simulated LED display */}
              <div className="h-full rounded-lg bg-black/50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 animate-pulse" />
                <div className="text-lg sm:text-2xl font-bold text-white z-10 text-center px-4">
                  Weather-Resistant RGB Display
                </div>
              </div>
            </div>
            {/* Feature badges - Repositioned and resized for mobile */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 lg:absolute lg:-right-2 lg:top-4 lg:space-y-2 lg:flex-col">
              <div className="bg-blue-500/90 text-white px-3 py-1 rounded-full lg:rounded-l-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                RGB Colors
              </div>
              <div className="bg-green-500/90 text-white px-3 py-1 rounded-full lg:rounded-l-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                Weather-Proof
              </div>
              <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full lg:rounded-l-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                24/7 Display
              </div>
            </div>
          </div>

          {/* Creative Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8 text-center lg:text-left">
              All-Inclusive Creative Services
            </h3>
            <div className="grid gap-4 sm:gap-6">
              {/* Art Creation */}
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/20 p-4 sm:p-6 rounded-xl border border-purple-500/20 transform hover:scale-105 transition-all">
                <Paintbrush className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-3 sm:mb-4" />
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Custom Art Design</h4>
                <p className="text-gray-300 text-sm sm:text-base">Professional artwork tailored to your brand</p>
              </div>
              
              {/* Video Creation */}
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/20 p-4 sm:p-6 rounded-xl border border-blue-500/20 transform hover:scale-105 transition-all">
                <Video className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-3 sm:mb-4" />
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Video Production</h4>
                <p className="text-gray-300 text-sm sm:text-base">Engaging video content that captures attention</p>
              </div>
              
              {/* Music Creation */}
              <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/20 p-4 sm:p-6 rounded-xl border border-pink-500/20 transform hover:scale-105 transition-all">
                <Music className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mb-3 sm:mb-4" />
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Music Production</h4>
                <p className="text-gray-300 text-sm sm:text-base">Custom audio to enhance your message</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing highlight */}
        <div className="max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20">
          <DollarSign className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Just $2/Day All-Inclusive
          </h3>
          <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
            Get everything you need to start advertising effectively: LED sign rental, custom content creation, and ongoing support.
          </p>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all">
            Start Your 30-Day Trial
          </button>
        </div>
      </div>
    </div>
  );
}