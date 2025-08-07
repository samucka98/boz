const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const {
  createUserValidation,
  updateUserValidation
} = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas de usuários requerem autenticação e permissão de admin
router.use(authenticateToken, requireAdmin);

// GET /api/users - Listar todos os usuários
router.get('/', getAllUsers);

// GET /api/users/:id - Obter usuário por ID
router.get('/:id', getUserById);

// POST /api/users - Criar novo usuário
router.post('/', createUserValidation, createUser);

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', updateUserValidation, updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', deleteUser);

module.exports = router; 