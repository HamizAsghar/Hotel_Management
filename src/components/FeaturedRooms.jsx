"use client"
import { motion } from "framer-motion"
import { Star, Wifi, Car, Coffee, Tv } from "lucide-react"
import Link from "next/link"

const featuredRooms = [
  {
    id: 1,
    name: "Presidential Suite",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 500,
    rating: 5,
    amenities: ["Free WiFi", "Parking", "Room Service", "Smart TV"],
    description: "Luxurious suite with panoramic city views and premium amenities.",
  },
  {
    id: 2,
    name: "Deluxe Ocean View",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 350,
    rating: 4.8,
    amenities: ["Free WiFi", "Ocean View", "Mini Bar", "Smart TV"],
    description: "Elegant room with breathtaking ocean views and modern comforts.",
  },
  {
    id: 3,
    name: "Executive Business",
    image: "https://plus.unsplash.com/premium_photo-1674326699094-55c656af9867?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 280,
    rating: 4.7,
    amenities: ["Free WiFi", "Work Desk", "Coffee Maker", "Smart TV"],
    description: "Perfect for business travelers with dedicated workspace.",
  },
]

const amenityIcons = {
  "Free WiFi": Wifi,
  Parking: Car,
  "Room Service": Coffee,
  "Smart TV": Tv,
  "Ocean View": Star,
  "Mini Bar": Coffee,
  "Work Desk": Coffee,
  "Coffee Maker": Coffee,
}

export default function FeaturedRooms() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular accommodations, each designed to provide the ultimate comfort and luxury
            experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${room.price}/night
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{room.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Coffee
                    return (
                      <div
                        key={amenity}
                        className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {amenity}
                      </div>
                    )
                  })}
                </div>

                <Link
                  href={`auth/login`}
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/rooms"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
          >
            View All Rooms
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
