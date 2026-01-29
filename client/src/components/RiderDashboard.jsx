import { useState, useEffect } from 'react'
import { 
  Car, MapPin, Clock, DollarSign, Star, 
  Navigation, Phone, Users, TrendingUp, 
  Calendar, AlertCircle, CheckCircle, 
  Coffee, Battery, Fuel, Settings,
  LogOut, Bell, Menu, X
} from 'lucide-react'

export default function RiderDashboard({ driverData, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isOnline, setIsOnline] = useState(false)
  const [currentRide, setCurrentRide] = useState(null)
  const [earnings, setEarnings] = useState({
    today: 145.50,
    week: 892.30,
    month: 3245.80,
    rides: 23
  })

  const stats = [
    {
      title: "Today's Earnings",
      value: `€${earnings.today.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Completed Rides",
      value: earnings.rides,
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Rating",
      value: "4.8★",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Online Hours",
      value: "6.5h",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  const recentRides = [
    {
      id: 1,
      pickup: "Brussels Central Station",
      destination: "Brussels Airport",
      time: "14:30",
      fare: "€35.50",
      status: "completed",
      rating: 5
    },
    {
      id: 2,
      pickup: "Grand Place, Brussels",
      destination: "European Quarter",
      time: "13:15",
      fare: "€18.20",
      status: "completed",
      rating: 4
    },
    {
      id: 3,
      pickup: "Atomium",
      destination: "City Center",
      time: "11:45",
      fare: "€22.80",
      status: "completed",
      rating: 5
    }
  ]

  const vehicleInfo = {
    type: "Mercedes E-Class",
    plate: "1-TAXI-123",
    fuel: "75%",
    mileage: "45,230 km",
    nextService: "15/02/2024",
    insurance: "Valid until 31/12/2024"
  }

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Driver Portal</h1>
                <p className="text-sm text-gray-500">Welcome back, {driverData?.fullName || 'Driver'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Online Status Toggle */}
              <button
                onClick={toggleOnlineStatus}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                  isOnline 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'rides', label: 'Rides', icon: Car },
                  { id: 'earnings', label: 'Earnings', icon: DollarSign },
                  { id: 'vehicle', label: 'Vehicle', icon: Settings },
                  { id: 'profile', label: 'Profile', icon: Users }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${
                        activeTab === item.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Today</span>
                  <span className="text-sm font-medium">€{earnings.today.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm font-medium">€{earnings.week.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-medium">€{earnings.month.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Ride (if active) */}
                {currentRide ? (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Current Ride</h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Pickup</p>
                          <p className="text-sm text-gray-600">{currentRide.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium">Destination</p>
                          <p className="text-sm text-gray-600">{currentRide.destination}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                          Start Navigation
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                          Contact Passenger
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Rides</h3>
                      <p className="text-gray-600 mb-4">
                        {isOnline ? "Waiting for ride requests..." : "Go online to start receiving rides"}
                      </p>
                      {!isOnline && (
                        <button
                          onClick={toggleOnlineStatus}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          Go Online
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Recent Rides */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
                  <div className="space-y-4">
                    {recentRides.map((ride) => (
                      <div key={ride.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{ride.pickup}</span>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{ride.destination}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{ride.time}</span>
                                  <span>•</span>
                                  <span className="font-medium text-gray-900">{ride.fare}</span>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span>{ride.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-sm text-green-700">Completed</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'vehicle' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Vehicle Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type</span>
                            <span className="font-medium">{vehicleInfo.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Plate Number</span>
                            <span className="font-medium">{vehicleInfo.plate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mileage</span>
                            <span className="font-medium">{vehicleInfo.mileage}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Maintenance</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fuel Level</span>
                            <span className="font-medium">{vehicleInfo.fuel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Service</span>
                            <span className="font-medium">{vehicleInfo.nextService}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Insurance</span>
                            <span className="font-medium text-green-600">{vehicleInfo.insurance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
