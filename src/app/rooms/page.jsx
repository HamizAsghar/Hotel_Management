"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RoomCard = ({ room }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-amber-500 transform hover:scale-105 transition-transform duration-300"
    >
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-2">{room.name}</h3>
        <p className="text-gray-300 text-sm mb-4">{room.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-amber-400 font-semibold">${room.price}/night</span>
          <span className="text-gray-400 text-sm">{room.capacity} Guests</span>
        </div>
        <button
          href={`auth/login`}
          className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-semibold hover:bg-amber-600 shadow-lg transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      if (data.success) {
        // Sample room data with Unsplash images
        const sampleRooms = [
          {
            _id: "1",
            name: "Deluxe Suite",
            description: "A luxurious suite with a stunning city view, king-size bed, and modern amenities.",
            price: 250,
            capacity: 2,
            isAvailable: true,
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          {
            _id: "2",
            name: "Oceanfront Villa",
            description: "Spacious villa with private balcony, ocean views, and premium furnishings.",
            price: 400,
            capacity: 4,
            isAvailable: true,
            image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          {
            _id: "3",
            name: "Executive Room",
            description: "Elegant room with a cozy atmosphere, perfect for business travelers.",
            price: 180,
            capacity: 2,
            isAvailable: true,
            image: "https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];
        setRooms(data.data.filter((room) => room.isAvailable).length > 0 ? data.data.filter((room) => room.isAvailable) : sampleRooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-amber-500 mb-8">
          Our Available Rooms
        </h1>
        {loading ? (
          <div className="text-center py-12 bg-gray-900 bg-opacity-80 rounded-xl shadow-md">
            <p className="text-gray-300 text-lg">Loading rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 bg-opacity-80 rounded-xl shadow-md border border-amber-500">
            <p className="text-gray-300 text-lg">No rooms currently available. Please check back later!</p>
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
  );
}