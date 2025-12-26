import React from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  BookOpen, 
  Target, 
  Users, 
  ChevronRight, 
  Mail, 
  ExternalLink,
  CheckCircle,
  ShieldCheck,
  Archive
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: "Established", value: "2013" },
    { label: "Grading Scale", value: "10.0" },
    { label: "Resource Hub", value: "IIITK" },
    { label: "Data Precision", value: "100%" },
  ];

  const faqs = [
    {
      q: "How is the SGPA calculated for IIIT Kota?",
      a: "The Semester Grade Point Average is calculated using the weighted average method. It is the sum of (Grade Points × Credits) for all subjects divided by the total credits earned in that specific semester."
    },
    {
      q: "Is the Academic Archive updated?",
      a: "Yes, the Archive Vault is dynamically synced with Firebase to provide the latest Mid-Term and End-Term Previous Year Question Papers for CSE, IT, and ECE branches."
    },
    {
      q: "Is this tool an official portal?",
      a: "This is a student-focused resource hub designed to align strictly with the IIIT Kota Academic Ordinance. For official records, students should always refer to the institute ERP."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* --- SEO METADATA SECTION --- */}
      <title>About IIIT KOTA HUB | Academic Archive & SGPA Tool</title>
      <meta name="description" content="Learn more about the IIIT KOTA HUB. Discover how we provide accurate SGPA calculations and a comprehensive archive of previous year question papers for students." />

      {/* --- HEADER SECTION --- */}
      <header className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6"
        >
          <Target size={14} /> Mission Statement
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
          Transparency in <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
            Academic Success
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed font-medium">
          The IIIT KOTA HUB was engineered to eliminate academic uncertainty. 
          By providing a centralized **SGPA Calculator** and a high-performance 
          Academic Archive, we empower students to track progress and prepare 
          efficiently for examinations.
        </p>
      </header>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center hover:border-purple-500/50 transition-all"
          >
            <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* --- CORE PILLARS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
              <ShieldCheck className="text-purple-500" /> Academic Integrity
            </h2>
            <p className="text-gray-400 leading-relaxed font-medium">
              Calculations within the Hub follow the official IIIT Kota 10-point 
              grading system. Our database includes verified credit mappings for 
              all core subjects and electives across all semesters.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { text: 'Verified SGPA Tool', icon: <BookOpen size={16}/> },
              { text: 'Dynamic Paper Archive', icon: <Archive size={16}/> },
              { text: 'Mobile-First Design', icon: <CheckCircle size={16}/> },
              { text: 'Cloud Data Fetching', icon: <CheckCircle size={16}/> }
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-gray-300">
                <span className="text-purple-500">{item.icon}</span>
                <span className="font-bold text-xs uppercase tracking-widest">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Showcase Box */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-3xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-[#0b0f2f]/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 overflow-hidden min-h-[300px] flex flex-col justify-center">
             <div className="absolute -top-10 -right-10 p-6 opacity-5">
                <Target size={200} />
             </div>
             <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Institute of National Importance</h3>
             <p className="text-sm text-gray-500 leading-relaxed font-medium">
               IIIT Kota is a public-private partnership venture established in 2013, 
               mentored by MNIT Jaipur. The HUB serves as a bridge for the student 
               community to access digital resources seamlessly.
             </p>
             <div className="mt-8">
                <a href="https://iiitkota.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors">
                  View Official Portal <ExternalLink size={14} />
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Common Inquiries</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Essential information about the IIIT Kota Hub</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white/5 rounded-2xl border border-white/5 overflow-hidden transition-all">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                <span className="font-bold text-gray-200 uppercase tracking-tight text-sm">{faq.q}</span>
                <ChevronRight className="text-purple-500 group-open:rotate-90 transition-transform" size={20} />
              </summary>
              <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 font-medium">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-b from-purple-600/5 to-transparent border border-white/5 text-center">
        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Users className="text-purple-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Student Connectivity</h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto font-medium">
          For technical discrepancies in the Academic Archive or the SGPA tool, 
          contact the development maintainers or the institute office.
        </p>
        <a 
          href="mailto:office@iiitkota.ac.in" 
          className="inline-flex items-center gap-4 px-10 py-5 bg-purple-600 hover:bg-purple-500 rounded-2xl text-white font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-purple-600/20"
        >
          <Mail size={18} /> Contact Office
        </a>
      </section>

    </div>
  );
};

export default AboutUs;