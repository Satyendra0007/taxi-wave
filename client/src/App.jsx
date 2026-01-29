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
  // No authentication required - direct access to the website
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Show regular user interface (no login required)
  return (
    <div className="min-h-screen">
      <Navbar />
      <RestructuredHero />
      <DynamicPricing 
        pickup=""
        destination=""
        onVehicleSelect={(vehicle) => console.log('Vehicle selected:', vehicle)}
        priorityPickup={false}
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
