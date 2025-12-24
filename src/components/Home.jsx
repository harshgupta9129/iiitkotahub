import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  GraduationCap, 
  Award
} from 'lucide-react';

const Home = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative pb-20">
      {/* React 19 Native SEO Tags */}
      <title>IIIT KOTA HUB | Student Resources & SGPA Tool</title>
      <meta name="description" content="Welcome to IIIT KOTA HUB. Access the official SGPA calculator, academic resources, and student tools for CSE and IT branches." />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-10 md:pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} className="fill-purple-400" /> Academic Excellence
            </div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Streamline Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Academic Journey
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
              Welcome to the IIIT KOTA HUB. Access the specialized SGPA calculator designed for students, 
              perfectly aligned with the latest academic grading ordinance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/sgpacalculator"
                className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-purple-600/25 group"
              >
                Calculate SGPA <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/aboutus"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background for Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Academic Ordinance</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Calculations are based strictly on the IIIT Kota credit system and grading policy, ensuring precision for your academic records.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">All Branches</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Integrated support for Computer Science and Information Technology branches across all semesters and electives.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience seamless calculation. Enter your grades and view your results instantly with our high-performance engine.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS / TRUST SECTION --- */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-white/5 p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Empowering IIITians to aim higher.</h2>
              <p className="text-gray-400 mb-8">Tracking your progress is the first step toward academic mastery. The HUB is built to support your daily academic needs.</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">8+</span>
                  <span className="text-xs text-purple-400 uppercase font-bold tracking-widest">Semesters</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <span className="text-xs text-purple-400 uppercase font-bold tracking-widest">Accuracy</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="aspect-square w-full md:w-32 bg-white/5 rounded-3xl flex flex-col items-center justify-center border border-white/5">
                    <GraduationCap className="text-purple-500 mb-2" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">B.Tech</span>
                </div>
                <div className="aspect-square w-full md:w-32 bg-white/5 rounded-3xl flex flex-col items-center justify-center border border-white/5">
                    <Award className="text-pink-500 mb-2" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Grades</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="text-center py-20 px-4">
         <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Ready to check your performance?</h2>
         <Link 
            to="/sgpacalculator"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-lg transition-colors border-b-2 border-purple-500/20 hover:border-purple-500 pb-1"
          >
            Go to Calculator <Calculator size={20} />
          </Link>
      </section>

    </div>
  );
};

export default Home;