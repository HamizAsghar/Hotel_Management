"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaGoogle } from "react-icons/fa"
import "./animations.css"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError("Invalid credentials")
        return
      }

      router.replace("/userDashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/userDashboard" })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-amber-500">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-amber-500 opacity-30 rounded-full blur-3xl blob"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full blur-3xl blob"></div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-10 w-full max-w-md relative z-10 border border-white/20"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-white">User Login</h1>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-black border border-amber-500 text-amber-500 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>

          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent border-b border-amber-500 text-amber-500 placeholder-transparent focus:outline-none focus:border-amber-400 py-2"
              placeholder="Email Address"
            />
            <label className="absolute left-0 -top-3.5 text-sm text-amber-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              <MdEmail className="inline mr-1" /> Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-b border-amber-500 text-amber-500 placeholder-transparent focus:outline-none focus:border-amber-400 py-2"
              placeholder="Password"
            />
            <label className="absolute left-0 -top-3.5 text-sm text-amber-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              <RiLockPasswordFill className="inline mr-1" /> Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1 text-amber-400"
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black py-2 rounded-lg font-semibold hover:bg-amber-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-white">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-bold text-amber-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}
