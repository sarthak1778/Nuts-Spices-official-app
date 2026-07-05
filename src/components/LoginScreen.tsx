/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { LogIn, Sparkles, AlertCircle } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("hello@artisan.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate luxury authentication sequence
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-[#faf9f6] text-neutral-900 font-sans">
      {/* Left Column: Premium Editorial Visual (visible on medium & large screens) */}
      <div className="hidden md:flex md:w-1/2 relative bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/10 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105" 
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuABnKxbxSZZEEhW93E90Rti-ioHA1VnfifBM6hrUvvt82KpGr5UdFo8kMTiyFCZYf3Wll9hozQ8-B7mY21whiOtrzZRDwvFC8TTknq1MoxKgszfvFwMJHsV0udQw_8B3Z5o0tjVMWu7Ddn3ubiVQ1xT_UHEW7h5scg5vMcer52Jc4TBPS2h6jNBBcl8MEZpVlepTWhT6dsPwcUiXQAz5wrfC5surpOMSHu_3mSXncaV5Pk_WGMQ2ZofOTWjQvTsmJp7gFMyggrIK8Iw')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent z-15" />
        
        <div className="relative z-20 flex flex-col justify-end p-12 w-full h-full text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-emerald-950/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 max-w-md shadow-2xl"
          >
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Nature's finest craft, delivered.
            </h2>
            <p className="text-neutral-200 leading-relaxed font-light">
              Join our community of artisanal food enthusiasts and discover the true provenance of premium nuts and sun-ripened fruits.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Interactive Form Card */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 md:w-1/2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Brand Anchor */}
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-semibold text-emerald-800 italic tracking-tight font-serif-premium mb-2" style={{ fontFamily: "EB Garamond, serif" }}>
              Nuts &amp; Spices
            </h1>
            <p className="text-neutral-500 font-medium">Welcome back. Please enter your details.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold tracking-wider text-neutral-600 uppercase" htmlFor="email">
                Email or Phone
              </label>
              <input 
                id="email"
                type="text"
                placeholder="hello@artisan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300/60 focus:border-emerald-800 focus:bg-white focus:ring-1 focus:ring-emerald-800/20 outline-none transition-all text-neutral-800 font-sans"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold tracking-wider text-neutral-600 uppercase" htmlFor="password">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-bold text-amber-700 hover:underline transition-all">
                  Forgot Password?
                </a>
              </div>
              <input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300/60 focus:border-emerald-800 focus:bg-white focus:ring-1 focus:ring-emerald-800/20 outline-none transition-all text-neutral-800 font-sans"
              />
            </div>

            <motion.button 
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-xl shadow-md border-b-2 border-emerald-950/20 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
              type="submit"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300/45"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-neutral-400">
              <span className="px-3 bg-[#faf9f6] font-semibold">or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => onLoginSuccess("google.user@artisan.com")}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.14-5.136 4.14-3.51 0-6.357-2.846-6.357-6.357s2.846-6.357 6.357-6.357c1.53 0 2.916.549 4.005 1.458l3.078-3.078C18.675 1.836 15.65 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.7 0 12.24-5.48 12.24-12.24 0-.81-.081-1.61-.225-2.395H12.24z"/>
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Google</span>
            </button>
            <button 
              type="button" 
              onClick={() => onLoginSuccess("apple.user@artisan.com")}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer active:scale-95"
            >
              <span className="text-sm font-semibold text-neutral-700"> Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <footer className="mt-8 text-center">
            <p className="text-sm text-neutral-500 font-medium">
              Don't have an account? 
              <a 
                href="#signup" 
                onClick={() => onLoginSuccess("new.user@artisan.com")}
                className="text-amber-800 font-semibold hover:underline decoration-2 underline-offset-4 ml-1"
              >
                Sign Up
              </a>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
