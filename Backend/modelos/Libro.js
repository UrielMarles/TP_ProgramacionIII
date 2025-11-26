const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numeroPaginas: {
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
  isbn: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
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
  tableName: 'libros',
  timestamps: true
});

module.exports = Libro;