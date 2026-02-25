import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DirectMap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const pets = [
  {
    id: 1,
    type: 'cat',
    mood: 'happy',
    name: 'Mia',
    description: 'Mia é uma gatinha muito feliz que adora brincar com bolinhas de lã. Ela sempre está pronta para uma festa de ronronar!',
    position: [-23.5505, -46.6333],
    message: 'Este gatinho está super feliz! 😊'
  },
  {
    id: 2,
    type: 'cat',
    mood: 'sad',
    name: 'Frajola',
    description: 'Frajola está um pouco triste hoje. Talvez ele precise de mais carinho e alguns petiscos deliciosos.',
    position: [-23.5605, -46.6433],
    message: 'Este gatinho está triste... 😢'
  },
  {
    id: 3,
    type: 'cat',
    mood: 'angry',
    name: 'Furioso',
    description: 'Furioso está com raiva porque alguém mexeu em seu lugar favorito. Melhor não incomodar agora!',
    position: [-23.5405, -46.6233],
    message: 'Este gatinho está furioso! 😠'
  },
  {
    id: 4,
    type: 'dog',
    mood: 'happy',
    name: 'Rex',
    description: 'Rex é um cãozinho alegre que ama passear no parque e buscar bolinhas. Saia para caminhar com ele!',
    position: [-23.5305, -46.6533],
    message: 'Este cachorrinho está super feliz! 🐕'
  },
  {
    id: 5,
    type: 'dog',
    mood: 'sad',
    name: 'Mel',
    description: 'Mel está se sentindo sozinha hoje. Um abraço apertado e uma caminhada faria ela se sentir melhor.',
    position: [-23.5705, -46.6133],
    message: 'Este cachorrinho está triste... 🐕'
  },
  {
    id: 6,
    type: 'dog',
    mood: 'angry',
    name: 'Thor',
    description: 'Thor está bravo porque o porteiro tocou a campainha. Ele está em modo de proteção total!',
    position: [-23.5205, -46.6733],
    message: 'Este cachorrinho está com raiva! 🐕'
  }
];

