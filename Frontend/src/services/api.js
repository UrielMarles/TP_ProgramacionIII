const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Libros
export const getLibros = async (page = 1, limit = 12) => {
  try {
    const response = await fetch(`${API_URL}/libros?page=${page}&limit=${limit}&activo=true`);
    if (!response.ok) throw new Error('Error al cargar libros');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getLibroById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/libros/${id}`);
    if (!response.ok) throw new Error('Error al cargar libro');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Juegos
export const getJuegos = async (page = 1, limit = 12) => {
  try {
    const response = await fetch(`${API_URL}/juegos?page=${page}&limit=${limit}&activo=true`);
    if (!response.ok) throw new Error('Error al cargar juegos');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getJuegoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`);
    if (!response.ok) throw new Error('Error al cargar juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Ventas
export const crearVenta = async (ventaData) => {
  try {
    const response = await fetch(`${API_URL}/ventas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventaData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la venta');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};