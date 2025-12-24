import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import Stepper from "./Stepper";
import { SgpaData } from "../data/SgpaData";
import { gradePoints, gradeOptions } from "../utils/gradeMap";

const SgpaCalculator = () => {
  const semesters = Object.keys(SgpaData);
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [subjectState, setSubjectState] = useState({});
  const [sgpa, setSgpa] = useState(null);

  const branches = semester ? Object.keys(SgpaData[semester]) : [];
  const subjects = SgpaData?.[semester]?.[branch] || [];

  useEffect(() => {
    if (subjects.length > 0) {
      const initialState = subjects.reduce((acc, sub) => {
        acc[sub.code] = { credits: sub.credits, grade: "" };
        return acc;
      }, {});
      setSubjectState(initialState);
      setSgpa(null);
    }
  }, [subjects]);

  const handleGradeChange = (code, value) => {
    setSubjectState((prev) => ({
      ...prev,
      [code]: { ...prev[code], grade: value },
    }));
  };

  const reset = () => {
    setSemester("");
    setBranch("");
    setSubjectState({});
    setSgpa(null);
    setCurrentStep(1);
  };

  const allGradesSelected =
    subjects.length > 0 &&
    subjects.every((sub) => subjectState[sub.code]?.grade !== "");

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;
    Object.values(subjectState).forEach(({ credits, grade }) => {
      if (gradePoints[grade] !== undefined) {
        totalCredits += credits;
        weightedSum += credits * gradePoints[grade];
      }
    });
    const result =
      totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
    setSgpa(result);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-[#030211] text-white selection:bg-purple-500/30">
      {/* React 19 Native SEO Tags */}
      <title>SGPA Calculator | IIIT KOTA HUB</title>
      <meta
        name="description"
        content="Calculate your IIIT Kota SGPA accurately. Supports B.Tech CSE and IT branches for all semesters based on the 10-point grading system."
      />
      <meta 
        name="keywords" 
        content="IIIT Kota SGPA, IIITK Hub, SGPA Calculator, CSE IT Grading, IIIT Kota Portal" 
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-4">
            <GraduationCap size={14} /> IIIT KOTA HUB
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            SGPA <span className="text-purple-500 text-glow">Calculator</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Fast, accurate, and optimized for both Information Technology and
            Computer Science branches at IIIT Kota.
          </p>
        </motion.div>

        <Stepper currentStep={currentStep} />

        {/* MAIN CONFIGURATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* LEFT: Selection Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-6 flex items-center gap-2">
                <BookOpen size={16} /> Course Selection
              </h3>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-xs font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">
                    Select Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => {
                      setSemester(e.target.value);
                      setBranch("");
                      setCurrentStep(2);
                    }}
                    className="w-full bg-[#0b0f2f] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all cursor-pointer hover:border-purple-500/30"
                  >
                    <option value="" disabled>
                      Choose Semester
                    </option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">
                    Choose Branch
                  </label>
                  <select
                    value={branch}
                    disabled={!semester}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      setCurrentStep(3);
                    }}
                    className="w-full bg-[#0b0f2f] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500/30"
                  >
                    <option value="" disabled>
                      Choose Branch
                    </option>
                    {branches.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                </div>

                {branch && (
                  <button
                    onClick={reset}
                    className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors pt-2"
                  >
                    <RotateCcw size={14} /> Clear Selections
                  </button>
                )}
              </div>
            </div>

            {/* QUICK RESULT BOX (Desktop Only) */}
            <AnimatePresence>
              {sgpa && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden lg:block bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(147,51,234,0.3)]"
                >
                  <p className="text-purple-200 text-sm font-medium mb-1 uppercase tracking-tighter">
                    Calculated SGPA
                  </p>
                  <h2 className="text-6xl font-black text-white">{sgpa}</h2>
                  <div className="mt-4 px-4 py-2 bg-black/20 rounded-lg inline-block text-xs font-bold text-white uppercase">
                    Status: Excellent ✨
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Grade Input Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {currentStep >= 3 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-2 px-2">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <CheckCircle2 className="text-purple-500" size={20} />{" "}
                      Subject Grades
                    </h2>
                    <span className="text-xs text-gray-500">
                      {subjects.length} Subjects Detected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjects.map((sub, idx) => (
                      <motion.div
                        key={sub.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="max-w-[70%]">
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                              {sub.code}
                            </span>
                            <h4 className="text-sm font-semibold text-gray-100 truncate mt-1">
                              {sub.name}
                            </h4>
                          </div>
                          <div className="bg-purple-500/20 px-2 py-1 rounded text-[10px] font-bold text-purple-300">
                            {sub.credits} CREDITS
                          </div>
                        </div>

                        <select
                          value={subjectState[sub.code]?.grade || ""}
                          onChange={(e) =>
                            handleGradeChange(sub.code, e.target.value)
                          }
                          className={`w-full bg-[#030211] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none
                            ${
                              subjectState[sub.code]?.grade
                                ? "border-purple-500/50 text-white"
                                : "border-white/10 text-gray-500"
                            }`}
                        >
                          <option value="" disabled>
                            Select Grade
                          </option>
                          {gradeOptions.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    ))}
                  </div>

                  {/* MOBILE RESULT / CALCULATE BUTTON */}
                  <div className="sticky bottom-4 lg:relative lg:bottom-0 mt-8">
                    <button
                      onClick={calculateSGPA}
                      disabled={!allGradesSelected}
                      className={`w-full py-5 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all shadow-2xl
                        ${
                          allGradesSelected
                            ? "bg-purple-600 hover:bg-purple-500 text-white translate-y-[-4px] hover:shadow-purple-500/50"
                            : "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
                        }`}
                    >
                      <Calculator size={20} />
                      {sgpa ? "Recalculate SGPA" : "Calculate My SGPA"}
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Mobile-only Result popup */}
                  {sgpa && (
                    <div className="lg:hidden mt-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-center shadow-2xl">
                      <p className="text-purple-200 text-sm font-medium mb-1">
                        Your Result
                      </p>
                      <h2 className="text-5xl font-black text-white">{sgpa}</h2>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-500">
                    Select your details to begin
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    The subject list for IIIT Kota will load here.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SgpaCalculator;