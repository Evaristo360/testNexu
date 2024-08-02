const { Sequelize, Op, literal, fn } = require('sequelize');
const setupModels = require('./../db/models/index');

const sequelize = new Sequelize(
  {
    host: 'localhost',
    dialect: 'postgres',
    database: 'nexuDB',
    username: 'postgres',
    password: 'password',
    port: 5432,
  }
);

sequelize.sync();
setupModels(sequelize);

module.exports = { sequelize, Op, literal, fn };