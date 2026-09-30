import React from 'react';
import { Building2, Clock } from 'lucide-react';

export default function DisasterTwin({ infrastructureAssets = [], onSelectAsset }) {
  return (
    <div className="bg-slate-900/95 p-2.5 rounded-lg border-l-4 border-l-green-500 border border-slate-800 font-mono shadow-md">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[11px] font-bold text-green-400 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" /> Disaster Twin™
        </h3>
        <span className="text-[8px] text-slate-400">ASSET RISK</span>
      </div>

      <div className="space-y-1">
        {infrastructureAssets.slice(0, 3).map((asset) => {
          const badgeColor = asset.risk_level === 'CRITICAL'
            ? 'bg-red-950 text-red-400 border-red-500/50'
            : asset.risk_level === 'HIGH'
            ? 'bg-amber-950 text-amber-400 border-amber-500/50'
            : 'bg-blue-950 text-blue-400 border-blue-500/50';

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className="p-1.5 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h4 className="text-[10px] font-bold text-slate-200 truncate">{asset.name}</h4>
                <span className={`px-1 py-0.5 text-[7px] font-bold rounded border shrink-0 ${badgeColor}`}>{asset.risk_level}</span>
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-400">
                <span className="flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5 text-cyan-400" />
                  ETA: <strong className="text-cyan-300">{asset.eta_min}m</strong>
                </span>
                <span>WARN: <strong className="text-amber-300">{asset.warn_by_min}m</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
