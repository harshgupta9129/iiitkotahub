import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  GraduationCap, 
  Award,
  Archive,
  BookOpen
} from 'lucide-react';

const Home = () => {
  // Animation Variants for UX Engagement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative pb-20">
      {/* --- SEO METADATA SECTION --- */}
      <title>IIIT KOTA HUB | SGPA Calculator & Previous Year Papers</title>
      <meta name="description" content="Access the official IIIT Kota SGPA calculator, Academic Archive for previous year question papers, and essential student resources for CSE and IT branches." />
      <meta name="keywords" content="IIIT Kota HUB, IIIT Kota SGPA Calculator, IIIT Kota Previous Year Papers, IIIT Kota Academic Archive, IIIT Kota IT CSE Papers" />
      <link rel="canonical" href="https://iiitkota.vercel.app/" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-10 md:pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} className="fill-purple-400" /> Academic Portal
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase leading-none">
              IIIT KOTA <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400">HUB</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              The specialized SGPA Calculator and Academic Archive built for the students of IIIT Kota. 
              Get accurate grading results and access high-quality previous year papers instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/sgpacalculator"
                className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl shadow-purple-600/25 group"
              >
                SGPA Calculator <Calculator size={20} />
              </Link>
              <Link 
                to="/previousyearpaper"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
              >
                Papers Archive <Archive size={20} className="group-hover:text-purple-400 transition-colors" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Background Glows */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/4 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* --- CORE FEATURES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-purple-500 uppercase tracking-[0.3em] mb-4">Integrated Ecosystem</h2>
          <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">Everything a Student Needs.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature: Calculator */}
          <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-white/2 border border-white/10 hover:border-purple-500/50 hover:bg-white/4 transition-all group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />
            <Calculator size={32} className="text-purple-500 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">SGPA Calculator</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Optimized for IIIT Kota all branches. Follows the official 10-point relative grading scale for 100% accuracy.
            </p>
          </motion.div>

          {/* Feature: Archive */}
          <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-white/2 border border-white/10 hover:border-indigo-500/50 hover:bg-white/4 transition-all group relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
            <Archive size={32} className="text-indigo-500 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Academic Archive</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Access Mid-Sem and End-Sem Previous Year Papers. Filter by year, semester, and branch to find exactly what you need.
            </p>
          </motion.div>

          {/* Feature: Grade Policy */}
          <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-white/2 border border-white/10 hover:border-pink-500/50 hover:bg-white/4 transition-all group relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-all" />
            <ShieldCheck size={32} className="text-pink-500 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Accurate Policy</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Aligned with the latest academic ordinance. Updates reflect real-time changes in the credit and grading system.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- TRUST STATS SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-[3rem] bg-linear-to-br from-purple-900/10 via-[#0b0f2f]/40 to-indigo-900/10 border border-white/5 p-8 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Empowering <br /> IIITians to aim higher.
              </h2>
              <p className="text-gray-400 text-lg mb-10 font-medium">
                The HUB is a community-focused platform designed to simplify academic complexities for students at Indian Institute of Information Technology, Kota.
              </p>
              
              <div className="flex gap-10 justify-center lg:justify-start">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-white tracking-tighter">8+</span>
                  <span className="text-[10px] text-purple-400 uppercase font-black tracking-[0.2em] mt-1">Semesters</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-white tracking-tighter">100%</span>
                  <span className="text-[10px] text-purple-400 uppercase font-black tracking-[0.2em] mt-1">Verified</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="aspect-square w-full md:w-40 bg-white/5 rounded-4xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-all group">
                    <GraduationCap size={32} className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">B.Tech</span>
                </div>
                <div className="aspect-square w-full md:w-40 bg-white/5 rounded-4xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-all group">
                    <Award size={32} className="text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Grades</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL ACTION SECTION --- */}
      <section className="text-center py-24 px-4 bg-linear-to-b from-transparent to-purple-900/5">
         <h2 className="text-3xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
           Optimize Your <br /> Academic Potential.
         </h2>
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Link 
              to="/sgpacalculator"
              className="text-purple-400 hover:text-white font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-all p-4 border border-purple-500/20 rounded-xl hover:bg-purple-600 shadow-xl"
            >
              Start Calculating <Calculator size={18} />
            </Link>
            <Link 
              to="/previousyearpaper"
              className="text-gray-400 hover:text-white font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-all p-4 border border-white/5 rounded-xl hover:bg-white/5 shadow-xl"
            >
              Explore Archive <BookOpen size={18} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;