
import { useState, useEffect } from 'react';
import heroImg from './assets/hero.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import * as LuIcons from 'react-icons/lu';
import * as SiIcons from 'react-icons/si';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Admin from './pages/Admin';

// Mapping Brand Colors for Icons
const brandColors = {
  SiReact: 'text-[#61DAFB]',
  SiVuedotjs: 'text-[#4FC08D]',
  SiTailwindcss: 'text-[#06B6D4]',
  SiJavascript: 'text-[#F7DF1E]',
  SiNodedotjs: 'text-[#339933]',
  SiExpress: 'dark:text-white text-slate-800',
  SiPhp: 'text-[#777BB4]',
  SiLaravel: 'text-[#FF2D20]',
  SiMysql: 'text-[#4479A1]',
  SiGithub: 'dark:text-white text-slate-900',
  SiVercel: 'dark:text-white text-black',
  SiSupabase: 'text-[#3ECF8E]',
  SiXampp: 'text-[#FB7A24]',
  LuCode: 'text-indigo-400',
  LuDatabase: 'text-emerald-400',
  LuTerminal: 'text-amber-400',
  LuLayout: 'text-sky-400',
  LuCpu: 'text-rose-400',
  LuGlobe: 'text-blue-400'
};

const DynamicIcon = ({ name, className, size = 24 }) => {
  const IconComponent = SiIcons[name] || LuIcons[name] || LuIcons.LuCode;
  const colorClass = brandColors[name] || 'text-gray-400';
  return <IconComponent className={`${colorClass} ${className}`} size={size} />;
};

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + Math.random() * 4 + 1));
    }, 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]">
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">
        <h1 className="text-6xl font-bold tracking-tighter text-white font-mono mb-10 text-glow">Ash<span className="text-indigo-400">.</span></h1>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2 border border-indigo-500/10">
          <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

