import { Award, Users, MapPin, Clock, Shield, Star } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: MapPin, value: "100+", label: "Cities Covered" },
    { icon: Clock, value: "5", label: "Years in Service" },
    { icon: Award, value: "4.8/5", label: "Average Rating" }
  ]

  const values = [
    {
      title: "Safety First",
      description: "All our vehicles are regularly inspected and our drivers are thoroughly vetted and trained.",
      icon: Shield
    },
    {
      title: "Punctuality",
      description: "We understand the importance of time. Our drivers arrive on time, every time.",
      icon: Clock
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We go above and beyond to meet your needs.",
      icon: Star
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About TaxiWave</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Belgium's trusted taxi service, providing reliable transportation solutions since 2019
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2019, TaxiWave started with a simple mission: to provide Belgians with a reliable, 
              comfortable, and affordable taxi service. What began as a small fleet of 10 vehicles has grown 
              into a network of over 500 professional drivers serving all major Belgian cities.
            </p>
            <p className="text-gray-600 mb-4">
              We understand the unique transportation needs of Belgium - from business travelers heading 
              to Brussels Airport to families exploring the historic streets of Bruges, to students 
              commuting between university cities.
            </p>
            <p className="text-gray-600">
              Our commitment to excellence has earned us the trust of over 50,000 customers who rely on 
              TaxiWave for their daily travel needs. We combine modern technology with traditional 
              service values to deliver an exceptional transportation experience.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-yellow-400 rounded-lg p-3 inline-block mb-3">
                    <stat.icon className="h-6 w-6 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-400 rounded-lg p-4 inline-block mb-4">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose TaxiWave?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 inline-block mb-3">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <div className="font-semibold text-gray-900">Fully Licensed</div>
                <div className="text-gray-800 text-sm">Official taxi operator</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 inline-block mb-3">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <div className="font-semibold text-gray-900">Professional Drivers</div>
                <div className="text-gray-800 text-sm">Experienced & trained</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 inline-block mb-3">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <div className="font-semibold text-gray-900">24/7 Service</div>
                <div className="text-gray-800 text-sm">Always available</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 inline-block mb-3">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <div className="font-semibold text-gray-900">Top Rated</div>
                <div className="text-gray-800 text-sm">4.8/5 customer rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
