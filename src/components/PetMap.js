import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Battery, Wifi, WifiOff, ArrowLeft, RefreshCw, ZoomIn, ZoomOut, Maximize2, LogOut } from 'lucide-react';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PetMap = ({ user, onLogout }) => {
  const [petData, setPetData] = useState({
    name: user?.petName || 'Max',
    type: user?.petType || 'dog',
    location: [-23.5505, -46.6333],
    status: 'online',
    battery: 85,
    lastUpdate: new Date()
  });
  const [map, setMap] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulação de atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPetData(prev => ({
        ...prev,
        location: [
          prev.location[0] + (Math.random() - 0.5) * 0.001,
          prev.location[1] + (Math.random() - 0.5) * 0.001
        ],
        battery: Math.max(10, prev.battery - Math.random() * 0.5),
        lastUpdate: new Date(),
        status: Math.random() > 0.1 ? 'online' : 'offline'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const createPetIcon = () => {
    const iconHtml = `
      <div style="
        background: linear-gradient(135deg, #3B82F6, #8B5CF6);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid white;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        position: relative;
      ">
        <span style="font-size: 24px;">${petData.type === 'dog' ? '🐕' : '🐱'}</span>
        ${petData.status === 'online' ? 
          '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #10B981; border-radius: 50%; border: 2px solid white;"></div>' : 
          '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #EF4444; border-radius: 50%; border: 2px solid white;"></div>'
        }
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'pet-marker',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25]
    });
  };

  const handleRefresh = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setPetData(prev => ({
        ...prev,
        location: [
          prev.location[0] + (Math.random() - 0.5) * 0.002,
          prev.location[1] + (Math.random() - 0.5) * 0.002
        ],
        lastUpdate: new Date()
      }));
      setIsUpdating(false);
    }, 1000);
  };

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  const handleMaximize = () => {
    if (map) map.setView(petData.location, 15);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{petData.name}</h1>
              <p className="text-xs text-gray-500">Coleira: {user?.collarNumber}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isUpdating}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-gray-700 ${isUpdating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={petData.location}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={setMap}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={petData.location}
            icon={createPetIcon()}
          >
            <Popup>
              <div className="text-center p-2 min-w-[150px]">
                <div className="text-2xl mb-1">{petData.type === 'dog' ? '🐕' : '🐱'}</div>
                <p className="font-semibold text-gray-800">{petData.name}</p>
                <p className="text-xs text-gray-600">
                  {petData.status === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleMaximize}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="grid grid-cols-3 gap-4 mb-3">
          {/* Status */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {petData.status === 'online' ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-xs font-medium ${
                petData.status === 'online' ? 'text-green-500' : 'text-red-500'
              }`}>
                {petData.status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Battery */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Battery className={`w-4 h-4 ${getBatteryColor(petData.battery)}`} />
              <span className={`text-xs font-medium ${getBatteryColor(petData.battery)}`}>
                {Math.round(petData.battery)}%
              </span>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs text-gray-500">
                Atualizado: {formatTime(petData.lastUpdate)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <span>📍</span>
            <span>Rota</span>
          </button>
          <button className="bg-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
            <span>🔔</span>
            <span>Alertas</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetMap;
