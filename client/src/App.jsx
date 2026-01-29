import { useState } from 'react'
import Navbar from './components/NavbarFixed'
import Services from './components/Services'
import BookingForm from './components/BookingForm'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParcelDelivery from './components/ParcelDelivery'
import HourlyRental from './components/HourlyRental'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-6">
              Welcome to TaxiWave
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Belgium's premium taxi service - Reliable, comfortable, and affordable transportation across all major cities
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Book Now
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <Services />
        <BookingForm />
        <ParcelDelivery />
        <HourlyRental />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
