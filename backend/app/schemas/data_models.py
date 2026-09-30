from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DataSourceStatus(BaseModel):
    name: str
    status: str  # ONLINE, DEGRADED, OFFLINE
    freshness_min: float
    contribution_pct: float
    data_quality_pct: float
    trend: List[float]

class StormCell(BaseModel):
    id: str
    severity: str  # LIGHT, MODERATE, SEVERE, EXTREME
    lat: float
    lng: float
    dbz: float
    top_height_km: float
    speed_kmh: float
    direction_deg: float
    growth_rate_pct: float
    lightning_rate_fl_per_min: float
    radius_km: float

class InfrastructureAsset(BaseModel):
    id: str
    name: str
    type: str  # hospital, school, substation, highway, railway, flood_zone
    lat: float
    lng: float
    risk_level: str  # LOW, MODERATE, HIGH, CRITICAL
    hazard_prob: float
    eta_min: int
    warn_by_min: int
    confidence_pct: float
    primary_driver: str

class AlertNotice(BaseModel):
    id: str
    severity: str
    title: str
    hazard_prob: float
    lead_time_min: int
    confidence_pct: float
    affected_area_sqkm: float
    critical_assets_count: int
    reasons: List[str]
    recommended_action: str
    timestamp: str

class ConfidenceMetrics(BaseModel):
    overall_pct: float
    confidence_level: str
    data_quality: float
    model_agreement: float
    calibration: float
    novelty: str
    ensemble_spread: str
    why_factors: List[str]

class SwarmAgentState(BaseModel):
    agent_id: str
    name: str
    domain: str
    probability: float
    confidence: float
    status: str
    key_finding: str

class VerificationMetrics(BaseModel):
    csi: float
    pod: float
    far: float
    brier_score: float
    fss: float
    avg_lead_time_min: float
    by_lead_time: Dict[str, Dict[str, float]]

class SimulationState(BaseModel):
    simulation_time: str
    data_freshness_min: float
    radar_online: bool
    data_quality_overall: float
    active_case: str
    timeline_offset_min: int
    is_future_mode: bool
    storm_cells: List[StormCell]
    infrastructure: List[InfrastructureAsset]
    confidence: ConfidenceMetrics
    agents: List[SwarmAgentState]
    active_alert: Optional[AlertNotice] = None
    data_sources: List[DataSourceStatus]
