import { useState } from 'react'
import Navbar from './components/NavbarFixed'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">TaxiWave</h1>
        <p className="text-center text-gray-600">Your premium taxi service in Belgium</p>
      </div>
    </div>
  )
}

export default App
