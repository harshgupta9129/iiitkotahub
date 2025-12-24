import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl 
        bg-gradient-to-r from-[#0b0f2f]/85 via-[#120b3d]/85 to-[#1a0f4f]/85 
        border-b border-white/10 shadow-lg shadow-purple-900/20 py-4">

        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Text */}
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://cdn.iiitkota.ac.in/site/iiitkota.webp"
                alt="IIIT Kota"
                className="h-11 w-11 object-contain"
              />

              {/* Desktop / Tablet Text */}
              <div className="hidden sm:flex flex-col leading-tight text-white">
                <span className="text-sm font-semibold tracking-wide">
                  भारतीय सूचना प्रौद्योगिकी संस्थान कोटा
                </span>
                <span className="text-sm font-semibold">
                  Indian Institute of Information Technology Kota
                </span>
                <span className="text-xs text-purple-300">
                  An Institute of National Importance under an Act of Parliament
                </span>
              </div>

              {/* Mobile Short Name */}
              <span className="sm:hidden text-white font-extrabold text-lg tracking-wide">
                IIIT <span className="text-purple-400">KOTA</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
              {["About Us", "SGPA Calculator"].map((item) => (
                <li
                  key={item}
                  className="relative cursor-pointer transition hover:text-white
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-0 after:bg-purple-500
                    after:transition-all hover:after:w-full"
                >
                  {item}
                </li>
              ))}

              {/* CTA Button */}
              <li>
                <button className="ml-4 px-5 py-2 rounded-full 
                  bg-purple-600 hover:bg-purple-500 
                  text-white text-sm font-semibold 
                  shadow-lg shadow-purple-600/30 transition">
                  Explore
                </button>
              </li>
            </ul>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white text-2xl"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-[#0b0f2f]/95 border-t border-white/10">
            <ul className="flex flex-col items-center py-6 space-y-5 text-sm font-medium text-gray-300">
              <li className="hover:text-white transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition cursor-pointer">
                SGPA Calculator
              </li>

              <button className="mt-3 px-6 py-2 rounded-full 
                bg-purple-600 hover:bg-purple-500 
                text-white font-semibold 
                shadow-lg shadow-purple-600/30 transition">
                Explore
              </button>
            </ul>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
