const validarLibro = (req, res, next) => {
  const { titulo, autor, genero, numeroPaginas, precio } = req.body;
  
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es requerido' });
  }
  
  if (!autor || autor.trim() === '') {
    return res.status(400).json({ error: 'El autor es requerido' });
  }
  
  if (!genero || genero.trim() === '') {
    return res.status(400).json({ error: 'El género es requerido' });
  }
  
  if (!numeroPaginas || isNaN(numeroPaginas) || numeroPaginas <= 0) {
    return res.status(400).json({ error: 'El número de páginas debe ser un número positivo' });
  }
  
  if (!precio || isNaN(precio) || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo' });
  }
  
  next();
};

const validarJuego = (req, res, next) => {
  const { nombre, categoria, complejidad, duracionMinutos, minJugadores, maxJugadores, edadMinima, precio } = req.body;
  
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  
  if (!categoria || categoria.trim() === '') {
    return res.status(400).json({ error: 'La categoría es requerida' });
  }
  
  if (!complejidad || !['Baja', 'Media', 'Alta'].includes(complejidad)) {
    return res.status(400).json({ error: 'La complejidad debe ser Baja, Media o Alta' });
  }
  
  if (!duracionMinutos || isNaN(duracionMinutos) || duracionMinutos <= 0) {
    return res.status(400).json({ error: 'La duración debe ser un número positivo' });
  }
  
  if (!minJugadores || isNaN(minJugadores) || minJugadores <= 0) {
    return res.status(400).json({ error: 'El mínimo de jugadores debe ser un número positivo' });
  }
  
  if (!maxJugadores || isNaN(maxJugadores) || maxJugadores < minJugadores) {
    return res.status(400).json({ error: 'El máximo de jugadores debe ser mayor o igual al mínimo' });
  }
  
  if (!edadMinima || isNaN(edadMinima) || edadMinima <= 0) {
    return res.status(400).json({ error: 'La edad mínima debe ser un número positivo' });
  }
  
  if (!precio || isNaN(precio) || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo' });
  }
  
  next();
};

const validarVenta = (req, res, next) => {
  const { nombreCliente, productos } = req.body;
  
  if (!nombreCliente || nombreCliente.trim() === '') {
    return res.status(400).json({ error: 'El nombre del cliente es requerido' });
  }
  
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe incluir al menos un producto' });
  }
  
  for (const producto of productos) {
    if (!producto.tipo || !['libro', 'juego'].includes(producto.tipo)) {
      return res.status(400).json({ 
        error: `Tipo de producto inválido: "${producto.tipo}". Debe ser "libro" o "juego"` 
      });
    }
    
    if (!producto.id || isNaN(producto.id)) {
      return res.status(400).json({ error: 'ID de producto inválido' });
    }
    
    if (!producto.cantidad || isNaN(producto.cantidad) || producto.cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }
  }
  next();
};

const validarLogin = (req, res, next) => {
  const { correo, contraseña } = req.body;
  
  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }
  
  next();
};

module.exports = {
  validarLibro,
  validarJuego,
  validarVenta,
  validarLogin
};