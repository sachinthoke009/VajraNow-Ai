import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import LeftFusionPanel from './components/LeftFusionPanel';
import CentralMap from './components/CentralMap';
import TimelineControl from './components/TimelineControl';
import ThunderDNA from './components/ThunderDNA';
import SyntheticFutureRadar from './components/SyntheticFutureRadar';
import ConfidenceGuardian from './components/ConfidenceGuardian';
import SwarmPanel from './components/SwarmPanel';
import DisasterTwin from './components/DisasterTwin';
import AlertModal from './components/AlertModal';
import VerificationPanel from './components/VerificationPanel';
import ThresholdSettingsModal from './components/ThresholdSettingsModal';
import AssetRiskModal from './components/AssetRiskModal';
import JudgeDemoOverlay from './components/JudgeDemoOverlay';

import { MOCK_CASES } from './data/mockStormData';

export default function App() {
  // State
  const [activeCaseId, setActiveCaseId] = useState('CASE-001');
  const [offsetMin, setOffsetMin] = useState(0);
  const [isFutureMode, setIsFutureMode] = useState(true);
  const [mapViewMode, setMapViewMode] = useState('WEATHER');
  const [radarOnline, setRadarOnline] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Modals & Overlays
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Thresholds
  const [probThreshold, setProbThreshold] = useState(80);
  const [confThreshold, setConfThreshold] = useState(75);

  // Judge Demo State
  const [isJudgeDemoActive, setIsJudgeDemoActive] = useState(false);
  const [judgeDemoStep, setJudgeDemoStep] = useState(0);
  const [judgeDemoElapsedSec, setJudgeDemoElapsedSec] = useState(0);

  // Simulation Data state
  const activeCase = MOCK_CASES[activeCaseId] || MOCK_CASES['CASE-001'];
  const baseCell = activeCase.cells[0];

  // Dynamic storm cell calculations based on timeline scrub
  const predictedCell = {
    ...baseCell,
    lat: baseCell.lat + (offsetMin * 0.0012),
    lng: baseCell.lng + (offsetMin * 0.0028),
    dbz: Math.min(68, Math.max(20, baseCell.dbz + (offsetMin <= 25 ? offsetMin * 0.2 : 5 - (offsetMin - 25) * 0.15))),
    lightning_rate_fl_per_min: Math.round(baseCell.lightning_rate_fl_per_min + offsetMin * 1.5),
    radius_km: baseCell.radius_km * (1 + offsetMin * 0.008)
  };

  // Infrastructure ETAs recalculation
  const infrastructureAssets = activeCase.infrastructure.map((asset) => {
    const currentEta = Math.max(0, asset.base_eta_min - offsetMin);
    let riskLevel = 'LOW';
    let prob = 35;

    if (currentEta <= 10) {
      riskLevel = 'CRITICAL';
      prob = radarOnline ? 94 : 78;
    } else if (currentEta <= 20) {
      riskLevel = 'HIGH';
      prob = radarOnline ? 87 : 72;
    } else if (currentEta <= 35) {
      riskLevel = 'MODERATE';
      prob = radarOnline ? 68 : 55;
    }

    return {
      ...asset,
      eta_min: currentEta,
      risk_level: riskLevel,
      hazard_prob: prob,
      confidence_pct: radarOnline ? 91 : 72
    };
  });

  // Confidence state
  const confidence = {
    overall_pct: radarOnline ? 91 : 72,
    confidence_level: radarOnline ? 'HIGH CONFIDENCE' : 'DEGRADED MODE',
    data_quality: radarOnline ? 96 : 74,
    model_agreement: radarOnline ? 92 : 76,
    calibration: radarOnline ? 89 : 71,
    why_factors: radarOnline
      ? [
          'Radar echo growth ↑ (+6.4 dBZ/hr)',
          'Lightning surge ↑ (+31% flash rate)',
          'Satellite cloud-top cooling (-18.5°C/hr)',
          'Multi-Agent Swarm Consensus High (93%)'
        ]
      : [
          '⚠ Radar Sensor OFFLINE (Primary input missing)',
          'Adapted Fusion: Satellite (55%) + Lightning (30%) + NWP (15%)',
          'Lightning flash jump confirms convective updraft',
          'Human Review Gating Enabled'
        ]
  };

  // Alert evaluation
  const highestAsset = infrastructureAssets[0];
  const activeAlert = (highestAsset.hazard_prob >= probThreshold && confidence.overall_pct >= confThreshold)
    ? {
        id: 'ALERT-01',
        severity: 'SEVERE THUNDERSTORM RISK',
        title: '⚠ CRITICAL NOWCAST WARNING: SEVERE CONVECTIVE CELL IMPACT IMPENDING',
        hazard_prob: highestAsset.hazard_prob,
        lead_time_min: highestAsset.eta_min,
        confidence_pct: confidence.overall_pct,
        affected_area_sqkm: 42.5,
        critical_assets_count: infrastructureAssets.filter((a) => a.risk_level === 'HIGH' || a.risk_level === 'CRITICAL').length,
        reasons: [
          '✓ Radar echo intensification (>55 dBZ, +6.4 dBZ/hr)',
          '✓ Lightning flash-rate surge (>84 flashes/min)',
          '✓ Satellite cloud-top cooling (-18.5°C/hr)',
          '✓ Multi-agent atmospheric consensus reached (93%)'
        ],
        recommended_action: 'Evacuate open grounds, issue automated power substation safety trip warnings, suspend airport ramp ops, prepare urban flood drainage pumps.'
      }
    : null;

  // Timeline Autoplay Loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setOffsetMin((prev) => (prev >= 60 ? 0 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Judge Demo Automation
  useEffect(() => {
    let demoInterval = null;
    if (isJudgeDemoActive) {
      demoInterval = setInterval(() => {
        setJudgeDemoElapsedSec((prevSec) => {
          const nextSec = prevSec + 1;
          if (nextSec === 10) setJudgeDemoStep(1);
          if (nextSec === 20) setJudgeDemoStep(2);
          if (nextSec === 30) setJudgeDemoStep(3);
          if (nextSec === 40) {
            setJudgeDemoStep(4);
            setIsFutureMode(true);
            setOffsetMin(15);
          }
          if (nextSec === 50) {
            setJudgeDemoStep(5);
            setMapViewMode('IMPACT');
            setOffsetMin(18);
          }
          if (nextSec === 60) setJudgeDemoStep(6);
          if (nextSec === 70) setJudgeDemoStep(7);
          if (nextSec === 75) {
            setJudgeDemoStep(8);
            setShowAlertModal(true);
          }
          if (nextSec >= 80) {
            setJudgeDemoStep(9);
            clearInterval(demoInterval);
          }
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(demoInterval);
  }, [isJudgeDemoActive]);

  const handleStartJudgeDemo = () => {
    setIsJudgeDemoActive(true);
    setJudgeDemoStep(0);
    setJudgeDemoElapsedSec(0);
    setOffsetMin(0);
    setIsFutureMode(true);
    setMapViewMode('WEATHER');
    setRadarOnline(true);
    setShowAlertModal(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#070a13] ops-grid">
      {/* Top Header */}
      <TopBar
        radarOnline={radarOnline}
        activeCaseId={activeCaseId}
        onSelectCase={(id) => {
          setActiveCaseId(id);
          setOffsetMin(0);
        }}
        onStartJudgeDemo={handleStartJudgeDemo}
        onOpenSettings={() => setShowSettings(true)}
        onOpenVerification={() => setShowVerification(true)}
        offsetMin={offsetMin}
        predictedCell={predictedCell}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Data Fusion Panel */}
        <LeftFusionPanel
          radarOnline={radarOnline}
          onToggleRadar={(state) => setRadarOnline(state)}
          dataQualityPct={radarOnline ? 94 : 74}
        />

        {/* Central Map Hero */}
        <CentralMap
          mapCase={activeCase}
          offsetMin={offsetMin}
          isFutureMode={isFutureMode}
          setIsFutureMode={setIsFutureMode}
          mapViewMode={mapViewMode}
          setMapViewMode={setMapViewMode}
          radarOnline={radarOnline}
          predictedCell={predictedCell}
          infrastructureAssets={infrastructureAssets}
          onSelectAsset={(asset) => setSelectedAsset(asset)}
          activeAlert={activeAlert}
          onOpenAlertDetails={() => setShowAlertModal(true)}
        />

        {/* Right Intelligence Panel — All 6 Innovation Pillars */}
        <aside className="w-80 bg-[#070a13] border-l border-cyan-500/20 p-3 space-y-2.5 z-20 shrink-0 overflow-y-auto select-none font-mono">
          <ThunderDNA offsetMin={offsetMin} />
          <SyntheticFutureRadar offsetMin={offsetMin} radarOnline={radarOnline} />
          <DisasterTwin
            infrastructureAssets={infrastructureAssets}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
          />
          <ConfidenceGuardian confidence={confidence} radarOnline={radarOnline} />
          <SwarmPanel radarOnline={radarOnline} />

          {/* Real-time & Scalable Pillar */}
          <div className="bg-slate-900/95 p-3 rounded-xl border-l-4 border-l-sky-500 border border-slate-800 font-mono shadow-md">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
              <h3 className="text-xs font-bold text-sky-400 tracking-wider flex items-center gap-1.5">
                ☁️ Real-time & Scalable
              </h3>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-300 leading-tight mb-2">
              0–60 min nowcast with 5 min updates, cloud-ready and district-wise delivery.
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-2">
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-center">
                <span className="text-[8px] text-slate-400 block">UPDATE CYCLE</span>
                <span className="font-bold text-cyan-300">5 min</span>
              </div>
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-center">
                <span className="text-[8px] text-slate-400 block">DEPLOYMENT</span>
                <span className="font-bold text-cyan-300">Cloud-Ready</span>
              </div>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-sky-300 pt-1 border-t border-slate-800/80">
              <span>Real-time</span>
              <span>|</span>
              <span>Scalable</span>
              <span>|</span>
              <span>Public</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Timeline Control Bar */}
      <TimelineControl
        offsetMin={offsetMin}
        onChangeOffset={(val) => setOffsetMin(val)}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={(s) => setPlaybackSpeed(s)}
        isFutureMode={isFutureMode}
      />

      {/* Modals and Overlays */}
      {showAlertModal && (
        <AlertModal
          alert={activeAlert}
          onClose={() => setShowAlertModal(false)}
          onOpenVerification={() => {
            setShowAlertModal(false);
            setShowVerification(true);
          }}
        />
      )}

      {showVerification && (
        <VerificationPanel onClose={() => setShowVerification(false)} />
      )}

      {showSettings && (
        <ThresholdSettingsModal
          probThreshold={probThreshold}
          confThreshold={confThreshold}
          onSave={(p, c) => {
            setProbThreshold(p);
            setConfThreshold(c);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {selectedAsset && (
        <AssetRiskModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}

      {isJudgeDemoActive && (
        <JudgeDemoOverlay
          activeStep={judgeDemoStep}
          elapsedSec={judgeDemoElapsedSec}
          onCancel={() => setIsJudgeDemoActive(false)}
          onFinish={() => setIsJudgeDemoActive(false)}
        />
      )}
    </div>
  );
}