// Fallback Data for Vercel / No Supabase
const MOCK_DATA = {
  projects: [
    { id: 1, title: 'CaféPOS', status: 'COMPLETED', description: 'Web-based Point of Sale specifically designed for Vocational Competency Exam (UKK).', tags: ['React', 'Node.js', 'Express', 'MySQL'], icon_name: 'LuCoffee', live_url: 'https://dev-kasir.horn-yastudio.com', code_url: 'https://github.com/Ashvyne/kasir-node' },
    { id: 2, title: 'Project RT', status: 'COMPLETED', description: 'Sistem pendataan warga dan administrasi tingkat Rukun Tetangga (RT) secara digital.', tags: ['PHP', 'MySQL', 'Bootstrap'], icon_name: 'LuLayout', code_url: 'https://github.com/Ashvyne' },
    { id: 3, title: 'Task Manager', status: 'COMPLETED', description: 'Full-stack task management application with secure authentication and REST APIs.', tags: ['Laravel', 'PHP', 'MySQL'], icon_name: 'LuBriefcase', code_url: '#' }
  ],
  experience: [
    { id: 1, title: 'Data Entry and Web Developer (PKL)', company: 'PT Global Intermedia Nusantara', period: 'July 2025 – Desember 2025', description: 'Perusahaan konsultan IT dan pengembang perangkat lunak di Yogyakarta.', responsibilities: ['Membantu pengembangan aplikasi web berbasis Laravel', 'UI/UX menggunakan Tailwind CSS', 'Maintenance database MySQL'], technologies: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS'] }
  ],
  education: [
    { id: 1, school: 'SMK Muhammadiyah 1 Bantul', level: 'Sekolah Menengah Kejuruan', period: '2023 – 2026', age: 'Masuk umur 15 tahun', address: 'Bantul, DIY', highlights: ['Jurusan PPLG', 'Fokus React & Node.js', 'Lulus (est.) 2026'] },
    { id: 2, school: 'SMP 1 Kretek', level: 'Sekolah Menengah Pertama', period: '2020 – 2023', age: 'Masuk umur 12 tahun', address: 'Bantul, DIY', highlights: ['Mulai mengenal dunia teknologi', 'Lulus tahun 2023'] },
    { id: 3, school: 'SD 1 Parangtritis', level: 'Sekolah Dasar', period: '2014 – 2020', age: 'Masuk umur 6 tahun', address: 'Bantul, DIY', highlights: ['Pendidikan dasar 6 tahun', 'Lulus tahun 2020'] }
  ],
  skills: [
    { id: 1, name: 'React.js', category: 'Frontend', icon_name: 'SiReact' },
    { id: 2, name: 'Vue.js', category: 'Frontend', icon_name: 'SiVuedotjs' },
    { id: 3, name: 'Tailwind CSS', category: 'Frontend', icon_name: 'SiTailwindcss' },
    { id: 4, name: 'Node.js', category: 'Backend', icon_name: 'SiNodedotjs' },
    { id: 5, name: 'Express.js', category: 'Backend', icon_name: 'SiExpress' },
    { id: 6, name: 'PHP', category: 'Backend', icon_name: 'SiPhp' },
    { id: 7, name: 'Laravel', category: 'Backend', icon_name: 'SiLaravel' },
    { id: 8, name: 'MySQL', category: 'Backend', icon_name: 'SiMysql' },
    { id: 9, name: 'Git & GitHub', category: 'Tools', icon_name: 'SiGithub' },
    { id: 10, name: 'XAMPP', category: 'Tools', icon_name: 'SiXampp' },
    { id: 11, name: 'Vercel', category: 'Tools', icon_name: 'SiVercel' }
  ]
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [togglePos, setTogglePos] = useState({ x: '92%', y: '5%' });
  const [hasToggled, setHasToggled] = useState(false);
  const [prevDarkMode, setPrevDarkMode] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2500);
    fetchAllData();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setTogglePos({ x: `${x}%`, y: `${y}%` });
    setPrevDarkMode(darkMode);
    setHasToggled(true);
    setDarkMode(!darkMode);
  };

  async function fetchAllData() {
    setFetchingData(true);
    try {
      const [p, ex, ed, sk] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('experience').select('*').order('created_at', { ascending: false }),
        supabase.from('education').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('created_at', { ascending: true })
      ]);

      setProjects(p.data && p.data.length > 0 ? p.data : MOCK_DATA.projects);
      setExperience(ex.data && ex.data.length > 0 ? ex.data : MOCK_DATA.experience);
      setEducation(ed.data && ed.data.length > 0 ? ed.data : MOCK_DATA.education);
      setSkills(sk.data && sk.data.length > 0 ? sk.data : MOCK_DATA.skills);
    } catch (err) {
      console.error("Fetch failed, using mock data:", err);
      setProjects(MOCK_DATA.projects);
      setExperience(MOCK_DATA.experience);
      setEducation(MOCK_DATA.education);
      setSkills(MOCK_DATA.skills);
    } finally {
      setFetchingData(false);
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('messages').insert([formData]);
    if (error) setFormStatus('error');
    else { setFormStatus('success'); setFormData({ name: '', email: '', message: '' }); }
    setIsSubmitting(false);
  };

  const skillCategories = [
    { name: 'Frontend', icon: <LuIcons.LuCode className="text-blue-500" />, color: 'blue' },
    { name: 'Backend', icon: <LuIcons.LuDatabase className="text-green-500" />, color: 'green' },
    { name: 'Tools', icon: <LuIcons.LuTerminal className="text-orange-500" />, color: 'orange' },
  ];

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <div className={`relative min-h-screen font-sans selection:bg-indigo-500/30 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
        
        {/* Base Background Layer */}
        <div className={`fixed inset-0 z-[-2] ${prevDarkMode ? 'bg-[#0f172a]' : 'bg-[#fdf6e3]'}`} />

        {/* Atmospheric Elements */}
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none opacity-50">
          {/* Animated Blobs */}
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"
          />
          <motion.div 
            animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"
          />
          
          {/* Dot Grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
            style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
          />
          
          {/* Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
          />
        </div>

        {/* Theme Transition Overlay (Brings NEW color) */}
        <AnimatePresence>
          {hasToggled && (
            <motion.div
              key={darkMode ? 'dark-bg' : 'light-bg'}
              initial={{ clipPath: `circle(0% at ${togglePos.x} ${togglePos.y})` }}
              animate={{ clipPath: `circle(150% at ${togglePos.x} ${togglePos.y})` }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className={`fixed inset-0 z-[-1] pointer-events-none ${darkMode ? 'bg-[#0f172a]' : 'bg-[#fdf6e3]'}`}
            />
          )}
        </AnimatePresence>

        <nav className="fixed top-0 w-full z-[100] glass-card bg-white/70 dark:bg-black/50 border-b border-white/5 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tighter">Ash<span className="text-indigo-500">.</span></div>
            <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide">
              {['about', 'skills', 'experience', 'education', 'projects', 'contact'].map(id => (
                <a key={id} href={`#${id}`} className="capitalize opacity-60 hover:opacity-100 hover:text-indigo-500 transition-all">{id}</a>
              ))}
            </div>
            <button 
              onClick={handleToggle} 
              className="relative p-3 rounded-2xl bg-gray-200 dark:bg-white/5 border border-white/10 group overflow-hidden transition-all duration-300 z-[100]"
            >
              <AnimatePresence mode="wait">
                <motion.div key={darkMode ? 'dark' : 'light'} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {darkMode ? <LuIcons.LuSun className="text-orange-400" size={20} /> : <LuIcons.LuMoon className="text-indigo-600" size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
          {/* Hero */}
          <section id="about" className="min-h-[70vh] flex flex-col justify-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-6 tracking-widest uppercase">Student @ MUSABA</motion.div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Hi, I'm <span className="text-glow">Ash.</span> <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400">Frontend Developer</span></h1>
                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">Siswa Davvin Andarestha Handoko dari jurusan Pengembangan Perangkat Lunak dan Game di SMK Muhammadiyah 1 Bantul.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="#projects" className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">View Projects</a>
                  <a href="#contact" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">Get in Touch</a>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600/20 blur-[60px] group-hover:blur-[80px] transition-all rounded-full" />
                <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img src={heroImg} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section - Premium RESTORED */}
          <section id="skills" className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-indigo-400 mx-auto rounded-full" />
              <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">Saat ini berfokus pada pengembangan Full-Frontend menggunakan React, Vue, dan Express.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skillCategories.map((cat) => (
                <motion.div 
                  key={cat.name}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-8 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 relative overflow-hidden group backdrop-blur-sm cursor-pointer transition-shadow"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full -mr-10 -mt-10" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-8">{cat.name}</h3>
                    <div className="space-y-5">
                      {skills.filter(s => s.category === cat.name).map(skill => (
                        <div key={skill.id} className="flex items-center gap-4 group/item">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-transparent group-hover/item:border-white/10 transition-all">
                            <DynamicIcon name={skill.icon_name} size={20} />
                          </div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover/item:text-white transition-colors">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              {experience.map(exp => (
                <motion.div 
                  key={exp.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  viewport={{ once: true }} 
                  className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 hover:border-indigo-500/30 transition-all backdrop-blur-sm shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                      <span className="text-lg font-semibold text-indigo-400">{exp.company}</span>
                    </div>
                    <div className="px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 text-[10px] font-bold">{exp.period}</div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 pb-6 border-b border-white/5 leading-relaxed">{exp.description}</p>
                  <div className="mb-6">
                    <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Responsibilities:</h4>
                    <ul className="space-y-3">
                      {exp.responsibilities?.map((r, i) => <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />{r}</li>)}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {exp.technologies?.map(t => <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 font-bold">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education - Match Gambar 3 */}
          <section id="education" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Education Journey</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
              <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">Riwayat pendidikan yang telah saya tempuh untuk membangun fondasi di dunia teknologi.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              {education.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  viewport={{ once: true }} 
                  className="p-8 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row gap-10 group relative backdrop-blur-sm shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 group-hover:scale-110 transition-transform"><LuIcons.LuGraduationCap size={32} /></div>
                    <div className="px-4 py-1 rounded-full bg-white/5 text-indigo-400 text-[10px] font-bold border border-white/10 whitespace-nowrap">{item.period}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div><span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-2">{item.level}</span><h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{item.school}</h3></div>
                      <div className="px-4 py-2 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-[11px] font-bold text-indigo-400 flex items-center gap-2"><LuIcons.LuCake size={14} />{item.age}</div>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {item.highlights?.map((h, i) => <li key={i} className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400"><div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />{h}</li>)}
                    </ul>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-6 border-t border-white/5"><LuIcons.LuMapPin size={16} className="text-indigo-500" />{item.address}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
              <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">Kumpulan karya terbaik yang pernah saya kerjakan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fetchingData ? [1, 2, 3].map(i => <div key={i} className="h-[400px] rounded-[2rem] bg-slate-800/20 animate-pulse" />) :
                projects.length > 0 ? projects.map((project, index) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.1 }} 
                    className="group flex flex-col h-full bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 rounded-[2rem] p-6 hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-sm shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
                  >
                    <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-transparent flex items-center justify-center overflow-hidden mb-8 border border-white/5">
                      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                      <LuIcons.LuCode className="w-12 h-12 text-indigo-500/40 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">{project.status}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags?.map(tag => <span key={tag} className="px-3 py-1 text-[11px] rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium">{tag}</span>)}
                    </div>
                    <div className="flex gap-3">
                      {project.code_url && <a href={project.code_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium"><SiIcons.SiGithub size={16} /> Code</a>}
                      {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium"><LuIcons.LuExternalLink size={16} /> Live</a>}
                    </div>
                  </motion.div>
                )) : <p className="text-center text-gray-500 italic">No projects added yet.</p>
              }
            </div>
          </section>

          {/* Contact - Side by Side Layout */}
          <section id="contact" className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
              <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
              {/* Left Side: Info Cards */}
              <div className="md:col-span-2 space-y-6">
                <motion.div whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 flex items-center gap-6 group transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <LuIcons.LuMail size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-xs text-gray-500 mb-2">andaresthadavvin@gmail.com</p>
                    <a href="mailto:andaresthadavvin@gmail.com" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-2">Send Message <LuIcons.LuExternalLink size={12} /></a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 flex items-center gap-6 group transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <SiIcons.SiGithub size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">GitHub</h3>
                    <p className="text-xs text-gray-500 mb-2">Check my repositories</p>
                    <a href="https://github.com/Ashvyne" target="_blank" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2">Visit Profile <LuIcons.LuExternalLink size={12} /></a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 flex items-center gap-6 group transition-all backdrop-blur-sm shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <LuIcons.LuMapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Location</h3>
                    <p className="text-xs text-gray-500 mb-2">Bantul, Yogyakarta, Indonesia</p>
                    <div className="inline-block text-[9px] font-bold text-green-500 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">Available for Remote</div>
                  </div>
                </motion.div>

                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/20 to-indigo-600/20 border border-indigo-500/20 relative overflow-hidden mt-8">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <LuIcons.LuZap size={120} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Let's work together!</h4>
                  <p className="text-sm text-gray-400 leading-relaxed italic">"The best way to predict the future is to create it."</p>
                </div>
              </div>

              <div className="md:col-span-3 w-full">
                <div className="p-10 rounded-[3rem] bg-white/50 dark:bg-slate-900/40 border border-slate-200/10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600" />
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Your Name</label>
                        <input required placeholder="Ash" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Email Address</label>
                        <input required type="email" placeholder="ash@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Your Message</label>
                        <textarea required placeholder="Let's talk about your project..." rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm font-medium resize-none" />
                    </div>
                    <button disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <LuIcons.LuSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                          Send Message
                        </>
                      )}
                    </button>
                    {formStatus === 'success' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-green-500 font-bold text-sm">🎉 Pesan terkirim! Segera gw bales bro.</motion.p>}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-10 border-t border-white/5 text-center">
           <p className="text-xs text-gray-500">© 2026 Ash Portfolio. Built with React & Supabase.</p>
        </footer>
      </div>

      <style jsx="true">{`
        .text-glow {
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </>
  );
}
