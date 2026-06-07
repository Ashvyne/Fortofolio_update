import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as LuIcons from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  // Password strength
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);
  const strengthLabel = ['', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'][strengthScore];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#10b981'][strengthScore];
  const strengthWidth = ['0%', '25%', '50%', '75%', '100%'][strengthScore];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        title: 'Password Tidak Cocok',
        text: 'Pastikan password dan konfirmasi password sama.',
        icon: 'warning',
        confirmButtonColor: '#4f46e5',
        background: '#0f172a',
        color: '#fff',
      });
    }
    if (strengthScore < 2) {
      return Swal.fire({
        title: 'Password Terlalu Lemah',
        text: 'Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.',
        icon: 'warning',
        confirmButtonColor: '#4f46e5',
        background: '#0f172a',
        color: '#fff',
      });
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name },
        },
      });
      if (error) throw error;

      await Swal.fire({
        title: 'Registrasi Berhasil! 🎉',
        html: `<p class="text-slate-300 text-sm">Cek email <strong>${formData.email}</strong> untuk konfirmasi akun kamu.</p>`,
        icon: 'success',
        confirmButtonColor: '#4f46e5',
        background: '#0f172a',
        color: '#fff',
      });
      navigate('/login');
    } catch (err) {
      Swal.fire({
        title: 'Registrasi Gagal',
        text: err.message || 'Terjadi kesalahan. Coba lagi.',
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
    <div className="relative min-h-screen bg-[#0B0F19] flex items-center justify-center overflow-hidden font-['Inter'] py-10">
      {/* Background Gradients (Soft) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06)_0%,transparent_60%)]" />

      {/* Animated Blobs (Faint & Atmospheric) */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/5 blur-[130px]"
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
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -50, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-violet-400/80"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
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
        <div className="relative bg-[#131b2e]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 shadow-2xl shadow-slate-950/40 overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

          {/* Logo / Brand Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4"
            >
              <LuIcons.LuUserPlus size={24} />
            </motion.div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-slate-400/90 mt-1.5">
              Daftarkan dirimu ke Ash Portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                Nama Lengkap
              </label>
              <div className="relative group">
                <LuIcons.LuUser
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors"
                />
                <input
                  id="register-name"
                  type="text"
                  required
                  placeholder="Nama kamu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                Email Address
              </label>
              <div className="relative group">
                <LuIcons.LuMail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors"
                />
                <input
                  id="register-email"
                  type="email"
                  required
                  placeholder="ash@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                Password
              </label>
              <div className="relative group">
                <LuIcons.LuLock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors"
                />
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                >
                  {showPassword ? <LuIcons.LuEyeOff size={16} /> : <LuIcons.LuEye size={16} />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-1.5">
                  <div className="h-1.5 bg-slate-950/40 border border-slate-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: strengthWidth }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full transition-all"
                      style={{ backgroundColor: strengthColor }}
                    />
                  </div>
                  <p className="text-[10px] font-bold" style={{ color: strengthColor }}>
                    Kekuatan: {strengthLabel}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                Konfirmasi Password
              </label>
              <div className="relative group">
                <LuIcons.LuShieldCheck
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors"
                />
                <input
                  id="register-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-950/30 border text-white text-sm placeholder:text-slate-600 outline-none transition-all duration-200 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500/40 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500/40 focus:border-green-500/60 focus:ring-1 focus:ring-green-500/20'
                      : 'border-slate-800/80 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                >
                  {showConfirm ? <LuIcons.LuEyeOff size={16} /> : <LuIcons.LuEye size={16} />}
                </button>
                {/* Match indicator */}
                {formData.confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <LuIcons.LuCheck size={16} className="text-green-400" />
                    ) : (
                      <LuIcons.LuX size={16} className="text-red-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 via-violet-600 to-indigo-600 text-white font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LuIcons.LuUserPlus size={18} />
                  Buat Akun
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-[11px] text-slate-600/80 font-medium">sudah punya akun?</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-400">
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <LuIcons.LuLogIn size={16} />
              Masuk ke akun yang ada
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
          Ash<span className="text-violet-500">.</span>dev — Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
