require('dotenv').config();
const { sequelize, Usuario, Libro, JuegoMesa } = require('./modelos/Index');

const librosData = [
  {
    titulo: 'El Hobbit',
    autor: 'J.R.R. Tolkien',
    descripcion: 'Una aventura épica en la Tierra Media',
    genero: 'Fantasía',
    numeroPaginas: 310,
    editorial: 'Minotauro',
    anioPublicacion: 1937,
    isbn: '9788445077528',
    precio: 15000,
    stock: 25,
    activo: true
  },
  {
    titulo: 'Cien Años de Soledad',
    autor: 'Gabriel García Márquez',
    descripcion: 'La historia de la familia Buendía',
    genero: 'Realismo Mágico',
    numeroPaginas: 471,
    editorial: 'Sudamericana',
    anioPublicacion: 1967,
    isbn: '9788497592208',
    precio: 18000,
    stock: 30,
    activo: true
  },
  {
    titulo: '1984',
    autor: 'George Orwell',
    descripcion: 'Una distopía sobre el totalitarismo',
    genero: 'Ciencia Ficción',
    numeroPaginas: 328,
    editorial: 'Debolsillo',
    anioPublicacion: 1949,
    isbn: '9788499890944',
    precio: 12000,
    stock: 40,
    activo: true
  },
  {
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    descripcion: 'Un clásico sobre la amistad y el amor',
    genero: 'Infantil',
    numeroPaginas: 96,
    editorial: 'Salamandra',
    anioPublicacion: 1943,
    isbn: '9788498381498',
    precio: 8000,
    stock: 50,
    activo: true
  },
  {
    titulo: 'Harry Potter y la Piedra Filosofal',
    autor: 'J.K. Rowling',
    descripcion: 'El inicio de la saga mágica',
    genero: 'Fantasía',
    numeroPaginas: 254,
    editorial: 'Salamandra',
    anioPublicacion: 1997,
    isbn: '9788498382679',
    precio: 16000,
    stock: 35,
    activo: true
  },
  {
    titulo: 'Sapiens: De animales a dioses',
    autor: 'Yuval Noah Harari',
    descripcion: 'Una breve historia de la humanidad',
    genero: 'No Ficción',
    numeroPaginas: 496,
    editorial: 'Debate',
    anioPublicacion: 2011,
    isbn: '9788499926223',
    precio: 22000,
    stock: 20,
    activo: true
  },
  {
    titulo: 'El Código Da Vinci',
    autor: 'Dan Brown',
    descripcion: 'Un thriller lleno de misterios',
    genero: 'Thriller',
    numeroPaginas: 592,
    editorial: 'Planeta',
    anioPublicacion: 2003,
    isbn: '9788408163350',
    precio: 14000,
    stock: 28,
    activo: true
  },
  {
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes',
    descripcion: 'La obra cumbre de la literatura española',
    genero: 'Clásico',
    numeroPaginas: 1216,
    editorial: 'RAE',
    anioPublicacion: 1605,
    isbn: '9788420412146',
    precio: 25000,
    stock: 15,
    activo: true
  },
  {
    titulo: 'Atomic Habits',
    autor: 'James Clear',
    descripcion: 'Pequeños cambios, resultados extraordinarios',
    genero: 'Autoayuda',
    numeroPaginas: 320,
    editorial: 'Diana',
    anioPublicacion: 2018,
    isbn: '9786070758782',
    precio: 19000,
    stock: 22,
    activo: true
  },
  {
    titulo: 'El Alquimista',
    autor: 'Paulo Coelho',
    descripcion: 'Una fábula sobre seguir tus sueños',
    genero: 'Ficción',
    numeroPaginas: 192,
    editorial: 'Planeta',
    anioPublicacion: 1988,
    isbn: '9788408043638',
    precio: 13000,
    stock: 32,
    activo: true
  },
  {
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    descripcion: 'Una historia de amor en la Inglaterra del siglo XIX',
    genero: 'Romance',
    numeroPaginas: 424,
    editorial: 'Penguin Clásicos',
    anioPublicacion: 1813,
    isbn: '9788491050650',
    precio: 11000,
    stock: 26,
    activo: true
  },
  {
    titulo: 'El Nombre del Viento',
    autor: 'Patrick Rothfuss',
    descripcion: 'La historia de Kvothe, un héroe legendario',
    genero: 'Fantasía',
    numeroPaginas: 872,
    editorial: 'Plaza & Janés',
    anioPublicacion: 2007,
    isbn: '9788401352836',
    precio: 21000,
    stock: 18,
    activo: true
  },

  /* ---- Agregados hasta llegar a 25 ---- */

  {
    titulo: 'La Sombra del Viento',
    autor: 'Carlos Ruiz Zafón',
    descripcion: 'Un misterio literario en la Barcelona de posguerra',
    genero: 'Ficción',
    numeroPaginas: 576,
    editorial: 'Planeta',
    anioPublicacion: 2001,
    isbn: '9788408172178',
    precio: 17000,
    stock: 27,
    activo: true
  },
  {
    titulo: 'Fahrenheit 451',
    autor: 'Ray Bradbury',
    descripcion: 'Una sociedad donde los libros están prohibidos',
    genero: 'Distopía',
    numeroPaginas: 256,
    editorial: 'Debolsillo',
    anioPublicacion: 1953,
    isbn: '9788497594256',
    precio: 12000,
    stock: 33,
    activo: true
  },
  {
    titulo: 'Crónica de una Muerte Anunciada',
    autor: 'Gabriel García Márquez',
    descripcion: 'Una muerte anunciada que nadie pudo evitar',
    genero: 'Realismo Mágico',
    numeroPaginas: 144,
    editorial: 'Debolsillo',
    anioPublicacion: 1981,
    isbn: '9788497592207',
    precio: 9000,
    stock: 40,
    activo: true
  },
  {
    titulo: 'El Señor de los Anillos: La Comunidad del Anillo',
    autor: 'J.R.R. Tolkien',
    descripcion: 'El inicio de la gran aventura en la Tierra Media',
    genero: 'Fantasía',
    numeroPaginas: 576,
    editorial: 'Minotauro',
    anioPublicacion: 1954,
    isbn: '9788445077527',
    precio: 25000,
    stock: 20,
    activo: true
  },
  {
    titulo: 'Drácula',
    autor: 'Bram Stoker',
    descripcion: 'La clásica historia del famoso vampiro',
    genero: 'Terror',
    numeroPaginas: 488,
    editorial: 'Alianza',
    anioPublicacion: 1897,
    isbn: '9788491042844',
    precio: 10000,
    stock: 25,
    activo: true
  },
  {
    titulo: 'La Chica del Tren',
    autor: 'Paula Hawkins',
    descripcion: 'Un thriller psicológico lleno de giros',
    genero: 'Thriller',
    numeroPaginas: 416,
    editorial: 'Planeta',
    anioPublicacion: 2015,
    isbn: '9788408141471',
    precio: 15000,
    stock: 29,
    activo: true
  },
  {
    titulo: 'El Psicoanalista',
    autor: 'John Katzenbach',
    descripcion: 'Un juego mental que pone en riesgo una vida entera',
    genero: 'Thriller',
    numeroPaginas: 512,
    editorial: 'Ediciones B',
    anioPublicacion: 2002,
    isbn: '9788466649178',
    precio: 16000,
    stock: 18,
    activo: true
  },
  {
    titulo: 'El Arte de la Guerra',
    autor: 'Sun Tzu',
    descripcion: 'Un clásico sobre estrategia y liderazgo',
    genero: 'No Ficción',
    numeroPaginas: 112,
    editorial: 'Alianza',
    anioPublicacion: -500,
    isbn: '9788420614915',
    precio: 7000,
    stock: 35,
    activo: true
  },
  {
    titulo: 'Los Juegos del Hambre',
    autor: 'Suzanne Collins',
    descripcion: 'Una lucha por la supervivencia en un mundo distópico',
    genero: 'Ciencia Ficción',
    numeroPaginas: 400,
    editorial: 'Molino',
    anioPublicacion: 2008,
    isbn: '9788427202122',
    precio: 15000,
    stock: 40,
    activo: true
  },
  {
    titulo: 'Matar a un Ruiseñor',
    autor: 'Harper Lee',
    descripcion: 'Un clásico sobre la justicia y la igualdad',
    genero: 'Clásico',
    numeroPaginas: 384,
    editorial: 'HarperCollins',
    anioPublicacion: 1960,
    isbn: '9780060935467',
    precio: 13000,
    stock: 28,
    activo: true
  },
  {
    titulo: 'Los Pilares de la Tierra',
    autor: 'Ken Follett',
    descripcion: 'La construcción de una catedral en la Edad Media',
    genero: 'Histórico',
    numeroPaginas: 1104,
    editorial: 'Plaza & Janés',
    anioPublicacion: 1989,
    isbn: '9788401337208',
    precio: 26000,
    stock: 16,
    activo: true
  },
  {
    titulo: 'El Diario de Ana Frank',
    autor: 'Ana Frank',
    descripcion: 'El diario real de una niña durante la Segunda Guerra Mundial',
    genero: 'Biografía',
    numeroPaginas: 352,
    editorial: 'Debolsillo',
    anioPublicacion: 1947,
    isbn: '9788497593067',
    precio: 9000,
    stock: 50,
    activo: true
  }
];

