"use client"
import { motion } from "framer-motion"
import { Utensils, Car, Wifi, Dumbbell, Waves, Headphones } from "lucide-react"

const services = [
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Experience world-class cuisine at our award-winning restaurants with diverse international menus.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary valet parking service available 24/7 for all our guests convenience.",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet access throughout the hotel premises for seamless connectivity.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art fitness facility with modern equipment and personal training services.",
  },
  {
    icon: Waves,
    title: "Spa & Wellness",
    description: "Rejuvenate your body and mind at our luxury spa with therapeutic treatments.",
  },
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description: "Our dedicated concierge team is available round the clock to assist with your needs.",
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of services designed to make your stay exceptional and memorable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-6 group-hover:bg-amber-200 transition-colors duration-300"
              >
                <service.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
