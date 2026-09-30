import React from 'react';
import { Bot } from 'lucide-react';

export default function SwarmPanel({ radarOnline = true }) {
  const agents = [
    { name: 'RADAR', prob: radarOnline ? 94 : 0 },
    { name: 'SAT', prob: 88 },
    { name: 'LTG', prob: 92 },
    { name: 'NWP', prob: 85 },
    { name: 'TRACK', prob: 91 },
    { name: 'IMPACT', prob: 87 },
    { name: 'GUARD', prob: 89 }
  ];

  return (
    <div className="bg-slate-900/95 p-2.5 rounded-lg border-l-4 border-l-purple-500 border border-slate-800 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
          <Bot className="w-3.5 h-3.5" /> Multi-Agent Swarm
        </h3>
        <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-purple-950 text-purple-300 border border-purple-500/30">
          CONSENSUS: {radarOnline ? 93 : 78}%
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 mb-1.5">
        {agents.slice(0, 4).map((ag) => (
          <div key={ag.name} className={`p-1 rounded border text-center text-[8px] ${
            ag.prob === 0 ? 'bg-red-950/50 border-red-500/30 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-200'
          }`}>
            <span className="block font-bold">{ag.name}</span>
            <span className={ag.prob === 0 ? 'text-red-400' : 'text-cyan-300'}>{ag.prob}%</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {agents.slice(4).map((ag) => (
          <div key={ag.name} className="bg-slate-950 border border-slate-800 p-1 rounded text-center text-[8px] text-slate-200">
            <span className="block font-bold">{ag.name}</span>
            <span className="text-cyan-300">{ag.prob}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
