import React from 'react';
import { Radio, Database, Sliders, BarChart2 } from 'lucide-react';

export default function TopBar({
  radarOnline,
  activeCaseId,
  onSelectCase,
  onOpenSettings,
  onOpenVerification
}) {
  return (
    <header className="h-16 bg-[#070a13] border-b border-cyan-500/20 px-5 flex items-center justify-between z-30 shrink-0 select-none font-mono">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
          <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white tracking-wider">
              VAJRANOW AI
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              PS 26072
            </span>
          </div>
          <p className="text-[11px] text-cyan-400/90 tracking-wide">
            0–60 MINUTE AI THUNDERSTORM NOWCASTING & DISASTER DECISION SUPPORT
          </p>
        </div>
      </div>

      {/* Center Operational Status */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
          radarOnline
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
            : 'bg-amber-950/90 border-amber-500/60 text-amber-300 animate-pulse'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full ${radarOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          {radarOnline ? '● SYSTEM OPERATIONAL' : '⚠ RADAR OFFLINE (DEGRADED MODE)'}
        </div>

        <div className="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-xl text-slate-300 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>STORM DATASET:</span>
          <select
            value={activeCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer"
          >
            <option value="CASE-001" className="bg-slate-900">CASE-001: Bengaluru Urban Squall</option>
            <option value="CASE-002" className="bg-slate-900">CASE-002: Odisha Coastal Supercell</option>
            <option value="CASE-003" className="bg-slate-900">CASE-003: Delhi NCR Downburst</option>
          </select>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenVerification}
          title="Open Verification Metrics & Model Comparison"
          className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
        >
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Verification Logs</span>
        </button>

        <button
          onClick={onOpenSettings}
          title="Configure Alert Threshold Logic"
          className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
        >
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Thresholds</span>
        </button>
      </div>
    </header>
  );
}
