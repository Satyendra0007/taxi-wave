import { useState } from 'react'
import { Clock, Car, Users, MapPin, Phone, Calendar, Star, Shield, Timer } from 'lucide-react'

export default function HourlyRental() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: 'standard',
    hours: '2',
    date: '',
    startTime: '',
    pickupLocation: '',
    additionalServices: []
  })

  const hourlyPackages = [
    {
      id: 'standard',
      name: 'Standard Package',
      vehicle: 'Volkswagen Golf',
      seats: 4,
      hourlyRate: 30,
      features: ['Professional Driver', 'Fuel Included', 'City Coverage'],
      icon: '🚗',
      popular: false
    },
    {
      id: 'comfort',
      name: 'Comfort Package',
      vehicle: 'Audi A4',
      seats: 4,
      hourlyRate: 45,
      features: ['Premium Vehicle', 'WiFi', 'Refreshments', 'Extended Coverage'],
      icon: '🚙',
      popular: true
    },
    {
      id: 'business',
      name: 'Business Package',
      vehicle: 'Mercedes E-Class',
      seats: 4,
      hourlyRate: 60,
      features: ['Executive Vehicle', 'Privacy Glass', 'Complimentary Drinks', 'Priority Support'],
      icon: '🏎️',
      popular: false
    },
    {
      id: 'van',
      name: 'Group Package',
      vehicle: 'Mercedes Vito',
      seats: 8,
      hourlyRate: 50,
      features: ['Spacious Van', 'Extra Luggage', 'Group Discounts', 'Flexible Routes'],
      icon: '🚐',
      popular: false
    }
  ]

  const additionalServices = [
    { id: 'airport', name: 'Airport Transfer', price: 15, description: 'Pickup/drop-off at any Belgian airport' },
    { id: 'guide', name: 'Tour Guide', price: 25, description: 'Professional English/Dutch/French speaking guide' },
    { id: 'child', name: 'Child Seats', price: 5, description: 'Safety seats for children' },
    { id: 'luggage', name: 'Extra Luggage', price: 10, description: 'Additional luggage space' },
    { id: 'night', name: 'Night Service', price: 20, description: 'Service between 22:00-06:00' }
  ]

  const useCases = [
    {
      title: 'City Tours',
      description: 'Explore Belgian cities with a knowledgeable driver',
      icon: MapPin,
      hours: '4-6 hours',
      price: '€120-300'
    },
    {
      title: 'Business Meetings',
      description: 'Professional transport for multiple business appointments',
      icon: Car,
      hours: '8 hours',
      price: '€240-480'
    },
    {
      title: 'Shopping Tours',
      description: 'Visit multiple shopping locations with convenience',
      icon: Users,
      hours: '3-5 hours',
      price: '€90-250'
    },
    {
      title: 'Events & Weddings',
      description: 'Reliable transportation for special occasions',
      icon: Star,
      hours: '6-8 hours',
      price: '€180-400'
    }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        additionalServices: checked 
          ? [...prev.additionalServices, value]
          : prev.additionalServices.filter(service => service !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateTotalPrice = () => {
    const packageData = hourlyPackages.find(p => p.id === formData.vehicleType)
    const basePrice = packageData.hourlyRate * parseInt(formData.hours)
    const servicesPrice = additionalServices
      .filter(service => formData.additionalServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0)
    return basePrice + servicesPrice
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Hourly rental data:', formData)
    alert('Hourly rental booked! We will contact you shortly.')
  }

  return (
    <section id="hourly" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4">
            Hourly Rental Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a private driver by the hour. Perfect for city tours, business meetings, shopping, or special events.
          </p>
        </div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-blue-100 rounded-lg p-3 inline-block mb-4">
                <useCase.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{useCase.hours}</span>
                <span className="font-bold text-blue-600">{useCase.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Hourly Rental</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+32 2 123 45 67"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Rental Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Rental Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <select
                      name="hours"
                      value={formData.hours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                      <option value="12">12 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pickup address"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h4>
                <div className="space-y-3">
                  {additionalServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="additionalServices"
                          value={service.id}
                          checked={formData.additionalServices.includes(service.id)}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-600">{service.description}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-blue-600">+€{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-800">Total Price</div>
                    <div className="text-2xl font-bold text-blue-900">€{calculateTotalPrice()}</div>
                    <div className="text-xs text-blue-700">For {formData.hours} hours</div>
                  </div>
                  <Timer className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition"
              >
                Book Hourly Rental
              </button>
            </form>
          </div>

          {/* Right Side - Packages */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Package</h3>
              <div className="space-y-4">
                {hourlyPackages.map(pkg => (
                  <div 
                    key={pkg.id} 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      formData.vehicleType === pkg.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, vehicleType: pkg.id }))}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{pkg.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center space-x-2">
                              <span>{pkg.name}</span>
                              {pkg.popular && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{pkg.vehicle} • {pkg.seats} seats</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">€{pkg.hourlyRate}</div>
                            <div className="text-xs text-gray-500">per hour</div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {pkg.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Benefits of Hourly Rental</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Flexible Timing</div>
                    <div className="text-sm opacity-90">Driver stays with you for the entire duration</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Multiple Stops</div>
                    <div className="text-sm opacity-90">Visit multiple locations without extra booking</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Professional Service</div>
                    <div className="text-sm opacity-90">Experienced drivers with excellent knowledge</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Car className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Comfort Guaranteed</div>
                    <div className="text-sm opacity-90">Premium vehicles for your comfort</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
