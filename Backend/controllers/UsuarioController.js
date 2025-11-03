const Usuario = require('../models/Usuario');

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { correo, activo: true } });
    
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const contraseñaValida = await usuario.verificarcontraseña(contraseña);
    
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ 
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const usuarioExiste = await Usuario.findOne({ where: { correo } });
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const usuario = await Usuario.create({
      nombre,
      correo,
      contraseña,
      activo: true
    });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  crearUsuario
};