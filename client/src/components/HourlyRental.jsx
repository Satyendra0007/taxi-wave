import { useState } from 'react'
import { Clock, Car, Users, MapPin, Calendar, Phone, Mail, Calculator, Shield } from 'lucide-react'

export default function HourlyRental() {
  const [formData, setFormData] = useState({
    serviceType: 'business',
    hours: '4',
    vehicleType: 'standard',
    date: '',
    startTime: '',
    pickup: '',
    name: '',
    phone: '',
    email: '',
    passengers: '1',
    requirements: ''
  })

  const serviceTypes = [
    {
      type: 'business',
      name: 'Business Travel',
      description: 'Perfect for corporate meetings, client visits, and business tours',
      features: ['Professional driver', 'WiFi available', 'Executive vehicles', 'Invoice billing'],
      basePrice: 35
    },
    {
      type: 'tourism',
      name: 'City Tour',
      description: 'Explore Belgian cities with our knowledgeable drivers',
      features: ['Tour guide driver', 'Flexible itinerary', 'Photo stops', 'Local insights'],
      basePrice: 30
    },
    {
      type: 'special',
      name: 'Special Events',
      description: 'Weddings, parties, concerts, and other special occasions',
      features: ['Decorated vehicles', 'Multiple stops', 'Extended hours', 'Special requests'],
      basePrice: 40
    },
    {
      type: 'airport',
      name: 'Airport Transfer',
      description: 'Hourly service for airport pickups with waiting time included',
      features: ['Flight monitoring', 'Meet & greet', 'Luggage assistance', 'No waiting charges'],
      basePrice: 45
    }
  ]

  const vehicleTypes = [
    {
      type: 'standard',
      name: 'Standard Car',
      model: 'Volkswagen Golf',
      capacity: '4 passengers',
      pricePerHour: 25,
      features: ['AC', 'GPS', 'Professional driver']
    },
    {
      type: 'comfort',
      name: 'Comfort Car',
      model: 'Audi A4',
      capacity: '4 passengers',
      pricePerHour: 35,
      features: ['Leather seats', 'WiFi', 'Premium sound']
    },
    {
      type: 'business',
      name: 'Business Class',
      model: 'Mercedes E-Class',
      capacity: '4 passengers',
      pricePerHour: 45,
      features: ['Executive service', 'Privacy glass', 'Refreshments']
    },
    {
      type: 'van',
      name: 'Van/Minibus',
      model: 'Mercedes Vito',
      capacity: '8 passengers',
      pricePerHour: 55,
      features: ['Extra luggage space', 'Group travel', 'Child seats']
    }
  ]

  const hourlyPackages = [
    { hours: '2', label: '2 Hours', discount: 0 },
    { hours: '4', label: '4 Hours', discount: 5 },
    { hours: '6', label: '6 Hours', discount: 10 },
    { hours: '8', label: '8 Hours', discount: 15 },
    { hours: '12', label: 'Half Day', discount: 20 },
    { hours: '24', label: 'Full Day', discount: 25 }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Hourly rental booking submitted! We will contact you shortly.')
  }

  const calculatePrice = () => {
    const vehicle = vehicleTypes.find(v => v.type === formData.vehicleType)
    const packageInfo = hourlyPackages.find(p => p.hours === formData.hours)
    const basePrice = vehicle ? vehicle.pricePerHour : 25
    const hours = parseInt(formData.hours) || 1
    const discount = packageInfo ? packageInfo.discount : 0
    
    const totalPrice = basePrice * hours
    const discountAmount = (totalPrice * discount) / 100
    const finalPrice = totalPrice - discountAmount
    
    return {
      basePrice,
      hours,
      discount,
      discountAmount,
      finalPrice
    }
  }

  const pricing = calculatePrice()

  return (
    <section id="hourly" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hourly Rental Service</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a taxi by the hour for business meetings, city tours, or special events
          </p>
        </div>

        {/* Service Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Service Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceTypes.map((service, index) => (
              <div
                key={index}
                onClick={() => setFormData(prev => ({ ...prev, serviceType: service.type }))}
                className={`bg-gray-50 rounded-lg p-6 border-2 cursor-pointer transition-all ${
                  formData.serviceType === service.type
                    ? 'border-blue-500 shadow-lg bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-3">{service.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="text-blue-600 font-semibold mb-3">From €{service.basePrice}/hour</div>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <div
                key={index}
                onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.type }))}
                className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all ${
                  formData.vehicleType === vehicle.type
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-3 text-center">🚗</div>
                <h4 className="font-semibold text-gray-900 mb-2">{vehicle.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{vehicle.model}</p>
                <p className="text-gray-600 text-sm mb-3">{vehicle.capacity}</p>
                <div className="text-blue-600 font-semibold">€{vehicle.pricePerHour}/hour</div>
                <ul className="mt-3 space-y-1">
                  {vehicle.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Packages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select Duration</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hourlyPackages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => setFormData(prev => ({ ...prev, hours: pkg.hours }))}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all text-center ${
                  formData.hours === pkg.hours
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg font-semibold text-gray-900">{pkg.label}</div>
                {pkg.discount > 0 && (
                  <div className="text-green-600 text-sm font-semibold">Save {pkg.discount}%</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Time
                </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pickup address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone
                </label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Number of Passengers
                </label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                  <option value="6">6 Passengers</option>
                  <option value="7">7 Passengers</option>
                  <option value="8">8 Passengers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <input
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Child seat, wheelchair access, etc."
                />
              </div>
            </div>

            {/* Price Calculation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-900 font-semibold">Price Breakdown</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Base Price (€{pricing.basePrice}/hour × {pricing.hours} hours)</span>
                  <span>€{pricing.basePrice * pricing.hours}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({pricing.discount}%)</span>
                    <span>-€{pricing.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-blue-900">
                  <span>Total Price</span>
                  <span>€{pricing.finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <Clock className="h-5 w-5" />
              <span>Book Hourly Rental</span>
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Flexible Booking</h4>
            <p className="text-gray-600">Modify or cancel your booking up to 2 hours before start time</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Drivers</h4>
            <p className="text-gray-600">Experienced, licensed drivers with excellent knowledge of Belgium</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600">Round-the-clock customer support for any assistance during your rental</p>
          </div>
        </div>
      </div>
    </section>
  )
}
