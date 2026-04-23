import { useState, useEffect } from 'react';
import heroImg from './assets/hero.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuGitBranch,
  LuExternalLink,
  LuCode,
  LuDatabase,
  LuTerminal,
  LuMoon,
  LuSun,
  LuChevronDown,
  LuMail,
  LuMapPin,
  LuCoffee,
  LuBriefcase,
  LuLayoutGrid,
  LuGraduationCap,
  LuZap,
  LuCalendar,
  LuBuilding2,
  LuCake,
  LuServer,
} from 'react-icons/lu';
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiGit,
  SiGithub,
  SiVercel
} from 'react-icons/si';

function TypewriterText({ text, delay = 0, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse text-purple-400">█</span>
      )}
    </span>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 4 + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const logs = [
    { text: '> Initializing portfolio system...', delay: 300 },
    { text: '> Loading modules: React, Framer Motion', delay: 700 },
    { text: '> Mounting interface components...', delay: 1100 },
    { text: '> ACCESS GRANTED', delay: 1600, accent: true },
  ];

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030308] overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.08) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 1,
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-700/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* HUD Corner brackets */}
      {[
        'top-6 left-6 border-t-2 border-l-2',
        'top-6 right-6 border-t-2 border-r-2',
        'bottom-6 left-6 border-b-2 border-l-2',
        'bottom-6 right-6 border-b-2 border-r-2',
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`absolute w-10 h-10 border-purple-500/60 ${pos}`}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">

        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-purple-400/70 text-xs tracking-[0.4em] uppercase mb-6 font-mono"
        >
          — Portfolio System v2.0 —
        </motion.p>

        {/* Big name with glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
          className="relative mb-2 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white font-mono">
            Ash<span className="text-purple-400">.</span>
          </h1>
          {/* Glitch lines */}
          <motion.div
            animate={{ opacity: [0, 0.6, 0], x: [0, -3, 3, 0] }}
            transition={{ duration: 0.15, delay: 0.8, repeat: 3, repeatDelay: 0.5 }}
            className="absolute inset-0 text-6xl md:text-7xl font-bold tracking-tighter text-purple-400/40 font-mono select-none"
            aria-hidden
          >
            Ash<span className="text-indigo-400/40">.</span>
          </motion.div>
        </motion.div>

        {/* Sub role typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-purple-300/60 text-sm font-mono mb-10 h-5"
        >
          {phase >= 1 && <TypewriterText text="Frontend Developer & Student @ MUSABA" delay={0} />}
        </motion.div>

        {/* Terminal log */}
        <div className="w-full bg-black/40 border border-purple-500/20 rounded-lg p-4 mb-6 font-mono text-xs space-y-1 min-h-[90px]">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ delay: (log.delay - 300) / 1000 }}
              className={log.accent ? 'text-green-400 font-bold' : 'text-gray-500'}
            >
              <TypewriterText text={log.text} delay={log.delay} />
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2 border border-purple-500/10">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-400 to-purple-400 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] font-mono text-purple-500/50">
          <span>LOADING</span>
          <span>{Math.min(Math.round(progress), 100)}%</span>
        </div>

      </div>
    </motion.div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans selection:bg-purple-500/30"
      >

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b-0 border-white/5 bg-white/70 dark:bg-black/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            Ash<span className="text-purple-500">.</span>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#about" className="hover:text-purple-500 transition-colors">About</a>
              <a href="#skills" className="hover:text-purple-500 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-purple-500 transition-colors">Experience</a>
              <a href="#education" className="hover:text-purple-500 transition-colors">Education</a>
              <a href="#projects" className="hover:text-purple-500 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-purple-500 transition-colors">Contact</a>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <LuSun size={18} /> : <LuMoon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section id="about" className="min-h-[80vh] flex flex-col justify-center relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Available for work
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Hi, I'm Ash. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">
                  Frontend Developer
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
                Saya adalah siswa Davvin Andarestha Handoko Dari jurusan Pengembangan Perangkat Lunak dan Game  di SMK Muhammadiyah 1 Bantul
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <a href="#projects" className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2">
                  View My Work
                </a>
                <a href="https://github.com/Ashvyne" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium transition-all flex items-center gap-2">
                  <LuGitBranch size={20} />
                  GitHub Profile
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'backOut', delay: 0.3 }}
              className="relative shrink-0 flex items-center justify-center"
            >
              {/* Outer decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border border-dashed border-purple-400/30"
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute w-60 h-60 md:w-68 md:h-68 rounded-full border border-purple-500/20"
              />

              {/* Glow behind photo */}
              <div className="absolute w-52 h-52 md:w-60 md:h-60 rounded-full bg-purple-600/20 blur-2xl" />

              {/* Profile image */}
              <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-2xl shadow-purple-500/20">
                <img
                  src={heroImg}
                  alt="Davvin Andarestha Handoko"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -right-2 md:bottom-4 md:right-0 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2 text-sm font-medium"
              >
                <LuZap size={16} className="text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">PPLG · MUSABA</span>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400"
          >
            <LuChevronDown size={24} />
          </motion.div>
        </section>


        {/* Skills Section */}
        <section id="skills" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Technical Arsenal</h2>
            <p className="text-gray-500 dark:text-gray-400">The tools I use to build digital experiences.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <LuCode size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Frontend</h3>
              <ul className="space-y-3">
                {[
                  { name: 'React.js', icon: <SiReact className="text-[#61DAFB]" /> },
                  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
                  { name: 'JavaScript (ES6+)', icon: <SiJavascript className="text-[#F7DF1E]" /> }
                ].map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    {skill.icon}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Backend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                <LuDatabase size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Backend</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
                  { name: 'PHP', icon: <SiPhp className="text-[#777BB4]" /> },
                  { name: 'Laravel', icon: <SiLaravel className="text-[#FF2D20]" /> },
                  { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> }
                ].map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    {skill.icon}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                <LuTerminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Git & GitHub', icon: <SiGithub className="text-gray-900 dark:text-white" /> },
                  { name: 'XAMPP', icon: <LuServer className="text-[#FB7E14]" /> },
                  { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white" /> }
                ].map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    {skill.icon}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
            <p className="text-gray-500 dark:text-gray-400">My professional journey and contributions.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                title: "Data Entry and Web Developer (PKL)",
                company: "PT Global Intermedia Nusantara",
                period: "July 2025 - Desember 2025",
                description: "PT Global Intermedia Nusantara adalah perusahaan konsultan IT dan pengembang perangkat lunak di Yogyakarta yang mengkhususkan diri dalam solusi digital untuk sektor publik dan swasta.",
                responsibilities: [
                  "Membantu pengembangan aplikasi web berbasis framework Laravel dan PHP.",
                  "Bekerja sama dengan tim developer dalam implementasi UI/UX menggunakan Tailwind CSS.",
                  "Terlibat dalam pemeliharaan database dan optimasi query MySQL.",
                  "Mengikuti alur kerja tim menggunakan Git untuk version control.",
                  "Mempelajari standar profesional dalam pengembangan perangkat lunak skala enterprise."
                ],
                technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "Tailwind CSS", "Git", "Node.js", "Express.js",]
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-3xl bg-[#12121a] border border-white/5 p-8 flex flex-col h-full hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <span className="text-lg font-semibold text-purple-400">{exp.company}</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 text-xs font-medium">
                    {exp.period}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="mb-8 flex-grow">
                  <h4 className="text-sm font-bold text-purple-400/80 uppercase tracking-wider mb-4">Key Responsibilities:</h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500/50 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-bold text-blue-400/80 uppercase tracking-wider mb-4">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Education Section */}
        <section id="education" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Education Journey</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-400 mx-auto rounded-full" />
            <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
              Riwayat pendidikan yang telah saya tempuh untuk membangun fondasi di dunia teknologi.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                school: "SMK Muhammadiyah 1 Bantul (MUSABA)",
                level: "Sekolah Menengah Kejuruan",
                period: "2023 – 2026",
                age: "Masuk umur 15 tahun",
                address: "Jl. Parangtritis KM.11, Manding, Sabdodadi, Bantul, DIY",
                highlights: [
                  "Jurusan Pengembangan Perangkat Lunak dan Game (PPLG)",
                  "Mengerjakan proyek UKK: CaféPOS — sistem kasir berbasis web full-stack",
                  "Aktif belajar React, Node.js, Laravel, dan MySQL",
                  "Menyelesaikan PKL di PT Global Intermedia Nusantara, Yogyakarta",
                  "Lulus (est.) 2026"
                ],
              },
              {
                school: "SMP 2 Negeri Kretek",
                level: "Sekolah Menengah Pertama",
                period: "2020 – 2023",
                age: "Masuk umur 12 tahun",
                address: "Jl. Parangtritis KM.16, Kretek, Bantul, DIY",
                highlights: [
                  "Menempuh pendidikan selama 3 tahun",
                  "Mulai mengenal dunia teknologi dan komputer",
                  "Lulus tahun 2023",
                ],
              },
              {
                school: "SD 1 Parangtritis",
                level: "Sekolah Dasar",
                period: "2014 – 2020",
                age: "Masuk umur 6 tahun",
                address: "Parangtritis, Kretek, Bantul, Daerah Istimewa Yogyakarta",
                highlights: [
                  "Menempuh pendidikan dasar selama 6 tahun",
                  "Lulus tahun 2020",
                ],
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-[2rem] bg-[#12121a] border border-white/5 p-8 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Background decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full -mr-10 -mt-10" />
                
                <div className="relative flex flex-col md:flex-row gap-8">
                  {/* Icon & Year */}
                  <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                      <LuGraduationCap size={32} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 whitespace-nowrap tracking-wider uppercase">
                      {item.period}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] block mb-1">{item.level}</span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {item.school}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm h-fit">
                        <LuCake size={14} className="text-purple-500" />
                        <span className="text-xs font-medium">{item.age}</span>
                      </div>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Location Footer */}
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-6 border-t border-white/5">
                      <LuMapPin size={14} className="text-purple-500" />
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CaféPOS",
                status: "COMPLETED",
                description: "A comprehensive web-based Point of Sale system specifically designed for the Vocational Competency Exam (UKK). It streamlines cafe operations.",
                tags: ["React", "Node.js", "Express", "MySQL"],
                icon: <LuCoffee className="w-12 h-12" />,
                liveUrl: "https://dev-kasir.horn-yastudio.com",
                codeUrl: "https://github.com/Ashvyne/kasir-node"
              },
              {
                title: "Project RT",
                status: "COMPLETED",
                description: "Sistem pendataan warga dan administrasi tingkat Rukun Tetangga (RT) untuk mempermudah pelaporan dan pencatatan data secara digital.",
                tags: ["PHP", "MySQL", "Bootstrap"],
                icon: <LuLayoutGrid className="w-12 h-12" />,
                liveUrl: null,
                codeUrl: "https://github.com/Ashvyne"
              },
              {
                title: "Task Manager",
                status: "COMPLETED",
                description: "A full-stack task management application developed during coursework, implementing secure authentication and REST APIs.",
                tags: ["Laravel", "PHP", "MySQL"],
                icon: <LuBriefcase className="w-12 h-12" />,
                liveUrl: null,
                codeUrl: "#"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col h-full bg-[#12121a] border border-white/5 rounded-[2rem] p-6 hover:border-purple-500/30 transition-all duration-500"
              >
                {/* Project Image/Icon */}
                <div className="relative aspect-video w-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:opacity-100 transition-opacity" />
                  <div className="text-white/20 group-hover:text-purple-400/40 transition-colors duration-500 scale-100 group-hover:scale-110">
                    {project.icon}
                  </div>
                </div>

                {/* Badge & Title */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-[11px] rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  {project.codeUrl && (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all ${!project.liveUrl ? 'flex-[2]' : ''}`}
                    >
                      <SiGithub size={16} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-sm font-medium transition-all"
                    >
                      <LuExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-400 mx-auto rounded-full" />
            <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="mailto:andaresthadavvin@gmail.com"
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-[#12121a] border border-white/5 flex flex-col items-center text-center group transition-all hover:border-purple-500/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                <LuMail size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400 text-sm mb-4">andaresthadavvin@gmail.com</p>
              <span className="text-purple-400 text-sm font-medium flex items-center gap-2">
                Send Message <LuExternalLink size={14} />
              </span>
            </motion.a>

            <motion.a
              href="https://github.com/Ashvyne"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-[#12121a] border border-white/5 flex flex-col items-center text-center group transition-all hover:border-blue-500/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <SiGithub size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm mb-4">Check my repositories</p>
              <span className="text-blue-400 text-sm font-medium flex items-center gap-2">
                Visit Profile <LuExternalLink size={14} />
              </span>
            </motion.a>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-[#12121a] border border-white/5 flex flex-col items-center text-center group transition-all hover:border-green-500/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                <LuMapPin size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-400 text-sm mb-4">Bantul, Yogyakarta, Indonesia</p>
              <span className="text-green-400 text-sm font-medium">Available for Remote</span>
            </motion.div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-2xl font-bold mb-2">Ash.</div>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <LuMapPin size={16} /> Based in Indonesia
              </p>
            </div>

            <div className="flex gap-4">
              <a href="mailto:andaresthadavvin@gmail.com" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all">
                <LuMail size={18} />
              </a>
              <a href="https://github.com/Ashvyne/kasir-node" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all">
                <LuGitBranch size={18} />
              </a>
            </div>
          </div>
          <div className="text-center mt-10 text-sm text-gray-500">
            © {new Date().getFullYear()} Davvin Andarestha Handoko
          </div>
        </footer>

      </main>
      </motion.div>
    </>
  );
}
