import { ShoppingCart, Plus, Minus, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product, tipo }) => {
  const { addToCart, cart, incrementQuantity, decrementQuantity } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  const cartItem = cart.find(item => item.id === product.id && item.tipo === tipo);
  const quantityInCart = cartItem ? cartItem.cantidad : 0;

  const getNombre = () => {
    return tipo === 'libro' ? product.titulo : product.nombre;
  };

  const getDetalles = () => {
    if (tipo === 'libro') {
      return (
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Autor:</span> {product.autor}</p>
          <p><span className="font-semibold">Género:</span> {product.genero}</p>
          <p><span className="font-semibold">Páginas:</span> {product.numeroPaginas}</p>
          {product.editorial && <p><span className="font-semibold">Editorial:</span> {product.editorial}</p>}
          {product.anioPublicacion && <p><span className="font-semibold">Año:</span> {product.anioPublicacion}</p>}
        </div>
      );
    } else {
      return (
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Categoría:</span> {product.categoria}</p>
          <p><span className="font-semibold">Complejidad:</span> {product.complejidad}</p>
          <p><span className="font-semibold">Jugadores:</span> {product.minJugadores}-{product.maxJugadores}</p>
          <p><span className="font-semibold">Duración:</span> {product.duracionMinutos} min</p>
          <p><span className="font-semibold">Edad mínima:</span> {product.edadMinima}+</p>
          {product.editorial && <p><span className="font-semibold">Editorial:</span> {product.editorial}</p>}
        </div>
      );
    }
  };

  return (
    <div className="product-card group">
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {product.imagen ? (
          <img
            src={`http://localhost:3000${product.imagen}`}
            alt={getNombre()}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">
              {tipo === 'libro' ? '📚' : '🎲'}
            </span>
          </div>
        )}
        
        {/* Badge de stock */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ¡Últimos {product.stock}!
          </div>
        )}

        {/* Botón de detalles */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          title="Ver detalles"
        >
          <Info className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {getNombre()}
        </h3>

        {showDetails && (
          <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fadeIn">
            {getDetalles()}
          </div>
        )}

        {product.descripcion && !showDetails && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.descripcion}
          </p>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            ${product.precio}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stock: {product.stock}
          </span>
        </div>

        {/* Botones de acción */}
        {quantityInCart > 0 ? (
          <div className="flex items-center justify-between bg-primary-50 dark:bg-primary-900/30 rounded-lg p-2">
            <button
              onClick={() => decrementQuantity(product.id, tipo)}
              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <Minus className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </button>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400 px-4">
              {quantityInCart}
            </span>
            <button
              onClick={() => incrementQuantity(product.id, tipo)}
              disabled={quantityInCart >= product.stock}
              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, tipo)}
            disabled={product.stock === 0}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;