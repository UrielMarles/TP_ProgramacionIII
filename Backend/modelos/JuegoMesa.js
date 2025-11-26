const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JuegoMesa = sequelize.define('JuegoMesa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  complejidad: {
    type: DataTypes.ENUM('Baja', 'Media', 'Alta'),
    allowNull: false,
    defaultValue: 'Media'
  },
  duracionMinutos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  minJugadores: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxJugadores: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  edadMinima: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  editorial: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  anioPublicacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'juegos_mesa',
  timestamps: true
});

module.exports = JuegoMesa;