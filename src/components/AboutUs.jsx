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
  CheckCircle
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: "Established", value: "2013" },
    { label: "Grading System", value: "10 Points" },
    { label: "Accuracy", value: "100%" },
    { label: "Designed For", value: "IIITK" },
  ];

  const faqs = [
    {
      q: "How is the SGPA calculated?",
      a: "The Semester Grade Point Average is calculated by dividing the sum of (Grade Points × Credits) by the total number of credits earned in a semester."
    },
    {
      q: "Is this tool official?",
      a: "This is a student-focused tool designed to align perfectly with the IIIT Kota Academic Ordinance. Always cross-verify results with your ERP portal for official records."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* --- HEADER SECTION --- */}
      <header className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Info size={14} /> Our Mission
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Empowering Students with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Precision & Clarity
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
          The IIIT Kota SGPA Calculator was built to simplify academic tracking. 
          We believe that transparency in grading helps students focus on what 
          matters most: learning and innovation.
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
            className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
          >
            <p className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</p>
            <p className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-[0.2em]">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-purple-500" /> Academic Ordinance
            </h2>
            <p className="text-gray-400 leading-relaxed">
              IIIT Kota follows a rigorous academic structure. Our calculator is 
              hardcoded with the 10-point grading system where 'A+' corresponds 
              to 10 grade points, down to 'F' for 0.
            </p>
          </div>

          <ul className="space-y-4">
            {['CS & IT Branch Support', 'Latest Elective Database', 'Mobile-Responsive UI', 'Instant Grade Projections'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-300">
                <CheckCircle size={18} className="text-purple-500" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Decorative Image/Box */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-2xl rounded-3xl" />
          <div className="relative glass p-8 rounded-[2.5rem] border border-white/10 aspect-video flex flex-col justify-center overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Target size={120} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 italic">"An Institute of National Importance"</h3>
             <p className="text-sm text-gray-400 leading-relaxed">
               Established in 2013, IIIT Kota is a joint venture of the Government of India, 
               Government of Rajasthan, and Industry Partners.
             </p>
             <div className="mt-6">
                <a href="https://iiitkota.ac.in" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">
                  Visit Official Website <ExternalLink size={14} />
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm mt-2">Everything you need to know about the tool</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group glass rounded-2xl border border-white/5 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none group-open:bg-white/5 transition-colors">
                <span className="font-semibold text-gray-200">{faq.q}</span>
                <ChevronRight className="text-gray-500 group-open:rotate-90 transition-transform" size={20} />
              </summary>
              <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* --- CONTACT / TEAM SECTION --- */}
      <section className="p-8 md:p-16 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center">
        <Users className="mx-auto text-purple-500 mb-6" size={40} />
        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Have suggestions or found a bug in the calculation? Reach out to the 
          developer team at the institute office.
        </p>
        <a 
          href="mailto:office@iiitkota.ac.in" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all"
        >
          <Mail size={18} /> office@iiitkota.ac.in
        </a>
      </section>

    </div>
  );
};

export default AboutUs;