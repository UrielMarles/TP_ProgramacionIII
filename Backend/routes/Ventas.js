const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/VentaController');
const { validarVenta } = require('../middlewares/Validaciones');

router.get('/', ventaController.listarVentas);
router.post('/', validarVenta, ventaController.crearVenta);

module.exports = router;