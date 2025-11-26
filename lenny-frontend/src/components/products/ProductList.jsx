import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

const ProductList = ({ products, tipo, currentPage, totalPages, onPageChange, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando productos...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No hay productos disponibles
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Vuelve más tarde para ver nuestros productos
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} tipo={tipo} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-lg scale-110'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      )}

      {/* Indicador de página */}
      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
        Página {currentPage} de {totalPages}
      </p>
    </div>
  );
};

export default ProductList;