/**
 * Mock Storm Datasets & Offline Fallback Physics Simulation Engine for VajraNow AI.
 * Tagged: HISTORICAL REPLAY / DEMO DATA
 */

export const MOCK_CASES = {
  "CASE-001": {
    id: "CASE-001",
    name: "Bengaluru Urban Squall Line",
    region: "Bengaluru Region, KA",
    center: [12.9716, 77.5946],
    zoom: 11,
    cells: [
      {
        id: "CELL-042",
        severity: "SEVERE",
        lat: 12.9150,
        lng: 77.5200,
        dbz: 58.5,
        top_height_km: 14.2,
        speed_kmh: 42.0,
        direction_deg: 65.0,
        growth_rate_pct: 28.0,
        lightning_rate_fl_per_min: 84.0,
        radius_km: 8.5
      }
    ],
    infrastructure: [
      {
        id: "INF-001",
        name: "Victoria Hospital Super Speciality Center",
        type: "hospital",
        lat: 12.9640,
        lng: 77.5750,
        base_risk: "HIGH",
        base_eta_min: 18,
        warn_by_min: 10,
        confidence_pct: 91,
        primary_driver: "Severe Radar Echo (58 dBZ) + Lightning Surge"
      },
      {
        id: "INF-002",
        name: "St. John's Medical College Hospital",
        type: "hospital",
        lat: 12.9340,
        lng: 77.6200,
        base_risk: "HIGH",
        base_eta_min: 24,
        warn_by_min: 15,
        confidence_pct: 88,
        primary_driver: "Convective Cell Vector Path + CTT Cooling"
      },
      {
        id: "INF-003",
        name: "KSR Bengaluru Junction Railway Station",
        type: "railway",
        lat: 12.9780,
        lng: 77.5690,
        base_risk: "HIGH",
        base_eta_min: 21,
        warn_by_min: 12,
        confidence_pct: 93,
        primary_driver: "Microburst Downburst & Wind Shear"
      },
      {
        id: "INF-004",
        name: "Peenya 220kV Substation Z",
        type: "substation",
        lat: 13.0300,
        lng: 77.5250,
        base_risk: "HIGH",
        base_eta_min: 12,
        warn_by_min: 8,
        confidence_pct: 94,
        primary_driver: "Direct Lightning Strike Cluster Risk"
      },
      {
        id: "INF-005",
        name: "National Public School Indiranagar",
        type: "school",
        lat: 12.9780,
        lng: 77.6400,
        base_risk: "MODERATE",
        base_eta_min: 32,
        warn_by_min: 20,
        confidence_pct: 82,
        primary_driver: "Marginal Hail & Urban Flash Flooding"
      },
      {
        id: "INF-006",
        name: "Outer Ring Road Tech Corridor Highway",
        type: "highway",
        lat: 12.9200,
        lng: 77.6700,
        base_risk: "MODERATE",
        base_eta_min: 35,
        warn_by_min: 25,
        confidence_pct: 85,
        primary_driver: "Extreme Rainfall Rate (>65 mm/hr)"
      },
      {
        id: "INF-007",
        name: "Bellandur Basin Flood-Prone Zone",
        type: "flood_zone",
        lat: 12.9350,
        lng: 77.6650,
        base_risk: "CRITICAL",
        base_eta_min: 28,
        warn_by_min: 15,
        confidence_pct: 90,
        primary_driver: "Accumulated Radar Reflectivity Inflow"
      }
    ]
  },
  "CASE-002": {
    id: "CASE-002",
    name: "Odisha Coastal Supercell",
    region: "Bhubaneswar-Cuttack, Odisha",
    center: [20.2961, 85.8245],
    zoom: 11,
    cells: [
      {
        id: "CELL-108",
        severity: "EXTREME",
        lat: 20.1500,
        lng: 85.7000,
        dbz: 64.0,
        top_height_km: 16.5,
        speed_kmh: 52.0,
        direction_deg: 45.0,
        growth_rate_pct: 35.0,
        lightning_rate_fl_per_min: 142.0,
        radius_km: 12.0
      }
    ],
    infrastructure: [
      {
        id: "INF-101",
        name: "AIIMS Bhubaneswar Emergency Hospital",
        type: "hospital",
        lat: 20.2280,
        lng: 85.8150,
        base_risk: "CRITICAL",
        base_eta_min: 14,
        warn_by_min: 8,
        confidence_pct: 95,
        primary_driver: "Extreme Lightning Density (>120 fl/min)"
      },
      {
        id: "INF-102",
        name: "Chandaka Grid Substation 400kV",
        type: "substation",
        lat: 20.3400,
        lng: 85.7900,
        base_risk: "HIGH",
        base_eta_min: 22,
        warn_by_min: 12,
        confidence_pct: 91,
        primary_driver: "Severe Squall Line Shear Vector"
      }
    ]
  },
  "CASE-003": {
    id: "CASE-003",
    name: "Delhi NCR Severe Downburst",
    region: "Delhi-Gurugram Corridor",
    center: [28.6139, 77.2090],
    zoom: 11,
    cells: [
      {
        id: "CELL-201",
        severity: "SEVERE",
        lat: 28.4800,
        lng: 77.0800,
        dbz: 59.0,
        top_height_km: 13.8,
        speed_kmh: 46.0,
        direction_deg: 75.0,
        growth_rate_pct: 30.0,
        lightning_rate_fl_per_min: 98.0,
        radius_km: 10.0
      }
    ],
    infrastructure: [
      {
        id: "INF-201",
        name: "Indira Gandhi International Airport",
        type: "substation",
        lat: 28.5560,
        lng: 77.1000,
        base_risk: "CRITICAL",
        base_eta_min: 11,
        warn_by_min: 6,
        confidence_pct: 96,
        primary_driver: "Microburst Shear & Zero-Visibility Front"
      },
      {
        id: "INF-202",
        name: "AIIMS New Delhi Trauma Center",
        type: "hospital",
        lat: 28.5670,
        lng: 77.2100,
        base_risk: "HIGH",
        base_eta_min: 25,
        warn_by_min: 14,
        confidence_pct: 89,
        primary_driver: "Frontal Convective Squall"
      }
    ]
  }
};
