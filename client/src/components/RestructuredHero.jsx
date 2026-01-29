import { useState, useEffect } from 'react'
import { MapPin, Clock, Shield, Users, Star, Navigation, Package, Timer, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import SimpleMap from './SimpleMap'
import DynamicPricing from './DynamicPricing'

export default function RestructuredHero() {
  const [activeTab, setActiveTab] = useState('ride')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [priorityPickup, setPriorityPickup] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const belgianVehicles = [
    {
      id: 'standard',
      name: 'TaxiWave Go',
      model: 'Volkswagen Golf',
      seats: 4,
      price: 25,
      image: '🚗',
      features: ['AC', 'GPS', 'Professional Driver'],
      time: '3-5 min',
      badge: 'Popular'
    },
    {
      id: 'comfort',
      name: 'TaxiWave Comfort',
      model: 'Audi A4',
      seats: 4,
      price: 35,
      image: '🚙',
      features: ['Leather Seats', 'WiFi', 'Premium Sound'],
      time: '5-8 min'
    },
    {
      id: 'business',
      name: 'TaxiWave Business',
      model: 'Mercedes E-Class',
      seats: 4,
      price: 45,
      image: '🏎️',
      features: ['Executive Service', 'Privacy Glass', 'Refreshments'],
      time: '8-12 min'
    },
    {
      id: 'van',
      name: 'TaxiWave XL',
      model: 'Mercedes Vito',
      seats: 8,
      price: 55,
      image: '🚐',
      features: ['Extra Luggage', 'Group Travel', 'Child Seats'],
      time: '10-15 min'
    }
  ]

  // Get user's current location on component mount
  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser')
        return
      }

      setIsLoadingLocation(true)
      setLocationError('')

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()
            
            if (data && data.display_name) {
              setPickup(data.display_name)
            } else {
              setPickup(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
            }
          } catch (error) {
            console.error('Error getting address:', error)
            setPickup(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          }
          
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get your location. Please enter it manually.')
          setIsLoadingLocation(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    }

    getUserLocation()
  }, [])

  const handleLocationSelect = (address) => {
    if (!destination) {
      setDestination(address)
    } else {
      setPickup(address)
    }
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Animation Bar - Full Width, Reduced Height */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="relative h-32 bg-gradient-to-br from-blue-100 to-sky-100 overflow-hidden">
            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center space-x-6">
                <div className="w-12 h-1 bg-yellow-400"></div>
                <div className="w-12 h-1 bg-yellow-400"></div>
                <div className="w-12 h-1 bg-yellow-400"></div>
                <div className="w-12 h-1 bg-yellow-400"></div>
                <div className="w-12 h-1 bg-yellow-400"></div>
                <div className="w-12 h-1 bg-yellow-400"></div>
              </div>
            </div>
            
            {/* Moving Taxi */}
            <div className="absolute bottom-12 left-0 animate-slide-right">
              <div className="text-4xl transform scale-x-[-1]">🚕</div>
            </div>
            
            {/* Buildings */}
            <div className="absolute top-2 left-8 text-3xl opacity-70">🏢</div>
            <div className="absolute top-2 left-32 text-4xl opacity-70">🏬</div>
            <div className="absolute top-2 left-56 text-3xl opacity-70">🏛️</div>
            <div className="absolute top-2 right-56 text-4xl opacity-70">🏦</div>
            <div className="absolute top-2 right-32 text-3xl opacity-70">🏛️</div>
            <div className="absolute top-2 right-8 text-4xl opacity-70">🏢</div>
            
            {/* Clouds */}
            <div className="absolute top-4 left-1/4 text-2xl animate-pulse opacity-60">☁️</div>
            <div className="absolute top-6 right-1/3 text-xl animate-pulse opacity-60">☁️</div>
            
            {/* Professional Header Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Premium Taxi Service in Belgium</h1>
                <p className="text-lg text-gray-600">Experience luxury transportation with professional drivers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Left Booking, Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Booking Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Service Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('ride')}
                  className={`flex-1 py-4 px-6 font-semibold transition border-b-2 ${
                    activeTab === 'ride' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>Book Ride</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('parcel')}
                  className={`flex-1 py-4 px-6 font-semibold transition border-b-2 ${
                    activeTab === 'parcel' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Send Parcel</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('hourly')}
                  className={`flex-1 py-4 px-6 font-semibold transition border-b-2 ${
                    activeTab === 'hourly' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Timer className="h-5 w-5" />
                    <span>Hourly Rental</span>
                  </div>
                </button>
              </div>

              {/* Booking Form */}
              <div className="p-8">
                <div className="space-y-6">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      placeholder={isLoadingLocation ? "Getting your location..." : "Enter pickup location"}
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                      disabled={isLoadingLocation}
                    />
                    {isLoadingLocation && (
                      <div className="absolute right-4 top-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-red-600" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>

                  {locationError && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">{locationError}</p>
                    </div>
                  )}

                  {/* Priority Pickup */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-6 w-6 text-amber-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Priority Pickup</div>
                        <div className="text-sm text-gray-600">Get picked up in 10 minutes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">+€5</div>
                      <input
                        type="checkbox"
                        checked={priorityPickup}
                        onChange={(e) => setPriorityPickup(e.target.checked)}
                        className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition flex items-center justify-center space-x-2 text-lg">
                    <span>{activeTab === 'ride' ? 'See Available Rides' : activeTab === 'parcel' ? 'Send Parcel' : 'Book Hourly'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Pricing - Shows after destination is entered */}
            <DynamicPricing 
              pickup={pickup}
              destination={destination}
              onVehicleSelect={setSelectedVehicle}
              priorityPickup={priorityPickup}
            />

            {/* Professional Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose TaxiWave?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Professional Drivers</div>
                    <div className="text-xs text-gray-600">Experienced & licensed</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Safe & Insured</div>
                    <div className="text-xs text-gray-600">Full coverage protection</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">24/7 Service</div>
                    <div className="text-xs text-gray-600">Always available</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Top Rated</div>
                    <div className="text-xs text-gray-600">4.8★ average rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Interactive Map</h3>
                <p className="text-sm text-gray-600">Click on the map to set locations</p>
              </div>
              <SimpleMap 
                pickup={pickup}
                destination={destination}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Professional Drivers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Belgian Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          from {
            transform: translateX(-100px);
          }
          to {
            transform: translateX(calc(100vw + 100px));
          }
        }
        .animate-slide-right {
          animation: slide-right 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
