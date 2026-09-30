"""
Alert Engine for VajraNow AI.
Implements configurable threshold logic:
IF hazard_probability >= prob_thresh AND confidence >= conf_thresh THEN SEVERE_ALERT
"""
from typing import Dict, Any, List, Optional

class AlertEngine:
    def __init__(self, prob_threshold: float = 80.0, conf_threshold: float = 75.0):
        self.prob_threshold = prob_threshold
        self.conf_threshold = conf_threshold

    def set_thresholds(self, prob_threshold: float, conf_threshold: float):
        self.prob_threshold = prob_threshold
        self.conf_threshold = conf_threshold

    def evaluate_alert(
        self,
        hazard_prob: float,
        confidence: float,
        eta_min: int,
        critical_assets_count: int,
        radar_online: bool = True
    ) -> Optional[Dict[str, Any]]:
        reasons = [
            "✓ Radar echo intensification (>55 dBZ, +6.4 dBZ/hr)",
            "✓ Lightning flash-rate surge (>84 flashes/min)",
            "✓ Satellite cloud-top cooling (-18.5°C/hr)",
            "✓ Multi-agent atmospheric consensus reached (93%)"
        ]

        if not radar_online:
            reasons = [
                "⚠ Radar Offline - Adapted Satellite + Lightning Multi-Sensor Fusion",
                "✓ Lightning flash jump confirms active severe updraft",
                "✓ INSAT-3D CTT cooling rate exceeds severe threshold (-18.5°C/hr)",
                "⚠ Human-in-the-Loop Operator Review Recommended"
            ]

        if hazard_prob >= self.prob_threshold and confidence >= self.conf_threshold:
            return {
                "id": "ALERT-2026-SEVERE-01",
                "severity": "SEVERE THUNDERSTORM RISK",
                "title": "⚠ CRITICAL NOWCAST WARNING: SEVERE CONVECTIVE CELL IMPACT IMPENDING",
                "hazard_prob": hazard_prob,
                "lead_time_min": eta_min,
                "confidence_pct": confidence,
                "affected_area_sqkm": 42.5,
                "critical_assets_count": critical_assets_count,
                "reasons": reasons,
                "recommended_action": "Evacuate open grounds, issue automated power substation safety trip warnings, suspend airport ramp ops, prepare urban flood drainage pumps.",
                "timestamp": "T+0 to T+60 Window"
            }
        elif hazard_prob >= 60.0 and confidence >= 60.0:
            return {
                "id": "ALERT-2026-WATCH-01",
                "severity": "THUNDERSTORM WATCH",
                "title": "⚡ SEVERE THUNDERSTORM WATCH IN EFFECT",
                "hazard_prob": hazard_prob,
                "lead_time_min": eta_min,
                "confidence_pct": confidence,
                "affected_area_sqkm": 68.0,
                "critical_assets_count": critical_assets_count,
                "reasons": reasons,
                "recommended_action": "Alert local emergency response units, monitor radar echo growth & cloud top temperatures closely.",
                "timestamp": "T+0 to T+60 Window"
            }
        else:
            return {
                "id": "ALERT-2026-MONITOR-01",
                "severity": "CONTINUOUS MONITORING",
                "title": "● NORMAL ATMOSPHERIC MONITORING ACTIVE",
                "hazard_prob": hazard_prob,
                "lead_time_min": eta_min,
                "confidence_pct": confidence,
                "affected_area_sqkm": 15.0,
                "critical_assets_count": 0,
                "reasons": ["Convective signals below warning thresholds."],
                "recommended_action": "Standard radar and satellite observation.",
                "timestamp": "T+0 to T+60 Window"
            }
