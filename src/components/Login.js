import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Tag, Eye, EyeOff, MapPin } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [collarNumber, setCollarNumber] = useState('');
  const [directAccessMode, setDirectAccessMode] = useState(false);
  const [directCollarNumber, setDirectCollarNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulação de autenticação com banco de dados
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collarNumber }),
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData);
      } else {
        setError('Número da coleira não encontrado');
      }
    } catch (error) {
      // Simulação local para demonstração
      if (collarNumber === '98419' || collarNumber === '12345') {
        const userData = {
          id: collarNumber === '98419' ? 1 : 2,
          email: collarNumber === '98419' ? 'usuario@sigamypet.com' : 'teste@sigamypet.com',
          collarNumber: collarNumber,
          petName: collarNumber === '98419' ? 'Max' : 'Luna',
          petType: collarNumber === '98419' ? 'dog' : 'cat',
          token: 'mock-jwt-token-' + Date.now()
        };
        onLogin(userData);
      } else {
        setError('Número da coleira não encontrado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectAccess = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validação da coleira para acesso direto
      const response = await fetch(`/api/pets/${directCollarNumber}`);
      
      if (response.ok) {
        const petData = await response.json();
        const userData = {
          ...petData,
          token: 'mock-jwt-token-' + Date.now(),
          directAccess: true
        };
        onLogin(userData);
      } else {
        setError('Número da coleira não encontrado');
      }
    } catch (error) {
      // Simulação local para demonstração - redireciona direto para o mapa
      if (directCollarNumber === '98419' || directCollarNumber === '12345' || directCollarNumber) {
        // Redireciona diretamente para o mapa original
        navigate(`/direct/${directCollarNumber}`);
      } else {
        setError('Número da coleira não encontrado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 relative">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SigaMyPet</h1>
          <p className="text-gray-600">Rastreamento inteligente para seu pet</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!directAccessMode ? (
          <>
            {/* Formulário de Login */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo da Numeração da Coleira */}
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
                    placeholder="Digite a numeração (ex: 98419)"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Use 98419 ou 12345 para teste</p>
              </div>

              {/* Botão de Entrar */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Acesso Direto */}
            <button
              onClick={() => setDirectAccessMode(true)}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Acessar pelo número da coleira
            </button>
          </>
        ) : (
          <>
            {/* Formulário de Acesso Direto */}
            <div className="mb-4">
              <button
                onClick={() => setDirectAccessMode(false)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                ← Voltar para o login completo
              </button>
            </div>

            <form onSubmit={handleDirectAccess} className="space-y-6">
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
                    value={directCollarNumber}
                    onChange={(e) => setDirectCollarNumber(e.target.value)}
                    className="block w-full pl-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite apenas o número da coleira"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Digite o número para acessar diretamente o mapa</p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                Acessar Mapa
              </button>
            </form>
          </>
        )}

        {/* Informações Adicionais */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Ao acessar, você concorda com nossos termos de uso e política de privacidade
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
