import React, { useEffect, useState } from 'react';
import { Play, CheckCircle2, ShieldAlert, X, ArrowRight, Zap, Radio, Dna, Cpu, Building2, AlertTriangle } from 'lucide-react';

export default function JudgeDemoOverlay({
  activeStep,
  elapsedSec,
  onCancel,
  onFinish
}) {
  const steps = [
    { time: 0, title: 'OBSERVE', text: 'Normal atmospheric monitoring active across radar, satellite, and lightning networks.', icon: Radio },
    { time: 10, title: 'LIGHTNING SURGE', text: 'Total lightning flash rate surge detected (+31% in last 10m).', icon: Zap },
    { time: 20, title: 'RADAR INTENSIFICATION', text: 'Doppler Radar detects rapid reflectivity core growth (58 dBZ, +6.4 dBZ/hr).', icon: Radio },
    { time: 30, title: 'THUNDERDNA™ ANALYTICS', text: 'ThunderDNA identifies severe developing squall cell, expected peak T+22 min.', icon: Dna },
    { time: 40, title: 'SYNTHETIC FUTURE RADAR™', text: 'PyTorch nowcasting model projects 0–60 min future storm trajectory.', icon: Cpu },
    { time: 50, title: 'DISASTER TWIN™ RISK SCAN', text: 'Identified Victoria Hospital (HIGH RISK, ETA 18m) & Power Substation Z.', icon: Building2 },
    { time: 60, title: 'CONFIDENCE GUARDIAN™', text: 'Uncertainty engine verifies 91% High Confidence & multi-agent consensus.', icon: ShieldAlert },
    { time: 70, title: 'ALERT THRESHOLD CROSSED', text: 'Hazard Probability (87%) & Confidence (91%) cross severe warning gate.', icon: AlertTriangle },
    { time: 75, title: 'CRITICAL WARNING ISSUED', text: '18 MINUTES OF ACTIONABLE LEAD TIME GENERATED BEFORE IMPACT!', icon: ShieldAlert },
    { time: 80, title: 'DEMO COMPLETE', text: 'OBSERVE → FUSE → PREDICT → ASSESS IMPACT → ALERT → VERIFY', icon: CheckCircle2 }
  ];

  const currentStep = steps[activeStep] || steps[0];
  const Icon = currentStep.icon;

  if (activeStep >= 9) {
    return (
      <div className="fixed inset-0 z-[3000] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 font-mono animate-fade-in">
        <div className="w-full max-w-2xl glass-panel rounded-2xl p-6 border-2 border-cyan-400 shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
            <CheckCircle2 className="w-10 h-10 text-slate-950" />
          </div>

          <div>
            <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
              JUDGE DEMO COMPLETE
            </span>
            <h1 className="text-3xl font-black text-white mt-2">VAJRANOW AI</h1>
            <p className="text-cyan-300 text-sm mt-1">
              0–60 MINUTE AI ATMOSPHERIC NOWCASTING & DISASTER DECISION SUPPORT
            </p>
          </div>

          {/* Core Pipeline Diagram */}
          <div className="grid grid-cols-6 gap-2 p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30 text-[10px] font-bold text-cyan-200">
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">1. OBSERVE</div>
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">2. FUSE</div>
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">3. PREDICT</div>
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">4. ASSESS IMPACT</div>
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">5. ALERT</div>
            <div className="p-2 bg-slate-950 rounded border border-cyan-500/20">6. VERIFY</div>
          </div>

          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm font-bold">
            “From fragmented atmospheric observations to actionable 0–60 minute disaster intelligence.”
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onFinish}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl shadow-lg hover:brightness-110 text-xs"
            >
              RETURN TO MISSION CONTROL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[2500] w-full max-w-2xl px-4 font-mono pointer-events-auto">
      <div className="glass-panel-severe rounded-xl p-3.5 border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-4 animate-bounce">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500 text-slate-950 shrink-0">
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-500/50 rounded">
                ⚡ JUDGE DEMO MODE ({elapsedSec}s / 80s)
              </span>
              <span className="text-xs font-bold text-white">{currentStep.title}</span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5">{currentStep.text}</p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          title="Exit Judge Demo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
