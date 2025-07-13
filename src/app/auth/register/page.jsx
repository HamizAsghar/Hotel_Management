"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaCamera, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUploadSuccess = (results) => {
    if (results.info?.secure_url && results.event === "success") {
      setImage(results.info.secure_url);
      setImagePreview(results.info.secure_url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate all fields
    if (!name || !phone || !email || !password || !confirmPassword || !image) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Check if user exists
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        throw new Error("Failed to check user existence");
      }

      const { user } = await resUserExists.json();
      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      // Register user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success
      const form = e.target;
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been successfully registered!",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/auth/login");
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 grid md:grid-cols-2 bg-gradient-to-br from-black to-amber-900 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="hidden md:flex flex-col justify-center p-12 relative z-10">
        <h1 className="text-5xl font-bold text-amber-500 mb-4 animate-pulse">
          Luxury<span className="text-white">Stay</span>
        </h1>
        <p className="text-white text-lg">Create your account for bookings and management.</p>
      </div>

      <div className="flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-black bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-amber-500">
          <h2 className="text-3xl font-bold text-center text-amber-500 mb-8">Create Account</h2>

          <div className="flex justify-center mb-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center border-4 border-amber-500">
                  <FaUser className="w-12 h-12 text-amber-500" />
                </div>
              )}
              <CldUploadWidget
                uploadPreset="hwlqikvn"
                onSuccess={handleImageUploadSuccess}
                options={{ cloudName: "dpuw5wqyp", multiple: false }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="absolute bottom-0 right-0 bg-amber-600 rounded-full p-2 hover:bg-amber-700"
                  >
                    <FaCamera className="text-black" />
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input 
                onChange={(e) => setName(e.target.value)} 
                type="text" 
                placeholder="Full Name" 
                required
                className="form-field" 
              />
              <FaUser className="input-icon" />
            </div>

            <div className="relative">
              <input 
                onChange={(e) => setPhone(e.target.value)} 
                type="tel" 
                placeholder="Phone Number" 
                required
                className="form-field" 
              />
              <FaPhone className="input-icon" />
            </div>

            <div className="relative">
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="Email Address" 
                required
                className="form-field" 
              />
              <MdEmail className="input-icon" />
            </div>

            <div className="relative">
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required
                className="form-field" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="icon-btn"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <div className="relative">
              <input 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm Password" 
                required
                className="form-field" 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="icon-btn"
              >
                {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 text-black bg-amber-500 rounded-lg hover:bg-amber-600 font-semibold"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <p className="mt-6 text-sm text-white text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-amber-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const BackgroundAnimation = () => {
  useEffect(() => {
    const svg = document.querySelector(".background-animation");
    if (svg) {
      const paths = svg.querySelectorAll("path");
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `dash ${8 + i * 2}s linear infinite, float 14s ease-in-out infinite`;
      });
    }
  }, []);

  return (
    <svg 
      className="background-animation absolute inset-0 w-full h-full z-0" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(5)].map((_, i) => (
        <path 
          key={i}
          d={`M0,${i * 80} Q${100 + i * 30},${200 + i * 50} ${200 + i * 30},${i * 80} T600,${i * 80}`}
          stroke="rgba(245, 158, 11, 0.2)" 
          strokeWidth="3" 
          fill="none" 
        />
      ))}
    </svg>
  );
};

export default RegisterForm;