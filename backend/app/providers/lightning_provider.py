"""
Lightning Data Provider for VajraNow AI.
Handles Total Lightning Flash Rate (In-Cloud + Cloud-to-Ground) & Flash Jump Detection.
"""
from typing import Dict, Any

class LightningProvider:
    def __init__(self):
        self.is_online = True

    def fetch_data(self, storm_case_id: str, offset_min: int, radar_online: bool = True) -> Dict[str, Any]:
        contribution = 20.0 if radar_online else 30.0

        return {
            "source": "LIGHTNING",
            "status": "ONLINE" if self.is_online else "OFFLINE",
            "freshness_min": 1.0,
            "contribution_pct": contribution,
            "quality_score": 98.0,
            "data": {
                "flash_rate_fl_per_min": 84.0 + (offset_min * 1.5),
                "ic_to_cg_ratio": 4.2,
                "flash_jump_detected": True,
                "lightning_surge_trend": "+31% in last 10m",
                "trend": [18.0, 32.0, 54.0, 72.0, 84.0]
            }
        }
