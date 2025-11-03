require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models/Index');

// Inicialización de la aplicación
const app = express();
const PORT = process.env.PORT || 3000;
const SYNC_STRATEGY = process.env.DB_SYNC_STRATEGY || 'none';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/libros', require('./routes/Libros'));
app.use('/api/juegos', require('./routes/Juegos'));
app.use('/api/ventas', require('./routes/Ventas'));
app.use('/api/usuarios', require('./routes/Usuarios'));

// Rutas vistas admin
app.use('/admin', require('./routes/Admin'));

// Sincronización de la base de datos y arranque del servidor
async function boot() {
    try {
        if (SYNC_STRATEGY === 'force') {
            await sequelize.sync({ force: true });
            console.log('✅ Base de datos recreada desde cero');
        } else {
            await sequelize.sync();
            console.log('✅ Base de datos sincronizada correctamente');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error al sincronizar la base de datos:', err);
    }
}

boot();
