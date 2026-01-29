import { useState } from 'react'
import { User, Car, Mail, Lock, Eye, EyeOff, Phone, MapPin, UserPlus, LogIn } from 'lucide-react'

export default function EnhancedLoginSystem({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'passenger', // 'passenger' or 'driver'
    licenseNumber: '',
    vehicleType: '',
    vehiclePlate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ ...formData, role: formData.role })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-sky-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Animated Taxi Illustrations */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Welcome to TaxiWave</h1>
            <p className="text-xl opacity-90">Your premium taxi service in Belgium</p>
          </div>

          {/* Animated Taxi Scene */}
          <div className="relative w-full max-w-md">
            <div className="flex justify-center items-end space-x-8 mb-8">
              {/* Person 1 */}
              <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                <div className="text-6xl mb-2">👨‍💼</div>
                <div className="text-sm text-center opacity-75">Business Traveler</div>
              </div>
              
              {/* Taxi */}
              <div className="animate-pulse">
                <div className="text-8xl mb-2">🚕</div>
                <div className="text-sm text-center opacity-75">Ready to Go!</div>
              </div>
              
              {/* Person 2 */}
              <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="text-6xl mb-2">👩‍💻</div>
                <div className="text-sm text-center opacity-75">Tech Professional</div>
              </div>
            </div>

            {/* Road Animation */}
            <div className="relative h-2 bg-white opacity-30 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-60 animate-pulse"></div>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <div className="font-semibold">Real-time Tracking</div>
                  <div className="text-sm opacity-75">Know exactly where your ride is</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <div className="font-semibold">Easy Payments</div>
                  <div className="text-sm opacity-75">Multiple payment options</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="font-semibold">Top Rated Drivers</div>
                  <div className="text-sm opacity-75">Professional and experienced</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 text-4xl animate-pulse">🌟</div>
          <div className="absolute top-20 right-20 text-3xl animate-bounce">✨</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-pulse">🎯</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce">🚀</div>
        </div>
      </div>

      {/* Right Side - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg p-3 inline-block mb-4">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join TaxiWave Today'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account to continue' : 'Create your account and start riding'}
            </p>
          </div>

          {/* Role Selection for Signup */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">I want to join as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'passenger' }))}
                  className={`p-3 rounded-lg border-2 transition ${
                    formData.role === 'passenger'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Passenger</div>
                  <div className="text-xs opacity-75">Book rides</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'driver' }))}
                  className={`p-3 rounded-lg border-2 transition ${
                    formData.role === 'driver'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Car className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Driver</div>
                  <div className="text-xs opacity-75">Earn money</div>
                </button>
              </div>
            </div>
          )}

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+32 2 123 45 67"
                  />
                </div>
              </div>
            )}

            {/* Driver-specific fields */}
            {!isLogin && formData.role === 'driver' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="standard">Standard (Volkswagen Golf)</option>
                    <option value="comfort">Comfort (Audi A4)</option>
                    <option value="business">Business (Mercedes E-Class)</option>
                    <option value="van">Van (Mercedes Vito)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Plate Number</label>
                  <input
                    type="text"
                    name="vehiclePlate"
                    value={formData.vehiclePlate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1-ABC-123"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition flex items-center justify-center space-x-2"
            >
              {isLogin ? (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              🎉 <strong>Welcome!</strong> Use any email/password to test the system. Choose your role and experience the full TaxiWave platform!
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex justify-center space-x-6 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs">Fast</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-xs">Reliable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
