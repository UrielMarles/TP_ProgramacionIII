import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TicketView from '../components/ticket/TicketView';

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerName, resetSession } = useCart();
  const venta = location.state?.venta;

  useEffect(() => {
    // Si no hay venta o no hay nombre, redirigir
    if (!venta || !customerName) {
      navigate('/');
    }
  }, [venta, customerName, navigate]);

  const handleFinish = () => {
    resetSession();
    navigate('/');
  };

  if (!venta) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TicketView
        venta={venta}
        customerName={customerName}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default Ticket;