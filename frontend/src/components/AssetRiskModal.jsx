import React from 'react';
import { Building2, ShieldAlert, Clock, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AssetRiskModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md glass-panel rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">ASSET RISK CARD</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
              {asset.type}
            </span>
            <h3 className="text-base font-black text-white mt-1">{asset.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">RISK LEVEL</span>
              <span className={`text-base font-black ${
                asset.risk_level === 'HIGH' || asset.risk_level === 'CRITICAL' ? 'text-red-400' : 'text-amber-300'
              }`}>
                {asset.risk_level} RISK
              </span>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">HAZARD PROBABILITY</span>
              <span className="text-base font-black text-cyan-300">{asset.hazard_prob}%</span>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">STORM ARRIVAL (ETA)</span>
              <span className="text-base font-black text-amber-300">{asset.eta_min} min</span>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">WARN-BY LEAD TIME</span>
              <span className="text-base font-black text-emerald-400">{asset.warn_by_min} min</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 block mb-1">PRIMARY HAZARD DRIVER</span>
            <span className="text-slate-200">{asset.primary_driver}</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded text-xs"
          >
            CLOSE RISK CARD
          </button>
        </div>
      </div>
    </div>
  );
}
