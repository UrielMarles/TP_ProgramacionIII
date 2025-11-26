import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  const getNombre = () => {
    return item.tipo === 'libro' ? item.titulo : item.nombre;
  };

  const getTipoLabel = () => {
    return item.tipo === 'libro' ? '📚 Libro' : '🎲 Juego';
  };

  const subtotal = item.precio * item.cantidad;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 hover:shadow-xl transition-all duration-300 animate-fadeIn">
      {/* Imagen */}
      <div className="w-full md:w-32 h-32 flex-shrink-0">
        {item.imagen ? (
          <img
            src={`http://localhost:3000${item.imagen}`}
            alt={getNombre()}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-4xl">
              {item.tipo === 'libro' ? '📚' : '🎲'}
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1 inline-block">
                {getTipoLabel()}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {getNombre()}
              </h3>
            </div>
            <button
              onClick={() => removeFromCart(item.id, item.tipo)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-300"
              title="Eliminar del carrito"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Detalles adicionales */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {item.tipo === 'libro' ? (
              <p>{item.autor} • {item.genero}</p>
            ) : (
              <p>{item.categoria} • {item.minJugadores}-{item.maxJugadores} jugadores</p>
            )}
          </div>
        </div>

        {/* Controles de cantidad y precio */}
        <div className="flex items-center justify-between">
          {/* Cantidad */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => decrementQuantity(item.id, item.tipo)}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
            >
              <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <span className="text-lg font-bold text-gray-900 dark:text-white min-w-[2rem] text-center">
              {item.cantidad}
            </span>
            <button
              onClick={() => incrementQuantity(item.id, item.tipo)}
              disabled={item.cantidad >= item.stock}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Precios */}
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ${item.precio} c/u
            </p>
            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ${subtotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Advertencia de stock */}
        {item.cantidad >= item.stock && (
          <p className="text-xs text-red-500 mt-2">
            ⚠️ Stock máximo alcanzado ({item.stock} unidades)
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;