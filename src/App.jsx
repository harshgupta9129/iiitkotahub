import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import SgpaCalculator from './components/SgpaCalculator'
import Footer from "./components/Footer";


function App() {
  return (
    <div className="min-h-screen w-full
      bg-gradient-to-br from-[#050817] via-[#0b0f2f] to-[#1a0f4f]
      text-gray-200">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/sgpacalculator" element={<SgpaCalculator/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
