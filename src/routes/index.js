const express = require('express'); 
const brandsRouter = require('./brands.router');
const modelsRouter = require('./models.router');

function routerApi(app) {
  const router = express.Router();
  app.use(router); 
  router.use(brandsRouter);
  router.use(modelsRouter);
}

module.exports = routerApi;