const { Venta, VentaDetalle, Libro, JuegoMesa } = require('../models/Index');

const crearVenta = async (req, res) => {
  try {
    const { nombreCliente, productos } = req.body;
    
    let precioTotal = 0;
    const detalles = [];

    for (const item of productos) {
      let producto;
      let nombreProducto;
      
      if (item.tipo === 'libro') {
        producto = await Libro.findByPk(item.id);
        nombreProducto = producto?.titulo;
      } else if (item.tipo === 'juego') {
        producto = await JuegoMesa.findByPk(item.id);
        nombreProducto = producto?.nombre;
      } else {
        return res.status(400).json({ error: 'Tipo de producto inválido' });
      }

      if (!producto || !producto.activo) {
        return res.status(400).json({ 
          error: `${item.tipo === 'libro' ? 'Libro' : 'Juego'} ${item.id} no disponible` 
        });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ 
          error: `Stock insuficiente para ${nombreProducto}` 
        });
      }
      
      const subtotal = producto.precio * item.cantidad;
      precioTotal += parseFloat(subtotal);
      
      detalles.push({
        tipoProducto: item.tipo,
        productoId: producto.id,
        nombreProducto: nombreProducto,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
        subtotal: subtotal
      });

      await producto.update({ stock: producto.stock - item.cantidad });
    }

    const venta = await Venta.create({
      nombreCliente,
      precioTotal,
      fecha: new Date()
    });

    for (const detalle of detalles) {
      await VentaDetalle.create({
        ventaId: venta.id,
        ...detalle
      });
    }

    const ventaCompleta = await Venta.findByPk(venta.id, {
      include: [{ model: VentaDetalle, as: 'detalles' }]
    });

    res.status(201).json(ventaCompleta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [{ model: VentaDetalle, as: 'detalles' }],
      order: [['fecha', 'DESC']]
    });
    
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerVenta = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: [{ model: VentaDetalle, as: 'detalles' }]
    });
    
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearVenta,
  listarVentas,
  obtenerVenta
};