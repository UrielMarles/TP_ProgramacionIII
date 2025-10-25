const express = require('express');
const router = express.Router();
const juegoMesaController = require('../controllers/JuegoMesaController');
const { validarJuego } = require('../middlewares/Validaciones');

router.get('/', juegoMesaController.listarJuegos);
router.get('/categorias', juegoMesaController.obtenerCategorias);
router.get('/:id', juegoMesaController.obtenerJuego);
router.post('/', validarJuego, juegoMesaController.crearJuego);
router.put('/:id', validarJuego, juegoMesaController.actualizarJuego);
router.patch('/:id/estado', juegoMesaController.cambiarEstado);

module.exports = router;