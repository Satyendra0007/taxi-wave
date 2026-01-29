import { useState, useEffect } from 'react'
import { MapPin, Navigation, Package, Timer, Zap, Car, Users2, Briefcase, Plane } from 'lucide-react'
import SimpleMap from './SimpleMap'
import DynamicPricing from './DynamicPricing'

export default function RestructuredHero({ pickup, setPickup, destination, setDestination, priorityPickup, setPriorityPickup }) {
  const [activeTab, setActiveTab] = useState('ride')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [currentAnimation, setCurrentAnimation] = useState(0)

  const animations = [
    { emoji: '👨‍💼', label: 'Business Traveler', desc: 'Getting to meetings on time' },
    { emoji: '👩‍💻', label: 'Tech Professional', desc: 'Commuting to the office' },
    { emoji: '👨‍🎓', label: 'Student', desc: 'Heading to university' },
    { emoji: '👩‍⚕️', label: 'Healthcare Worker', desc: 'Reaching the hospital' },
    { emoji: '👨‍🍳', label: 'Chef', desc: 'Transporting equipment' },
    { emoji: '👩‍🏫', label: 'Teacher', desc: 'Going to school' }
  ]

  // Auto-rotate animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 pt-24 pb-20 relative overflow-hidden">
      {/* Professional Full-width animation bar with single vehicle */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 py-8 mb-8 relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-3"></div>
          <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-white to-transparent opacity-5 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white to-transparent opacity-5 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              {/* Single professional vehicle animation */}
              <div className="relative w-full max-w-4xl">
                <div className="flex items-center justify-center">
                  {/* Professional taxi moving full width */}
                  <div className="relative">
                    <div className="text-8xl filter drop-shadow-lg animate-taxi-move">
                      🚕
                    </div>
                    
                    {/* Professional person inside */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                      <div className="text-3xl animate-subtle-bounce">👨‍💼</div>
                    </div>
                    
                    {/* Professional movement indicators */}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/40 rounded-full animate-pulse"></div>
                    
                    {/* Speed lines */}
                    <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
                      <div className="flex space-x-1">
                        <div className="w-6 h-0.5 bg-white/40 rounded animate-speed-line"></div>
                        <div className="w-4 h-0.5 bg-white/30 rounded animate-speed-line" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-0.5 bg-white/20 rounded animate-speed-line" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Professional road */}
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full">
                    <div className="w-full h-0.5 bg-white/20 animate-road-professional"></div>
                  </div>
                </div>
                
                {/* Minimal side decorations */}
                <div className="absolute -top-1 left-8 text-xl opacity-20 animate-subtle-float">🌳</div>
                <div className="absolute -top-1 right-8 text-xl opacity-20 animate-subtle-float" style={{ animationDelay: '1s' }}>🏢</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-2">Premium Taxi Service</div>
              <div className="text-white/90 text-sm">Professional transportation across Belgium</div>
              <div className="flex items-center justify-end space-x-1 mt-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Minimal floating elements */}
        <div className="absolute top-4 left-10 text-xl animate-subtle-float opacity-15">✨</div>
        <div className="absolute top-6 right-20 text-lg animate-subtle-float opacity-15" style={{ animationDelay: '1.2s' }}>🌟</div>
        <div className="absolute bottom-4 left-1/4 text-base animate-subtle-float opacity-15" style={{ animationDelay: '0.6s' }}>💫</div>
        <div className="absolute bottom-6 right-1/3 text-lg animate-subtle-float opacity-15" style={{ animationDelay: '1.8s' }}>⭐</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Booking Section */}
          <div>
            <div className="mb-6">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-6">
                Go anywhere with TaxiWave
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                The smartest way to get around Belgium. Tap, ride, and arrive in style.
              </p>
            </div>

            {/* Professional Service Type Tabs */}
            <div className="bg-white rounded-2xl shadow-professional p-6 mb-6 border border-gray-100">
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab('ride')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'ride' 
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>Ride</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('parcel')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'parcel' 
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Parcel</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('hourly')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'hourly' 
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Timer className="h-5 w-5" />
                    <span>Reserve</span>
                  </div>
                </button>
              </div>

              {/* Enhanced Booking Form */}
              <div className="space-y-4">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <input
                    type="text"
                    placeholder={isLoadingLocation ? "Getting your location..." : "Enter pickup location"}
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
                    disabled={isLoadingLocation}
                  />
                  {isLoadingLocation && (
                    <div className="absolute right-4 top-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
                  />
                </div>

                {locationError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 animate-pulse">
                    <p className="text-sm text-yellow-800">{locationError}</p>
                  </div>
                )}

                {/* Enhanced Priority Pickup Option */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                  <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Priority Pickup</div>
                    <div className="text-sm text-gray-600">Get picked up in 10 minutes (+€5)</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={priorityPickup}
                    onChange={(e) => setPriorityPickup(e.target.checked)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                  />
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-professional">
                  {activeTab === 'ride' ? 'See prices' : activeTab === 'parcel' ? 'Send Parcel' : 'Book Hourly'}
                </button>
              </div>

              {/* Compact Dynamic Pricing Section */}
              <div className="mt-4">
                <DynamicPricing 
                  pickup={pickup}
                  destination={destination}
                  onVehicleSelect={(vehicle) => console.log('Vehicle selected:', vehicle)}
                  priorityPickup={priorityPickup}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="sticky top-24">
            <SimpleMap 
              pickup={pickup}
              destination={destination}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
