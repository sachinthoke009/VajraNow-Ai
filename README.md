# ⚡ VAJRANOW AI — Atmospheric Intelligence Operations Center
> **PS 26072 Prototype — Smart India Hackathon 2026**
> *Multi-Source AI Thunderstorm & Lightning Nowcasting + Disaster Decision Support*

---

## 🎯 Core Promise
> **“From fragmented atmospheric observations to actionable 0–60 minute disaster intelligence.”**

VajraNow AI transforms multi-sensor operational meteorological observations (Doppler Weather Radar, INSAT-3D/3DR Satellite CTT, Earth Networks Lightning Density, and ECMWF/NCUM NWP parameters) into physics-informed 0–60 minute severe weather nowcasts and localized critical infrastructure disaster intelligence.

---

## 🚀 Key Features & Demo Experience

1. **Mission-Control Operations Center Design**:
   - Dark ops background (`#070a13`), cyan/blue atmospheric glows, amber warnings, and severe red alert banners.
   - High information density with crisp visual hierarchy and glassmorphism styling.

2. **Multi-Source Data Fusion Engine (`Left Panel`)**:
   - Ingests **Radar** (dBZ, VIL), **Satellite** (Cloud-top cooling rates), **Lightning** (Flash jumps & density), and **NWP** (CAPE, Shear).
   - **Simulate Radar Outage**: Demonstrates sensor outage resilience by dynamically shifting fusion weights (Satellite 55%, Lightning 30%, NWP 15%), dropping confidence to 72%, entering **DEGRADED MODE**, and engaging Operator Review alert gating.

3. **Interactive Central Atmospheric & Disaster Twin Map (`Center Hero`)**:
   - Interactive dark ops basemap with animated radar reflectivity heatmaps (concentric dBZ contours 15 to 65+ dBZ).
   - Dynamic lightning strike markers & storm cell track vector arrows (`CELL-042: SEVERE, 58 dBZ, ↑ +28% growth`).
   - Toggles for `OBSERVED` vs `AI FUTURE RADAR` (prominently badges **AI-GENERATED FORECAST**).
   - Toggles for `WEATHER VIEW` vs `DISASTER TWIN (IMPACT VIEW)` highlighting schools, hospitals, power substations, highways, railways, and flood zones.

4. **T+0 → T+60 Interactive Timeline Scrubber**:
   - Scrub slider or click step buttons (`NOW`, `+5m`, `+10m`, `+15m`, `+20m`, `+30m`, `+45m`, `+60m`).
   - Storm cell visibly moves/intensifies, and infrastructure arrival ETAs update dynamically in real time (e.g. *Hospital X — HIGH RISK — ETA 18 min*).

5. **AI Intelligence Stack (`Right Panel`)**:
   - **THUNDERDNA™**: Life cycle stage tracking, growth rate (+31%/hr), peak ETA (T+22m), and historical storm analog matches.
   - **AI CONFIDENCE GUARDIAN™**: Animated SVG circular progress ring (91% High Confidence) with breakdown for Data Quality (96%), Model Agreement (92%), Calibration (89%), Novelty (LOW), and collapsible **WHY THIS CONFIDENCE SCORE?** audit log.
   - **MULTI-AGENT ATMOSPHERIC SWARM**: 7 specialist agents (Radar, Satellite, Lightning, Environment, Tracking, Impact, Sentinel) with 93% consensus.
   - **DISASTER TWIN™**: Live infrastructure risk feed. Clicking any item opens a detailed **Asset Risk Card**.

6. **Alert Engine & Configurable Threshold Logic**:
   - `⚠ SEVERE THUNDERSTORM RISK` alert popup with lead time, probability, affected area, critical assets count, recommended action protocol, and **WHY THIS ALERT?** audit trail.
   - **Threshold Configurator Modal**: Configure `hazard_prob` (e.g. 80%) and `confidence` (e.g. 75%) thresholds live.

7. **Continuous Verification & Model Comparison**:
   - Lead time performance curves (T+15 to T+60) comparing **VajraNow Multi-Source AI** vs **Persistence**, **Optical Flow**, and **Radar-Only** baselines across CSI, POD, FAR, and Brier Score metrics.

8. **⚡ 80-Second Automated Judge Demo Mode**:
   - One-click judge walkthrough executing the complete story arc from monitoring to lightning surge, radar growth, ThunderDNA analysis, AI future projection, Disaster Twin impact, confidence check, severe warning alert climax, and final summary screen.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Leaflet (Dark CartoDB Matter tiles), Recharts.
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, PyTorch-compatible model interface wrapper.
- **Architecture**:
  ```
  c:/vajranow ai/
  ├── backend/               # FastAPI Python Server (PyTorch engine interface)
  │   ├── app/
  │   │   ├── engines/       # Nowcast, Tracker, Confidence, Impact, Alert, Verification
  │   │   ├── providers/     # Radar, Satellite, Lightning, NWP Providers
  │   │   ├── data/          # Synthetic Storm Datasets (CASE-001, CASE-002, CASE-003)
  │   │   └── main.py        # REST API Endpoints
  │   └── run.py             # Uvicorn launcher
  ├── frontend/              # React + Vite Mission Control Dashboard
  │   ├── src/
  │   │   ├── components/    # TopBar, CentralMap, FusionPanel, Swarm, DisasterTwin, etc.
  │   │   ├── data/          # Mock storm datasets & offline physics simulation fallback
  │   │   └── App.jsx
  │   └── package.json
  └── README.md
  ```

---

## 💻 How to Run the Prototype

### 🚀 Option 1: Single Command (Backend + Frontend Together)
In the main project folder (`c:\vajranow ai`), simply run:
```bash
npm start
```
*or*
```bash
npm run dev
```
This automatically launches **both** the Python FastAPI Backend (Port 8000) and the React Vite Frontend (Port 3000) concurrently!

---

### Option 2: Run Separately (If needed)

#### 1. Run Frontend (React + Vite)
```bash
cd frontend
npx vite
```
Open `http://localhost:3000`.

#### 2. Run Backend (Python FastAPI)
```bash
cd backend
python run.py
```
API Docs available at `http://localhost:8000/docs`.


---

## 🔬 Critical Scientific Honesty & Transparency Note

> [!NOTE]
> All metrics, historical case replays, and synthetic radar reflectivity projections in this prototype are clearly labeled as **HISTORICAL REPLAY / DEMO DATA** and **DEMO / SIMULATED METRICS**. The architecture is explicitly designed for seamless integration with official IMD operational Doppler Weather Radar and INSAT-3D data feeds upon deployment authorization.
