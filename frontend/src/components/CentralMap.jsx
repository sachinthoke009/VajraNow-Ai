import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Eye, Cpu, ShieldAlert, Layers, MapPin, Globe } from 'lucide-react';
import AlertBanner from './AlertBanner';

// Custom Map Re-center Controller
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet Markers
const createCustomIcon = (type, riskLevel) => {
  let color = '#38bdf8';
  let symbol = '📍';

  if (type === 'hospital') {
    symbol = '🏥';
    color = riskLevel === 'HIGH' || riskLevel === 'CRITICAL' ? '#ef4444' : '#f59e0b';
  } else if (type === 'substation') {
    symbol = '⚡';
    color = riskLevel === 'HIGH' || riskLevel === 'CRITICAL' ? '#ef4444' : '#f59e0b';
  } else if (type === 'school') {
    symbol = '🏫';
    color = '#f59e0b';
  } else if (type === 'railway') {
    symbol = '🚆';
    color = '#38bdf8';
  } else if (type === 'highway') {
    symbol = '🛣️';
    color = '#38bdf8';
  } else if (type === 'flood_zone') {
    symbol = '🌊';
    color = '#ef4444';
  }

  const html = `
    <div style="
      background-color: rgba(15, 23, 42, 0.92);
      border: 2px solid ${color};
      box-shadow: 0 0 14px ${color};
      color: white;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
    ">
      ${symbol}
    </div>
  `;
  return L.divIcon({ html, className: 'custom-leaflet-icon', iconSize: [34, 34], iconAnchor: [17, 17] });
};

