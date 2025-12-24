import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import SgpaCalculator from './components/SgpaCalculator'
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col
      bg-[#030211] selection:bg-purple-500/30 selection:text-white">
      
      {/* Dynamic Background Elements for Desktop Depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
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
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

// Reusable wrapper for smooth page entry
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