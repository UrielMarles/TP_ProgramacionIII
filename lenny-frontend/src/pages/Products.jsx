import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CategoryTabs from '../components/products/CategoryTabs';
import ProductList from '../components/products/ProductList';
import { getLibros, getJuegos } from '../services/api';
import { CATEGORIES } from '../utils/constants';
import { AlertCircle } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.LIBROS);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customerName } = useCart();
  const navigate = useNavigate();

  // Redirigir si no hay nombre
  useEffect(() => {
    if (!customerName) {
      navigate('/');
    }
  }, [customerName, navigate]);

  // Cargar productos
  useEffect(() => {
    loadProducts();
  }, [activeCategory, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (activeCategory === CATEGORIES.LIBROS) {
        response = await getLibros(currentPage, 12);
        setProducts(response.libros);
        setTotalPages(response.totalPaginas);
      } else {
        response = await getJuegos(currentPage, 12);
        setProducts(response.juegos);
        setTotalPages(response.totalPaginas);
      }
    } catch (err) {
      setError('Error al cargar los productos. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Saludo al cliente */}
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Hola, {customerName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explora nuestra colección de libros y juegos de mesa
        </p>
      </div>

      {/* Tabs de categorías */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 flex items-center space-x-3 animate-fadeIn">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-800 dark:text-red-200">Error</p>
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          </div>
          <button
            onClick={loadProducts}
            className="ml-auto btn-secondary text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de productos */}
      <ProductList
        products={products}
        tipo={activeCategory}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default Products;