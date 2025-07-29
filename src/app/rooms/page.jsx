"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./RoomsPage.css";

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
          herf={`auth/login`}
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
            image: "https://images.unsplash.com/photo-1445019070767-4f7c0a9a96d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    <div className="min-h-screen bg-black py-8 relative overflow-hidden">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-center text-amber-500 mb-8 animate-gradient-text">
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

const BackgroundAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(245, 158, 11, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        const connections = [];
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            connections.push({ j, distance });
          }
        }
        connections.sort((a, b) => a.distance - b.distance);
        for (let k = 0; k < Math.min(3, connections.length); k++) {
          const j = connections[k].j;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${1 - connections[k].distance / 150})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas id="particle-canvas" className="w-full h-full"></canvas>
    </div>
  );
};