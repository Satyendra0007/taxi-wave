import { useState, useEffect } from 'react'
import Navbar from './components/NavbarFixed'
import RestructuredHero from './components/RestructuredHero'
import DynamicPricing from './components/DynamicPricing'
import Services from './components/Services'
import BookingForm from './components/BookingForm'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParcelDelivery from './components/ParcelDelivery'
import HourlyRental from './components/HourlyRental'
import RiderDashboardFixed from './components/RiderDashboardFixed'

function App() {
  // State for dynamic pricing
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [priorityPickup, setPriorityPickup] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  // No authentication required - direct access to the website
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle)
    console.log('Vehicle selected:', vehicle)
  }

  // Show regular user interface (no login required)
  return (
    <div className="min-h-screen">
      <Navbar />
      <RestructuredHero 
        pickup={pickup}
        setPickup={setPickup}
        destination={destination}
        setDestination={setDestination}
        priorityPickup={priorityPickup}
        setPriorityPickup={setPriorityPickup}
      />
      <DynamicPricing 
        pickup={pickup}
        destination={destination}
        onVehicleSelect={handleVehicleSelect}
        priorityPickup={priorityPickup}
      />
      <Services />
      <BookingForm />
      <ParcelDelivery />
      <HourlyRental />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
