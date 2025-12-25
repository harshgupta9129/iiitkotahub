import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, get, child } from "firebase/database";
import Stepper from "./Stepper";
import { Download, FileText, Search, RotateCcw, Archive, Loader2, ChevronDown, BookOpen } from "lucide-react";

export default function PapersSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState({ year: "", sem: "", branch: "", examType: "" });
  const [options, setOptions] = useState({ years: [], sems: [], branches: [], examTypes: [] });
  const [papers, setPapers] = useState(null);

  const steps = [
    { id: 1, title: "Select Year" },
    { id: 2, title: "Choose Semester" },
    { id: 3, title: "Pick Branch" },
    { id: 4, title: "View Papers" },
  ];

  useEffect(() => {
    const fetchYears = async () => {
      const snapshot = await get(child(ref(db), "papers"));
      if (snapshot.exists()) {
        setOptions(prev => ({ ...prev, years: Object.keys(snapshot.val()) }));
      }
    };
    fetchYears();
  }, []);

  const handleYearChange = async (year) => {
    setSelection({ year, sem: "", branch: "", examType: "" });
    setPapers(null);
    setCurrentStep(2);
    if (!year) return;

    setLoading(true);
    const snapshot = await get(child(ref(db), `papers/${year}`));
    if (snapshot.exists()) {
      setOptions(prev => ({ ...prev, sems: Object.keys(snapshot.val()) }));
    }
    setLoading(false);
  };

  const handleSemChange = async (sem) => {
    setSelection(prev => ({ ...prev, sem, branch: "", examType: "" }));
    if (!sem) return;

    setLoading(true);
    const snapshot = await get(child(ref(db), `papers/${selection.year}/${sem}`));
    if (snapshot.exists()) {
      setOptions(prev => ({ ...prev, branches: Object.keys(snapshot.val()) }));
      setCurrentStep(3);
    }
    setLoading(false);
  };

  const handleBranchChange = async (branch) => {
    setSelection(prev => ({ ...prev, branch, examType: "" }));
    if (!branch) return;

    setLoading(true);
    const snapshot = await get(child(ref(db), `papers/${selection.year}/${selection.sem}/${branch}`));
    if (snapshot.exists()) {
      setOptions(prev => ({ ...prev, examTypes: Object.keys(snapshot.val()) }));
      setCurrentStep(4);
    }
    setLoading(false);
  };

  const fetchFinalPapers = async () => {
    setLoading(true);
    const path = `papers/${selection.year}/${selection.sem}/${selection.branch}/${selection.examType}`;
    const snapshot = await get(child(ref(db), path));
    if (snapshot.exists()) {
      setPapers(snapshot.val());
      setCurrentStep(5);
    }
    setLoading(false);
  };

  return (
    <article className="min-h-screen bg-[#030014] text-white pt-10 pb-20 px-4">
      {/* SEO METADATA FOR CRAWLERS */}
      <title>IIIT Kota Previous Year Question Papers | Academic Archive Vault</title>
      <meta name="description" content="Download IIIT Kota Previous Year Question Papers. Access the official Academic Archive for Mid-sem and End-sem papers in CSE, ECE, and IT branches." />

      <header className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <Archive size={12} /> Academic Archive Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          ARCHIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">VAULT</span>
        </h1>
        <h2 className="text-gray-400 text-xs md:text-sm mt-4 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-widest">
          The Official Repository for IIIT Kota Previous Year Question Papers
        </h2>
      </header>

      <Stepper currentStep={currentStep} steps={steps} />

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <aside className="lg:col-span-4 h-full">
          <div className="bg-[#0b0f2f]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-purple-400 font-black uppercase tracking-[0.15em] text-[11px] mb-4 flex items-center gap-2">
                <Search size={14} /> Filter Repository
              </h3>

              <div className="space-y-5">
                <CustomDropdown label="Academic Year" value={selection.year} options={options.years} onChange={handleYearChange} />
                <CustomDropdown label="Semester Number" value={selection.sem} options={options.sems} onChange={handleSemChange} disabled={!selection.year} />
                <CustomDropdown label="Branch / Course" value={selection.branch} options={options.branches} onChange={handleBranchChange} disabled={!selection.sem} />
                <CustomDropdown label="Examination Type" value={selection.examType} options={options.examTypes} onChange={(val) => setSelection(p => ({...p, examType: val}))} disabled={!selection.branch} />
              </div>
            </div>

            <button 
              onClick={fetchFinalPapers}
              disabled={!selection.examType || loading}
              className="w-full mt-8 py-4 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl text-white font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] active:scale-95 disabled:opacity-20"
            >
              {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Verify & Access Vault"}
            </button>
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[2rem] p-8 min-h-[500px] h-full flex flex-col relative overflow-hidden transition-all duration-500">
            {!papers ? (
              <div className="m-auto text-center opacity-40">
                <BookOpen size={60} className="mx-auto mb-4 text-gray-600" />
                <p className="text-lg font-black uppercase tracking-tighter">Enter Parameters to Load Archive</p>
                <p className="text-xs mt-1 uppercase tracking-widest font-bold">Waiting for database query...</p>
              </div>
            ) : (
              <div className="w-full animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    Results: {selection.year} / Sem {selection.sem} / {selection.branch}
                  </h3>
                  <button onClick={() => {setPapers(null); setSelection({year:"",sem:"",branch:"",examType:""}); setCurrentStep(1);}} className="text-gray-600 hover:text-purple-400 transition-colors">
                    <RotateCcw size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(papers).map(([name, url]) => (
                    <a 
                      key={name} href={url} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/40 transition-all group"
                      title={`Download IIIT Kota ${name.replace(/_/g, " ")} Paper`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg">
                          <FileText size={22} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black uppercase text-gray-300 group-hover:text-white">{name.replace(/_/g, " ")}</span>
                          <span className="text-[9px] text-gray-600 font-bold uppercase mt-1 tracking-widest">{selection.examType} Paper</span>
                        </div>
                      </div>
                      <Download size={18} className="text-gray-600 group-hover:text-purple-400 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
    </article>
  );
}

function CustomDropdown({ label, value, options, onChange, disabled }) {
  return (
    <div className={`transition-opacity duration-300 ${disabled ? "opacity-20 pointer-events-none" : "opacity-100"}`}>
      <label className="text-[9px] font-black text-gray-600 uppercase mb-2 block tracking-[0.2em]">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#121026] border border-white/10 rounded-xl px-4 py-4 text-xs font-bold text-white focus:border-purple-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
          aria-label={`Select ${label}`}
        >
          <option value="">Choose {label}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}