const juegosData = [
  {
    nombre: 'Catan',
    descripcion: 'Coloniza la isla de Catan',
    categoria: 'Estrategia',
    complejidad: 'Media',
    duracionMinutos: 90,
    minJugadores: 3,
    maxJugadores: 4,
    edadMinima: 10,
    editorial: 'Devir',
    anioPublicacion: 1995,
    precio: 35000,
    stock: 15,
    activo: true
  },
  {
    nombre: 'Carcassonne',
    descripcion: 'Construye tu propio paisaje medieval',
    categoria: 'Familiar',
    complejidad: 'Baja',
    duracionMinutos: 45,
    minJugadores: 2,
    maxJugadores: 5,
    edadMinima: 7,
    editorial: 'Devir',
    anioPublicacion: 2000,
    precio: 28000,
    stock: 20,
    activo: true
  },
  {
    nombre: 'Pandemic',
    descripcion: 'Salva al mundo de enfermedades mortales',
    categoria: 'Cooperativo',
    complejidad: 'Media',
    duracionMinutos: 60,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 8,
    editorial: 'Z-Man Games',
    anioPublicacion: 2008,
    precio: 42000,
    stock: 12,
    activo: true
  },
  {
    nombre: 'Ticket to Ride',
    descripcion: 'Conecta ciudades con rutas de tren',
    categoria: 'Familiar',
    complejidad: 'Baja',
    duracionMinutos: 60,
    minJugadores: 2,
    maxJugadores: 5,
    edadMinima: 8,
    editorial: 'Days of Wonder',
    anioPublicacion: 2004,
    precio: 38000,
    stock: 18,
    activo: true
  },
  {
    nombre: 'Azul',
    descripcion: 'Decora el palacio real con azulejos',
    categoria: 'Abstracto',
    complejidad: 'Media',
    duracionMinutos: 45,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 8,
    editorial: 'Plan B Games',
    anioPublicacion: 2017,
    precio: 32000,
    stock: 22,
    activo: true
  },
  {
    nombre: 'Exploding Kittens',
    descripcion: 'Un juego de cartas explosivo',
    categoria: 'Party',
    complejidad: 'Baja',
    duracionMinutos: 15,
    minJugadores: 2,
    maxJugadores: 5,
    edadMinima: 7,
    editorial: 'Exploding Kittens',
    anioPublicacion: 2015,
    precio: 18000,
    stock: 30,
    activo: true
  },
  {
    nombre: '7 Wonders',
    descripcion: 'Construye tu civilización',
    categoria: 'Estrategia',
    complejidad: 'Media',
    duracionMinutos: 30,
    minJugadores: 2,
    maxJugadores: 7,
    edadMinima: 10,
    editorial: 'Repos Production',
    anioPublicacion: 2010,
    precio: 40000,
    stock: 14,
    activo: true
  },
  {
    nombre: 'Dixit',
    descripcion: 'Un juego de asociación de imágenes',
    categoria: 'Party',
    complejidad: 'Baja',
    duracionMinutos: 30,
    minJugadores: 3,
    maxJugadores: 6,
    edadMinima: 8,
    editorial: 'Libellud',
    anioPublicacion: 2008,
    precio: 29000,
    stock: 25,
    activo: true
  },
  {
    nombre: 'Codenames',
    descripcion: 'Descubre agentes secretos con pistas',
    categoria: 'Party',
    complejidad: 'Baja',
    duracionMinutos: 15,
    minJugadores: 4,
    maxJugadores: 8,
    edadMinima: 10,
    editorial: 'Czech Games Edition',
    anioPublicacion: 2015,
    precio: 24000,
    stock: 28,
    activo: true
  },
  {
    nombre: 'Wingspan',
    descripcion: 'Atrae las mejores aves a tu reserva',
    categoria: 'Estrategia',
    complejidad: 'Media',
    duracionMinutos: 70,
    minJugadores: 1,
    maxJugadores: 5,
    edadMinima: 10,
    editorial: 'Stonemaier Games',
    anioPublicacion: 2019,
    precio: 48000,
    stock: 10,
    activo: true
  },
  {
    nombre: 'Splendor',
    descripcion: 'Conviértete en un mercader del Renacimiento',
    categoria: 'Estrategia',
    complejidad: 'Media',
    duracionMinutos: 30,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 10,
    editorial: 'Space Cowboys',
    anioPublicacion: 2014,
    precio: 33000,
    stock: 16,
    activo: true
  },
  {
    nombre: 'King of Tokyo',
    descripcion: 'Sé el monstruo más poderoso',
    categoria: 'Familiar',
    complejidad: 'Baja',
    duracionMinutos: 30,
    minJugadores: 2,
    maxJugadores: 6,
    edadMinima: 8,
    editorial: 'Iello',
    anioPublicacion: 2011,
    precio: 31000,
    stock: 19,
    activo: true
  },

  /* ---- Agregados hasta llegar a 25 ---- */

  {
    nombre: 'Terraforming Mars',
    descripcion: 'Convierte Marte en un planeta habitable',
    categoria: 'Estrategia',
    complejidad: 'Alta',
    duracionMinutos: 120,
    minJugadores: 1,
    maxJugadores: 5,
    edadMinima: 12,
    editorial: 'Stronghold Games',
    anioPublicacion: 2016,
    precio: 55000,
    stock: 12,
    activo: true
  },
  {
    nombre: 'Root',
    descripcion: 'Controla facciones forestales en guerra',
    categoria: 'Estrategia',
    complejidad: 'Alta',
    duracionMinutos: 90,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 10,
    editorial: 'Leder Games',
    anioPublicacion: 2018,
    precio: 60000,
    stock: 8,
    activo: true
  },
  {
    nombre: 'The Mind',
    descripcion: 'Un juego cooperativo de sincronización mental',
    categoria: 'Party',
    complejidad: 'Baja',
    duracionMinutos: 20,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 8,
    editorial: 'Nürnberger-Spielkarten',
    anioPublicacion: 2018,
    precio: 15000,
    stock: 26,
    activo: true
  },
  {
    nombre: 'Gloomhaven',
    descripcion: 'Un mundo de fantasía con campañas y combates tácticos',
    categoria: 'Estrategia',
    complejidad: 'Alta',
    duracionMinutos: 120,
    minJugadores: 1,
    maxJugadores: 4,
    edadMinima: 14,
    editorial: 'Cephalofair Games',
    anioPublicacion: 2017,
    precio: 95000,
    stock: 6,
    activo: true
  },
  {
    nombre: 'Just One',
    descripcion: 'Da pistas para adivinar palabras',
    categoria: 'Party',
    complejidad: 'Baja',
    duracionMinutos: 20,
    minJugadores: 3,
    maxJugadores: 7,
    edadMinima: 8,
    editorial: 'Repos Production',
    anioPublicacion: 2018,
    precio: 20000,
    stock: 30,
    activo: true
  },
  {
    nombre: 'Scythe',
    descripcion: 'Conquista Europa del Este en un mundo dieselpunk',
    categoria: 'Estrategia',
    complejidad: 'Alta',
    duracionMinutos: 115,
    minJugadores: 1,
    maxJugadores: 5,
    edadMinima: 14,
    editorial: 'Stonemaier Games',
    anioPublicacion: 2016,
    precio: 72000,
    stock: 10,
    activo: true
  },
  {
    nombre: 'Camel Up',
    descripcion: 'Apuesta en una divertida carrera de camellos',
    categoria: 'Familiar',
    complejidad: 'Baja',
    duracionMinutos: 30,
    minJugadores: 2,
    maxJugadores: 8,
    edadMinima: 8,
    editorial: 'Z-Man Games',
    anioPublicacion: 2014,
    precio: 26000,
    stock: 18,
    activo: true
  },
  {
    nombre: 'Clank!',
    descripcion: 'Infiltrate en una mazmorra y escapa con el botín',
    categoria: 'Estrategia',
    complejidad: 'Media',
    duracionMinutos: 60,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 12,
    editorial: 'Renegade Game Studios',
    anioPublicacion: 2016,
    precio: 45000,
    stock: 14,
    activo: true
  },
  {
    nombre: 'Love Letter',
    descripcion: 'Entrega tu carta a la princesa antes que los demás',
    categoria: 'Cartas',
    complejidad: 'Baja',
    duracionMinutos: 20,
    minJugadores: 2,
    maxJugadores: 4,
    edadMinima: 10,
    editorial: 'Alderac',
    anioPublicacion: 2012,
    precio: 12000,
    stock: 35,
    activo: true
  },
  {
    nombre: 'Decrypto',
    descripcion: 'Comunica códigos sin que el equipo rival los descifre',
    categoria: 'Party',
    complejidad: 'Media',
    duracionMinutos: 30,
    minJugadores: 3,
    maxJugadores: 8,
    edadMinima: 12,
    editorial: 'Le Scorpion Masqué',
    anioPublicacion: 2018,
    precio: 24000,
    stock: 16,
    activo: true
  },
  {
    nombre: 'The Crew',
    descripcion: 'Un juego cooperativo de bazas en el espacio',
    categoria: 'Cooperativo',
    complejidad: 'Media',
    duracionMinutos: 20,
    minJugadores: 2,
    maxJugadores: 5,
    edadMinima: 10,
    editorial: 'Kosmos',
    anioPublicacion: 2019,
    precio: 21000,
    stock: 24,
    activo: true
  },
  {
    nombre: 'Patchwork',
    descripcion: 'Compite por coser la mejor colcha',
    categoria: 'Abstracto',
    complejidad: 'Media',
    duracionMinutos: 30,
    minJugadores: 2,
    maxJugadores: 2,
    edadMinima: 8,
    editorial: 'Lookout Games',
    anioPublicacion: 2014,
    precio: 18000,
    stock: 20,
    activo: true
  },
  {
    nombre: 'Mysterium',
    descripcion: 'Interpreta visiones para resolver un asesinato',
    categoria: 'Cooperativo',
    complejidad: 'Media',
    duracionMinutos: 45,
    minJugadores: 2,
    maxJugadores: 7,
    edadMinima: 10,
    editorial: 'Libellud',
    anioPublicacion: 2015,
    precio: 36000,
    stock: 12,
    activo: true
  }
];

async function seed() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Sincronizar base de datos
    await sequelize.sync({ force: true });
    console.log('✅ Base de datos sincronizada');

    // Crear usuario administrador
    const admin = await Usuario.create({
      nombre: 'Administrador',
      correo: 'admin@lenny.com',
      contraseña: 'admin123',
      activo: true
    });

    console.log('✅ Usuario administrador creado');

    // Crear libros
    for (const libro of librosData) {
      await Libro.create(libro);
    }
    console.log(`✅ ${librosData.length} libros creados`);

    // Crear juegos
    for (const juego of juegosData) {
      await JuegoMesa.create(juego);
    }
    console.log(`✅ ${juegosData.length} juegos creados`);

    console.log('🎉 ¡Seed completado exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('   Correo: admin@lenny.com');
    console.log('   Contraseña: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
}

seed();
