import { ShoppingBag, Percent, DollarSign } from 'lucide-react';

const CartSummary = ({ subtotal, onCheckout }) => {
  const shipping = 0; // Envío gratis por ahora
  const discount = 0; // Sin descuento por ahora
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-2 text-primary-600" />
        Resumen de Compra
      </h2>

      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Envío */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Envío:</span>
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">
            {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Descuento */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="flex items-center">
              <Percent className="w-4 h-4 mr-1" />
              Descuento:
            </span>
            <span className="text-lg font-semibold">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-1" />
              Total:
            </span>
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full btn-primary text-lg"
      >
        Finalizar Compra
      </button>

      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300 text-center">
          ✓ Compra segura y protegida
        </p>
      </div>
    </div>
  );
};

export default CartSummary;