// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { signIn } from "next-auth/react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { RiLockPasswordFill } from "react-icons/ri"
// import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md"
// import { FaGoogle } from "react-icons/fa"
// import "./animations.css"

// export default function LoginForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       })

//       if (res.error) {
//         setError("Invalid credentials")
//         return
//       }

//       router.replace("/userDashboard")
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleGoogleLogin = () => {
//     signIn("google", { callbackUrl: "/userDashboard" })
//   }

//   return (
//     <div className="relative min-h-screen mt-7 flex items-center justify-center overflow-hidden bg-black text-amber-500">
//       {/* Animated background blobs */}
//       <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-amber-500 opacity-30 rounded-full blur-3xl blob"></div>
//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full blur-3xl blob"></div>

//       {/* Form Card */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-10 w-full max-w-md relative z-10 border border-white/20"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <h1 className="text-3xl font-bold text-center text-white">User Login</h1>

//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-2 bg-black border border-amber-500 text-amber-500 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
//           >
//             <FaGoogle className="text-red-500" />
//             Sign in with Google
//           </button>

//           <div className="relative">
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="peer w-full bg-transparent border-b border-amber-500 text-amber-500 placeholder-transparent focus:outline-none focus:border-amber-400 py-2"
//               placeholder="Email Address"
//             />
//             <label className="absolute left-0 -top-3.5 text-sm text-amber-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
//               <MdEmail className="inline mr-1" /> Email Address
//             </label>
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="peer w-full bg-transparent border-b border-amber-500 text-amber-500 placeholder-transparent focus:outline-none focus:border-amber-400 py-2"
//               placeholder="Password"
//             />
//             <label className="absolute left-0 -top-3.5 text-sm text-amber-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
//               <RiLockPasswordFill className="inline mr-1" /> Password
//             </label>
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-0 top-1 text-amber-400"
//             >
//               {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-amber-500 text-black py-2 rounded-lg font-semibold hover:bg-amber-600 transition duration-300 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center text-white">
//             Don't have an account?{" "}
//             <Link href="/auth/register" className="font-bold text-amber-500 hover:underline">
//               Register
//             </Link>
//           </p>
//         </form>
//       </motion.div>

//       {error && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="absolute top-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg"
//         >
//           {error}
//         </motion.div>
//       )}
//     </div>
//   )
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import "./animations.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      router.replace("/userDashboard");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/userDashboard" });
  };

  return (
    <div className="relative min-h-screen mt-7 flex items-center justify-center overflow-hidden bg-black text-amber-500">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md relative z-10 border border-amber-500"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-amber-500 animate-gradient-text">
            User Login
          </h1>

          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 border border-amber-500 text-amber-500 px-4 py-3 rounded-lg transition duration-300"
          >
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </motion.button>

          <div className="relative group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field peer"
              placeholder="Email Address"
            />
            <MdEmail className="input-icon" />
            <label className="form-label">
              Email Address
            </label>
            <div className="form-field-underline"></div>
          </div>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field peer"
              placeholder="Password"
            />
            {/* <RiLockPasswordFill className="input-icon" /> */}
            <label className="form-label">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="icon-btn"
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
            <div className="form-field-underline"></div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-amber-500 text-gray-900 py-3 rounded-lg font-semibold shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-gray-900"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </motion.button>

          <p className="text-center text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-bold text-amber-500 hover:text-amber-400 transition-colors duration-200">
              Register
            </Link>
          </p>
        </form>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-5 right-5 bg-red-900 bg-opacity-50 border border-red-500 text-red-200 py-2 px-4 rounded-lg shadow-lg"
        >
          {error}
        </motion.div>
      )}
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