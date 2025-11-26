# 📚🎲 Lenny - Sistema de Autoservicio

**Lenny** es un sistema completo de autoservicio para la venta de Libros y Juegos de Mesa, desarrollado con una arquitectura moderna de frontend y backend separados.

---

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Backend](#backend)
- [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Variables de Entorno](#variables-de-entorno)
- [Funcionalidades](#funcionalidades)
- [Autores](#autores)

---

## ✨ Características Principales

### Cliente
- ✅ Pantalla de bienvenida con ingreso de nombre
- ✅ Catálogo de productos dividido en dos categorías (Libros y Juegos de Mesa)
- ✅ Carrito de compras con gestión de cantidades
- ✅ Sistema de paginación de productos
- ✅ Tema claro/oscuro persistente
- ✅ Generación y descarga de tickets en PDF
- ✅ Diseño responsive (mobile-first)
- ✅ Flujo de autoservicio completo

### Administrador
- ✅ Panel de administración con login seguro
- ✅ Dashboard con listado completo de productos
- ✅ CRUD completo de Libros y Juegos de Mesa
- ✅ Carga de imágenes
- ✅ Activación/desactivación de productos (baja lógica)
- ✅ Historial de ventas con detalle
- ✅ Botón de acceso rápido para testing

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** v18+
- **Express.js** - Framework web
- **Sequelize** - ORM para SQL Server
- **SQL Server** - Base de datos
- **EJS** - Motor de plantillas
- **bcryptjs** - Encriptación de contraseñas
- **express-fileupload** - Carga de archivos

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Iconos
- **jsPDF** - Generación de PDFs
- **Context API** - Gestión de estado

---

## 📁 Estructura del Proyecto

```
lenny/
├── Backend/          # Servidor Backend
│   ├── config/             # Configuración de BD
│   ├── controllers/        # Lógica de negocio
│   ├── models/             # Modelos Sequelize
│   ├── routes/             # Definición de rutas
│   ├── middlewares/        # Validaciones
│   ├── views/              # Vistas EJS (admin)
│   ├── public/             # Archivos estáticos
│   │   ├── css/
│   │   ├── js/
│   │   └── images/         # Imágenes de productos
│   ├── app.js              # Punto de entrada
│   └── package.json
│
└── Frontend/         # Cliente Frontend
    ├── src/
    │   ├── components/     # Componentes React
    │   │   ├── common/
    │   │   ├── products/
    │   │   ├── cart/
    │   │   └── ticket/
    │   ├── pages/          # Páginas principales
    │   ├── context/        # Context API
    │   ├── services/       # API calls
    │   ├── utils/          # Utilidades
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── package.json
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- SQL Server (local o remoto)
- npm o yarn

### Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd lenny
```

---

## 🔧 Backend

### 1. Instalación

```bash
cd lenny-backend
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del backend:

```env
PORT=3000
DB_HOST=.
DB_NAME=dinamango
DB_DIALECT=mssql
```

### 3. Configuración de Base de Datos

La aplicación usa **Integrated Security** de Windows para SQL Server. La connection string configurada es:

```
Data Source=.; Initial Catalog=dinamango; Integrated Security=True; TrustServerCertificate=True
```

### 4. Iniciar el Servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará corriendo en `http://localhost:3000`

### 5. Crear Usuario Administrador Inicial

Realiza una petición POST para crear el primer admin:

```bash
POST http://localhost:3000/api/usuarios/crear
Content-Type: application/json

{
  "nombre": "Admin",
  "correo": "admin@lenny.com",
  "contrasena": "admin123"
}
```

O usa el seed script (si lo creaste):

```bash
node seed.js
```

### 6. Estructura de la Base de Datos

El sistema creará automáticamente las siguientes tablas:

- **usuarios** - Administradores del sistema
- **libros** - Catálogo de libros
- **juegos_mesa** - Catálogo de juegos de mesa
- **ventas** - Registro de ventas
- **venta_detalles** - Detalle de productos por venta

### Scripts Disponibles

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

---

## 💻 Frontend

### 1. Instalación

```bash
cd lenny-frontend
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Iniciar la Aplicación

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

### Características del Frontend

#### Contextos Globales

- **ThemeContext**: Gestión de tema claro/oscuro
- **CartContext**: Gestión del carrito de compras

#### Rutas Principales

- `/` - Pantalla de bienvenida
- `/productos` - Catálogo de productos
- `/carrito` - Carrito de compras
- `/ticket` - Visualización del ticket

#### LocalStorage

El frontend persiste:
- Tema seleccionado (`theme`)
- Carrito de compras (`lennyCart`)
- Nombre del cliente (`lennyCustomerName`)

---

## 📡 API Endpoints

### Autenticación y Usuarios

```
POST   /api/usuarios/crear          # Crear usuario admin
POST   /api/usuarios/login          # Login
```

### Libros

```
GET    /api/libros                  # Listar libros (paginado)
GET    /api/libros/:id              # Obtener libro por ID
GET    /api/libros/generos          # Obtener géneros únicos
POST   /api/libros                  # Crear libro
PUT    /api/libros/:id              # Actualizar libro
PATCH  /api/libros/:id/estado       # Cambiar estado (activar/desactivar)
```

### Juegos de Mesa

```
GET    /api/juegos                  # Listar juegos (paginado)
GET    /api/juegos/:id              # Obtener juego por ID
GET    /api/juegos/categorias       # Obtener categorías únicas
POST   /api/juegos                  # Crear juego
PUT    /api/juegos/:id              # Actualizar juego
PATCH  /api/juegos/:id/estado       # Cambiar estado (activar/desactivar)
```

### Ventas

```
GET    /api/ventas                  # Listar todas las ventas
GET    /api/ventas/:id              # Obtener venta por ID
POST   /api/ventas                  # Crear venta
```

### Panel de Administración (Vistas)

```
GET    /admin/login                 # Página de login
POST   /admin/login                 # Procesar login
GET    /admin/dashboard             # Dashboard principal
GET    /admin/libros/nuevo          # Formulario nuevo libro
GET    /admin/libros/editar/:id     # Formulario editar libro
GET    /admin/juegos/nuevo          # Formulario nuevo juego
GET    /admin/juegos/editar/:id     # Formulario editar juego
GET    /admin/ventas                # Historial de ventas
```

---

## 🔐 Variables de Entorno

### Backend (.env)

```env
PORT=3000                    # Puerto del servidor
DB_HOST=.                    # Host de SQL Server
DB_NAME=dinamango            # Nombre de la base de datos
DB_DIALECT=mssql             # Dialecto de Sequelize
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api   # URL del backend
```

---

## 🎯 Funcionalidades

### Flujo del Cliente

1. **Bienvenida**: El cliente ingresa su nombre
2. **Productos**: Navega entre Libros y Juegos de Mesa
3. **Agregar al carrito**: Selecciona productos y cantidades
4. **Carrito**: Revisa y modifica su pedido
5. **Confirmar compra**: Modal de confirmación
6. **Ticket**: Visualiza el ticket y puede descargarlo en PDF
7. **Reinicio**: El sistema vuelve al inicio

### Panel de Administración

1. **Login**: Acceso seguro con credenciales
2. **Dashboard**: Vista completa de productos activos/inactivos
3. **Gestión de Libros**:
   - Título, autor, género, páginas
   - Editorial, año, ISBN
   - Precio, stock, imagen
4. **Gestión de Juegos**:
   - Nombre, categoría, complejidad
   - Jugadores (min/max), duración
   - Edad mínima, editorial, año
   - Precio, stock, imagen
5. **Ventas**: Historial con detalles de cada transacción

### Características Especiales

- ✅ **Baja lógica**: Los productos se desactivan, no se eliminan
- ✅ **Control de stock**: Se descuenta automáticamente al vender
- ✅ **Validaciones**: Middleware de validación en todas las operaciones
- ✅ **Contraseñas encriptadas**: bcryptjs con salt rounds
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Accesibilidad**: Botones y navegación accesibles
- ✅ **Persistencia**: LocalStorage para datos del cliente

---

## 🧪 Testing

### Credenciales de Prueba

**Panel de Administración:**
- Email: `admin@lenny.com`
- Contraseña: `admin123`

### Datos de Prueba

Para poblar la base de datos con productos de ejemplo, ejecuta:

```bash
cd lenny-backend
node seed.js
```

Esto creará:
- 25 libros de diferentes géneros
- 26 juegos de mesa de diferentes categorías
- 1 usuario administrador

---

## 📦 Deployment

### Backend

1. Configurar SQL Server en producción
2. Actualizar variables de entorno
3. Ejecutar build si es necesario
4. Iniciar con PM2 o similar:

```bash
npm install -g pm2
pm2 start app.js --name lenny-backend
```

### Frontend

1. Configurar variable `VITE_API_URL` con la URL de producción
2. Crear build:

```bash
npm run build
```

3. Servir la carpeta `dist/` con nginx, Apache, o un servicio de hosting

---

## 🐛 Troubleshooting

### Backend

**Error de conexión a SQL Server:**
- Verificar que SQL Server esté corriendo
- Confirmar autenticación de Windows habilitada
- Revisar el nombre de la base de datos

**Error al subir imágenes:**
- Verificar permisos de escritura en `/public/images/`
- Confirmar que el directorio existe

### Frontend

**Error de CORS:**
- Verificar que el backend tenga `cors` habilitado
- Confirmar la URL del API en `.env`

**Productos no se cargan:**
- Verificar que hay productos activos en la BD
- Revisar la consola del navegador para errores

---

## 📝 Notas del Desarrollo

- Los productos se muestran paginados (12 por página por defecto)
- El carrito se persiste en localStorage
- Las contraseñas se encriptan con bcryptjs antes de guardarse
- Las imágenes se guardan en `/public/images/`
- El tema (claro/oscuro) se mantiene al recargar
- Las ventas incluyen un campo de fecha automático

---

## 👥 Autor

**Desarrollador:**
- Uriel Marles

**Materia:** Programación III  
**Institución:** UTN
**Año:** 2025

