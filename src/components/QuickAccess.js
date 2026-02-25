import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MapPin } from 'lucide-react';

const QuickAccess = () => {
  const navigate = useNavigate();
  const [collarNumber, setCollarNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collarNumber) {
      setIsLoading(true);
      // Redireciona diretamente para o mapa original
      setTimeout(() => {
        navigate(`/direct/${collarNumber}`);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Acesso Rápido</h1>
          <p className="text-gray-600">Digite o número da coleira para acessar o mapa</p>
        </div>

        {/* Formulário de Acesso Rápido */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número da Coleira
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={collarNumber}
                onChange={(e) => setCollarNumber(e.target.value)}
                className="block w-full pl-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Digite o número da coleira"
                required
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Ex: 98419, 12345 ou qualquer número</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Acessando...
              </span>
            ) : (
              'Acessar Mapa'
            )}
          </button>
        </form>

        {/* Informações Adicionais */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Acesso direto ao mapa interativo dos pets
          </p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 block"
          >
            Voltar para o login completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
