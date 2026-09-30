import React, { useState } from 'react';
import { Sliders, X, Check } from 'lucide-react';

export default function ThresholdSettingsModal({
  probThreshold,
  confThreshold,
  onSave,
  onClose
}) {
  const [prob, setProb] = useState(probThreshold);
  const [conf, setConf] = useState(confThreshold);

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl font-mono">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            ALERT DECISION THRESHOLD LOGIC
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">HAZARD PROBABILITY THRESHOLD:</span>
              <span className="text-red-400 font-bold">{prob}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={prob}
              onChange={(e) => setProb(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">CONFIDENCE GUARDIAN THRESHOLD:</span>
              <span className="text-emerald-400 font-bold">{conf}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={conf}
              onChange={(e) => setConf(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-300">EVALUATION RULE:</p>
            <p>IF hazard_prob ≥ <span className="text-red-400">{prob}%</span> AND confidence ≥ <span className="text-emerald-400">{conf}%</span> → <span className="text-red-400 font-bold">SEVERE_ALERT</span></p>
            <p>ELSE IF hazard_prob ≥ 60% AND confidence ≥ 60% → <span className="text-amber-300 font-bold font-mono">WATCH</span></p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(prob, conf);
              onClose();
            }}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Thresholds
          </button>
        </div>
      </div>
    </div>
  );
}
