import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, X, ArrowRight } from 'lucide-react';

export default function AlertModal({ alert, onClose, onOpenVerification }) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-xl glass-panel-severe rounded-2xl overflow-hidden border-2 border-red-500/60 shadow-2xl animate-severe-pulse">
        {/* Alert Header */}
        <div className="p-4 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/90 text-white shadow-lg shadow-red-600/50 animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-red-900 text-red-200 border border-red-400 rounded">
                {alert.severity}
              </span>
              <h2 className="text-base font-black font-mono text-white mt-1">
                {alert.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alert Key Metrics */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-500/30">
              <span className="text-[10px] text-slate-400 block">PROBABILITY</span>
              <span className="text-lg font-black text-red-400">{alert.hazard_prob}%</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-500/30">
              <span className="text-[10px] text-slate-400 block">LEAD TIME</span>
              <span className="text-lg font-black text-amber-300">{alert.lead_time_min} min</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-500/30">
              <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
              <span className="text-lg font-black text-emerald-400">{alert.confidence_pct}%</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-500/30">
              <span className="text-[10px] text-slate-400 block">CRITICAL ASSETS</span>
              <span className="text-lg font-black text-cyan-300">{alert.critical_assets_count}</span>
            </div>
          </div>

          {/* WHY THIS ALERT Section */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold font-mono text-cyan-300 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              WHY THIS ALERT?
            </h3>
            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              {alert.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/40 text-xs font-mono">
            <span className="font-bold text-amber-300 block mb-1">RECOMMENDED ACTION PROTOCOL:</span>
            <p className="text-slate-300 leading-relaxed">{alert.recommended_action}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onOpenVerification}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View Continuous Verification Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-red-600/40 transition-all"
          >
            ACKNOWLEDGE WARNING
          </button>
        </div>
      </div>
    </div>
  );
}
