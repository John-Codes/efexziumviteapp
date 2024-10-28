
import { 
  Palette, 
  CloudSun, 
  Paintbrush, 
  DollarSign, 
  Settings,
  Check
} from 'lucide-react';

export default function FeaturesAndBenefits() {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "RGB Colors",
      description: "Vibrant, eye-catching displays that command attention",
      benefits: [
        "16.7 million colors available",
        "Customizable animations",
        "High-contrast display",
        "Visible day and night"
      ],
      gradient: "from-purple-500 to-blue-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400"
    },
    {
      icon: <CloudSun className="w-8 h-8" />,
      title: "Weather-Resistant",
      description: "Built to withstand harsh environmental conditions",
      benefits: [
        "IP65 weather protection",
        "Temperature resistant",
        "Anti-UV coating",
        "Durable aluminum frame"
      ],
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400"
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: "Free Creative Services",
      description: "Professional content creation included in your rental",
      benefits: [
        "Custom artwork design",
        "Professional video production",
        "Background music creation",
        "Regular content updates"
      ],
      gradient: "from-pink-500 to-rose-500",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost-Effective",
      description: "Affordable advertising that delivers results",
      benefits: [
        "Just $20/day all-inclusive",
        "No hidden fees",
        "Free maintenance",
        "Cancel anytime"
      ],
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Easy to Use",
      description: "Simple setup and operation for your convenience",
      benefits: [
        "Quick installation",
        "User-friendly interface",
        "24/7 technical support",
        "Remote content updates"
      ],
      gradient: "from-orange-500 to-yellow-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Everything you need to transform your advertising strategy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Feature Card */}
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                {/* Icon */}
                <div className={`p-3 ${feature.iconBg} rounded-full w-fit mb-4`}>
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -m-1 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex gap-6 p-1 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-0.5 transition-all">
              Start Your Free Trial
            </button>
            <button className="px-6 py-3 rounded-full text-gray-300 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}