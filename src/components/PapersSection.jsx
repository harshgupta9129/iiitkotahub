import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase"; // Updated import
import Stepper from "./Stepper";
import {
  Download, FileText, Search, RotateCcw, Archive,
  Loader2, ChevronDown, BookOpen, ShieldCheck, Upload, User
} from "lucide-react";

export default function PapersSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState({ year: "", sem: "", branch: "", examType: "" });
  const [options, setOptions] = useState({ years: [], sems: [], branches: [], examTypes: [] });
  const [papers, setPapers] = useState(null);
  const [subjectMap, setSubjectMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const steps = [
    { id: 1, title: "Year" },
    { id: 2, title: "Semester" },
    { id: 3, title: "Branch" },
    { id: 4, title: "Vault" },
  ];

  // 1. SEO ENHANCEMENT
  useEffect(() => {
    document.title = "IIIT Kota Previous Year Question Papers | Academic Archive Vault";
    let metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Download IIIT Kota Previous Year Question Papers. Access the official Academic Archive for Mid-sem and End-sem papers in CSE, ECE, and IT branches.";
    document.head.appendChild(metaDesc);
  }, []);

  // 2. DATA INITIALIZATION (Fetch Years and Subjects)
  useEffect(() => {
    const fetchMetadata = async () => {
      // Fetch distinct years from 'papers' table where status is 'verified'
      const { data: yearData } = await supabase
        .from('papers')
        .select('year')
        .eq('status', 'verified');

      // Extract unique years
      if (yearData) {
        const uniqueYears = [...new Set(yearData.map(item => item.year))].sort().reverse();
        setOptions(prev => ({ ...prev, years: uniqueYears }));
      }

      // Note: If you store subject mapping in a separate table, fetch it here.
      // For now, I'll keep subjectMap empty or you can add a 'subjects' table in Supabase later.
      // const { data: subjectData } = await supabase.from('subjects').select('*');
      // if (subjectData) ...
    };
    fetchMetadata();
  }, []);

  // 3. SUBJECT LOOKUP LOGIC
  const getSubjectTitle = (courseCode) => {
    if (!subjectMap || Object.keys(subjectMap).length === 0) return courseCode; // Fallback to code if map empty
    const normalizedCode = courseCode.toUpperCase().trim();
    return subjectMap[normalizedCode] || "General Paper";
  };

  // 4. INSTANT SEARCH FILTERING
  const filteredPapers = useMemo(() => {
    if (!papers) return [];
    return papers.filter((paper) =>
      paper.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getSubjectTitle(paper.course_code).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (paper.uploaded_by && paper.uploaded_by.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [papers, searchQuery, subjectMap]);

  // 5. SECURE DOWNLOAD HANDLER
  const handleDownload = async (fileUrl, courseCode, branch, sem, year) => {
    if (!fileUrl) return;

    // Generate the official name again for the download
    // Fallback to "Paper.pdf" if data is missing, but it shouldn't be
    const fileName = (courseCode && branch && sem && year)
      ? `${courseCode}_${branch}_${sem}_${year}_IIITKOTAHUB.pdf`
      : "IIITKOTAHUB_Paper.pdf";

    try {
      // We fetch the blob to force the filename
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // This forces the name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: just open in new tab if blob fetch fails
      window.open(fileUrl, "_blank");
    }
  };

  // --- DROPDOWN LOGIC (Cascading Filters) ---

  const handleYearChange = async (year) => {
    setSelection({ year, sem: "", branch: "", examType: "" });
    setPapers(null);
    setCurrentStep(2);
    if (!year) return;

    setLoading(true);
    // Fetch semesters available for this year
    const { data } = await supabase
      .from('papers')
      .select('sem')
      .eq('status', 'verified')
      .eq('year', year);

    if (data) {
      const uniqueSems = [...new Set(data.map(item => item.sem))].sort();
      setOptions(prev => ({ ...prev, sems: uniqueSems }));
    }
    setLoading(false);
  };

  const handleSemChange = async (sem) => {
    setSelection(prev => ({ ...prev, sem, branch: "", examType: "" }));
    if (!sem) return;

    setLoading(true);
    // Fetch branches available for this year + sem
    const { data } = await supabase
      .from('papers')
      .select('branch')
      .eq('status', 'verified')
      .eq('year', selection.year)
      .eq('sem', sem);

    if (data) {
      const uniqueBranches = [...new Set(data.map(item => item.branch))].sort();
      setOptions(prev => ({ ...prev, branches: uniqueBranches }));
      setCurrentStep(3);
    }
    setLoading(false);
  };

  const handleBranchChange = async (branch) => {
    setSelection(prev => ({ ...prev, branch, examType: "" }));
    if (!branch) return;

    setLoading(true);
    // Fetch exam types available for this year + sem + branch
    const { data } = await supabase
      .from('papers')
      .select('exam_type')
      .eq('status', 'verified')
      .eq('year', selection.year)
      .eq('sem', selection.sem)
      .eq('branch', branch);

    if (data) {
      const uniqueTypes = [...new Set(data.map(item => item.exam_type))].sort();
      setOptions(prev => ({ ...prev, examTypes: uniqueTypes }));
      setCurrentStep(4);
    }
    setLoading(false);
  };

  // --- FINAL FETCH ---
  const fetchFinalPapers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('status', 'verified')
      .eq('year', selection.year)
      .eq('sem', selection.sem)
      .eq('branch', selection.branch)
      .eq('exam_type', selection.examType);

    if (error) {
      console.error("Error fetching papers:", error);
      setPapers([]);
    } else {
      setPapers(data || []);
      setCurrentStep(5);
    }

    setLoading(false);
  };

  return (
    <article className="min-h-screen bg-[#030014] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 font-sans">

      {/* BACKGROUND ORB DECORATION */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <header className="max-w-4xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Archive size={12} className="animate-pulse text-yellow-500" /> Academic Archive Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400 uppercase leading-tight mb-2">
          ARCHIVE <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">VAULT</span>
        </h1>
        <h2 className="text-gray-400 text-xs md:text-sm mt-4 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-widest opacity-80">
          The Official Repository for IIIT Kota Previous Year Question Papers
        </h2>

        {/* CONTRIBUTE / UPLOAD LINK */}
        <Link
          to="/uploadpaper"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 group shadow-xl backdrop-blur-md animate-pulse"
        >
          <Upload size={14} className="animate-pulse text-yellow-500" />
          Contribute Paper to Vault
        </Link>
      </header>

      <div className="max-w-5xl mx-auto mb-12">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* LEFT FILTER PANEL */}
        <aside className="lg:col-span-4 group">
          <div className="bg-[#0b0f2f]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl h-full flex flex-col justify-between transition-all duration-500 hover:border-purple-500/30">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-purple-400 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <Search size={16} /> Filter Vault
                </h3>
                <ShieldCheck size={16} className="text-gray-600" />
              </div>

              <div className="space-y-6">
                <CustomDropdown label="Academic Year" value={selection.year} options={options.years} onChange={handleYearChange} />
                <CustomDropdown label="Semester" value={selection.sem} options={options.sems} onChange={handleSemChange} disabled={!selection.year} />
                <CustomDropdown label="Branch / Course" value={selection.branch} options={options.branches} onChange={handleBranchChange} disabled={!selection.sem} />
                <CustomDropdown label="Exam Category" value={selection.examType} options={options.examTypes} onChange={(val) => setSelection(p => ({ ...p, examType: val }))} disabled={!selection.branch} />
              </div>
            </div>

            <button
              onClick={fetchFinalPapers}
              disabled={!selection.examType || loading}
              className="w-full mt-10 py-5 bg-linear-to-br from-purple-600 to-indigo-700 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 disabled:grayscale disabled:pointer-events-none shadow-2xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 size={20} className="animate-spin" />
                  <span>ACCESSING VAULT...</span>
                </div>
              ) : "Unlock Vault Access"}
            </button>
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="lg:col-span-8">
          <div className="bg-white/2 border-2 border-dashed border-white/10 rounded-[2.5rem] p-6 sm:p-10 min-h-125 h-full flex flex-col relative overflow-hidden transition-all duration-700 backdrop-blur-sm">

            {papers && papers.length > 0 && (
              <div className="mb-8 relative animate-in slide-in-from-top-2 duration-500">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Filter results by subject, code, or uploader..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-purple-500/50 transition-all font-medium backdrop-blur-md"
                />
              </div>
            )}

            {!papers ? (
              <div className="m-auto text-center group animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-purple-500/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={40} className="text-gray-600 group-hover:text-purple-500 transition-colors" />
                </div>
                <p className="text-xl font-black uppercase tracking-tighter text-gray-500">Awaiting Vault Parameters</p>
                <p className="text-[10px] mt-2 uppercase tracking-[0.3em] font-bold text-gray-700">Select parameters to query the archive</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="m-auto text-center opacity-40 uppercase font-black tracking-widest text-sm italic">
                No matching verified papers in this sector.
              </div>
            ) : (
              <div className="w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-1">Results</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selection.branch} • SEM {selection.sem}</p>
                  </div>
                  <button onClick={() => { setPapers(null); setSelection({ year: "", sem: "", branch: "", examType: "" }); setCurrentStep(1); }}
                    className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:rotate-180 duration-500 shadow-inner">
                    <RotateCcw size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredPapers.map((data) => (
                    <button
                      key={data.id}
                      onClick={() => handleDownload(
                        data.file_url,
                        data.course_code,
                        data.branch,
                        data.sem,
                        data.year
                      )}
                      className="flex items-center justify-between p-4 bg-[#0b0f2f]/40 border border-white/5 rounded-3xl hover:bg-white/[0.07] hover:border-purple-500/40 hover:translate-y-1 transition-all duration-300 group text-left w-full shadow-lg"
                    >
                      <div className="flex items-center gap-5 min-w-0">
                        <div className="shrink-0 p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-purple-500/5">
                          <FileText size={24} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-black uppercase text-white group-hover:text-purple-300 leading-tight truncate">
                            {getSubjectTitle(data.course_code)}
                          </span>
                          <div className="mt-1 flex items-center gap-2 overflow-hidden">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest whitespace-nowrap">{data.course_code}</span>
                            <span className="text-[10px] text-gray-700">•</span>
                            <div className="flex items-center gap-1.5 overflow-hidden">
                              <User size={10} className="text-purple-500 shrink-0" />
                              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate group-hover:text-gray-400 transition-colors">
                                {data.uploaded_by || "IIIT KOTA HUB"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gray-500 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all shadow-inner">
                        <Download size={18} />
                      </div>
                    </button>
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
    <div className={`transition-all duration-500 ${disabled ? "opacity-20 grayscale pointer-events-none translate-y-2" : "opacity-100 translate-y-0"}`}>
      <label className="text-[10px] font-black text-gray-500 uppercase mb-3 block tracking-[0.25em] pl-1">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4.5 text-xs font-bold text-white focus:border-purple-500/50 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10 backdrop-blur-md"
        >
          <option value="" className="bg-[#0b0f2f]">Select {label}</option>
          {options.map(opt => <option key={opt} value={opt} className="bg-[#0b0f2f]">{opt}</option>)}
        </select>
        <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-purple-400 transition-colors pointer-events-none" />
      </div>
    </div>
  );
}