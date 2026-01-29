import { useState, useEffect, useRef } from 'react'
import { MapPin, Crosshair, Navigation } from 'lucide-react'

export default function SimpleMap({ pickup, destination, onLocationSelect }) {
  const mapRef = useRef(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState({ lat: 50.8503, lng: 4.3517 }) // Brussels

  useEffect(() => {
    // Initialize OpenStreetMap with Leaflet
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    
    document.head.appendChild(link)
    
    script.onload = () => {
      if (!mapRef.current || !window.L) return

      const map = window.L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lng], 13)

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map)

      // Add click listener for location selection
      map.on('click', function(e) {
        const { lat, lng } = e.latlng
        
        // Reverse geocode using Nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.display_name) {
              onLocationSelect(data.display_name)
            }
          })
          .catch(error => console.error('Error reverse geocoding:', error))
      })

      // Add markers for pickup and destination
      if (pickup) {
        geocodeAndAddMarker(map, pickup, 'blue', 'Pickup')
      }
      if (destination) {
        geocodeAndAddMarker(map, destination, 'red', 'Destination')
      }

      setIsMapLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    }
  }, [mapCenter, onLocationSelect, pickup, destination])

  const geocodeAndAddMarker = (map, address, color, title) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data[0]) {
          const { lat, lon } = data[0]
          
          // Create custom icon
          const customIcon = window.L.divIcon({
            html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
          })

          window.L.marker([lat, lon], { icon: customIcon })
            .addTo(map)
            .bindPopup(title)
            .openPopup()
            
          map.setView([lat, lon], 15)
        }
      })
      .catch(error => console.error('Error geocoding:', error))
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter({ lat: latitude, lng: longitude })
          
          // Update map view if it exists
          if (window.L && mapRef.current) {
            const map = window.L.map(mapRef.current)
            map.setView([latitude, longitude], 15)
          }
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
        style={{ minHeight: '400px' }}
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
