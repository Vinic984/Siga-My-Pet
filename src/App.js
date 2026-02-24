import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

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

function App() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [petMood, setPetMood] = useState('happy');

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setPetMood(pet.mood);
  };

  const getAnimalAnimation = () => {
    // return CSS class according to type and mood
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
      // dogs always show the same face; moods handled by CSS animation only
      return '🐶';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue to-pastel-pink p-4">
      {/* Overlay para forçar orientação horizontal em celulares */}
      <div className="fixed inset-0 z-[9999] bg-gray-900/95 text-white flex flex-col items-center justify-center p-6 text-center md:hidden portrait:flex hidden">
        <div className="text-6xl mb-4 animate-bounce">🔄</div>
        <h2 className="text-2xl font-bold mb-2">Gire seu celular</h2>
        <p className="text-gray-200">Para melhor visualização do mapa, utilize o aparelho na horizontal.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🐾 SigaMyPet 🐾</h1>
          <p className="text-gray-600">Descubra o humor dos pets pelo mapa interativo</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <MapContainer 
                center={[-23.5505, -46.6333]} 
                zoom={13} 
                style={{ height: '500px', width: '100%', borderRadius: '16px' }}
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
                      <Popup>
                        <div className="text-center p-2">
                          <div className="text-2xl mb-1">
                            {pet.type === 'cat' ? '🐱' : '🐶'}
                          </div>
                          <p className="font-semibold text-gray-800">{pet.message}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {selectedPet?.type === 'dog' ? 'Cachorro Animado' : 'Gato Animado'}
              </h3>
              <div className="flex justify-center">
                <div className={`text-8xl ${getAnimalAnimation()}`}>
                  {getAnimalEmoji()}
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                {selectedPet?.type === 'dog'
                  ? 'O cachorro reage ao humor do pet selecionado!'
                  : 'O gato reage ao humor do pet selecionado!'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Legenda</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Feliz 😊</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Triste 😢</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Com raiva 😠</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPet && (
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPet.type === 'cat' ? '🐱' : '🐶'} {selectedPet.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Informações:</h3>
                <p className="text-gray-600">{selectedPet.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Humor atual:</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {selectedPet.mood === 'happy' ? '😊' : 
                     selectedPet.mood === 'sad' ? '😢' : '😠'}
                  </span>
                  <span className="text-gray-600 capitalize">
                    {selectedPet.mood === 'happy' ? 'Feliz' : 
                     selectedPet.mood === 'sad' ? 'Triste' : 'Com raiva'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
