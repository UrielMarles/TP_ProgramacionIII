import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const Welcome = () => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCustomerName } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      setError('Por favor, ingresa tu nombre');
      return;
    }

    if (nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    setCustomerName(nombre.trim());
    navigate('/productos');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full animate-fadeIn">
        {/* Logo animado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <img src="/logo.svg" alt="Lenny Logo" className="w-14 h-14" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Lenny
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Libros y Juegos de Mesa
          </p>
        </div>

        {/* Card de bienvenida */}
        <div className="card">
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Para comenzar, ingresa tu nombre
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Tu nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setError('');
                }}
                placeholder="Ej: Juan Pérez"
                className="input-field"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2 text-lg"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📚</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Libros
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🎲</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Juegos de Mesa
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Envío Rápido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;