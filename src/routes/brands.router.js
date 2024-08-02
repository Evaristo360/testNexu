const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');

router
.get('/fill', brandController.Fill)
    .get('/brands', brandController.getAll)
    .get('/brands/:id/models', brandController.getByIdBrand)
    .post('/brands', brandController.addBrand)
    .post('/brands/:id/models', brandController.addModel)


module.exports = router;