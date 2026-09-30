"""
PyTorch-Compatible Nowcast Engine for VajraNow AI.
Architected to plug in pre-trained UNet / ConvLSTM / Earthformer PyTorch model weights.
Currently uses physics-guided convective cell advection and reflectivity extrapolation.
"""
import math
from typing import List, Dict, Any

class NowcastEngine:
    def __init__(self, model_name: str = "VajraNet-v2.4-Ensemble"):
        self.model_name = model_name
        self.ensemble_size = 12

    def predict_cell_motion(
        self, cell: Dict[str, Any], lead_time_min: int, radar_online: bool = True
    ) -> Dict[str, Any]:
        """
        Projects storm cell position, reflectivity, and geometry at T + lead_time_min.
        """
        lat0 = cell["lat"]
        lng0 = cell["lng"]
        speed_kmh = cell["speed_kmh"]
        direction_deg = cell["direction_deg"]
        growth_rate = cell.get("growth_rate_pct", 28.0) / 100.0

        # Distance traveled in km
        dist_km = speed_kmh * (lead_time_min / 60.0)

        # Convert direction (0=N, 90=E) to radians
        rad = math.radians(direction_deg)
        # Approximate 1 deg lat = 111 km, 1 deg lng = 111 * cos(lat) km
        dlat = (dist_km * math.cos(rad)) / 111.0
        dlng = (dist_km * math.sin(rad)) / (111.0 * math.cos(math.radians(lat0)))

        future_lat = lat0 + dlat
        future_lng = lng0 + dlng

        # Reflectivity evolution curve (peaks around T+20 to T+30 min)
        base_dbz = cell["dbz"]
        if lead_time_min <= 25:
            delta_dbz = base_dbz * (growth_rate * (lead_time_min / 30.0))
        else:
            decay_factor = (lead_time_min - 25) / 35.0
            delta_dbz = base_dbz * 0.25 - (base_dbz * 0.3 * decay_factor)

        future_dbz = min(68.0, max(20.0, base_dbz + delta_dbz))

        # Determine severity class
        if future_dbz >= 55.0:
            severity = "SEVERE"
        elif future_dbz >= 45.0:
            severity = "MODERATE"
        else:
            severity = "LIGHT"

        # Radii expansion
        radius_km = cell.get("radius_km", 8.0) * (1.0 + (lead_time_min * 0.008))

        return {
            "cell_id": cell["id"],
            "lead_time_min": lead_time_min,
            "lat": round(future_lat, 4),
            "lng": round(future_lng, 4),
            "dbz": round(future_dbz, 1),
            "severity": severity,
            "radius_km": round(radius_km, 2),
            "ensemble_spread_km": round(0.5 + (lead_time_min * 0.05), 2),
            "is_synthetic_forecast": True
        }

    def generate_0_60_horizon(self, cell: Dict[str, Any], radar_online: bool = True) -> List[Dict[str, Any]]:
        horizons = [0, 5, 10, 15, 20, 30, 45, 60]
        return [self.predict_cell_motion(cell, t, radar_online) for t in horizons]