const createCustomIcon = (type, mood) => {
  const color = mood === 'happy' ? '#10B981' : mood === 'sad' ? '#3B82F6' : '#EF4444';
  const iconHtml = type === 'cat' 
    ? `<div style="background: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
       </div>`
    : `<div style="background: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M4.5 10.5C4.5 12.98 6.52 15 9 15s4.5-2.02 4.5-4.5S11.48 6 9 6 4.5 8.02 4.5 10.5zM9 8c1.38 0 2.5 1.12 2.5 2.5S10.38 13 9 13s-2.5-1.12-2.5-2.5S7.62 8 9 8zm8.5-2c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 5c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
       </div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'pet-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const DirectMap = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [petMood, setPetMood] = useState('happy');
  const mapRef = useRef(null);

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setPetMood(pet.mood);
    
    // Auto-pan suave para evitar que o popup cubra controles
    if (mapRef.current) {
      const map = mapRef.current;
      const petPosition = L.latLng(pet.position);
      
      // Calcula offset para não cobrir controles
      const offset = window.innerWidth < 1024 ? [0, -100] : [50, -50];
      
      map.panTo(petPosition, {
        animate: true,
        duration: 0.5,
        easeLinearity: 0.5
      });
    }
  };

  const handlePopupClick = (e) => {
    // Prevenir event bubbling
    e.stopPropagation();
    e.originalEvent?.stopPropagation();
  };

  const resetMap = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([-23.5505, -46.6333], 13, {
        animate: true,
        duration: 0.5
      });
      setSelectedPet(null);
    }
  };

  const getAnimalAnimation = () => {
    const type = selectedPet?.type || 'cat';
    const mood = petMood;
    if (type === 'cat') {
      switch(mood) {
        case 'happy': return 'cat-animation';
        case 'sad': return 'cat-sad';
        case 'angry': return 'cat-angry';
        default: return 'cat-animation';
      }
    } else {
      switch(mood) {
        case 'happy': return 'dog-animation';
        case 'sad': return 'dog-sad';
        case 'angry': return 'dog-angry';
        default: return 'dog-animation';
      }
    }
  };

  const getAnimalEmoji = () => {
    const type = selectedPet?.type || 'cat';
    const mood = petMood;

    if (type === 'cat') {
      switch(mood) {
        case 'happy': return '😸';
        case 'sad': return '😿';
        case 'angry': return '😾';
        default: return '😸';
      }
    } else {
      return '🐶';
    }
  };

  return (
    <div className="direct-map-container bg-gradient-to-br from-pastel-blue to-pastel-pink">
      {/* Header compacto sem espaços mortos */}
      <header className="direct-map-header">
        <h1 className="text-gray-800 font-bold">🐾 SigaMyPet 🐾</h1>
        <p className="text-gray-600">Descubra o humor dos pets pelo mapa interativo</p>
      </header>

      {/* Container principal com flex grow para o mapa */}
      <div className="main-content">
        {/* Mapa com 50vh fixo e flex grow */}
        <div className="map-section">
          <div className="map-wrapper bg-white shadow-xl">
            <MapContainer 
              center={[-23.5505, -46.6333]} 
              zoom={13} 
              style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
              ref={mapRef}
              whenCreated={(map) => {
                mapRef.current = map;
                map.options.closePopupOnClick = false;
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {pets.map((pet) => (
                <Marker
                  key={pet.id}
                  position={pet.position}
                  icon={createCustomIcon(pet.type, pet.mood)}
                  eventHandlers={{
                    click: () => handlePetClick(pet)
                  }}
                >
                  <Popup 
                    autoPan={false}
                    closeButton={true}
                    minWidth={200}
                    maxWidth={250}
                    className="custom-popup"
                  >
                    <div 
                      className="popup-content text-center p-3 cursor-default"
                      onClick={handlePopupClick}
                      onMouseDown={handlePopupClick}
                    >
                      <div className="text-2xl mb-2">
                        {pet.type === 'cat' ? '🐱' : '🐶'}
                      </div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">{pet.name}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{pet.message}</p>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          pet.mood === 'happy' ? 'bg-green-100 text-green-800' :
                          pet.mood === 'sad' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {pet.mood === 'happy' ? '😊 Feliz' :
                           pet.mood === 'sad' ? '😢 Triste' :
                           '😠 Com raiva'}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Card do Gato Interativo unificado com legenda */}
        <div className="interactive-pet-card">
          <div className="interactive-pet-header">
            <h3>
              {selectedPet?.type === 'dog' ? 'Cachorro Interativo' : 'Gato Interativo'}
            </h3>
          </div>
          <div className="pet-emoji-container">
            <div className={`pet-emoji ${getAnimalAnimation()}`}>
              {getAnimalEmoji()}
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs">
            {selectedPet?.type === 'dog'
              ? 'O cachorro reage ao humor do pet selecionado!'
              : 'O gato reage ao humor do pet selecionado!'}
          </p>
          
          {/* Legenda integrada na base do card */}
          <div className="integrated-legend">
            <div className="legend-item-compact">
              <div className="legend-color-dot bg-green-500"></div>
              <span>Feliz 😊</span>
            </div>
            <div className="legend-item-compact">
              <div className="legend-color-dot bg-blue-500"></div>
              <span>Triste 😢</span>
            </div>
            <div className="legend-item-compact">
              <div className="legend-color-dot bg-red-500"></div>
              <span>Raiva 😠</span>
            </div>
          </div>
        </div>

        {/* Área de informações do pet com scroll controlado */}
        {selectedPet && (
          <div className="pet-info-section">
            <div className="pet-info-header">
              <span className="text-xl">
                {selectedPet.type === 'cat' ? '🐱' : '🐶'}
              </span>
              <h2>{selectedPet.name}</h2>
            </div>
            <div className="pet-info-content">
              <div>
                <h3 className="font-semibold text-gray-700 text-sm mb-1">Informações:</h3>
                <p className="pet-info-description">{selectedPet.description}</p>
              </div>
              <div className="pet-mood-display">
                <span className="mood-emoji">
                  {selectedPet.mood === 'happy' ? '😊' : 
                   selectedPet.mood === 'sad' ? '😢' : '😠'}
                </span>
                <span className="mood-text capitalize">
                  {selectedPet.mood === 'happy' ? 'Feliz' : 
                   selectedPet.mood === 'sad' ? 'Triste' : 'Com raiva'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botões flutuantes com z-index alto */}
      <div className="floating-controls">
        <button
          onClick={resetMap}
          className="floating-control-btn"
          title="Redefinir mapa"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default DirectMap;
