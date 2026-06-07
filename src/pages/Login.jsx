import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as LuIcons from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
    }))
  );

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      Swal.fire({
        title: 'Selamat datang! 🎉',
        text: 'Login berhasil. Redirecting...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#0f172a',
        color: '#fff',
      });
      setTimeout(() => navigate('/admin'), 1600);
    } catch (err) {
      Swal.fire({
        title: 'Login Gagal',
        text: err.message || 'Email atau password salah.',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
        background: '#0f172a',
        color: '#fff',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] flex items-center justify-center overflow-hidden font-['Inter']">
      {/* Background Gradients (Soft) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06)_0%,transparent_60%)]" />

      {/* Animated Blobs (Faint & Atmospheric) */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/5 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[130px]"
      />

      {/* Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating Particles (Retained) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: [0, -60, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-indigo-400/80"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          />
        ))}
      </div>

      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        {/* Soft Glass Card */}
        <div className="relative bg-[#131b2e]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-950/40 overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Logo / Brand Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4"
            >
              <LuIcons.LuUser size={24} />
            </motion.div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Selamat Datang!
            </h1>
            <p className="text-sm text-slate-400/90 mt-1.5">
              Masuk ke akun Ash Portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                Email Address
              </label>
              <div className="relative group">
                <LuIcons.LuMail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="ash@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative group">
                <LuIcons.LuLock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <LuIcons.LuEyeOff size={16} /> : <LuIcons.LuEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 text-white font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LuIcons.LuLogIn size={18} />
                  Masuk Sekarang
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-[11px] text-slate-600/80 font-medium">atau</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-400">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>

          {/* Back to Portfolio */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
            >
              <LuIcons.LuArrowLeft size={12} />
              Kembali ke Portfolio
            </Link>
          </div>
        </div>

        {/* Brand Tag */}
        <p className="text-center text-[10px] text-slate-600/80 mt-6 tracking-widest uppercase">
          Ash<span className="text-indigo-500">.</span>dev — Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
