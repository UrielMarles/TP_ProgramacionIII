const { Libro, JuegoMesa, Venta, VentaDetalle, Usuario } = require('../modelos/Index');

const mostrarLogin = (req, res) => {
  res.render('admin/login', { 
    titulo: 'Login - Lenny Admin',
    error: null 
  });
};

const procesarLogin = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { correo, activo: true } });
    
    if (!usuario) {
      return res.render('admin/login', { 
        titulo: 'Login - Lenny Admin',
        error: 'Credenciales inválidas' 
      });
    }

    const contraseñaValida = await usuario.verificarcontraseña(contraseña);
    
    if (!contraseñaValida) {
      return res.render('admin/login', { 
        titulo: 'Login - Lenny Admin',
        error: 'Credenciales inválidas' 
      });
    }

    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('admin/login', { 
      titulo: 'Login - Lenny Admin',
      error: 'Error en el servidor' 
    });
  }
};

const mostrarDashboard = async (req, res) => {
  try {
    const libros = await Libro.findAll({ order: [['id', 'DESC']] });
    const juegos = await JuegoMesa.findAll({ order: [['id', 'DESC']] });

    res.render('admin/dashboard', {
      titulo: 'Dashboard - Lenny Admin',
      libros,
      juegos
    });
  } catch (error) {
    res.status(500).send('Error al cargar el dashboard');
  }
};

const mostrarFormularioNuevoLibro = (req, res) => {
  res.render('admin/libro-form', {
    titulo: 'Nuevo Libro - Lenny Admin',
    libro: null,
    accion: 'crear'
  });
};

const mostrarFormularioEditarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).send('Libro no encontrado');
    }

    res.render('admin/libro-form', {
      titulo: 'Editar Libro - Lenny Admin',
      libro,
      accion: 'editar'
    });
  } catch (error) {
    res.status(500).send('Error al cargar el libro');
  }
};

const mostrarFormularioNuevoJuego = (req, res) => {
  res.render('admin/juego-form', {
    titulo: 'Nuevo Juego - Lenny Admin',
    juego: null,
    accion: 'crear'
  });
};

const mostrarFormularioEditarJuego = async (req, res) => {
  try {
    const juego = await JuegoMesa.findByPk(req.params.id);
    if (!juego) {
      return res.status(404).send('Juego no encontrado');
    }

    res.render('admin/juego-form', {
      titulo: 'Editar Juego - Lenny Admin',
      juego,
      accion: 'editar'
    });
  } catch (error) {
    res.status(500).send('Error al cargar el juego');
  }
};

const mostrarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [{ model: VentaDetalle, as: 'detalles' }],
      order: [['fecha', 'DESC']]
    });

    res.render('admin/ventas', {
      titulo: 'Ventas - Lenny Admin',
      ventas
    });
  } catch (error) {
    res.status(500).send('Error al cargar las ventas');
  }
};

module.exports = {
  mostrarLogin,
  procesarLogin,
  mostrarDashboard,
  mostrarFormularioNuevoLibro,
  mostrarFormularioEditarLibro,
  mostrarFormularioNuevoJuego,
  mostrarFormularioEditarJuego,
  mostrarVentas
};