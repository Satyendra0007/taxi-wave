import { useState } from 'react'
import { Package, MapPin, Clock, Calculator, Phone, Mail, Shield } from 'lucide-react'

export default function Parcel() {
  const [formData, setFormData] = useState({
    pickup: '',
    delivery: '',
    packageType: 'small',
    weight: '',
    dimensions: '',
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    deliveryTime: 'standard',
    instructions: ''
  })

  const packageTypes = [
    {
      type: 'small',
      name: 'Small Package',
      description: 'Documents, small items up to 5kg',
      price: '€12-15',
      icon: '📦'
    },
    {
      type: 'medium',
      name: 'Medium Package',
      description: 'Medium items up to 15kg',
      price: '€18-25',
      icon: '📋'
    },
    {
      type: 'large',
      name: 'Large Package',
      description: 'Large items up to 30kg',
      price: '€25-40',
      icon: '📦'
    },
    {
      type: 'extra-large',
      name: 'Extra Large',
      description: 'Bulky items up to 50kg',
      price: '€35-60',
      icon: '📦'
    }
  ]

  const deliveryOptions = [
    {
      time: 'express',
      name: 'Express Delivery',
      description: 'Within 2 hours',
      price: '+€10'
    },
    {
      time: 'same-day',
      name: 'Same Day Delivery',
      description: 'Within 6 hours',
      price: '+€5'
    },
    {
      time: 'standard',
      name: 'Standard Delivery',
      description: 'Within 24 hours',
      price: 'Base price'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Parcel delivery request submitted! We will contact you shortly.')
  }

  const calculatePrice = () => {
    const basePrice = {
      small: 15,
      medium: 25,
      large: 40,
      'extra-large': 60
    }
    
    const timeMultiplier = {
      express: 10,
      'same-day': 5,
      standard: 0
    }
    
    return basePrice[formData.packageType] + timeMultiplier[formData.deliveryTime]
  }

  return (
    <section id="parcel" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Parcel Delivery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable, and secure parcel delivery service across Belgium
          </p>
        </div>

        {/* Package Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Package Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packageTypes.map((pkg, index) => (
              <div
                key={index}
                onClick={() => setFormData(prev => ({ ...prev, packageType: pkg.type }))}
                className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all ${
                  formData.packageType === pkg.type
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-4 text-center">{pkg.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{pkg.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                <div className="text-blue-600 font-semibold">{pkg.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Delivery Speed</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => setFormData(prev => ({ ...prev, deliveryTime: option.time }))}
                className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all ${
                  formData.deliveryTime === option.time
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{option.name}</h4>
                  <span className="text-blue-600 font-semibold text-sm">{option.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
                      <input
                        type="text"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+32 2 123 45 67"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter delivery address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                      <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Recipient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+32 2 123 45 67"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (L×W×H cm)</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30×20×10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                  <input
                    type="text"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Fragile, handle with care"
                  />
                </div>
              </div>
            </div>

            {/* Price Estimate */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-900 font-semibold">Estimated Price:</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">€{calculatePrice()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Book Parcel Delivery</span>
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Insured Delivery</h4>
            <p className="text-gray-600">All parcels are insured up to €500 for your peace of mind</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h4>
            <p className="text-gray-600">Track your parcel in real-time from pickup to delivery</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600">Customer support available round the clock for any queries</p>
          </div>
        </div>
      </div>
    </section>
  )
}
