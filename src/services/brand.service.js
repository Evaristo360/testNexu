const { sequelize, Op } = require('../libs/sequelize');
const { models } = sequelize;

class BrandService {

  constructor() { }

  async create(data) {
    const res = await models.Brand.create(data);
    return res;
  }

  async findByName(name) {
    const res = await models.Brand.findOne({ where: { name: name } });
    return res;
  }

  async findById(id) {
    const res = await models.Brand.findByPk(id);
    return res;
  }

  async getAllBrandsAverage() {
    const res = await sequelize.query(
      `
      SELECT br.id, br.name, ROUND(AVG(md.average_price)) AS average_price
      FROM models md
      INNER JOIN brands br ON br.id = md."idBrand"
      GROUP BY br.id, br.name
      ORDER BY br.id;
      `);

    return res;
  }
}

module.exports = BrandService;