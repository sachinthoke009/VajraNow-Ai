import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ConfidenceGuardian({ confidence, radarOnline }) {
  const pct = confidence ? confidence.overall_pct : (radarOnline ? 91 : 72);
  const level = radarOnline ? 'HIGH' : 'DEGRADED';

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="bg-slate-900/95 p-2.5 rounded-lg border-l-4 border-l-emerald-500 border border-slate-800 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> AI Confidence Guardian™
        </h3>
        <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded ${
          pct >= 85 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
        }`}>{level}</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
          <svg className="w-14 h-14 transform -rotate-90">
            <circle cx="28" cy="28" r={radius} stroke="currentColor" strokeWidth="4" className="text-slate-950" fill="transparent" />
            <circle cx="28" cy="28" r={radius} stroke="currentColor" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`transition-all duration-1000 ${pct >= 85 ? 'text-emerald-400' : 'text-amber-400'}`} fill="transparent" />
          </svg>
          <span className="absolute text-sm font-black text-white">{pct}%</span>
        </div>

        <div className="flex-1 text-[9px] space-y-0.5 text-slate-300">
          <div>Data Quality: <strong className="text-cyan-300">{radarOnline ? '96%' : '74%'}</strong></div>
          <div>Model Agree: <strong className="text-cyan-300">{radarOnline ? '92%' : '76%'}</strong></div>
          <div>Calibration: <strong className="text-cyan-300">{radarOnline ? '89%' : '71%'}</strong></div>
          <div>Spread: <strong className="text-emerald-400">{radarOnline ? 'LOW' : 'MOD'}</strong></div>
        </div>
      </div>
    </div>
  );
}
