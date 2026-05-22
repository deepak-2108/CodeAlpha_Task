import React, { useState } from 'react';
import { Brain, Palette, CheckCircle, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

const Navbar = ({ theme, setTheme, serverStatus = 'checking' }) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themes = [
    { id: 'cyber', name: 'Midnight Cyber', colors: ['#00f3ff', '#bc13fe'] },
    { id: 'emerald', name: 'Emerald Mint', colors: ['#10b981', '#06b6d4'] },
    { id: 'indigo', name: 'Ocean Indigo', colors: ['#6366f1', '#38bdf8'] },
    { id: 'sunset', name: 'Sunset Gold', colors: ['#f97316', '#fbbf24'] },
  ];

  const getStatusBadge = () => {
    switch (serverStatus) {
      case 'healthy':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide animate-pulse">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Engine:</span> Online
          </div>
        );
      case 'model_missing':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Engine:</span> Model Missing
          </div>
        );
      case 'offline':
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Engine:</span> Offline
          </div>
        );
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-neon-blue/40 transition-all duration-300">
              <Brain className="w-7 h-7 text-neon-blue transition-transform duration-500 group-hover:rotate-[360deg]" />
              <div className="absolute inset-0 bg-neon-blue/10 blur rounded-xl -z-10 group-hover:opacity-100 transition-opacity opacity-0"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-poppins font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-violet">
                InkMind AI
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider -mt-0.5">
                Neural Handwriting
              </span>
            </div>
          </div>

          {/* Links, Status and Theme Switcher */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Server Status Badge */}
            {getStatusBadge()}

            {/* Theme Toggle Button */}
            <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 text-slate-400 hover:text-white"
                title="Select Theme"
              >
                <Palette className="w-5 h-5 text-neon-blue" />
                <span className="hidden md:inline text-sm font-semibold">Themes</span>
              </button>

              {/* Theme Menu Dropdown */}
              {showThemeMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-950 border border-slate-800/80 p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="text-[10px] uppercase font-bold text-slate-500 px-2.5 pb-2 border-b border-slate-900 tracking-wider">
                      Switch Aesthetic
                    </div>
                    <div className="mt-2 space-y-1">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            setShowThemeMenu(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                            theme === t.id 
                              ? 'bg-slate-900 text-white font-semibold' 
                              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                          }`}
                        >
                          <span className="text-sm">{t.name}</span>
                          <div className="flex gap-1">
                            <span className="w-3 h-3 rounded-full border border-slate-950" style={{ backgroundColor: t.colors[0] }}></span>
                            <span className="w-3 h-3 rounded-full border border-slate-950" style={{ backgroundColor: t.colors[1] }}></span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

