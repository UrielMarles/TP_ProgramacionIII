const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Libro = require('./Libro');
const Venta = require('./Venta');
const VentaDetalle = require('./VentaDetalle');
const JuegoMesa = require('./JuegoMesa');

Venta.hasMany(VentaDetalle, { 
  foreignKey: 'ventaId',
  as: 'detalles'
});

VentaDetalle.belongsTo(Venta, { 
  foreignKey: 'ventaId'
});

module.exports = {
  sequelize,
  Usuario,
  Libro,
  JuegoMesa,
  Venta,
  VentaDetalle
};