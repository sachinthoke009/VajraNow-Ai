import React, { useState } from 'react';
import { BarChart2, ShieldCheck, X, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VerificationPanel({ onClose }) {
  const [selectedMetric, setSelectedMetric] = useState('csi');

  const chartData = [
    { leadTime: 'T+15', VajraNow: 0.82, Persistence: 0.52, OpticalFlow: 0.65, RadarOnly: 0.71 },
    { leadTime: 'T+30', VajraNow: 0.74, Persistence: 0.35, OpticalFlow: 0.51, RadarOnly: 0.58 },
    { leadTime: 'T+45', VajraNow: 0.66, Persistence: 0.22, OpticalFlow: 0.39, RadarOnly: 0.44 },
    { leadTime: 'T+60', VajraNow: 0.59, Persistence: 0.14, OpticalFlow: 0.28, RadarOnly: 0.33 }
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl glass-panel rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black font-mono text-white flex items-center gap-2">
                CONTINUOUS VERIFICATION & MODEL COMPARISON
                <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-amber-400 border border-amber-500/40 rounded">
                  DEMO / SIMULATED METRICS
                </span>
              </h2>
              <p className="text-xs font-mono text-slate-400">
                0–60 min Skill Scores vs Optical Flow & Baseline Methods
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 font-mono">
          {/* Top Score Cards */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">CSI (CRITICAL SUCCESS INDEX)</span>
              <span className="text-2xl font-black text-cyan-300">0.74</span>
              <span className="text-[10px] text-emerald-400 block mt-1">+38% vs Baseline</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">POD (PROB OF DETECTION)</span>
              <span className="text-2xl font-black text-emerald-400">0.85</span>
              <span className="text-[10px] text-emerald-400 block mt-1">+42% vs Baseline</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">FAR (FALSE ALARM RATE)</span>
              <span className="text-2xl font-black text-amber-400">0.13</span>
              <span className="text-[10px] text-emerald-400 block mt-1">-62% Reduction</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">BRIER SCORE</span>
              <span className="text-2xl font-black text-sky-400">0.068</span>
              <span className="text-[10px] text-emerald-400 block mt-1">Optimal Calibration</span>
            </div>
          </div>

          {/* Interactive Metric Chart */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                LEAD TIME PERFORMANCE CURVE (T+15 to T+60 MIN)
              </h3>
              <div className="flex items-center gap-1 text-xs">
                {['csi', 'pod', 'far'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetric(m)}
                    className={`px-3 py-1 rounded uppercase font-bold transition-all ${
                      selectedMetric === m
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="leadTime" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 1]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8' }} />
                  <Legend />
                  <Line type="monotone" dataKey="VajraNow" stroke="#00f2fe" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="OpticalFlow" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="RadarOnly" stroke="#38bdf8" strokeWidth={2} />
                  <Line type="monotone" dataKey="Persistence" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono font-bold text-xs"
          >
            CLOSE VERIFICATION LOGS
          </button>
        </div>
      </div>
    </div>
  );
}
