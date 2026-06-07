import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as LuIcons from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      Swal.fire({
        title: 'Gagal Mengirim',
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
    <div className="relative min-h-screen bg-[#0B0F19] flex items-center justify-center overflow-hidden font-['Inter']">
      {/* Background Gradients (Soft) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.06)_0%,transparent_60%)]" />

      {/* Animated Blobs (Faint & Atmospheric) */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/4 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-pink-500/4 blur-[110px]"
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
            className="absolute rounded-full bg-pink-400/80"
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
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

          <AnimatePresence mode="wait">
            {!sent ? (
              /* Form State */
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.35 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-4"
                  >
                    <LuIcons.LuKeyRound size={24} />
                  </motion.div>
                  <h1 className="text-xl font-semibold text-white tracking-tight">Lupa Password?</h1>
                  <p className="text-sm text-slate-400/90 mt-2 leading-relaxed">
                    Tenang! Masukkan emailmu dan kami akan kirimkan link reset password.
                  </p>
                </div>

                {/* Info Banner (Softer) */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-indigo-500/[0.03] border border-indigo-500/10 mb-6">
                  <LuIcons.LuInfo size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Link reset akan dikirim ke email yang terdaftar. Cek folder <strong className="text-slate-300">Spam</strong> jika tidak muncul di Inbox.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.15em] block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <LuIcons.LuMail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors"
                      />
                      <input
                        id="forgot-email"
                        type="email"
                        required
                        placeholder="email yang terdaftar..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 text-white text-sm placeholder:text-slate-600 outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-pink-600 to-indigo-600 text-white font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LuIcons.LuSend size={18} />
                        Kirim Link Reset
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                {/* Success Icon container (Softer) */}
                <div className="relative inline-block mb-6">
                  {/* Orbit Rings (Faint & Clean) */}
                  <div className="absolute inset-0 flex items-center justify-center -m-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 rounded-full border border-green-500/10"
                      style={{ borderTopColor: 'rgba(34,197,94,0.25)' }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center -m-10">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="w-32 h-32 rounded-full border border-green-500/5"
                      style={{ borderTopColor: 'rgba(34,197,94,0.1)' }}
                    />
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.25 }}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md shadow-green-500/20"
                    >
                      <LuIcons.LuCheck size={20} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2">Email Terkirim!</h2>
                <p className="text-slate-400/90 text-sm leading-relaxed mb-4">
                  Link reset password sudah dikirim ke:
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/30 border border-slate-800/80 mb-6">
                  <LuIcons.LuMail size={14} className="text-indigo-400" />
                  <span className="text-sm font-semibold text-white">{email}</span>
                </div>

                <p className="text-[11px] text-slate-500 mb-8 max-w-[280px] mx-auto leading-normal">
                  Link berlaku selama <strong className="text-slate-400">1 jam</strong>. Cek folder Spam jika tidak muncul.
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => { setSent(false); setEmail(''); }}
                    className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-300 text-sm font-medium hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
                  >
                    <LuIcons.LuRefreshCw size={14} />
                    Kirim ulang ke email lain
                  </button>
                  <Link
                    to="/login"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 text-indigo-300 text-sm font-medium hover:from-indigo-500/20 hover:to-purple-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LuIcons.LuLogIn size={14} />
                    Kembali ke Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Links (only in form state) */}
          {!sent && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.04]" />
                <span className="text-[11px] text-slate-600/80">atau</span>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1.5">
                  <LuIcons.LuLogIn size={12} /> Masuk
                </Link>
                <span className="text-slate-700">•</span>
                <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors flex items-center gap-1.5">
                  <LuIcons.LuUserPlus size={12} /> Daftar
                </Link>
              </div>
              <div className="text-center mt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <LuIcons.LuArrowLeft size={12} />
                  Kembali ke Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Brand Tag */}
        <p className="text-center text-[10px] text-slate-600/80 mt-6 tracking-widest uppercase">
          Ash<span className="text-pink-500">.</span>dev — Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
