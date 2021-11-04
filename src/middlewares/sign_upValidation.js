const { body} = require('express-validator');

const validInput = [
  body('email').isEmail().withMessage('Email must be valid').normalizeEmail().toLowerCase(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be more than 6 characters')]



module.exports = validInput;