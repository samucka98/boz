const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const { loginValidation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login - Login de usuário
router.post('/login', loginValidation, login);

// GET /api/auth/profile - Obter perfil do usuário logado
router.get('/profile', authenticateToken, getProfile);

module.exports = router; 