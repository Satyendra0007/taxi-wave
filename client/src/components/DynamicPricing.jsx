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
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Available rides</h3>
        <div className="flex items-center space-x-3 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{estimatedDistance.toFixed(1)} km</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{Math.round(estimatedTime)} min</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">Finding rides...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {belgianVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => handleVehicleSelect(vehicle)}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer hover:shadow-md group bg-white"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl group-hover:scale-110 transition-transform">{vehicle.image}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-gray-900 text-sm">{vehicle.name}</div>
                    {vehicle.badge && (
                      <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                        {vehicle.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{vehicle.time} away</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">€{calculatePrice(vehicle)}</div>
                <div className="text-xs text-gray-500">estimated fare</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
