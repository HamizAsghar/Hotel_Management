"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Room Service", href: "/services/room-service" },
    { name: "Spa & Wellness", href: "/services/spa" },
    { name: "Fine Dining", href: "/services/dining" },
    { name: "Event Hosting", href: "/services/events" },
    { name: "Business Center", href: "/services/business" },
  ],
  Policies: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cancellation Policy", href: "/cancellation" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="text-3xl font-bold text-amber-500 mb-4 block">
              LuxuryStay
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience luxury redefined with our exceptional hospitality and world-class amenities. Your comfort is
              our priority.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm">123 Luxury Avenue, Faisalabad</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm">+92 3190218951</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm">info@luxurystay.com</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-amber-500">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-300 text-sm">Subscribe to our newsletter:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-amber-500 text-sm"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LuxuryStay. All rights reserved. | Designed with ❤️ for exceptional experiences.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
