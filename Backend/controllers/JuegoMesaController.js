const JuegoMesa = require('../modelos/JuegoMesa');

const listarJuegos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;
    const categoria = req.query.categoria;
    const complejidad = req.query.complejidad;

    const where = {};
    if (activo !== undefined) {
      where.activo = activo;
    }
    if (categoria) {
      where.categoria = categoria;
    }
    if (complejidad) {
      where.complejidad = complejidad;
    }

    const { count, rows } = await JuegoMesa.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'DESC']]
    });

    // Agregar tipo a cada juego
    const juegosConTipo = rows.map(juego => ({
      ...juego.toJSON(),
      tipo: 'juego'
    }));

    res.json({
      juegos: juegosConTipo,
      totalJuegos: count,
      totalPaginas: Math.ceil(count / limit),
      paginaActual: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerJuego = async (req, res) => {
  try {
    const juego = await JuegoMesa.findByPk(req.params.id);
    if (!juego) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    
    res.json({
      ...juego.toJSON(),
      tipo: 'juego'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearJuego = async (req, res) => {
  try {
    const { 
      nombre, 
      descripcion, 
      categoria, 
      complejidad, 
      duracionMinutos,
      minJugadores,
      maxJugadores,
      edadMinima,
      editorial, 
      anioPublicacion,
      precio,
      stock
    } = req.body;
    
    let imagen = null;

    if (req.files && req.files.imagen) {
      const file = req.files.imagen;
      const fileName = Date.now() + '-' + file.name;
      const uploadPath = __dirname + '/../public/images/' + fileName;
      
      await file.mv(uploadPath);
      imagen = '/images/' + fileName;
    }

    const juego = await JuegoMesa.create({
      nombre,
      descripcion,
      categoria,
      complejidad,
      duracionMinutos,
      minJugadores,
      maxJugadores,
      edadMinima,
      editorial,
      anioPublicacion,
      precio,
      imagen,
      stock: stock || 0,
      activo: true
    });

    res.status(201).json({
      ...juego.toJSON(),
      tipo: 'juego'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarJuego = async (req, res) => {
  try {
    const juego = await JuegoMesa.findByPk(req.params.id);
    if (!juego) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    const { 
      nombre, 
      descripcion, 
      categoria, 
      complejidad, 
      duracionMinutos,
      minJugadores,
      maxJugadores,
      edadMinima,
      editorial, 
      anioPublicacion,
      precio,
      stock
    } = req.body;
    
    let imagen = juego.imagen;

    if (req.files && req.files.imagen) {
      const file = req.files.imagen;
      const fileName = Date.now() + '-' + file.name;
      const uploadPath = __dirname + '/../public/images/' + fileName;
      
      await file.mv(uploadPath);
      imagen = '/images/' + fileName;
    }

    await juego.update({
      nombre,
      descripcion,
      categoria,
      complejidad,
      duracionMinutos,
      minJugadores,
      maxJugadores,
      edadMinima,
      editorial,
      anioPublicacion,
      precio,
      imagen,
      stock
    });

    res.json({
      ...juego.toJSON(),
      tipo: 'juego'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cambiarEstado = async (req, res) => {
  try {
    const juego = await JuegoMesa.findByPk(req.params.id);
    if (!juego) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    await juego.update({ activo: !juego.activo });
    res.json({
      ...juego.toJSON(),
      tipo: 'juego'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const juegos = await JuegoMesa.findAll({
      attributes: ['categoria'],
      group: ['categoria']
    });
    
    const categorias = juegos.map(j => j.categoria);
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarJuegos,
  obtenerJuego,
  crearJuego,
  actualizarJuego,
  cambiarEstado,
  obtenerCategorias
};