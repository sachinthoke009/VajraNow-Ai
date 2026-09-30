"""
Satellite Data Provider for VajraNow AI.
Handles INSAT-3D/3DR IR Cloud Top Temperature (CTT) & cooling rates.
"""
from typing import Dict, Any

class SatelliteProvider:
    def __init__(self):
        self.is_online = True

    def fetch_data(self, storm_case_id: str, offset_min: int, radar_online: bool = True) -> Dict[str, Any]:
        # When radar is offline, satellite contribution dynamically scales up!
        contribution = 25.0 if radar_online else 55.0
        
        return {
            "source": "SATELLITE",
            "status": "ONLINE" if self.is_online else "OFFLINE",
            "freshness_min": 4.0,
            "contribution_pct": contribution,
            "quality_score": 93.0,
            "data": {
                "cloud_top_temp_c": -64.2 - (offset_min * 0.2),
                "cooling_rate_c_per_hr": -18.5,
                "overshooting_tops_detected": True,
                "water_vapor_buoyancy": "HIGH",
                "trend": [-45.0, -52.0, -58.5, -62.0, -64.2]
            }
        }
