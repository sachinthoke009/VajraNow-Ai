import React from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function TimelineControl({
  offsetMin,
  onChangeOffset,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  isFutureMode
}) {
  const timeSteps = [0, 5, 10, 15, 20, 30, 45, 60];

  return (
    <div className="h-16 bg-[#050811] border-t border-cyan-500/25 px-5 flex items-center justify-between z-20 shrink-0 select-none font-mono">
      {/* Play Controls & Speed */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-all border ${
            isPlaying
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30'
              : 'bg-cyan-500 text-slate-950 border-cyan-300 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
        </button>

        <button
          onClick={() => onChangeOffset(0)}
          title="Reset to T+0 NOW"
          className="p-2.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-slate-300 hover:text-cyan-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          {[1, 2, 5].map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2.5 py-0.5 rounded-lg transition-all ${
                playbackSpeed === s
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Slider */}
      <div className="flex-1 mx-8 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-1 text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            ATMOSPHERIC TIMELINE SCRUBBER:
          </span>
          <span className="text-cyan-300 font-bold text-xs bg-cyan-950 px-3 py-0.5 rounded-lg border border-cyan-500/40">
            {offsetMin === 0 ? 'NOW (T+00 MIN)' : `T+${String(offsetMin).padStart(2, '0')} MIN (${isFutureMode ? 'AI FORECAST' : 'SIMULATION'})`}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="60"
          step="1"
          value={offsetMin}
          onChange={(e) => onChangeOffset(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800 focus:outline-none"
        />

        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          {timeSteps.map((step) => (
            <button
              key={step}
              onClick={() => onChangeOffset(step)}
              className={`hover:text-cyan-300 transition-colors ${
                offsetMin === step ? 'text-cyan-300 font-bold underline' : ''
              }`}
            >
              {step === 0 ? 'NOW' : `+${step}m`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