export default function CentralMap({
  mapCase,
  offsetMin,
  isFutureMode,
  setIsFutureMode,
  mapViewMode,
  setMapViewMode,
  radarOnline,
  predictedCell,
  infrastructureAssets,
  onSelectAsset,
  activeAlert,
  onOpenAlertDetails
}) {
  // Tile type state: REAL (OpenStreetMap real roads/cities), SATELLITE (Esri Imagery), DARK
  const [mapStyle, setMapStyle] = useState('REAL');

  const center = mapCase ? mapCase.center : [12.9716, 77.5946];
  const zoom = mapCase ? mapCase.zoom : 11;

  const lat = predictedCell ? predictedCell.lat : center[0];
  const lng = predictedCell ? predictedCell.lng : center[1];
  const dbz = predictedCell ? predictedCell.dbz : 58.5;
  const radiusKm = predictedCell ? predictedCell.radius_km : 8.5;
  const cellId = predictedCell ? predictedCell.cell_id || 'CELL-042' : 'CELL-042';

  const trajectoryPoints = [
    [lat, lng],
    [lat + 0.04, lng + 0.07],
    [lat + 0.08, lng + 0.14],
    [lat + 0.12, lng + 0.21]
  ];

  // Tile Provider selection
  const tileUrls = {
    REAL: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors | VajraNow AI'
    },
    SATELLITE: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Imagery | VajraNow AI'
    },
    DARK: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri Dark Gray | VajraNow AI'
    }
  };

  const activeTile = tileUrls[mapStyle] || tileUrls.REAL;

  return (
    <div className="relative flex-1 h-full bg-[#070a13] overflow-hidden flex flex-col font-mono select-none">
      {/* Top Map Header Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* OBSERVED vs AI FUTURE RADAR */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md p-1 rounded-xl shadow-2xl">
          <button
            onClick={() => setIsFutureMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              !isFutureMode
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>OBSERVED</span>
          </button>

          <button
            onClick={() => setIsFutureMode(true)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
              isFutureMode
                ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/40 border border-cyan-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>AI FUTURE RADAR</span>
          </button>
        </div>

        {/* AI FORECAST BADGE */}
        {isFutureMode && (
          <div className="bg-gradient-to-r from-sky-950/95 via-slate-900/95 to-blue-950/95 border-2 border-cyan-400 px-4 py-1.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-black tracking-wider text-cyan-200">
              AI-GENERATED FORECAST (T+{String(offsetMin).padStart(2, '0')} MIN)
            </span>
          </div>
        )}

        {/* MAP REAL STYLE SWITCHER + WEATHER/IMPACT TOGGLE */}
        <div className="flex items-center gap-2">
          {/* Real Map Style Switcher (REQUIREMENT) */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md p-1 rounded-xl shadow-2xl text-xs">
            <button
              onClick={() => setMapStyle('REAL')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                mapStyle === 'REAL' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🗺️ REAL MAP
            </button>
            <button
              onClick={() => setMapStyle('SATELLITE')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                mapStyle === 'SATELLITE' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛰️ SATELLITE
            </button>
            <button
              onClick={() => setMapStyle('DARK')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                mapStyle === 'DARK' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🌙 DARK
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md p-1 rounded-xl shadow-2xl">
            <button
              onClick={() => setMapViewMode('WEATHER')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                mapViewMode === 'WEATHER'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>WEATHER</span>
            </button>

            <button
              onClick={() => setMapViewMode('IMPACT')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                mapViewMode === 'IMPACT'
                  ? 'bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 shadow-lg shadow-red-500/40 border border-amber-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DISASTER TWIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map */}
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="w-full h-full z-10 bg-[#070a13]"
      >
        <MapController center={center} zoom={zoom} />
        {/* Dynamic Tile Layer (REAL MAP, SATELLITE, OR DARK) */}
        <TileLayer
          key={mapStyle}
          url={activeTile.url}
          attribution={activeTile.attribution}
          maxZoom={18}
        />

        {/* RADAR REFLECTIVITY HEATMAP CONCENTRIC CIRCLES */}
        {radarOnline && (
          <>
            {/* Outer Echo Margin 25-35 dBZ */}
            <Circle
              center={[lat, lng]}
              radius={radiusKm * 1000}
              pathOptions={{
                color: '#22c55e',
                fillColor: '#22c55e',
                fillOpacity: isFutureMode ? 0.35 : 0.45,
                stroke: true,
                weight: 2
              }}
            />
            {/* Core Intense Echo 45 dBZ */}
            <Circle
              center={[lat, lng]}
              radius={radiusKm * 650}
              pathOptions={{
                color: '#eab308',
                fillColor: '#eab308',
                fillOpacity: 0.55,
                stroke: true,
                weight: 2.5
              }}
            />
            {/* Severe Cell Core 55+ dBZ */}
            <Circle
              center={[lat, lng]}
              radius={radiusKm * 350}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.75,
                stroke: true,
                weight: 3
              }}
            />
          </>
        )}

        {/* STORM CELL MOVEMENT VECTOR PATH */}
        <Polyline
          positions={trajectoryPoints}
          pathOptions={{
            color: '#00f2fe',
            weight: 3.5,
            dashArray: '6, 8',
            opacity: 0.95
          }}
        />

        {/* LIGHTNING STRIKE POINTS */}
        <Marker position={[lat + 0.01, lng - 0.015]} icon={createCustomIcon('substation', 'HIGH')} />
        <Marker position={[lat - 0.015, lng + 0.02]} icon={createCustomIcon('substation', 'HIGH')} />

        {/* STORM CELL CENTER MARKER */}
        <Marker
          position={[lat, lng]}
          icon={L.divIcon({
            html: `
              <div class="relative flex items-center justify-center">
                <div class="w-9 h-9 rounded-full bg-red-600/80 border-2 border-cyan-300 animate-ping absolute"></div>
                <div class="px-2.5 py-1 rounded-lg bg-slate-900/95 border-2 border-cyan-400 text-[11px] font-bold text-cyan-200 shadow-2xl flex items-center gap-1.5">
                  <span>${cellId}</span>
                  <span class="text-red-400">SEVERE (${dbz} dBZ)</span>
                  <span class="text-amber-300">↑ +28%</span>
                </div>
              </div>
            `,
            className: 'storm-cell-label',
            iconSize: [140, 32],
            iconAnchor: [70, 16]
          })}
        >
          <Popup>
            <div className="p-2 font-mono text-xs bg-slate-900 text-slate-100 rounded">
              <h4 className="font-bold text-cyan-300">{cellId} — SEVERE SUPERCELL</h4>
              <p>Reflectivity: <strong className="text-red-400">{dbz} dBZ</strong></p>
              <p>Top Height: 14.2 km</p>
              <p>Movement: 42 km/h ENE (65°)</p>
              <p>Lightning Rate: 84 fl/min</p>
            </div>
          </Popup>
        </Marker>

        {/* INFRASTRUCTURE RISK NODES (DISASTER TWIN) */}
        {infrastructureAssets.map((asset) => (
          <Marker
            key={asset.id}
            position={[asset.lat, asset.lng]}
            icon={createCustomIcon(asset.type, asset.risk_level)}
            eventHandlers={{
              click: () => onSelectAsset(asset)
            }}
          >
            <Popup>
              <div className="p-2 font-mono text-xs bg-slate-900 text-slate-100 rounded">
                <h4 className="font-bold text-cyan-300">{asset.name}</h4>
                <p>Type: <strong className="capitalize">{asset.type}</strong></p>
                <p>Risk: <strong className="text-red-400">{asset.risk_level}</strong></p>
                <p>ETA: <strong className="text-amber-300">{asset.eta_min} min</strong></p>
                <button
                  onClick={() => onSelectAsset(asset)}
                  className="mt-2 w-full py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded"
                >
                  OPEN ASSET RISK CARD
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Radar Reflectivity Scale Legend */}
      <div className="absolute bottom-16 left-4 z-[1000] bg-slate-900/95 border border-cyan-500/30 p-2.5 rounded-xl backdrop-blur-md text-[10px] text-slate-300 pointer-events-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-cyan-300">RADAR REFLECTIVITY (dBZ)</span>
          <span className="text-slate-400">{radarOnline ? 'ONLINE' : 'DEGRADED'}</span>
        </div>
        <div className="flex items-center gap-1 h-3 rounded overflow-hidden">
          <span className="flex-1 h-full bg-cyan-600" title="15-25 dBZ"></span>
          <span className="flex-1 h-full bg-emerald-500" title="25-35 dBZ"></span>
          <span className="flex-1 h-full bg-yellow-400" title="35-45 dBZ"></span>
          <span className="flex-1 h-full bg-orange-500" title="45-55 dBZ"></span>
          <span className="flex-1 h-full bg-red-600" title="55-65 dBZ"></span>
          <span className="flex-1 h-full bg-purple-600" title="65+ dBZ"></span>
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 mt-0.5 font-mono">
          <span>15</span>
          <span>30</span>
          <span>45</span>
          <span>60+</span>
        </div>
      </div>

      {/* Persistent Geo-Fenced Alert Banner */}
      <AlertBanner
        alert={activeAlert}
        radarOnline={radarOnline}
        onOpenDetails={onOpenAlertDetails}
      />
    </div>
  );
}
