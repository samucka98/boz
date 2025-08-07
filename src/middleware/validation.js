const { body, validationResult } = require('express-validator');

// Middleware para capturar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validações para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Senha é obrigatória'),
  handleValidationErrors
];

// Validações para criação de usuário
const createUserValidation = [
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('name')
    .isLength({ min: 2 })
    .withMessage('Nome deve ter pelo menos 2 caracteres'),
  handleValidationErrors
];

// Validações para atualização de usuário
const updateUserValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email deve ser válido'),
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Nome deve ter pelo menos 2 caracteres'),
  handleValidationErrors
];

module.exports = {
  loginValidation,
  createUserValidation,
  updateUserValidation,
  handleValidationErrors
}; 