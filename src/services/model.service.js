const { sequelize, Op } = require('../libs/sequelize');
const { models } = sequelize;

class ModelService {

  constructor() { }

  async create(data) {
    const res = await models.CarModel.create(data);
    return res;
  }

  async findByIdBrand(idBrand) {
    const res = await models.CarModel.findAll({ where: { idBrand: idBrand } });
    return res;
  }

  async findByName(name) {
    const res = await models.CarModel.findOne({ where: { name: name } });
    return res;
  }

  async findById(id) {
    const res = await models.CarModel.findByPk(id);
    return res;
  }
  
  async update(id, data) {
    const res = await models.CarModel.update(data, {
      where: {
        id: id
      }
    });
    return res;
  }
  
  async findAll() {
    const res = await models.CarModel.findAll();
    return res;
  }

}

module.exports = ModelService;