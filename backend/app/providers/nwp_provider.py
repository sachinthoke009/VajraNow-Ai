"""
NWP (Numerical Weather Prediction) Provider for VajraNow AI.
Handles environmental instability indicators (CAPE, CIN, Vertical Wind Shear).
"""
from typing import Dict, Any

class NWPProvider:
    def __init__(self):
        self.is_online = True

    def fetch_data(self, storm_case_id: str, offset_min: int, radar_online: bool = True) -> Dict[str, Any]:
        contribution = 10.0 if radar_online else 15.0

        return {
            "source": "NWP",
            "status": "ONLINE" if self.is_online else "OFFLINE",
            "freshness_min": 12.0,
            "contribution_pct": contribution,
            "quality_score": 88.0,
            "data": {
                "cape_j_kg": 2450.0,
                "cin_j_kg": -12.0,
                "shear_0_6km_m_s": 22.5,
                "precipitable_water_mm": 54.0,
                "convective_inhibition_broken": True,
                "trend": [1800.0, 2050.0, 2200.0, 2380.0, 2450.0]
            }
        }
