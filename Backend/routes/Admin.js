const express = require('express');
const router = express.Router();
const adminViewController = require('../controllers/AdminViewController');

router.get('/login', adminViewController.mostrarLogin);
router.post('/login', adminViewController.procesarLogin);

router.get('/dashboard', adminViewController.mostrarDashboard);

router.get('/libros/nuevo', adminViewController.mostrarFormularioNuevoLibro);
router.get('/libros/editar/:id', adminViewController.mostrarFormularioEditarLibro);

router.get('/juegos/nuevo', adminViewController.mostrarFormularioNuevoJuego);
router.get('/juegos/editar/:id', adminViewController.mostrarFormularioEditarJuego);

router.get('/ventas', adminViewController.mostrarVentas);

module.exports = router;