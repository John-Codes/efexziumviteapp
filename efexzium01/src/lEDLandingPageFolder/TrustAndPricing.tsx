import { Medal, Check, Star, Clock, Users, BadgeCheck } from 'lucide-react';

export default function TrustAndPricing() {
  const pricingPlan = {
    name: "Daily Rental",
    price: "$20",
    period: "day",
    features: [
      "RGB LED Display",
      "Creative Services",
      "24/7 Support",
      "No Contract Required"
    ]
  };

  return (
    <div className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-full lg:w-1/2 h-1/3 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-full lg:w-1/2 h-1/3 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Trust Section */}
        <div className="text-center mb-32 lg:mb-40">
          {/* Availability Badge */}
          <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 mb-12">
            <Medal className="w-5 h-5 text-red-400" />
            <span className="text-base text-red-400 font-medium">Only 3 Spaces Available!</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-10 px-4 leading-tight">
            Experience and Excellence in
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              LED Advertising
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-24 lg:mb-32 px-4 leading-relaxed">
            We're committed to providing the highest-quality LED sign rentals and expert art, video, and music creation services. Due to high demand, we currently have only 3 client spaces remaining this month.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto px-4">
            {[
              {
                icon: <Clock className="w-8 h-8 text-purple-400" />,
                title: "Years of Experience",
                desc: "Industry expertise you can trust"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                desc: "Dedicated creative professionals"
              },
              {
                icon: <Star className="w-8 h-8 text-purple-400" />,
                title: "Quality Service",
                desc: "Committed to your success"
              }
            ].map((item, index) => (
              <div key={index} className="p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                <div className="p-4 bg-purple-500/10 rounded-full w-fit mx-auto mb-8">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-10 px-4">
            Limited Time Offer
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-20 px-4">
            Secure your spot before all spaces are filled
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-lg mx-auto px-4">
          <div className="relative pt-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white text-base font-medium shadow-lg shadow-red-500/20">
              Limited Availability
            </div>
            
            <div className="h-full p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-red-500/50 backdrop-blur-sm mt-8">
              <h3 className="text-2xl font-semibold text-white mb-6">{pricingPlan.name}</h3>
              
              <div className="mb-10">
                <span className="text-5xl font-bold text-white">{pricingPlan.price}</span>
                <span className="text-gray-400 text-xl">/{pricingPlan.period}</span>
                <div className="mt-4 inline-flex items-center gap-2 text-red-400 text-base">
                  <BadgeCheck className="w-5 h-5" />
                  Only 3 spaces left
                </div>
              </div>

              <ul className="space-y-6 mb-12">
                {pricingPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-lg">
                    <Check className="w-6 h-6 mr-4 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="https://www.paypal.com/ncp/payment/4Y3EVTGZ4HZNA"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 rounded-full text-white text-lg font-semibold transition-all bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/20 text-center"
              >
                Secure Your Spot Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}