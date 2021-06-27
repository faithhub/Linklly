const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const validation = require('../services/index');


/**
 * For body parser
 */
router.use(express.urlencoded({ extended: false }));
router.use(express.json())


/**
 * Create Route
 */
router.post('/create', validation('create'), controller.create)


/**
 * Get Route
 */
router.get('/get/:id', controller.get)


/**
 * Save Analysis Route
 */
router.post('/analysis', validation('update'), controller.createAnalysis)


/**
 * Get Analysis Route
 */
router.get('/analysis/:id', controller.get)


/**
 * Export Route
 */
module.exports = router