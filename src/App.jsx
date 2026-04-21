import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Moon,
  Sun,
  ChevronDown,
  Mail,
  MapPin,
  Coffee,
  Briefcase,
  Layout
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans selection:bg-purple-500/30">

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
              <a href="#projects" className="hover:text-purple-500 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-purple-500 transition-colors">Skills</a>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section id="about" className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
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
                <GitBranch size={20} />
                GitHub Profile
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400"
          >
            <ChevronDown size={24} />
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
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Frontend</h3>
              <ul className="space-y-3">
                {['React.js', 'Tailwind CSS', 'JavaScript (ES6+)'].map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    {skill}
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
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Backend</h3>
              <ul className="space-y-3">
                {['Node.js', 'PHP', 'Laravel', 'MySQL'].map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    {skill}
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
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Tools</h3>
              <ul className="space-y-3">
                {['Git & GitHub (PRs)', 'XAMPP', 'Vercel'].map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-gray-500 dark:text-gray-400">A showcase of my recent work, including my UKK project.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(300px,auto)]">

            {/* Main Project: CafePOS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 flex flex-col md:flex-row"
            >
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300">
                    UKK Project
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    Aplikasi_kasir2
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">CaféPOS</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  A comprehensive web-based Point of Sale system specifically designed for the Vocational Competency Exam (UKK). It streamlines cafe operations with features for transaction management, real-time inventory tracking, and detailed reporting.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'Node.js', 'Express', 'MySQL', 'Tailwind'].map(tech => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a href="https://dev-kasir.horn-yastudio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href="https://github.com/Ashvyne/kasir-node" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
                    <GitBranch size={16} /> Source Code
                  </a>
                </div>
              </div>

              <div className="md:w-1/2 relative bg-gray-100 dark:bg-gray-900 min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                <Coffee className="w-32 h-32 text-gray-300 dark:text-gray-700 drop-shadow-xl" />
                {/* Decorative UI elements mimicking a POS */}
                <div className="absolute top-10 right-10 w-32 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl hidden md:block"></div>
                <div className="absolute bottom-10 left-10 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl hidden md:block"></div>
              </div>
            </motion.div>

            {/* Placeholder Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Project RT</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                Sistem pendataan warga dan administrasi tingkat Rukun Tetangga (RT) untuk mempermudah pelaporan dan pencatatan data.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['PHP', 'MySQL', 'Bootstrap'].map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              <a href="https://github.com/Ashvyne" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 hover:underline mt-auto">
                <GitBranch size={16} /> View Code
              </a>
            </motion.div>

            {/* Placeholder Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Task Manager</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                A full-stack task management application developed during coursework, implementing secure auth and REST APIs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Laravel', 'PHP', 'MySQL', 'Bootstrap'].map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-auto">
                <GitBranch size={16} /> View Code
              </a>
            </motion.div>

          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-2xl font-bold mb-2">Ash.</div>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <MapPin size={16} /> Based in Indonesia
              </p>
            </div>

            <div className="flex gap-4">
              <a href="mailto:andaresthadavvin@gmail.com" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all">
                <Mail size={18} />
              </a>
              <a href="https://github.com/Ashvyne/kasir-node" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all">
                <GitBranch size={18} />
              </a>
            </div>
          </div>
          <div className="text-center mt-10 text-sm text-gray-500">
            © {new Date().getFullYear()} Davvin Andarestha Handoko
          </div>
        </footer>

      </main>
    </div>
  );
}
