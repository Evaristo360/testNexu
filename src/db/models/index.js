const { Brand, BrandSchema } = require('./brand.model');
const { CarModel, CarModelSchema} = require('./model.model');

const setupModels = (sequelize) => {
  CarModel.init(CarModelSchema, CarModel.config(sequelize));
  Brand.init(BrandSchema, Brand.config(sequelize));
}

module.exports = setupModels;