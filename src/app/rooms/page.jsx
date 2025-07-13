"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RoomCard } from "@/components/room-card"

export default function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms")
      const data = await response.json()
      if (data.success) {
        setRooms(data.data.filter((room) => room.isAvailable))
      }
    } catch (error) {
      console.error("Error fetching rooms:", error)
    } finally {
      setLoading(false)
    }
  }

 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Available Rooms</h1>
        {rooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-700 text-lg">No rooms currently available. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
