import { Check, Star, Users, Car } from 'lucide-react'

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Standard",
      price: "€25",
      unit: "base fare",
      description: "Perfect for everyday travel",
      features: [
        "Professional driver",
        "GPS tracking",
        "Air conditioning",
        "4 passengers max",
        "Standard sedan",
        "24/7 availability"
      ],
      popular: false,
      icon: Car
    },
    {
      name: "Comfort",
      price: "€35",
      unit: "base fare",
      description: "Enhanced comfort for longer journeys",
      features: [
        "Premium vehicles",
        "Experienced drivers",
        "WiFi on board",
        "4 passengers max",
        "Comfort sedan/SUV",
        "Priority booking"
      ],
      popular: true,
      icon: Star
    },
    {
      name: "Business",
      price: "€45",
      unit: "base fare",
      description: "Corporate travel solution",
      features: [
        "Luxury vehicles",
        "Executive drivers",
        "Complimentary water",
        "4 passengers max",
        "Mercedes/BMW",
        "Corporate billing"
      ],
      popular: false,
      icon: Users
    },
    {
      name: "Van",
      price: "€55",
      unit: "base fare",
      description: "Group transportation",
      features: [
        "Spacious vans",
        "Experienced group drivers",
        "Extra luggage space",
        "Up to 8 passengers",
        "Modern fleet",
        "Group discounts"
      ],
      popular: false,
      icon: Users
    }
  ]

  const additionalFees = [
    { description: "Airport pickup", fee: "€10" },
    { description: "Night service (22:00-06:00)", fee: "+20%" },
    { description: "Waiting time", fee: "€0.50/minute" },
    { description: "Luggage (per extra piece)", fee: "€2" },
    { description: "Child seat", fee: "Free" },
    { description: "Pet transport", fee: "€5" }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear, upfront pricing with no hidden fees. Choose the service that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-6 relative ${
                plan.popular ? 'ring-2 ring-yellow-400 shadow-xl' : 'shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="bg-yellow-400 rounded-lg p-3 inline-block mb-4">
                  <plan.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                <div className="text-gray-600 text-sm">{plan.unit}</div>
                <p className="text-gray-600 mt-3">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalFees.map((fee, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">{fee.description}</span>
                <span className="font-semibold text-gray-900">{fee.fee}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Final price may vary based on traffic conditions, exact distance, and time of travel. 
              All prices include VAT. You'll receive the exact fare before confirming your booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
