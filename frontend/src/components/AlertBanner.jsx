import React from 'react';
import { AlertTriangle, ShieldAlert, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function AlertBanner({ alert, radarOnline, onOpenDetails }) {
  if (!alert) return null;

  const isSevere = alert.severity === 'SEVERE THUNDERSTORM RISK';

  return (
    <div
      onClick={onOpenDetails}
      className={`absolute bottom-2 left-2 right-2 z-[1000] rounded-xl cursor-pointer transition-all pointer-events-auto font-mono shadow-2xl ${
        isSevere
          ? 'bg-gradient-to-r from-red-950/95 via-slate-950/95 to-red-950/95 border-2 border-red-500/80 animate-severe-alert'
          : 'bg-gradient-to-r from-amber-950/95 via-slate-950/95 to-amber-950/95 border-2 border-amber-500/60'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isSevere ? 'bg-red-600 animate-bounce' : 'bg-amber-500'}`}>
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                isSevere ? 'bg-red-900 text-red-200 border border-red-400' : 'bg-amber-900 text-amber-200 border border-amber-400'
              }`}>
                {alert.severity}
              </span>
            </div>
            <p className="text-xs font-bold text-white mt-0.5">{alert.title}</p>
          </div>
        </div>

        {/* Center: Key Metrics Row */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="text-center">
            <span className="text-[8px] text-slate-400 block">HAZARD PROB</span>
            <span className="font-black text-red-400 text-base">{alert.hazard_prob}%</span>
          </div>
          <div className="text-center">
            <span className="text-[8px] text-slate-400 block">LEAD TIME</span>
            <span className="font-black text-amber-300 text-base">{alert.lead_time_min} min</span>
          </div>
          <div className="text-center">
            <span className="text-[8px] text-slate-400 block">CONFIDENCE</span>
            <span className="font-black text-emerald-400 text-base">{alert.confidence_pct}%</span>
          </div>
          <div className="text-center">
            <span className="text-[8px] text-slate-400 block">CRITICAL ASSETS</span>
            <span className="font-black text-cyan-300 text-base">{alert.critical_assets_count}</span>
          </div>
          <div className="text-center">
            <span className="text-[8px] text-slate-400 block">AREA</span>
            <span className="font-black text-sky-300 text-base">{alert.affected_area_sqkm} km²</span>
          </div>
        </div>

        {/* Right: Action */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block text-right">
            <span className="text-[9px] text-slate-400 block">RECOMMENDED ACTION</span>
            <span className="text-[10px] text-slate-200 block max-w-[200px] truncate">{alert.recommended_action}</span>
          </div>
          <div className={`p-2 rounded-lg border ${
            isSevere ? 'bg-red-900/80 border-red-500/50 text-red-200 hover:bg-red-800' : 'bg-amber-900/80 border-amber-500/50 text-amber-200 hover:bg-amber-800'
          } transition-colors`}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Bottom Reasons Strip */}
      <div className={`px-4 py-1.5 border-t flex items-center gap-4 text-[9px] overflow-x-auto ${
        isSevere ? 'border-red-500/30 text-red-300' : 'border-amber-500/30 text-amber-300'
      }`}>
        {alert.reasons.map((r, i) => (
          <span key={i} className="whitespace-nowrap">{r}</span>
        ))}
      </div>
    </div>
  );
}
