import { useState, useEffect, useRef } from 'react'
import { MapPin, Crosshair, Navigation } from 'lucide-react'

export default function ProfessionalMap({ pickup, destination, onLocationSelect }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [isMapLoading, setIsMapLoading] = useState(true)

  // Initialize map
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&callback=initMap`
    script.async = true
    script.defer = true
    
    window.initMap = () => {
      if (!mapRef.current) return

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 50.8503, lng: 4.3517 }, // Brussels center
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
          }
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        }
      })

      setMap(mapInstance)
      setIsMapLoading(false)

      // Add click listener for location selection
      mapInstance.addListener('click', (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        
        // Reverse geocode to get address
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            onLocationSelect(results[0].formatted_address)
          }
        })
      })
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [onLocationSelect])

  // Update markers when pickup/destination changes
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null))
    const newMarkers = []

    // Add pickup marker
    if (pickup) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address: pickup }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location
          
          const pickupMarker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: 'Pickup Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#3B82F6"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 16)
            }
          })
          
          newMarkers.push(pickupMarker)
          map.setCenter(location)
        }
      })
    }

    // Add destination marker
    if (destination) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location
          
          const destinationMarker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: 'Destination',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#EF4444"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 16)
            }
          })
          
          newMarkers.push(destinationMarker)
        }
      })
    }

    setMarkers(newMarkers)
  }, [map, pickup, destination])

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          map.setCenter({ lat, lng })
          map.setZoom(15)
        },
        (error) => console.error('Error getting location:', error)
      )
    }
  }

  return (
    <div className="relative">
      {isMapLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-96 lg:h-[600px] rounded-2xl shadow-2xl"
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-20">
        <button
          onClick={handleCurrentLocation}
          className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Use current location"
        >
          <Crosshair className="h-5 w-5 text-blue-600" />
        </button>
      </div>

      {/* Map Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Pickup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Destination</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 flex items-center space-x-1">
            <Navigation className="h-4 w-4" />
            <span>Click map to set location</span>
          </div>
        </div>
      </div>
    </div>
  )
}
