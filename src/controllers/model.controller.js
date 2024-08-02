
const DB = require('../db/models')
let { modelDB } = DB
const BrandService = require('../services/brand.service');
const ModelService = require('../services/model.service');
const brandService = new BrandService();
const modelService = new ModelService();

const editModelPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { average_price } = req.body;
    if (!(id)) {
      console.error(new Date().toString(), " VALIDACIÓN: Ingresa el id de la marca");
      res.status(400).send({ message: "Ingresa el id de la marca" });
    }

    if (!(average_price)) {
      console.error(new Date().toString(), " VALIDACIÓN: Ingresa el precio promedio");
      res.status(400).send({ message: "Ingresa el precio promedio" });
    }

    if (average_price < 100000) {
      console.error(new Date().toString(), " VALIDACIÓN: El precio promedio debe ser mayor a 100,000");
      res.status(400).send({ message: "El precio promedio debe ser mayor a 100,000" });
    }

    let modelFind = await modelService.findById(id)
    if (modelFind == null) {
      console.error(new Date().toString(), " VALIDACIÓN: No existe un modelo con el ID:" + id);
      res.status(400).send({ message: "No existe un modelo con el ID:" + id });
    } else {
      let modelData = modelFind.dataValues
      modelData.average_price = average_price

      let result = await modelService.update(id, modelData)

      res.status(200).send(result);
    }

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}


const getAllModels = async (req, res) => {
  try {
    const { greater, lower } = req.query;

    let findData = await modelService.findAll();
    let filteredData = findData

    if (greater) {
      filteredData = filteredData.filter(model => model.average_price >= greater);
    }

    if (lower) {
      filteredData = filteredData.filter(model => model.average_price <= lower);
    }

    console.log(filteredData.length)

    res.status(200).send(filteredData);

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}

module.exports = {
  editModelPrice,
  getAllModels
};
