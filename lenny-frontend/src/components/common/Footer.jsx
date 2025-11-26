import { BookOpen, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white"> Lenny </h3>
            </div>
            <p className="text-sm text-gray-400">
              Tu tienda favorita de libros y juegos de mesa. Descubre, compra y disfruta.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/productos" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Productos
                </a>
              </li>
              <li>
                <a href="/carrito" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Carrito
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/admin/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Panel Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400">info@lenny.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-primary-400" />
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Lenny - Todos los derechos reservados
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desarrollado por: Uriel Marles
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;