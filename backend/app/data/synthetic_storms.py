"""
Synthetic storm scenarios for VajraNow AI (PS 26072).
Provides meteorologically coherent historical replay and live simulation datasets.
Clearly tagged: HISTORICAL REPLAY / DEMO DATA
"""

STORM_CASES = {
    "CASE-001": {
        "id": "CASE-001",
        "name": "Bengaluru Urban Squall Line (Severe Convection)",
        "region": "Bengaluru Metropolitan Region, Karnataka",
        "center_lat": 12.9716,
        "center_lng": 77.5946,
        "initial_cells": [
            {
                "id": "CELL-042",
                "severity": "SEVERE",
                "lat": 12.9150,
                "lng": 77.5200,
                "dbz": 58.5,
                "top_height_km": 14.2,
                "speed_kmh": 42.0,
                "direction_deg": 65.0,  # East-Northeastward
                "growth_rate_pct": 28.0,
                "lightning_rate_fl_per_min": 84.0,
                "radius_km": 8.5
            },
            {
                "id": "CELL-043",
                "severity": "MODERATE",
                "lat": 12.8500,
                "lng": 77.4500,
                "dbz": 44.0,
                "top_height_km": 10.5,
                "speed_kmh": 38.0,
                "direction_deg": 60.0,
                "growth_rate_pct": 14.0,
                "lightning_rate_fl_per_min": 22.0,
                "radius_km": 5.0
            }
        ],
        "infrastructure": [
            {
                "id": "INF-001",
                "name": "Victoria Hospital Super Speciality Center",
                "type": "hospital",
                "lat": 12.9640,
                "lng": 77.5750,
                "base_risk": "HIGH",
                "base_eta_min": 18,
                "warn_by_min": 10,
                "confidence_pct": 91.0,
                "primary_driver": "Severe Radar Echo (58 dBZ) + Lightning Surge"
            },
            {
                "id": "INF-002",
                "name": "St. John's Medical College & Research Hospital",
                "type": "hospital",
                "lat": 12.9340,
                "lng": 77.6200,
                "base_risk": "HIGH",
                "base_eta_min": 24,
                "warn_by_min": 15,
                "confidence_pct": 88.0,
                "primary_driver": "Convective Cell Advection + Cloud-Top Cooling"
            },
            {
                "id": "INF-003",
                "name": "KSR Bengaluru City Junction Railway Station",
                "type": "railway",
                "lat": 12.9780,
                "lng": 77.5690,
                "base_risk": "HIGH",
                "base_eta_min": 21,
                "warn_by_min": 12,
                "confidence_pct": 93.0,
                "primary_driver": "Heavy Downburst & High Wind Gusts"
            },
            {
                "id": "INF-004",
                "name": "Peenya 220kV Main Transmission Substation Z",
                "type": "substation",
                "lat": 13.0300,
                "lng": 77.5250,
                "base_risk": "HIGH",
                "base_eta_min": 12,
                "warn_by_min": 8,
                "confidence_pct": 94.0,
                "primary_driver": "Direct Lightning Strike Cluster Risk"
            },
            {
                "id": "INF-005",
                "name": "National Public School Indiranagar",
                "type": "school",
                "lat": 12.9780,
                "lng": 77.6400,
                "base_risk": "MODERATE",
                "base_eta_min": 32,
                "warn_by_min": 20,
                "confidence_pct": 82.0,
                "primary_driver": "Marginal Hail & Flash Urban Flooding"
            },
            {
                "id": "INF-006",
                "name": "Outer Ring Road (Silk Board to Marathahalli Highway)",
                "type": "highway",
                "lat": 12.9200,
                "lng": 77.6700,
                "base_risk": "MODERATE",
                "base_eta_min": 35,
                "warn_by_min": 25,
                "confidence_pct": 85.0,
                "primary_driver": "Extreme Rainfall Rate (>65 mm/hr)"
            },
            {
                "id": "INF-007",
                "name": "Bellandur Basin Flood-Prone Drainage Zone",
                "type": "flood_zone",
                "lat": 12.9350,
                "lng": 77.6650,
                "base_risk": "CRITICAL",
                "base_eta_min": 28,
                "warn_by_min": 15,
                "confidence_pct": 90.0,
                "primary_driver": "Accumulated Radar Reflectivity + Inflow"
            }
        ]
    },
    "CASE-002": {
        "id": "CASE-002",
        "name": "Odisha Coastal Supercell & Lightning Outbreak",
        "region": "Bhubaneswar - Cuttack Corridor, Odisha",
        "center_lat": 20.2961,
        "center_lng": 85.8245,
        "initial_cells": [
            {
                "id": "CELL-108",
                "severity": "EXTREME",
                "lat": 20.1500,
                "lng": 85.7000,
                "dbz": 64.0,
                "top_height_km": 16.5,
                "speed_kmh": 52.0,
                "direction_deg": 45.0,
                "growth_rate_pct": 35.0,
                "lightning_rate_fl_per_min": 142.0,
                "radius_km": 12.0
            }
        ],
        "infrastructure": [
            {
                "id": "INF-101",
                "name": "AIIMS Bhubaneswar Emergency Ops Command",
                "type": "hospital",
                "lat": 20.2280,
                "lng": 85.8150,
                "base_risk": "CRITICAL",
                "base_eta_min": 14,
                "warn_by_min": 8,
                "confidence_pct": 95.0,
                "primary_driver": "Extreme Lightning Density (>120 fl/min)"
            },
            {
                "id": "INF-102",
                "name": "Chandaka Grid Substation 400kV",
                "type": "substation",
                "lat": 20.3400,
                "lng": 85.7900,
                "base_risk": "HIGH",
                "base_eta_min": 22,
                "warn_by_min": 12,
                "confidence_pct": 91.0,
                "primary_driver": "Severe Squall Line Shear Vector"
            }
        ]
    },
    "CASE-003": {
        "id": "CASE-003",
        "name": "Delhi NCR Severe Downburst & Squall Front",
        "region": "National Capital Region, Delhi-Gurugram",
        "center_lat": 28.6139,
        "center_lng": 77.2090,
        "initial_cells": [
            {
                "id": "CELL-201",
                "severity": "SEVERE",
                "lat": 28.4800,
                "lng": 77.0800,
                "dbz": 59.0,
                "top_height_km": 13.8,
                "speed_kmh": 46.0,
                "direction_deg": 75.0,
                "growth_rate_pct": 30.0,
                "lightning_rate_fl_per_min": 98.0,
                "radius_km": 10.0
            }
        ],
        "infrastructure": [
            {
                "id": "INF-201",
                "name": "Indira Gandhi International Airport (DEL)",
                "type": "substation",
                "lat": 28.5560,
                "lng": 77.1000,
                "base_risk": "CRITICAL",
                "base_eta_min": 11,
                "warn_by_min": 6,
                "confidence_pct": 96.0,
                "primary_driver": "Microburst Shear & Zero-Visibility Cloud Wall"
            },
            {
                "id": "INF-202",
                "name": "AIIMS New Delhi Trauma Center",
                "type": "hospital",
                "lat": 28.5670,
                "lng": 77.2100,
                "base_risk": "HIGH",
                "base_eta_min": 25,
                "warn_by_min": 14,
                "confidence_pct": 89.0,
                "primary_driver": "Frontal Squall Propagation"
            }
        ]
    }
}
