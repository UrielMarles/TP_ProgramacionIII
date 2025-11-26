const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'usuarios_admin',
  timestamps: true
});

Usuario.beforeCreate(async (usuario) => {
  usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
});

Usuario.prototype.verificarcontraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = Usuario;