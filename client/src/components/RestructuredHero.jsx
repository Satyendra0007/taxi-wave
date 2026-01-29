import { useState, useEffect } from 'react'
import { MapPin, Navigation, Package, Timer, Zap, Car, Users2, Briefcase, Plane } from 'lucide-react'
import SimpleMap from './SimpleMap'

export default function RestructuredHero() {
  const [activeTab, setActiveTab] = useState('ride')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [priorityPickup, setPriorityPickup] = useState(false)
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
      {/* Full-width reduced-height animation bar */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-sky-500 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-center animate-bounce">
                <div className="text-3xl mb-1">{animations[currentAnimation].emoji}</div>
                <div className="text-white text-sm font-medium">{animations[currentAnimation].label}</div>
              </div>
              <div className="text-white text-2xl animate-pulse">🚕</div>
              <div className="text-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl mb-1">{animations[(currentAnimation + 1) % animations.length].emoji}</div>
                <div className="text-white text-sm font-medium">{animations[(currentAnimation + 1) % animations.length].label}</div>
              </div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">Who's riding today?</div>
              <div className="text-sm opacity-90">Join thousands of Belgians choosing TaxiWave</div>
            </div>
          </div>
        </div>
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

            {/* Service Type Tabs */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab('ride')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    activeTab === 'ride' 
                      ? 'bg-black text-white' 
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
                      ? 'bg-black text-white' 
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
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Timer className="h-5 w-5" />
                    <span>Reserve</span>
                  </div>
                </button>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-blue-500" />
                  <input
                    type="text"
                    placeholder={isLoadingLocation ? "Getting your location..." : "Enter pickup location"}
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    disabled={isLoadingLocation}
                  />
                  {isLoadingLocation && (
                    <div className="absolute right-4 top-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
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

                {locationError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">{locationError}</p>
                  </div>
                )}

                {/* Priority Pickup Option */}
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Priority Pickup</div>
                    <div className="text-sm text-gray-600">Get picked up in 10 minutes (+€5)</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={priorityPickup}
                    onChange={(e) => setPriorityPickup(e.target.checked)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                </div>

                <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition">
                  {activeTab === 'ride' ? 'See prices' : activeTab === 'parcel' ? 'Send Parcel' : 'Book Hourly'}
                </button>
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
