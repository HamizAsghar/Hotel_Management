
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    return (
       <motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/70 backdrop-blur-lg shadow-md"
      : "bg-transparent"
  }`}
>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-amber-600">
                            LuxuryStay
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={item.href}
                                        className="text-amber-600 hover: text-shadow-amber-500 hover:underline px-3 py-2 rounded-md text-md font-medium transition-all duration-200"
                                    >
                                        {item.name}
                                    </Link>

                                </motion.div>
                            ))}

                            {/* Login & Register buttons */}
                            <Link
                                href="/auth/login"
                                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/register"
                                className="border border-amber-600 text-amber-600 px-4 py-2 rounded-md hover:bg-amber-50 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-amber-600 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-md border-t"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="border-t pt-2 space-y-1">
                                <Link
                                    href="/auth/login"
                                    className="block text-center bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-700 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block text-center border border-amber-600 text-amber-600 px-3 py-2 rounded-md hover:bg-amber-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
