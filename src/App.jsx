import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './App.css'
import ScrollToTop from "./components/ScrollToTop";
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import SgpaCalculator from './components/SgpaCalculator'
import Footer from "./components/Footer";
import PapersSection from "./components/PapersSection";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col
      bg-[#030211] selection:bg-purple-500/30 selection:text-white">
      
      {/* CRITICAL SEO METADATA 
          These tags tell Google exactly what your site is about.
          Using specific keywords helps you outrank generic Vercel links.
      */}
      <title>IIIT KOTA HUB | SGPA Calculator & Academic Archive</title>
      <meta name="description" content="Official IIIT Kota Hub. Calculate SGPA/CGPA accurately and download Previous Year Question Papers from our dedicated Academic Archive." />
      <meta name="keywords" content="iiit kota hub, iiit kota sgpa calculator, iiit kota previous year papers, iiit kota academic archive, iiit kota question papers, iiitkota hub" />
      
      {/* Scroll to top when routes changes */}
      <ScrollToTop />

      {/* Background Depth Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="grow relative">
        <AnimatePresence mode="wait">
          {/* Transition wrapper uses location.pathname to restart animations on change */}
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={<PageWrapper><Home /></PageWrapper>} 
            />
            <Route 
              path="/aboutus" 
              element={<PageWrapper><AboutUs /></PageWrapper>} 
            />
            <Route 
              path="/sgpacalculator" 
              element={<PageWrapper><SgpaCalculator /></PageWrapper>} 
            />
            <Route 
              path="/previousyearpaper" 
              element={<PageWrapper><PapersSection /></PageWrapper>} 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

/** * Reusable wrapper for smooth page entry.
 * Provides a premium "App-like" feel during navigation.
 */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export default App;