import React from 'react';
import { Mail, MapPin, Phone, Globe, Twitter, Linkedin, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="bg-[#060417] text-gray-400">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <img
                    src="https://cdn.iiitkota.ac.in/site/iiitkota.webp"
                    alt="IIIT Kota"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold leading-tight tracking-tight">
                    Indian Institute of Information Technology
                  </h3>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold uppercase tracking-[0.2em] text-xs">
                    Kota
                  </p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed max-w-md">
                An Institute of National Importance under an Act of Parliament, providing world-class education in Information Technology.
              </p>

              <div className="flex gap-3">
                {[
                  { icon: <Twitter size={18} />, href: "#" },
                  { icon: <Linkedin size={18} />, href: "#" },
                  { icon: <Instagram size={18} />, href: "#" },
                  { icon: <Youtube size={18} />, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info - Permanent Campus */}
            <div className="lg:col-span-4 space-y-5">
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest border-l-2 border-purple-500 pl-3">
                Contact Us
              </h4>
              
              <div className="space-y-4">
                <div className="flex gap-4 group">
                  <div className="mt-1 text-purple-400 group-hover:scale-110 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Permanent Campus</p>
                    <p className="text-xs leading-6">Ranpur, Kota, Rajasthan – 325003</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="mt-1 text-purple-400 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div className="text-xs space-y-1">
                    <p>0744-2667000</p>
                    <p>0744-2667010</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="mt-1 text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:office@iiitkota.ac.in" className="text-xs hover:text-white transition-colors">
                    office@iiitkota.ac.in
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links / Actions */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest border-l-2 border-purple-500 pl-3">
                Resources
              </h4>
              
              <div className="flex flex-col gap-3">
                <a 
                  href="https://iiitkota.ac.in" 
                  target="_blank" 
                  className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/5 hover:border-purple-500/40 transition-all"
                >
                  <span className="text-sm text-purple-100 flex items-center gap-2">
                    <Globe size={16} /> Official Website
                  </span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[10px] uppercase tracking-tighter text-gray-500 mb-2">Transit Campus</p>
                  <p className="text-xs text-gray-300">MNIT Jaipur, Rajasthan - 302017</p>
                  <p className="text-xs text-purple-400 mt-1">0141-2715071</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] sm:text-xs">
            <p className="text-gray-500">
              © {currentYear} IIIT Kota. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-gray-500">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact Support</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}