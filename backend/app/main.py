"""
VajraNow AI FastAPI Main Server (PS 26072).
Atmospheric AI Nowcasting & Disaster Decision Support Operations Center API.
"""
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

from app.data.synthetic_storms import STORM_CASES
from app.providers.radar_provider import RadarProvider
from app.providers.satellite_provider import SatelliteProvider
from app.providers.lightning_provider import LightningProvider
from app.providers.nwp_provider import NWPProvider
from app.engines.nowcast_engine import NowcastEngine
from app.engines.storm_tracker import StormTracker
from app.engines.confidence_engine import ConfidenceEngine
from app.engines.impact_engine import ImpactEngine
from app.engines.alert_engine import AlertEngine
from app.engines.verification_engine import VerificationEngine

app = FastAPI(
    title="VajraNow AI Operations Center API",
    description="PS 26072: Multi-Source AI Thunderstorm & Lightning Nowcasting + Disaster Decision Support",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate engine and provider singletons
radar_provider = RadarProvider()
satellite_provider = SatelliteProvider()
lightning_provider = LightningProvider()
nwp_provider = NWPProvider()

nowcast_engine = NowcastEngine()
storm_tracker = StormTracker()
confidence_engine = ConfidenceEngine()
impact_engine = ImpactEngine()
alert_engine = AlertEngine(prob_threshold=80.0, conf_threshold=75.0)
verification_engine = VerificationEngine()

# Global state
current_case_id = "CASE-001"

class ThresholdUpdateReq(BaseModel):
    prob_threshold: float
    conf_threshold: float

@app.get("/")
def root():
    return {
        "system": "VAJRANOW AI",
        "tagline": "From fragmented atmospheric observations to actionable 0–60 minute disaster intelligence.",
        "status": "OPERATIONAL",
        "version": "VajraNet-v2.4-Ensemble"
    }

@app.get("/api/status")
def get_system_status():
    return {
        "system_status": "SYSTEM OPERATIONAL",
        "radar_online": radar_provider.is_online,
        "data_freshness_min": 1.0 if radar_provider.is_online else 4.0,
        "active_case": current_case_id,
        "model_version": "VajraNet-v2.4-Ensemble",
        "data_quality_pct": 94.0 if radar_provider.is_online else 74.0
    }

@app.get("/api/simulation")
def get_simulation_state(
    offset_min: int = Query(0, ge=0, le=60),
    is_future: bool = Query(False)
):
    case_data = STORM_CASES.get(current_case_id, STORM_CASES["CASE-001"])
    initial_cell = case_data["initial_cells"][0]

    # Predict cell at offset_min
    predicted_cell = nowcast_engine.predict_cell_motion(
        initial_cell, lead_time_min=offset_min, radar_online=radar_provider.is_online
    )
    predicted_cell["id"] = initial_cell["id"]
    predicted_cell["speed_kmh"] = initial_cell["speed_kmh"]
    predicted_cell["direction_deg"] = initial_cell["direction_deg"]
    predicted_cell["top_height_km"] = initial_cell["top_height_km"]
    predicted_cell["growth_rate_pct"] = initial_cell["growth_rate_pct"]
    predicted_cell["lightning_rate_fl_per_min"] = round(
        initial_cell["lightning_rate_fl_per_min"] + (offset_min * 1.5), 1
    )

    # Provider Data
    r_data = radar_provider.fetch_data(current_case_id, offset_min)
    s_data = satellite_provider.fetch_data(current_case_id, offset_min, radar_provider.is_online)
    l_data = lightning_provider.fetch_data(current_case_id, offset_min, radar_provider.is_online)
    n_data = nwp_provider.fetch_data(current_case_id, offset_min, radar_provider.is_online)

    # Confidence Metrics
    confidence = confidence_engine.calculate_confidence(radar_provider.is_online, offset_min)

    # Impact Evaluation
    evaluated_infrastructure = impact_engine.evaluate_assets(
        case_data["infrastructure"], predicted_cell, offset_min, radar_provider.is_online
    )

    # Swarm Agents
    agents = [
        {
            "agent_id": "AGENT-01",
            "name": "RADAR AGENT",
            "domain": "Doppler Reflectivity Echo",
            "probability": 94.0 if radar_provider.is_online else 0.0,
            "confidence": 96.0 if radar_provider.is_online else 0.0,
            "status": "ACTIVE" if radar_provider.is_online else "OFFLINE",
            "key_finding": f"Reflectivity core {predicted_cell['dbz']} dBZ, VIL surge" if radar_provider.is_online else "Radar sensor offline - no echo"
        },
        {
            "agent_id": "AGENT-02",
            "name": "SATELLITE AGENT",
            "domain": "INSAT IR Cloud Top",
            "probability": 88.0,
            "confidence": 93.0,
            "status": "ACTIVE",
            "key_finding": "Cloud-top temperature cooling rapidly (-18.5°C/hr)"
        },
        {
            "agent_id": "AGENT-03",
            "name": "LIGHTNING AGENT",
            "domain": "LLN Total Flash Density",
            "probability": 92.0,
            "confidence": 98.0,
            "status": "ACTIVE",
            "key_finding": f"Flash rate surge {predicted_cell['lightning_rate_fl_per_min']} fl/min"
        },
        {
            "agent_id": "AGENT-04",
            "name": "ENVIRONMENT AGENT",
            "domain": "NWP CAPE & Shear",
            "probability": 85.0,
            "confidence": 88.0,
            "status": "ACTIVE",
            "key_finding": "CAPE 2450 J/kg, High 0-6km Shear (22.5 m/s)"
        },
        {
            "agent_id": "AGENT-05",
            "name": "TRACKING AGENT",
            "domain": "Cell Vector Kinematics",
            "probability": 91.0,
            "confidence": 92.0,
            "status": "ACTIVE",
            "key_finding": f"Cell moving {predicted_cell['speed_kmh']} km/h towards 65° ENE"
        },
        {
            "agent_id": "AGENT-06",
            "name": "IMPACT AGENT",
            "domain": "Disaster Twin Risk",
            "probability": 87.0,
            "confidence": 91.0,
            "status": "ACTIVE",
            "key_finding": "7 critical infrastructure assets in direct path window"
        },
        {
            "agent_id": "AGENT-07",
            "name": "SENTINEL AGENT",
            "domain": "Alert Gating & Safety",
            "probability": 89.0,
            "confidence": 95.0,
            "status": "ACTIVE",
            "key_finding": "Threshold conditions met for Severe Warning"
        }
    ]

    # Alert Evaluation
    highest_risk_asset = evaluated_infrastructure[0]
    critical_count = len([a for a in evaluated_infrastructure if a["risk_level"] in ["HIGH", "CRITICAL"]])

    alert = alert_engine.evaluate_alert(
        hazard_prob=highest_risk_asset["hazard_prob"],
        confidence=confidence["overall_pct"],
        eta_min=highest_risk_asset["eta_min"],
        critical_assets_count=critical_count,
        radar_online=radar_provider.is_online
    )

    # ThunderDNA
    thunder_dna = storm_tracker.analyze_thunder_dna(predicted_cell, offset_min)

    return {
        "simulation_time": f"T+{offset_min:02d} MIN",
        "data_freshness_min": 1.0 if radar_provider.is_online else 4.0,
        "radar_online": radar_provider.is_online,
        "data_quality_overall": 94.0 if radar_provider.is_online else 74.0,
        "active_case": case_data["name"],
        "timeline_offset_min": offset_min,
        "is_future_mode": is_future,
        "storm_cells": [predicted_cell],
        "infrastructure": evaluated_infrastructure,
        "confidence": confidence,
        "thunder_dna": thunder_dna,
        "agents": agents,
        "active_alert": alert,
        "data_sources": [r_data, s_data, l_data, n_data]
    }

@app.post("/api/toggle-radar")
def toggle_radar(online: bool = Query(...)):
    radar_provider.set_online(online)
    return {
        "radar_online": radar_provider.is_online,
        "status": "ONLINE" if radar_provider.is_online else "DEGRADED MODE ACTIVE"
    }

@app.post("/api/select-case/{case_id}")
def select_case(case_id: str):
    global current_case_id
    if case_id not in STORM_CASES:
        raise HTTPException(status_code=404, detail="Case ID not found")
    current_case_id = case_id
    return {"active_case": current_case_id, "name": STORM_CASES[case_id]["name"]}

@app.get("/api/verification")
def get_verification():
    return verification_engine.get_metrics()

@app.post("/api/thresholds")
def update_thresholds(req: ThresholdUpdateReq):
    alert_engine.set_thresholds(req.prob_threshold, req.conf_threshold)
    return {
        "status": "UPDATED",
        "prob_threshold": alert_engine.prob_threshold,
        "conf_threshold": alert_engine.conf_threshold
    }
