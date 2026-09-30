"""
Radar Data Provider for VajraNow AI.
Handles Doppler Weather Radar (DWR) reflectivity (dBZ), echo top, VIL.
Supports Radar Outage simulation state fallback.
"""
from typing import Dict, Any

class RadarProvider:
    def __init__(self):
        self.is_online = True

    def set_online(self, online: bool):
        self.is_online = online

    def fetch_data(self, storm_case_id: str, offset_min: int) -> Dict[str, Any]:
        if not self.is_online:
            return {
                "source": "RADAR",
                "status": "OFFLINE",
                "freshness_min": 999.0,
                "contribution_pct": 0.0,
                "quality_score": 0.0,
                "data": None
            }

        # Simulate radar reflectivity parameters
        base_dbz = 58.5 + (offset_min * 0.15) if offset_min <= 25 else 62.0 - ((offset_min - 25) * 0.2)
        return {
            "source": "RADAR",
            "status": "ONLINE",
            "freshness_min": 2.0,
            "contribution_pct": 45.0,
            "quality_score": 96.0,
            "data": {
                "max_dbz": round(base_dbz, 1),
                "echo_top_km": 14.5,
                "vil_kg_m2": 48.2,
                "growth_rate_dbz_per_hr": 6.4,
                "trend": [38.0, 42.5, 48.0, 54.2, 58.5]
            }
        }
