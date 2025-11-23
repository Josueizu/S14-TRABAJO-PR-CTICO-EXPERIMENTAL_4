const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registro, login, obtenerPerfil, googleCallback } = require('../controllers/authController');
const { protegerRuta } = require('../middleware/auth');

router.post('/registro', registro);
router.post('/login', login);
router.get('/perfil', protegerRuta, obtenerPerfil);

// Rutas de Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

module.exports = router;