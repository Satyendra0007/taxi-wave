import { useState } from 'react'
import { Menu, X, Phone, Globe, UserPlus } from 'lucide-react'
import SignupModal from './SignupModal'

export default function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-lg p-2 mr-3">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">TaxiWave</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-500 transition font-medium">Services</a>
            <a href="#booking" className="text-gray-700 hover:text-blue-500 transition font-medium">Book Now</a>
            <a href="#parcel" className="text-gray-700 hover:text-blue-500 transition font-medium">Parcel</a>
            <a href="#about" className="text-gray-700 hover:text-blue-500 transition font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-500 transition font-medium">Contact</a>
           
            <div className="flex items-center space-x-1 text-gray-700">
              <Globe className="h-4 w-4 text-blue-500" />
              <select className="bg-transparent border-none focus:outline-none">
                <option>EN</option>
                <option>FR</option>
                <option>NL</option>
                <option>DE</option>
              </select>
            </div>
            
            {/* Signup Button */}
            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-500">Services</a>
            <a href="#booking" className="block px-3 py-2 text-gray-700 hover:text-blue-500">Book Now</a>
            <a href="#parcel" className="block px-3 py-2 text-gray-700 hover:text-blue-500">Parcel</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-500">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-500">Contact</a>
            <div className="px-3 py-2 text-gray-700">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>+32 2 123 45 67</span>
              </div>
            </div>
            <div className="px-3 py-2">
              <button
                onClick={() => setShowSignupModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition flex items-center justify-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    
    {/* Signup Modal */}
    <SignupModal 
      isOpen={showSignupModal} 
      onClose={() => setShowSignupModal(false)}
      onSignup={(userData) => {
        // Handle signup - could store user data or redirect
        console.log('User signed up:', userData)
      }}
    />
  )
}
