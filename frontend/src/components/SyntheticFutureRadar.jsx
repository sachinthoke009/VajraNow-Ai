import React from 'react';
import { Radar } from 'lucide-react';

export default function SyntheticFutureRadar({ offsetMin, radarOnline }) {
  const spread = offsetMin <= 20 ? 'LOW' : offsetMin <= 40 ? 'MODERATE' : 'HIGH';

  return (
    <div className="bg-slate-900/95 p-2.5 rounded-lg border-l-4 border-l-red-500 border border-slate-800 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[11px] font-bold text-red-400 flex items-center gap-1">
          <Radar className="w-3.5 h-3.5" /> Synthetic Future Radar™
        </h3>
        <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-sky-950 text-sky-300 border border-sky-500/30">AI-GEN</span>
      </div>
      <div className="grid grid-cols-3 gap-1 text-[10px] mb-1.5">
        <div className="bg-slate-950 p-1 rounded border border-slate-800 text-center">
          <span className="text-[7px] text-slate-400 block">HORIZON</span>
          <span className="font-bold text-cyan-300">60 min</span>
        </div>
        <div className="bg-slate-950 p-1 rounded border border-slate-800 text-center">
          <span className="text-[7px] text-slate-400 block">ENSEMBLE</span>
          <span className="font-bold text-cyan-300">12</span>
        </div>
        <div className="bg-slate-950 p-1 rounded border border-slate-800 text-center">
          <span className="text-[7px] text-slate-400 block">SPREAD</span>
          <span className={`font-bold ${spread === 'LOW' ? 'text-emerald-400' : 'text-amber-300'}`}>{spread}</span>
        </div>
      </div>
      <div className="bg-slate-950 p-1 rounded border border-slate-800">
        <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
          <span>T+0</span>
          <span className="text-cyan-300 font-bold">T+{String(offsetMin).padStart(2, '0')}</span>
          <span>T+60</span>
        </div>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 rounded-full" style={{ width: `${(offsetMin / 60) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}
