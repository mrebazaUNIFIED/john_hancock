import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CircularProgress } from "@mui/material";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ username: "", password: "", general: "" });
    const method = "login"
    // Validación de campos vacíos
    if (!username || !password) {
      setErrors({
        username: !username ? "Required username" : "",
        password: !password ? "Required password" : "",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/api/token/", { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/admin/statics");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const serverError = error.response?.data?.detail;

      let translatedError = "An error occurred. Please try again.";
      if (serverError === "No active account found with the given credentials") {
        translatedError = "No account was found with these credentials. Please try again.";
      }

      setErrors({ general: translatedError });
    } finally {
      setLoading(false);
    }
  };

  // Particles configuration
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    size: Math.random() * 4 + 2,
  }));

  // Bubbles configuration
  const bubbles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    startY: 110,
    size: 40 + Math.random() * 60,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #f6f4ee 0%, #e8e6e0 100%)`,
      }}
    >
      {/* Animated Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.startY}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(182,0,0,0.15), rgba(182,0,0,0.05))`,
            boxShadow: '0 0 40px rgba(182,0,0,0.15)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: `-120vh`,
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            backgroundColor: 'rgba(182,0,0,0.15)',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ y: -100 }}
          animate={{ y: 200 }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-8 rounded-xl shadow-2xl max-w-md w-full"
        style={{ backgroundColor: '#f1efe9' }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#b60000' }}>
            John Hancock Admin
          </h1>
          <p className="text-gray-600">Access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {errors.general && (
            <div
              style={{
                color: "#d32f2f",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-red-800"
              style={{ backgroundColor: '#f6f4ee' }}
              placeholder="Enter your username"
              
            />
            {errors.username && (
              <div style={{ color: "#d32f2f", fontSize: "14px", marginBottom: "10px" }}>
                {errors.username}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-red-800 pr-10"
                style={{ backgroundColor: '#f6f4ee' }}
                placeholder="••••••••"
                
              />
             
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
                style={{ color: '#b60000' }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
                <div style={{ color: "#d32f2f", fontSize: "14px", marginBottom: "10px" }}>
                  {errors.password}
                </div>
              )}
          </div>

          <button
          
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold cursor-pointer bg-[#b60000] hover:bg-[#b60000c0]"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} style={{ color: "white" }} /> : 'Sign in'}
          </button>
        </form>


      </motion.div>
    </div>
  );
};
