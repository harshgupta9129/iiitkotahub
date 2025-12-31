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
import PaperUpload from "./components/PaperUpload";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col bg-brand-dark selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      {/* Scroll Management */}
      <ScrollToTop />

      {/* FIXED GLOBAL BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />

      {/* PAGE TRANSITIONS CONTAINER */}
      <main className="grow relative flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Core Pages */}
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/aboutus" element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/sgpacalculator" element={<PageWrapper><SgpaCalculator /></PageWrapper>} />
            
            {/* Archive System */}
            <Route path="/previousyearpaper" element={<PageWrapper><PapersSection /></PageWrapper>} />
            <Route path="/uploadpaper" element={<PageWrapper><PaperUpload /></PageWrapper>} />
            
            {/* Restricted Access */}
            <Route path="/admindashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            
            {/* 404 Fallback - Recommended for Production */}
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="w-full flex flex-col grow"
  >
    {children}
  </motion.div>
);

export default App;