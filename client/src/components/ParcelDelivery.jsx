import { useState } from 'react'
import { Package, Clock, Shield, MapPin, Phone, Calculator, Truck, Box, Zap } from 'lucide-react'

export default function ParcelDelivery() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    pickupAddress: '',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    parcelType: 'document',
    weight: '1',
    priority: 'standard',
    paymentMethod: 'cash'
  })

  const parcelTypes = [
    {
      id: 'document',
      name: 'Document',
      icon: '📄',
      maxWeight: '1kg',
      basePrice: '€8',
      description: 'Important papers, contracts, certificates'
    },
    {
      id: 'small',
      name: 'Small Package',
      icon: '📦',
      maxWeight: '5kg',
      basePrice: '€12',
      description: 'Small items, electronics, accessories'
    },
    {
      id: 'medium',
      name: 'Medium Package',
      icon: '📋',
      maxWeight: '10kg',
      basePrice: '€18',
      description: 'Clothing, books, medium electronics'
    },
    {
      id: 'large',
      name: 'Large Package',
      icon: '📊',
      maxWeight: '20kg',
      basePrice: '€25',
      description: 'Large items, appliances, furniture parts'
    }
  ]

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '2-4 hours',
      price: 'Base price',
      icon: Clock
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '1-2 hours',
      price: '+50%',
      icon: Truck
    },
    {
      id: 'priority',
      name: 'Priority Delivery',
      time: '30-60 minutes',
      price: '+100%',
      icon: Zap
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
    console.log('Parcel delivery data:', formData)
    alert('Parcel delivery booked! We will contact you shortly.')
  }

  const calculatePrice = () => {
    const basePrice = parseInt(parcelTypes.find(p => p.id === formData.parcelType)?.basePrice.replace('€', '') || 0)
    const weightMultiplier = parseFloat(formData.weight) > 1 ? parseFloat(formData.weight) : 1
    const priorityMultiplier = formData.priority === 'express' ? 1.5 : formData.priority === 'priority' ? 2 : 1
    
    return Math.round(basePrice * weightMultiplier * priorityMultiplier)
  }

  return (
    <section id="parcel" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4">
            Parcel Delivery Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast and reliable parcel delivery across Belgium. Send documents and packages with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-blue-100 rounded-lg p-3 inline-block mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Same Day Delivery</h3>
            <p className="text-gray-600">Get your parcels delivered within hours across Belgium</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-blue-100 rounded-lg p-3 inline-block mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Insured</h3>
            <p className="text-gray-600">All parcels are insured up to €1000 for your peace of mind</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-blue-100 rounded-lg p-3 inline-block mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Track your parcel in real-time from pickup to delivery</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Parcel Delivery</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sender Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sender Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pickup address"
                  />
                </div>
              </div>

              {/* Recipient Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter delivery address"
                  />
                </div>
              </div>

              {/* Parcel Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Parcel Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parcel Type</label>
                    <select
                      name="parcelType"
                      value={formData.parcelType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {parcelTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      min="0.1"
                      max="20"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Priority */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Priority</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deliveryOptions.map(option => (
                    <div key={option.id} className="relative">
                      <input
                        type="radio"
                        name="priority"
                        value={option.id}
                        checked={formData.priority === option.id}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:bg-gray-50 transition">
                        <option.icon className="h-6 w-6 text-blue-600 mb-2" />
                        <div className="font-semibold text-gray-900">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.time}</div>
                        <div className="text-sm font-medium text-blue-600">{option.price}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              {/* Price Estimate */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-800">Estimated Price</div>
                    <div className="text-2xl font-bold text-blue-900">€{calculatePrice()}</div>
                  </div>
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-sky-600 transition"
              >
                Book Parcel Delivery
              </button>
            </form>
          </div>

          {/* Right Side - Parcel Types and Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Parcel Types & Pricing</h3>
              <div className="space-y-4">
                {parcelTypes.map(type => (
                  <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{type.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-sm text-gray-500">Max weight: {type.maxWeight}</div>
                          <div className="font-bold text-blue-600">{type.basePrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Our Parcel Service?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Package className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Professional Handling</div>
                    <div className="text-sm opacity-90">Trained couriers handle your parcels with care</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">24/7 Support</div>
                    <div className="text-sm opacity-90">Customer support available round the clock</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Insurance Coverage</div>
                    <div className="text-sm opacity-90">All parcels insured up to €1000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
