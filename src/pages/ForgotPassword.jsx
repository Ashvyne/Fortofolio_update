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
    <div className="relative min-h-screen bg-[#0a0a1a] flex items-center justify-center overflow-hidden font-['Inter']">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.08)_0%,transparent_60%)]" />

      {/* Blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px]"
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
            className="absolute rounded-full bg-pink-400"
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
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />

          <AnimatePresence mode="wait">
            {!sent ? (
              /* Form State */
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-indigo-600 shadow-lg shadow-pink-500/40 mb-4"
                  >
                    <LuIcons.LuKeyRound size={28} className="text-white" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Lupa Password?</h1>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Tenang! Masukkan emailmu dan kami akan kirimkan link reset password.
                  </p>
                </div>

                {/* Info Banner */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 mb-6">
                  <LuIcons.LuInfo size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Link reset akan dikirim ke email yang terdaftar. Cek folder <strong className="text-slate-300">Spam</strong> jika tidak muncul di Inbox.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-4"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6 mx-auto"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/40"
                  >
                    <LuIcons.LuCheck size={22} className="text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                {/* Orbit Rings */}
                <div className="relative inline-block -mt-[6.5rem] mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="w-28 h-28 rounded-full border border-green-500/10"
                      style={{ borderTopColor: 'rgba(34,197,94,0.3)' }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      className="w-36 h-36 rounded-full border border-green-500/5"
                      style={{ borderTopColor: 'rgba(34,197,94,0.15)' }}
                    />
                  </div>
                  <div className="h-20 w-20" /> {/* spacer */}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">Email Terkirim!</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  Link reset password sudah dikirim ke
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-6">
                  <LuIcons.LuMail size={14} className="text-indigo-400" />
                  <span className="text-sm font-bold text-white">{email}</span>
                </div>

                <p className="text-[11px] text-slate-600 mb-8">
                  Link berlaku selama <strong className="text-slate-500">1 jam</strong>. Cek folder Spam jika tidak muncul.
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => { setSent(false); setEmail(''); }}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <LuIcons.LuRefreshCw size={16} />
                    Kirim ulang ke email lain
                  </button>
                  <Link
                    to="/login"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:from-indigo-600/40 hover:to-purple-600/40 transition-all flex items-center justify-center gap-2"
                  >
                    <LuIcons.LuLogIn size={16} />
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
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[11px] text-slate-600">atau</span>
                <div className="flex-1 h-px bg-white/5" />
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
                  className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                  <LuIcons.LuArrowLeft size={12} />
                  Kembali ke Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-700 mt-4 tracking-widest uppercase">
          Ash<span className="text-pink-600">.</span>dev — Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
