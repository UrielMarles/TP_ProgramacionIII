const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VentaDetalle = sequelize.define('VentaDetalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ventaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipoProducto: {
    type: DataTypes.ENUM('libro', 'juego'),
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreProducto: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'venta_detalles',
  timestamps: false
});

module.exports = VentaDetalle;