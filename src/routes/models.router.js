const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model.controller');

router
    .put('/models/:id', modelController.editModelPrice)
    .get('/models', modelController.getAllModels)


module.exports = router;