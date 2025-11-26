import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Modal from '../components/common/Modal';
import { ShoppingCart, ArrowLeft, AlertCircle } from 'lucide-react';
import { crearVenta } from '../services/api';

const Cart = () => {
  const { cart, getTotal, customerName, clearCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const total = getTotal();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      // Preparar datos de la venta
      const ventaData = {
        nombreCliente: customerName,
        productos: cart.map(item => ({
          tipo: item.tipo,
          id: item.id,
          cantidad: item.cantidad
        }))
      };

      // Crear la venta
      const ventaCreada = await crearVenta(ventaData);

      // Redirigir al ticket
      navigate('/ticket', { state: { venta: ventaCreada } });
      
      // Limpiar carrito
      clearCart();
    } catch (err) {
      setError(err.message || 'Error al procesar la compra. Por favor, intenta nuevamente.');
      console.error('Error al crear venta:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center animate-fadeIn">
          <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            ¡Agrega algunos productos para comenzar!
          </p>
          <button
            onClick={() => navigate('/productos')}
            className="btn-primary flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Productos</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShoppingCart className="w-10 h-10 mr-3 text-primary-600" />
          Mi Carrito
        </h1>
        <button
          onClick={() => navigate('/productos')}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Seguir Comprando</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={`${item.tipo}-${item.id}`} item={item} />
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <CartSummary subtotal={total} onCheckout={handleCheckout} />
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !loading && setShowConfirmModal(false)}
        title="Confirmar Compra"
        size="md"
      >
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-200">Error</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ¿Confirmar compra?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Estás a punto de finalizar tu compra por un total de:
            </p>
            <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Resumen de productos:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {cart.map((item) => (
                <li key={`${item.tipo}-${item.id}`}>
                  • {item.tipo === 'libro' ? item.titulo : item.nombre} (x{item.cantidad})
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              disabled={loading}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmPurchase}
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;