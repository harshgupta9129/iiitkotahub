import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase"; // Updated import
import {
  Upload, Loader2, FileCheck, Image,
  ChevronLeft, Sparkles, ShieldCheck, User, Code,
  ChevronDown, AlertCircle
} from "lucide-react";
import { jsPDF } from "jspdf";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function PaperUpload() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({
    year: "",
    sem: "",
    branch: "",
    examType: "",
    courseCode: "",
    uploadedBy: "IIIT KOTA HUB"
  });

  useEffect(() => {
    document.title = "IIIT Kota Paper Upload | Official IIITKota PaperUpload Vault";
    let metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Contribute to the IIIT Kota Academic Archive. iiitkota paperupload vault for students to contribute and upload papers.";
    document.head.appendChild(metaDesc);
  }, []);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError("");

    // Calculate total size
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    
    if (totalSize > MAX_FILE_SIZE) {
      setError(`Total file size exceeds 10MB limit. Current: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
      setFiles([]);
      e.target.value = ""; // Reset input
      return;
    }

    setFiles(selectedFiles);
  };

  // Optimized image processing with balanced quality and speed
  const processImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // Smart downscaling: max 1400px for good quality while keeping speed
          const maxDimension = 1400;
          const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          const ctx = canvas.getContext("2d", { alpha: false });
          
          // Medium quality smoothing for better output
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Balanced compression: 0.75 quality for good quality with decent size reduction
          resolve({ 
            src: canvas.toDataURL("image/jpeg", 0.75), 
            w: canvas.width, 
            h: canvas.height 
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const convertImagesToPdf = async (imageFiles) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Parallel processing for maximum speed
    const resolvedImages = await Promise.all(imageFiles.map(file => processImage(file)));
    
    resolvedImages.forEach((imgData, i) => {
      if (i > 0) doc.addPage();
      const ratio = Math.min(pageWidth / imgData.w, pageHeight / imgData.h);
      const imgWidth = imgData.w * ratio;
      const imgHeight = imgData.h * ratio;
      
      // Medium compression mode for better quality
      doc.addImage(
        imgData.src, 
        "JPEG", 
        (pageWidth - imgWidth) / 2, 
        2, 
        imgWidth, 
        imgHeight, 
        undefined, 
        'MEDIUM'
      );
    });
    
    return doc.output("blob");
  };

  const handleUpload = async () => {
    setError("");
    
    if (meta.courseCode.length !== 6) {
      setError("Course Code must be 6 characters.");
      return;
    }
    
    if (files.length === 0 || !meta.year || !meta.sem || !meta.branch || !meta.examType) {
      setError("Fill all metadata fields.");
      return;
    }
    
    setLoading(true);

    try {
      // 1. Prepare File Name
      // Added timestamp to ensure uniqueness in the bucket
      const timestamp = Date.now();
      const cleanName = `${meta.courseCode}_${meta.branch}_${meta.sem}_${meta.year}_${timestamp}.pdf`.replace(/\s+/g, "_");
      
      let finalBlob;
      
      // Fast path for PDFs
      if (files.length === 1 && files[0].type === "application/pdf") {
        finalBlob = files[0];
      } else {
        // Optimized image-to-PDF conversion
        finalBlob = await convertImagesToPdf(files);
      }

      // Final size check after processing
      if (finalBlob.size > MAX_FILE_SIZE) {
        throw new Error(`Processed file exceeds 10MB limit: ${(finalBlob.size / (1024 * 1024)).toFixed(2)}MB`);
      }

      // 2. Upload to Supabase Storage ('pdfs' bucket)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(cleanName, finalBlob, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 3. Get the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(cleanName);

      // 4. Insert Metadata into Supabase Database ('papers' table)
      const { error: dbError } = await supabase
        .from('papers')
        .insert([
          {
            title: meta.courseCode, // Or any title logic you prefer
            course_code: meta.courseCode,
            year: meta.year,
            sem: meta.sem,
            branch: meta.branch,
            exam_type: meta.examType,
            file_url: publicUrl,
            uploaded_by: meta.uploadedBy,
            status: 'pending' // Defaults to pending
          }
        ]);

      if (dbError) throw dbError;
      
      alert("SUBMISSION SUCCESS: Paper Sent For Approval.");
      setFiles([]);
      setMeta({ ...meta, courseCode: "", examType: "", sem: "", branch: "" });

    } catch (err) {
      console.error(err);
      setError(err.message || "UPLOAD ERROR: Connection failed or file too large.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="min-h-screen bg-[#030014] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <header className="max-w-4xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000 relative">
        <div className="flex justify-center md:justify-start mb-6">
          <Link to="/previousyearpaper" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all group text-[10px] font-black uppercase tracking-[0.3em]">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform text-yellow-500 " />
            Access Archive Vault
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-xl">
          <Sparkles size={14} className="animate-pulse text-yellow-500" /> SECURE UPLOAD PAPERS
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400 uppercase leading-tight mb-2">
          CONTRIBUTE <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">TO VAULT</span>
        </h1>
        <h2 className="text-gray-400 text-xs md:text-sm mt-4 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-widest opacity-80">
          The Official Upload Repository for IIIT Kota Previous Year Question Papers
        </h2>
        <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
          Max Upload: 10MB • High Quality
        </p>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-xs font-bold">{error}</p>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        <aside className="lg:col-span-5">
          <div className="bg-[#0b0f2f]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl h-full flex flex-col justify-between hover:border-purple-500/30 transition-all duration-500">
            <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Uploaded By</label>
                  <div className="relative">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" value={meta.uploadedBy} onChange={(e) => setMeta({ ...meta, uploadedBy: e.target.value })} className="w-full bg-white/3 border border-white/10 rounded-xl py-4.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-purple-500/50 transition-all text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 flex justify-between">Course Code <span>{meta.courseCode.length}/6</span></label>
                  <div className="relative">
                    <Code size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="ECT205" maxLength={6} value={meta.courseCode} onChange={(e) => setMeta({ ...meta, courseCode: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })} className="w-full bg-white/3 border border-white/10 rounded-xl py-4.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-800 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <CustomDropdown label="Year" value={meta.year} options={yearOptions} onChange={(val) => setMeta({ ...meta, year: val })} />
                  <CustomDropdown label="Semester" value={meta.sem} options={[1, 2, 3, 4, 5, 6, 7, 8]} onChange={(val) => setMeta({ ...meta, sem: val })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <CustomDropdown label="Branch" value={meta.branch} options={["CSE", "ECE", "AIDE"]} onChange={(val) => setMeta({ ...meta, branch: val })} />
                  <CustomDropdown label="Category" value={meta.examType} options={["Mid-Term", "End-Term"]} onChange={(val) => setMeta({ ...meta, examType: val })} />
                </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-7">
          <div className="bg-white/2 border-2 border-dashed border-white/10 rounded-[2.5rem] p-6 sm:p-10 h-full flex flex-col backdrop-blur-md transition-all duration-500 hover:border-purple-500/20">
            <div className="flex-1 flex flex-col justify-center">
              <div className="border border-white/5 bg-white/1 rounded-[2.5rem] p-10 sm:p-24 text-center relative group hover:bg-white/2 transition-all duration-500 mb-8">
                <input type="file" accept="application/pdf,image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
                {files.length > 0 ? (
                  <div className="animate-in zoom-in-95">
                    <div className="w-24 h-24 bg-green-500/10 rounded-4xl flex items-center justify-center mx-auto text-green-400 mb-4 border border-green-500/20 shadow-xl">
                      {files[0].type === "application/pdf" ? <FileCheck size={40} /> : <Image size={40} />}
                    </div>
                    <p className="text-base font-black uppercase tracking-[0.2em] text-green-400 mb-2">{files.length} Item(s) Selected</p>
                    <p className="text-[9px] text-gray-500 font-bold">
                      {(files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024)).toFixed(2)}MB / 10MB
                    </p>
                  </div>
                ) : (
                  <div className="group-hover:scale-105 transition-transform duration-500">
                    <div className="w-24 h-24 bg-white/5 rounded-4xl flex items-center justify-center mx-auto text-gray-700 mb-6 border border-white/5 group-hover:text-purple-500 transition-colors">
                      <Upload size={36} />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Select Papers</p>
                    <p className="text-[9px] text-gray-800 font-bold uppercase tracking-widest">Max 10MB • High Quality PDF</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleUpload} disabled={loading || files.length === 0}
              className="w-full py-6.5 bg-linear-to-br from-purple-600 to-indigo-600 rounded-4xl font-black uppercase text-[11px] tracking-[0.4em] transition-all hover:shadow-2xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-4 relative overflow-hidden group/btn"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /><span>UPLOADING TO VAULT...</span></>
              ) : (
                <><ShieldCheck size={20} /><span>SUBMIT TO VAULT</span></>
              )}
            </button>
          </div>
        </main>
      </section>
    </article>
  );
}

function CustomDropdown({ label, value, options, onChange, disabled }) {
  return (
    <div className={`transition-all duration-500 ${disabled ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}>
      <label className="text-[10px] font-black text-gray-500 uppercase mb-3 block tracking-[0.25em] pl-1">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4.5 text-xs font-bold text-white focus:border-purple-500/50 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10 backdrop-blur-md"
        >
          <option value="" className="bg-[#0b0f2f]">Select</option>
          {options.map(opt => <option key={opt} value={opt} className="bg-[#0b0f2f]">{opt}</option>)}
        </select>
        <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-purple-400 transition-colors pointer-events-none" />
      </div>
    </div>
  );
}