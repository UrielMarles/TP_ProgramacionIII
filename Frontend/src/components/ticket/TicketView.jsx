import { Download, CheckCircle, Home } from 'lucide-react';
import { generateTicketPDF } from '../../utils/pdfGenerator';

const TicketView = ({ venta, customerName, onFinish }) => {
  const handleDownloadPDF = () => {
    generateTicketPDF(venta, customerName);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      {/* Confirmación */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 animate-pulse">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Compra Exitosa!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Gracias por tu compra, {customerName}
        </p>
      </div>

      {/* Ticket */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header del ticket */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">LENNY</h1>
            <p className="text-primary-100">Libros y Juegos de Mesa</p>
          </div>
        </div>

        {/* Contenido del ticket */}
        <div className="p-6 space-y-6">
          {/* Información de la venta */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ticket #</p>
              <p className="font-bold text-gray-900 dark:text-white">{venta.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {new Date(venta.fecha).toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{customerName}</p>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Productos Comprados
            </h3>
            <div className="space-y-3">
              {venta.detalles.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">
                        {item.tipoProducto === 'libro' ? '📚' : '🎲'}
                      </span>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.nombreProducto}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.cantidad} x ${item.precioUnitario}
                    </p>
                  </div>
                  <p className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                    ${item.subtotal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t-2 border-gray-300 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                TOTAL
              </span>
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                ${venta.precioTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Footer del ticket */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            ¡Gracias por tu compra!
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Lenny - Tu tienda de libros y juegos de mesa
          </p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Descargar Ticket (PDF)</span>
        </button>
        <button
          onClick={onFinish}
          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>Nueva Compra</span>
        </button>
      </div>
    </div>
  );
};

export default TicketView;