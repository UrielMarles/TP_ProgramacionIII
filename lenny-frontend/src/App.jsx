import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Nabbar';
import Footer from './components/common/Footer';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Ticket from './pages/Ticket';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {/* Ruta de bienvenida sin navbar */}
              <Route path="/" element={<Welcome />} />

              {/* Rutas con navbar y footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/productos" element={<Products />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/ticket" element={<Ticket />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;