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
                    check('name', 'Name is required').trim().escape().not().isEmpty()
                    .isLength({ min: 3 }).withMessage('Full Name must not less than 3 characters long')
                    .isLength({ max: 40 }).withMessage('Full Name must be less than 40 characters long'),
                    check('mobile', 'Phone Number is required').trim().escape().not().isEmpty()
                    .isLength({ min: 14, max: 14 }).withMessage('Mobile must be 14 digit (+2348060373372)')
                    .isNumeric().withMessage('Phone Number must be numeric'),
                    check('email', 'Email is required').trim().escape().not().isEmpty().isEmail().normalizeEmail().withMessage('Your email is not valid')
                    .isLength({ max: 50 }).withMessage('Email must be less than 50 characters long'),
                    check('profilePictureMimeType', 'profilePictureMimeType is required').not().isEmpty(),
                    check('profilePictureValue', 'profilePictureValue is required').not().isEmpty(),
                    check('userId', 'userId is required').not().isEmpty()
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