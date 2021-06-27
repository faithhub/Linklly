const { check, validationResult } = require('express-validator');

module.exports = (method) => {
    switch (method) {
        case 'create':
            {
                return [
                    check('link', 'Link is required').not().isEmpty()
                ]
            }
            break;

        case 'update':
            {
                return [
                    check('id', 'id is required').not().isEmpty(),
                    check('country', 'country is required').not().isEmpty(),
                    check('system', 'system is required').not().isEmpty(),
                    check('browser', 'browser is required').not().isEmpty(),
                ]
            }
            break;
        case 'login':
            {
                return [
                    check('email', 'Email is required').trim().escape().not().isEmpty().isEmail().normalizeEmail().withMessage('Your email is not valid')
                    .isLength({ max: 50 }).withMessage('Email must be less than 50 characters long'),
                    check('password', 'Password is required').trim().escape().notEmpty()
                ]
            }
            break;
        default:
    }
}