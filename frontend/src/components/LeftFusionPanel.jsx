import React from 'react';
import { Radio, Satellite, Zap, Compass, AlertTriangle, RefreshCw } from 'lucide-react';

export default function LeftFusionPanel({
  radarOnline,
  onToggleRadar,
  dataQualityPct = 94
}) {
  const sources = [
    {
      id: 'RADAR',
      name: 'DWR RADAR ECHO',
      icon: Radio,
      status: radarOnline ? 'ONLINE' : 'OFFLINE',
      freshness: radarOnline ? '2 min' : 'OUTAGE',
      weight: radarOnline ? '45%' : '0%',
      isOffline: !radarOnline
    },
    {
      id: 'SATELLITE',
      name: 'INSAT-3D CTT',
      icon: Satellite,
      status: 'ONLINE',
      freshness: '4 min',
      weight: radarOnline ? '25%' : '55% (ADAPTED)',
      isOffline: false
    },
    {
      id: 'LIGHTNING',
      name: 'LLN LIGHTNING',
      icon: Zap,
      status: 'ONLINE',
      freshness: '1 min',
      weight: radarOnline ? '20%' : '30% (ADAPTED)',
      isOffline: false
    },
    {
      id: 'NWP',
      name: 'NWP / CAPE',
      icon: Compass,
      status: 'ONLINE',
      freshness: '12 min',
      weight: radarOnline ? '10%' : '15% (ADAPTED)',
      isOffline: false
    }
  ];

  return (
    <aside className="w-72 bg-[#070a13] border-r border-cyan-500/20 p-3.5 flex flex-col justify-between z-20 shrink-0 font-mono select-none">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
          <div>
            <h2 className="text-xs font-bold text-cyan-300 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              MULTI-SOURCE FUSION
            </h2>
            <p className="text-[10px] text-slate-400">4 Atmospheric Sensors Ingested</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 block">QUALITY</span>
            <span className={`text-xs font-bold ${radarOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
              {radarOnline ? '94%' : '74%'}
            </span>
          </div>
        </div>

        {/* Source Cards */}
        <div className="space-y-2">
          {sources.map((src) => {
            const IconComponent = src.icon;

            return (
              <div
                key={src.id}
                className={`p-2.5 rounded-lg border transition-all ${
                  src.isOffline
                    ? 'bg-red-950/40 border-red-500/50'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${src.isOffline ? 'bg-red-900/60 text-red-400' : 'bg-cyan-950 text-cyan-400'}`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">{src.name}</h3>
                      <span className="text-[9px] text-slate-400">FRESH: {src.freshness}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      src.isOffline ? 'bg-red-900 text-red-200 animate-pulse' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {src.status}
                    </span>
                    <span className="block text-[9px] text-cyan-400 mt-0.5">
                      WEIGHT: {src.weight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIMULATE RADAR OUTAGE TOGGLE */}
      <div className="pt-3 border-t border-slate-800">
        <button
          onClick={() => onToggleRadar(!radarOnline)}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border shadow-lg ${
            radarOnline
              ? 'bg-amber-950/90 border-amber-500/60 text-amber-300 hover:bg-amber-900'
              : 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900'
          }`}
        >
          {radarOnline ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>⚡ SIMULATE RADAR OUTAGE</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>RESTORE RADAR SENSOR</span>
            </>
          )}
        </button>

        {!radarOnline && (
          <p className="mt-2 text-[9px] text-amber-300 leading-tight bg-amber-950/50 p-1.5 rounded border border-amber-500/40 text-center">
            ⚠ RADAR OFFLINE: Fusion adapted to Satellite + Lightning. Confidence: 72% (DEGRADED MODE).
          </p>
        )}
      </div>
    </aside>
  );
}
