import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set, remove } from "firebase/database";
import { Trash2, LogOut, Loader2, CheckCircle, ExternalLink, User, Calendar, BookOpen, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState([]);
  const [creds, setCreds] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Fetch Pending Papers
  useEffect(() => {
    if (!user) return;
    const pendingRef = ref(db, "pending_vault");
    return onValue(pendingRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const list = Object.entries(data).map(([id, values]) => ({
          id,
          ...values,
        }));
        // Sort by newest first
        setPending(list.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        setPending([]);
      }
    });
  }, [user]);

  const handlePreview = async (fileId) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
      const data = await res.json();
      if (data.ok) {
        const directUrl = `https://api.telegram.org/file/bot${token}/${data.result.file_path}`;
        window.open(directUrl, "_blank");
      } else {
        alert("Telegram error: " + data.description);
      }
    } catch (err) {
      alert("Failed to retrieve preview link.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, creds.email, creds.password);
    } catch (err) {
      alert("Access Denied: Invalid Credentials");
    }
  };

  const approve = async (p) => {
    const vPath = `verified_vault/${p.year}/${p.sem}/${p.branch}/${p.examType}/${p.courseCode}`;
    try {
      await set(ref(db, vPath), {
        name: p.name,
        telegramFileId: p.telegramFileId,
        telegramMsgId: p.telegramMsgId,
        uploadedBy: p.uploadedBy || "Anonymous",
        timestamp: Date.now()
      });
      await remove(ref(db, `pending_vault/${p.id}`));
      alert("Paper Approved and Moved to Verified Vault!");
    } catch (err) {
      alert("Approval failed: " + err.message);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#030014]">
      <Loader2 className="animate-spin text-purple-500" size={40} />
    </div>
  );

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-[#030014] p-4 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      
      <form onSubmit={handleLogin} className="w-full max-w-md bg-[#0b0f2f]/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
            <ShieldCheck className="mx-auto text-purple-500 mb-4" size={48} />
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Admin <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">Access</span>
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Restricted Vault Management</p>
        </div>
        <div className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full bg-white/5 text-white p-4 rounded-2xl border border-white/5 outline-none focus:border-purple-500/50 transition-all"
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Security Password"
              className="w-full bg-white/5 text-white p-4 rounded-2xl border border-white/5 outline-none focus:border-purple-500/50 transition-all"
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              required
            />
            <button className="w-full py-5 bg-linear-to-r from-purple-600 to-indigo-700 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all active:scale-95">
              Authorize Entry
            </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
              Vault <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">Manager</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Pending Verification Queue</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-8 py-3 bg-red-600/10 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
          >
            <LogOut size={16} /> Logout Session
          </button>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-40 bg-white/2 rounded-[3rem] border border-dashed border-white/10 animate-pulse">
            <CheckCircle size={64} className="mx-auto mb-6 text-gray-700" />
            <p className="text-xl font-black uppercase tracking-tighter text-gray-600">Verification Queue Clear</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-700 mt-2 font-bold">No new papers awaiting review</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pending.map(p => (
              <div key={p.id} className="bg-[#0b0f2f]/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-between group hover:border-purple-500/40 transition-all shadow-xl hover:translate-y-1.25 duration-300">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-purple-600/20 border border-purple-500/30 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase text-purple-400 tracking-wider">
                      {p.courseCode}
                    </span>
                    <button
                      onClick={() => handlePreview(p.telegramFileId)}
                      className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-purple-600 transition-all shadow-inner"
                      title="Preview Telegram Document"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-400">
                        <Calendar size={16} className="text-purple-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">{p.year} • SEM {p.sem}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <BookOpen size={16} className="text-purple-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">{p.branch} • {p.examType}</span>
                    </div>
                    {/* UPLOADED BY SECTION */}
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                        <User size={16} className="text-fuchsia-500" />
                        <div>
                            <p className="text-[8px] uppercase text-gray-500 font-black tracking-widest">Contributed By</p>
                            <p className="text-[11px] font-black uppercase text-white truncate max-w-37.5">
                                {p.uploadedBy || "IIIT KOTA HUB"}
                            </p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-white/5">
                  <button
                    onClick={() => approve(p)}
                    className="flex-1 py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-green-900/20"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                        if(window.confirm("Permanent Deletion? This cannot be undone.")) {
                            remove(ref(db, `pending_vault/${p.id}`));
                        }
                    }}
                    className="p-4 bg-white/5 text-gray-500 hover:text-white hover:bg-red-600 rounded-2xl transition-all group-hover:border-red-600/30"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}