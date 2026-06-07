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
    <div className="relative min-h-screen bg-[#0a0a1a] flex items-center justify-center overflow-hidden font-['Inter'] py-10">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.12)_0%,transparent_60%)]" />

      {/* Blobs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-violet-600/10 blur-[130px]"
      />

      {/* Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -50, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-violet-400"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/40 overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/40 mb-4"
            >
              <LuIcons.LuUserPlus size={28} className="text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              Buat Akun Baru
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-slate-400 mt-1"
            >
              Daftarkan dirimu ke Ash Portfolio
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/5 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/5 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/5 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                >
                  {showPassword ? <LuIcons.LuEyeOff size={16} /> : <LuIcons.LuEye size={16} />}
                </button>
              </div>
              {/* Password Strength Bar */}
              {formData.password && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-1.5">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                  className={`w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.05] border text-white text-sm placeholder:text-slate-600 outline-none focus:bg-violet-500/5 transition-all ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500/50 focus:border-red-500'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-white/10 focus:border-violet-500'
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
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
          </motion.form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[11px] text-slate-600 font-medium">sudah punya akun?</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500">
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors flex items-center justify-center gap-2"
            >
              <LuIcons.LuLogIn size={16} />
              Masuk ke akun yang ada
            </Link>
          </p>

          {/* Back to Portfolio */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              <LuIcons.LuArrowLeft size={12} />
              Kembali ke Portfolio
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-700 mt-4 tracking-widest uppercase">
          Ash<span className="text-violet-600">.</span>dev — Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
