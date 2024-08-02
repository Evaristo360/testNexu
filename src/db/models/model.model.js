const { Model, DataTypes, Sequelize } = require('sequelize');

const CAR_MODEL_TABLE = 'models';

class CarModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CAR_MODEL_TABLE,
      modelName: 'CarModel',
      timestamps: false
    }
  }
}

const CarModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'name'
  },
  average_price: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'average_price'
  },
  idBrand: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'idBrand'
  },
}

module.exports = { CarModel, CarModelSchema };