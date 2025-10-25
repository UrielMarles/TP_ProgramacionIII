const express = require('express');
const router = express.Router();
const libroController = require('../controllers/LibroController');
const { validarLibro } = require('../middlewares/Validaciones');

router.get('/', libroController.listarLibros);
router.get('/generos', libroController.obtenerGeneros);
router.get('/:id', libroController.obtenerLibro);
router.post('/', validarLibro, libroController.crearLibro);
router.put('/:id', validarLibro, libroController.actualizarLibro);
router.patch('/:id/estado', libroController.cambiarEstado);

module.exports = router;