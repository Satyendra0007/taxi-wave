import { useState, useEffect } from 'react'
import { MapPin, Clock, Shield, Users, Star, Navigation, Package, Timer, Zap } from 'lucide-react'

export default function HeroWithMap() {
  const [activeTab, setActiveTab] = useState('ride')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const belgianVehicles = [
    {
      id: 'standard',
      name: 'Standard',
      model: 'Volkswagen Golf',
      seats: 4,
      price: '€25',
      image: '🚗',
      features: ['AC', 'GPS', 'Professional Driver']
    },
    {
      id: 'comfort',
      name: 'Comfort',
      model: 'Audi A4',
      seats: 4,
      price: '€35',
      image: '🚙',
      features: ['Leather Seats', 'WiFi', 'Premium Sound']
    },
    {
      id: 'business',
      name: 'Business',
      model: 'Mercedes E-Class',
      seats: 4,
      price: '€45',
      image: '🏎️',
      features: ['Executive Service', 'Privacy Glass', 'Refreshments']
    },
    {
      id: 'van',
      name: 'Van XL',
      model: 'Mercedes Vito',
      seats: 8,
      price: '€55',
      image: '🚐',
      features: ['Extra Luggage', 'Group Travel', 'Child Seats']
    }
  ]

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Booking Interface */}
          <div>
            <div className="mb-8">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-6">
                Premium Taxi Service in Belgium
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Fast, reliable, and comfortable rides across all Belgian cities. 
                Book your journey in seconds and travel with confidence.
              </p>
            </div>

            {/* Service Type Tabs */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab('ride')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    activeTab === 'ride' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>Ride</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('parcel')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    activeTab === 'parcel' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Parcel</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('hourly')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    activeTab === 'hourly' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Timer className="h-5 w-5" />
                    <span>Hourly</span>
                  </div>
                </button>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-red-500" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Priority Pickup Option */}
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Priority Pickup</div>
                    <div className="text-sm text-gray-600">Get picked up in 10 minutes (+€5)</div>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition">
                  {activeTab === 'ride' ? 'Book Your Ride' : activeTab === 'parcel' ? 'Send Parcel' : 'Book Hourly'}
                </button>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Vehicle</h3>
              <div className="grid grid-cols-2 gap-4">
                {belgianVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{vehicle.image}</div>
                    <div className="font-semibold text-gray-900">{vehicle.name}</div>
                    <div className="text-sm text-gray-600">{vehicle.model}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-gray-600">{vehicle.seats} seats</div>
                      <div className="font-bold text-blue-600">{vehicle.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">24/7 Service</div>
                  <div className="text-gray-600">Available anytime</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">Safe & Secure</div>
                  <div className="text-gray-600">Professional drivers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">All Cities</div>
                  <div className="text-gray-600">Nationwide coverage</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">Top Rated</div>
                  <div className="text-gray-600">4.8/5 rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 to-sky-100 relative">
                {/* Map Placeholder - In real implementation, integrate with Leaflet/Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                      <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-4">Real-time tracking and route visualization</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div>• Live GPS tracking</div>
                        <div>• Route optimization</div>
                        <div>• Traffic updates</div>
                        <div>• Estimated arrival time</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition">
                    <Navigation className="h-5 w-5 text-blue-500" />
                  </button>
                  <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
              </div>
              
              {/* Map Info Panel */}
              <div className="p-6 bg-gradient-to-r from-blue-500 to-sky-500 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Live Tracking</h3>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    12 drivers nearby
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">3-5</div>
                    <div className="text-sm opacity-90">min pickup</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">€25</div>
                    <div className="text-sm opacity-90">est. fare</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12km</div>
                    <div className="text-sm opacity-90">distance</div>
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
