import { useState, useEffect } from 'react'
import { Car, Clock, MapPin, Star, Zap } from 'lucide-react'

export default function DynamicPricing({ pickup, destination, onVehicleSelect, priorityPickup }) {
  const [showPricing, setShowPricing] = useState(false)
  const [estimatedDistance, setEstimatedDistance] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const belgianVehicles = [
    {
      id: 'standard',
      name: 'TaxiWave Go',
      model: 'Volkswagen Golf',
      seats: 4,
      basePrice: 25,
      perKm: 1.5,
      image: '🚗',
      features: ['AC', 'GPS', 'Professional Driver'],
      time: '3-5 min',
      badge: 'Popular',
      multiplier: 1.0
    },
    {
      id: 'comfort',
      name: 'TaxiWave Comfort',
      model: 'Audi A4',
      seats: 4,
      basePrice: 35,
      perKm: 2.0,
      image: '🚙',
      features: ['Leather Seats', 'WiFi', 'Premium Sound'],
      time: '5-8 min',
      multiplier: 1.4
    },
    {
      id: 'business',
      name: 'TaxiWave Business',
      model: 'Mercedes E-Class',
      seats: 4,
      basePrice: 45,
      perKm: 2.5,
      image: '🏎️',
      features: ['Executive Service', 'Privacy Glass', 'Refreshments'],
      time: '8-12 min',
      multiplier: 1.8
    },
    {
      id: 'van',
      name: 'TaxiWave XL',
      model: 'Mercedes Vito',
      seats: 8,
      basePrice: 55,
      perKm: 3.0,
      image: '🚐',
      features: ['Extra Luggage', 'Group Travel', 'Child Seats'],
      time: '10-15 min',
      multiplier: 2.2
    }
  ]

  // Calculate pricing when destination is entered
  useEffect(() => {
    if (pickup && destination) {
      calculateRouteAndPricing()
    } else {
      setShowPricing(false)
    }
  }, [pickup, destination])

  const calculateRouteAndPricing = async () => {
    setIsLoading(true)

    try {
      // Simulate route calculation (in real app, use routing API)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate realistic estimates for Belgium
      const distance = Math.random() * 20 + 5 // 5-25 km
      const time = Math.random() * 30 + 10 // 10-40 minutes

      setEstimatedDistance(distance)
      setEstimatedTime(time)
      setShowPricing(true)
    } catch (error) {
      console.error('Error calculating route:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculatePrice = (vehicle) => {
    let price = vehicle.basePrice + (vehicle.perKm * estimatedDistance)

    // Add priority pickup surcharge
    if (priorityPickup) {
      price += 5
    }

    // Add night surcharge (22:00 - 06:00)
    const currentHour = new Date().getHours()
    if (currentHour >= 22 || currentHour <= 6) {
      price *= 1.2 // 20% night surcharge
    }

    return Math.round(price * 100) / 100
  }

  const handleVehicleSelect = (vehicle) => {
    if (onVehicleSelect) {
      onVehicleSelect({
        ...vehicle,
        calculatedPrice: calculatePrice(vehicle),
        distance: estimatedDistance,
        time: estimatedTime,
        pickup,
        destination
      })
    }
  }

  if (!showPricing) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Choose your ride</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{estimatedDistance.toFixed(1)} km</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{Math.round(estimatedTime)} min</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Calculating best prices...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {belgianVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => handleVehicleSelect(vehicle)}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer hover:shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{vehicle.image}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold text-gray-900">{vehicle.name}</div>
                      {vehicle.badge && (
                        <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                          {vehicle.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{vehicle.model}</div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="text-xs text-gray-500">{vehicle.time} away</div>
                      <div className="text-xs text-gray-500">• {vehicle.seats} seats</div>
                      {priorityPickup && (
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <Zap className="h-3 w-3" />
                          <span>Priority</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">€{calculatePrice(vehicle)}</div>
                  <div className="text-xs text-gray-500">estimated fare</div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-3 flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
