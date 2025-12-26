import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Info, Calculator, ExternalLink , Archive} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", path: "/aboutus", icon: <Info size={18} /> },
    { name: "SGPA Calculator", path: "/sgpacalculator", icon: <Calculator size={18} /> },
    { name: "Papers Archive", path: "/previousyearpaper", icon: <Archive size={18} /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-100 transition-all duration-500 ${
          scrolled ? "pt-2 md:pt-3" : "pt-0"
        }`}
      >
        <div className="max-w-350 mx-auto px-0 md:px-6 lg:px-10">
          <div 
            className={`transition-all duration-500 flex items-center justify-between px-4 md:px-10 h-20 md:h-24 ${
              scrolled 
                ? "bg-[#0b0f2f]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl" 
                : "bg-[#060417] border-b border-white/5"
            }`}
          >
            
            {/* LOGO SECTION - Desktop */}
            <Link to="/" className="flex items-center gap-4 group shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <img
                  src="https://cdn.iiitkota.ac.in/site/iiitkota.webp"
                  alt="IIIT Kota"
                  className="relative h-12 w-12 md:h-16 md:w-16 object-contain"
                />
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="text-white text-xs md:text-sm font-medium tracking-wide opacity-90">
                  भारतीय सूचना प्रौद्योगिकी संस्थान कोटा
                </span>
                <span className="text-white text-sm md:text-lg font-bold tracking-tight leading-none my-1">
                  Indian Institute of Information Technology Kota
                </span>
                <span className="text-purple-400 text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-80">
                  An Institute of National Importance under an Act of Parliament
                </span>
              </div>
              
              {/* Mobile */}
              <span className="sm:hidden text-white font-bold text-xl tracking-tighter">
                IIIT <span className="text-purple-500 text-glow">KOTA</span>
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        location.pathname === link.path
                          ? "bg-white/10 text-white shadow-inner"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div 
                          layoutId="activeNav"
                          className="absolute inset-0 border border-purple-500/50 rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-10 w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />

              <a 
                href="https://iiitkota.ac.in" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-purple-900/40"
              >
                MAIN SITE <ExternalLink size={14} />
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-87.5 bg-[#060417] border-l border-white/10 z-110 p-8 lg:hidden"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="text-purple-500 font-black tracking-widest uppercase">Navigation</span>
                  <X className="text-white cursor-pointer" onClick={() => setOpen(false)} />
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 text-white font-bold"
                    >
                      {link.icon} {link.name}
                    </Link>
                  ))}
                  <a href="https://iiitkota.ac.in" className="mt-4 flex items-center justify-center gap-2 p-5 rounded-2xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/40">
                    VISIT MAIN SITE <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Space For Navbar For Fixed Position On Top */}
      <div className="h-20 md:h-28"></div>
    </>
  );
}