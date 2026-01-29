import { Car, Users2, Briefcase, Plane, Shield, Clock, Star, TrendingUp, Award } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Car,
      title: "City Transfers",
      description: "Quick and reliable transfers within Belgian cities. Perfect for daily commutes and business meetings.",
      features: ["Professional drivers", "GPS tracking", "Air conditioning", "24/7 availability"],
      stats: { rides: "50,000+", rating: "4.8/5" }
    },
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Hassle-free airport transfers to and from Brussels, Charleroi, and all Belgian airports.",
      features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "Fixed pricing"],
      stats: { rides: "25,000+", rating: "4.9/5" }
    },
    {
      icon: Briefcase,
      title: "Business Travel",
      description: "Premium corporate travel solutions with invoicing and account management for businesses.",
      features: ["Corporate accounts", "Monthly billing", "Executive vehicles", "Priority service"],
      stats: { rides: "10,000+", rating: "4.7/5" }
    },
    {
      icon: Users2,
      title: "Group Transportation",
      description: "Spacious vans and minibuses for group travel, events, and special occasions.",
      features: ["Up to 8 passengers", "Luggage space", "Group discounts", "Experienced drivers"],
      stats: { rides: "15,000+", rating: "4.6/5" }
    }
  ]

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-sky-50 opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white to-transparent opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-full bg-gradient-to-t from-white to-transparent opacity-10 animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4 animate-slide-down">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay-1">
            We offer comprehensive taxi services across Belgium to meet all your transportation needs
          </p>
        </div>

        <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-blue-300 animate-fade-in-delay-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg p-3 inline-block mb-4 animate-bounce-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{service.stats.rides}</span> rides
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{service.stats.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl p-8 animate-fade-in-delay-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-delay-4">
              <div className="bg-white rounded-lg p-4 inline-block mb-3 animate-bounce-in">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Fully Licensed</h4>
              <p className="text-gray-600 text-sm">All our vehicles are fully insured</p>
            </div>
            <div className="animate-fade-in-delay-5">
              <div className="bg-white rounded-lg p-4 inline-block mb-3 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Service</h4>
              <p className="text-gray-600 text-sm">Always available</p>
            </div>
            <div className="animate-fade-in-delay-6">
              <div className="bg-white rounded-lg p-4 inline-block mb-3 animate-bounce-in" style={{ animationDelay: '1s' }}>
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional</h4>
              <p className="text-gray-600 text-sm">Premium service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
