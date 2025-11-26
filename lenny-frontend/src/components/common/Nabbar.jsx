import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, BookOpen, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { getCartCount } = useCart();
    const location = useLocation();
    const cartCount = getCartCount();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/productos" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Lenny
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Libros y Juegos de Mesa
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            to="/productos"
                            className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                isActive('/productos')
                                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <BookOpen className="w-5 h-5" />
                            <span className="font-medium">Productos</span>
                        </Link>

                        <Link
                            to="/carrito"
                            className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                isActive('/carrito')
                                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-medium hidden md:inline">Carrito</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <ThemeToggle />

                        <a
                            href="http://localhost:3000/admin/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                            title="Panel de Administración"
                        >
                            <LogIn className="w-5 h-5" />
                            <span className="font-medium">Admin</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-primary-600 dark:bg-primary-800 py-2">
                <p className="text-center text-white text-sm font-medium">
                    Desarrollado por: Uriel Marles
                </p>
            </div>
        </nav>
    );
};

export default Navbar;
