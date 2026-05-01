import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuPlus, LuTrash2, LuLogOut, LuSave, LuX, LuExternalLink, LuCode, 
  LuBriefcase, LuGraduationCap, LuLayoutGrid, LuZap, LuDatabase, LuTerminal
} from 'react-icons/lu';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // projects, experience, education, skills

  // Data States
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  
  // UI States
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form States
  const [formData, setFormData] = useState({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else {
      if (activeTab === 'projects') setProjects(data);
      else if (activeTab === 'experience') setExperience(data);
      else if (activeTab === 'education') setEducation(data);
      else if (activeTab === 'skills') setSkills(data);
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Login Gagal: ' + error.message);
    setLoading(false);
  }

  const handleLogout = () => supabase.auth.signOut();

  const resetForm = () => {
    setFormData({});
    setIsAdding(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      tags: item.tags ? item.tags.join(', ') : '',
      responsibilities: item.responsibilities ? item.responsibilities.join('\n') : '',
      technologies: item.technologies ? item.technologies.join(', ') : '',
      highlights: item.highlights ? item.highlights.join('\n') : '',
    });
    setIsAdding(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const submissionData = { ...formData };
    
    // Process Arrays
    if (submissionData.tags) submissionData.tags = submissionData.tags.split(',').map(t => t.trim());
    if (submissionData.technologies) submissionData.technologies = submissionData.technologies.split(',').map(t => t.trim());
    if (submissionData.responsibilities) submissionData.responsibilities = submissionData.responsibilities.split('\n').map(t => t.trim()).filter(t => t);
    if (submissionData.highlights) submissionData.highlights = submissionData.highlights.split('\n').map(t => t.trim()).filter(t => t);

    let error;
    if (editingItem) {
      const { error: err } = await supabase.from(activeTab).update(submissionData).eq('id', editingItem.id);
      error = err;
    } else {
      const { error: err } = await supabase.from(activeTab).insert([submissionData]);
      error = err;
    }

    if (error) alert(error.message);
    else {
      resetForm();
      fetchData();
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (error) alert(error.message);
    else fetchData();
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md p-8 rounded-3xl bg-[#12121a] border border-white/5 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-500 text-sm italic underline">Full Dynamic Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none transition-all" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none transition-all" placeholder="Password" required />
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg shadow-purple-500/20 mt-4">{loading ? 'Logging in...' : 'Enter Dashboard'}</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Admin Dashboard</h1>
            <p className="text-purple-400 font-medium">Manage your dynamic portfolio</p>
          </div>
          <button onClick={handleLogout} className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-bold text-sm">
            <LuLogOut size={18} /> Logout
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl w-fit mb-10 border border-white/5">
          {[
            { id: 'projects', label: 'Projects', icon: LuLayoutGrid },
            { id: 'experience', label: 'Experience', icon: LuBriefcase },
            { id: 'education', label: 'Education', icon: LuGraduationCap },
            { id: 'skills', label: 'Skills', icon: LuZap },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); resetForm(); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* List Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-purple-600 rounded-full" />
                Existing {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            
            {loading && !isAdding && <div className="p-10 text-center text-gray-500 animate-pulse">Loading data...</div>}
            
            <div className="space-y-4">
              {(activeTab === 'projects' ? projects : activeTab === 'experience' ? experience : activeTab === 'education' ? education : skills).map(item => (
                <motion.div key={item.id} layout className="p-6 rounded-2xl bg-[#12121a] border border-white/5 flex justify-between items-center group hover:border-purple-500/30 transition-all">
                  <div>
                    <h3 className="font-bold text-lg">{item.title || item.school || item.company || item.name}</h3>
                    <p className="text-sm text-gray-500">{item.period || item.level || item.category}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><LuCode size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"><LuTrash2 size={18} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <div className="p-8 rounded-3xl bg-[#12121a] border border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-600" />
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  {editingItem ? 'Edit Entry' : 'Add New Entry'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {activeTab === 'projects' && (
                    <>
                      <input type="text" placeholder="Project Title" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                      <textarea placeholder="Description" className="admin-input min-h-[100px]" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required />
                      <input type="text" placeholder="Tags (React, Vue, etc)" className="admin-input" value={formData.tags || ''} onChange={e => setFormData({...formData, tags: e.target.value})} />
                      <input type="text" placeholder="GitHub Link" className="admin-input" value={formData.code_url || ''} onChange={e => setFormData({...formData, code_url: e.target.value})} />
                      <input type="text" placeholder="Live Demo Link" className="admin-input" value={formData.live_url || ''} onChange={e => setFormData({...formData, live_url: e.target.value})} />
                    </>
                  )}

                  {activeTab === 'experience' && (
                    <>
                      <input type="text" placeholder="Job Title" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                      <input type="text" placeholder="Company" className="admin-input" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} required />
                      <input type="text" placeholder="Period (e.g. July 2025 - Dec 2025)" className="admin-input" value={formData.period || ''} onChange={e => setFormData({...formData, period: e.target.value})} />
                      <textarea placeholder="Description" className="admin-input" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                      <textarea placeholder="Responsibilities (one per line)" className="admin-input min-h-[100px]" value={formData.responsibilities || ''} onChange={e => setFormData({...formData, responsibilities: e.target.value})} />
                      <input type="text" placeholder="Technologies (comma separated)" className="admin-input" value={formData.technologies || ''} onChange={e => setFormData({...formData, technologies: e.target.value})} />
                    </>
                  )}

                  {activeTab === 'education' && (
                    <>
                      <input type="text" placeholder="School Name" className="admin-input" value={formData.school || ''} onChange={e => setFormData({...formData, school: e.target.value})} required />
                      <input type="text" placeholder="Level (e.g. SMK)" className="admin-input" value={formData.level || ''} onChange={e => setFormData({...formData, level: e.target.value})} />
                      <input type="text" placeholder="Period" className="admin-input" value={formData.period || ''} onChange={e => setFormData({...formData, period: e.target.value})} />
                      <input type="text" placeholder="Age during entry" className="admin-input" value={formData.age || ''} onChange={e => setFormData({...formData, age: e.target.value})} />
                      <input type="text" placeholder="Address" className="admin-input" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} />
                      <textarea placeholder="Highlights (one per line)" className="admin-input min-h-[100px]" value={formData.highlights || ''} onChange={e => setFormData({...formData, highlights: e.target.value})} />
                    </>
                  )}

                  {activeTab === 'skills' && (
                    <>
                      <select className="admin-input" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} required>
                        <option value="">Select Category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools</option>
                      </select>
                      <input type="text" placeholder="Skill Name (e.g. React.js)" className="admin-input" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                      <input type="text" placeholder="Icon Name (e.g. SiReact, SiLaravel)" className="admin-input" value={formData.icon_name || ''} onChange={e => setFormData({...formData, icon_name: e.target.value})} />
                      <p className="text-[10px] text-gray-500 italic">Use names from react-icons (SiReact, SiTailwindcss, SiNodedotjs, etc)</p>
                    </>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2">
                      <LuSave size={18} /> {editingItem ? 'Update' : 'Save'}
                    </button>
                    {editingItem && (
                      <button type="button" onClick={resetForm} className="px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                        <LuX size={20} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .admin-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
          transition: all 0.2s;
          font-size: 0.875rem;
        }
        .admin-input:focus {
          border-color: #9333ea;
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
