const  Libro  = require('../models/Libro');

const listarLibros = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;
    const genero = req.query.genero;

    const where = {};
    if (activo !== undefined) {
      where.activo = activo;
    }
    if (genero) {
      where.genero = genero;
    }

    const { count, rows } = await Libro.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'DESC']]
    });

    res.json({
      libros: rows,
      totalLibros: count,
      totalPaginas: Math.ceil(count / limit),
      paginaActual: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const obtenerLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearLibro = async (req, res) => {
  try {
    const { 
      titulo, 
      autor, 
      descripcion, 
      genero, 
      numeroPaginas, 
      editorial, 
      anioPublicacion,
      isbn,
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

    const libro = await Libro.create({
      titulo,
      autor,
      descripcion,
      genero,
      numeroPaginas,
      editorial,
      anioPublicacion,
      isbn,
      precio,
      imagen,
      stock: stock || 0,
      activo: true
    });

    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const { 
      titulo, 
      autor, 
      descripcion, 
      genero, 
      numeroPaginas, 
      editorial, 
      anioPublicacion,
      isbn,
      precio,
      stock
    } = req.body;
    
    let imagen = libro.imagen;

    if (req.files && req.files.imagen) {
      const file = req.files.imagen;
      const fileName = Date.now() + '-' + file.name;
      const uploadPath = __dirname + '/../public/images/' + fileName;
      
      await file.mv(uploadPath);
      imagen = '/images/' + fileName;
    }

    await libro.update({
      titulo,
      autor,
      descripcion,
      genero,
      numeroPaginas,
      editorial,
      anioPublicacion,
      isbn,
      precio,
      imagen,
      stock
    });

    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cambiarEstado = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await libro.update({ activo: !libro.activo });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerGeneros = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      attributes: ['genero'],
      group: ['genero']
    });
    
    const generos = libros.map(l => l.genero);
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarLibros,
  obtenerLibro,
  crearLibro,
  actualizarLibro,
  cambiarEstado,
  obtenerGeneros
};