import { Car, Users, Briefcase, Plane, Clock, Shield } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Car,
      title: "City Transfers",
      description: "Quick and reliable transfers within Belgian cities. Perfect for daily commutes and business meetings.",
      features: ["Professional drivers", "GPS tracking", "Air conditioning", "24/7 availability"]
    },
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Hassle-free airport transfers to and from Brussels, Charleroi, and all Belgian airports.",
      features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "Fixed pricing"]
    },
    {
      icon: Briefcase,
      title: "Business Travel",
      description: "Premium corporate travel solutions with invoicing and account management for businesses.",
      features: ["Corporate accounts", "Monthly billing", "Executive vehicles", "Priority service"]
    },
    {
      icon: Users,
      title: "Group Transportation",
      description: "Spacious vans and minibuses for group travel, events, and special occasions.",
      features: ["Up to 8 passengers", "Luggage space", "Group discounts", "Experienced drivers"]
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive taxi services across Belgium to meet all your transportation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg p-3 inline-block mb-4">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-100">Available Service</div>
            </div>
            <div>
              <Shield className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-blue-100">Insured Rides</div>
            </div>
            <div>
              <Car className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-blue-100">Vehicle Fleet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
