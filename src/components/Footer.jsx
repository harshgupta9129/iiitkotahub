import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, runTransaction } from "firebase/database";
import {Link} from "react-router-dom"

import {
  Mail,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Eye,
  Archive,
  Calculator,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [totalViews, setTotalViews] = useState(null);

  useEffect(() => {
    const viewsRef = ref(db, "totalHubViews");
    runTransaction(viewsRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    const unsubscribe = onValue(viewsRef, (snapshot) => {
      if (snapshot.exists()) {
        setTotalViews(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#030014] overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand & Analytics Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/favicon-32x32.png" alt="IIIT Kota Hub" className="h-8 w-8" />
              <h3 className="text-white font-black uppercase tracking-tighter text-2xl">
                IIIT KOTA <span className="text-purple-500">HUB</span>
              </h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              The leading resource for IIIT Kota students. Built to provide the 
              most accurate SGPA Calculator (CGPA) and Link comprehensive 
              Academic Archive for previous year question papers.
            </p>

            {/* Live Counter for SEO Trust */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <Eye size={16} className="text-purple-500" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Global Portal Views</p>
                <p className="text-lg font-black text-white leading-none">
                  {totalViews !== null ? totalViews.toLocaleString() : "---"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <Link key={i} to="/" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-purple-400 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Targeted SEO Links Section */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-2 border-purple-500 pl-3">
              Quick Resources
            </h4>
            <nav className="grid grid-cols-1 gap-4">
              <Link to="/sgpacalculator" className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all">
                <span className="text-xs font-bold text-gray-400 group-hover:text-purple-400 flex items-center gap-3">
                  <Calculator size={16} /> IIIT Kota SGPA Calculator
                </span>
                <ExternalLink size={14} className="text-gray-700" />
              </Link>
              <Link to="/previousyearpaper" className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all">
                <span className="text-xs font-bold text-gray-400 group-hover:text-purple-400 flex items-center gap-3">
                  <Archive size={16} /> Previous Year Papers
                </span>
                <ExternalLink size={14} className="text-gray-700" />
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-2 border-purple-500 pl-3">
              Campus Info
            </h4>
            <div className="space-y-4 text-[11px] text-gray-500">
              <div className="flex gap-3">
                <MapPin size={16} className="text-purple-500 shrink-0" />
                <p>Ranpur, Kota, Rajasthan – 325003</p>
              </div>
              <div className="flex gap-3">
                <Globe size={16} className="text-purple-500 shrink-0" />
                <Link to="https://iiitkota.ac.in" target="_blank" className="hover:text-white">iiitkota.ac.in</Link>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-purple-500 shrink-0" />
                <Link to="mailto:office@iiitkota.ac.in" className="hover:text-white">office@iiitkota.ac.in</Link>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Footer Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">
            © {currentYear} IIIT KOTA HUB • Academic Archive • SGPA Calculator
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
            <Link to="#" className="hover:text-purple-500 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-purple-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}