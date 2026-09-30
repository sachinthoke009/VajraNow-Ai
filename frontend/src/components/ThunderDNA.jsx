import React from 'react';
import { Dna, TrendingUp } from 'lucide-react';

export default function ThunderDNA({ offsetMin }) {
  const lifecycle = offsetMin < 20 ? 'DEVELOPING' : offsetMin < 40 ? 'MATURE' : 'DISSIPATING';
  const growthRate = offsetMin < 20 ? 31 : offsetMin < 40 ? 8 : -18;

  return (
    <div className="bg-slate-900/95 p-2.5 rounded-lg border-l-4 border-l-orange-500 border border-slate-800 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[11px] font-bold text-orange-400 flex items-center gap-1">
          <Dna className="w-3.5 h-3.5" /> ThunderDNA™
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-1.5">
        <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
          <span className="text-[8px] text-slate-400 block">LIFE CYCLE</span>
          <span className="font-bold text-amber-300">{lifecycle}</span>
        </div>
        <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
          <span className="text-[8px] text-slate-400 block">GROWTH</span>
          <span className="font-bold text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />{growthRate > 0 ? '+' : ''}{growthRate}%/hr
          </span>
        </div>
      </div>
      <div className="flex justify-between bg-slate-950 p-1 rounded text-[9px] text-slate-300">
        <span>PEAK: <strong className="text-cyan-300">T+22m</strong></span>
        <span>ANALOGS: <strong className="text-emerald-400">3</strong></span>
      </div>
    </div>
  );
}
