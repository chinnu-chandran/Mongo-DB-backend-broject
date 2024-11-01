const { body } = require('express-validator');

// Define validation rules for creating a user
const validateCreateUser = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required.'),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required.'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required.'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .toLowerCase(),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.')
        .isAlphanumeric()
        .withMessage('Password must be alphanumeric.'),
    body('phone')
    .isMobilePhone('any')
    .withMessage('Invalid phone number')
];

// Export the validation rules so they can be used elsewhere
module.exports = {
    validateCreateUser
};
