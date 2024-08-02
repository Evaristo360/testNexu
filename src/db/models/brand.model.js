const { Model, DataTypes, Sequelize } = require('sequelize');

const BRAND_TABLE = 'brands';

class Brand extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BRAND_TABLE,
      modelName: 'Brand',
      timestamps: false
    }
  }
}

const BrandSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name'
  },
}

module.exports = { Brand, BrandSchema };