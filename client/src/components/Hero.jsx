import { MapPin, Clock, Shield, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-yellow-400 to-yellow-500 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Premium Taxi Service in Belgium
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Fast, reliable, and comfortable rides across all Belgian cities. 
              Book your journey in seconds and travel with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#booking" 
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
              >
                Book Your Ride Now
              </a>
              <a 
                href="#pricing" 
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-center border-2 border-gray-300"
              >
                View Pricing
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">24/7 Service</div>
                  <div className="text-gray-700">Available anytime</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Safe & Secure</div>
                  <div className="text-gray-700">Professional drivers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">All Cities</div>
                  <div className="text-gray-700">Nationwide coverage</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Group Travel</div>
                  <div className="text-gray-700">Up to 8 passengers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                  <p className="text-gray-500">Your ride awaits</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
