const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validarLogin } = require('../middlewares/Validaciones');

router.post('/login', validarLogin, usuarioController.login);
router.post('/crear', usuarioController.crearUsuario);

module.exports = router;