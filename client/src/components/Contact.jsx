import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form data:', formData)
    alert('Message sent! We will respond within 24 hours.')
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+32 2 123 45 67", "+32 2 987 65 43"],
      description: "Available 24/7 for bookings and emergencies"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["info@taxiwave.be", "support@taxiwave.be"],
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office Locations",
      details: ["Brussels, Antwerp, Ghent", "Bruges, Liège, Namur"],
      description: "Serving all major Belgian cities"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["24/7 Customer Service", "Office: Mon-Fri 9AM-6PM"],
      description: "Always here when you need us"
    }
  ]

  const faqs = [
    {
      question: "How do I book a taxi?",
      answer: "You can book through our website, by phone, or through our mobile app. Simply provide your pickup location, destination, and preferred time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit/debit cards, PayPal, and corporate billing for business accounts."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel free of charge up to 1 hour before your scheduled pickup time."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we provide airport transfers to all Belgian airports including Brussels Airport and Charleroi Airport."
    },
    {
      question: "Are your prices fixed?",
      answer: "We offer fixed pricing for airport transfers and hourly rates for city tours. Standard trips are priced by distance."
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need to make a booking? We're here to help 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="+32 2 123 45 67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">New Booking</option>
                    <option value="support">Customer Support</option>
                    <option value="complaint">Complaint</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 rounded-lg p-2">
                      <info.icon className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-700">{detail}</p>
                      ))}
                      <p className="text-gray-600 text-sm mt-2">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-400 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3">Emergency Booking</h4>
              <p className="text-gray-800 mb-4">Need immediate transportation? Call our emergency line:</p>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-black" />
                <span className="text-xl font-bold text-black">+32 2 999 88 77</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
