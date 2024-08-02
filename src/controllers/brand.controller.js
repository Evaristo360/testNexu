
const DB = require('../db/models')
let { modelDB } = DB
const BrandService = require('../services/brand.service');
const ModelService = require('../services/model.service');
const brandService = new BrandService();
const modelService = new ModelService();


const Fill = async (req, res) => {
  try {
    const names = [...new Set(modelDB.map(item => item.brand_name))];
    console.log(names.length)
    names.forEach(async (name) => {
      let newBrand = {
        name: name
      };
      let brandCreated = await brandService.create(newBrand);
      let brandData = brandCreated.dataValues;

      const filteredModels = modelDB.filter(item => item.brand_name === name);

      for (const model of filteredModels) {
        let newmodel = {
          name: model.name,
          average_price: model.average_price,
          idBrand: brandData.id
        };

        await modelService.create(newmodel);
      }
    });
    res.status(200).send('ok');

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}

const getAll = async (req, res) => {
  try {
    const result = await brandService.getAllBrandsAverage()
    res.status(200).send(result[0]);

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}

const getByIdBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!(id)) {
      console.error(new Date().toString(), " VALIDACIÓN: Ingresa el id de la marca");
      res.status(400).send({ message: "Ingresa el id de la marca" });
    }

    const result = await modelService.findByIdBrand(id)
    res.status(200).send(result);

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}

const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!(name)) {
      console.error(new Date().toString(), " VALIDACIÓN: Ingresa el nombre de la marca");
      res.status(400).send({ message: "Ingresa el nombre de la marca" });
    }

    const brandFind = await brandService.findByName(name)
    if (brandFind!=null) {
      console.error(new Date().toString(), " VALIDACIÓN: La marca " + name + " ya se encuentra registrada");
      res.status(400).send({ message: " La marca " + name + " ya se encuentra registrada" });
    } else {
      let newBrand={
        name:name
      }
      const result = await brandService.create(newBrand)
      res.status(200).send(result.dataValues);
    }

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}

const addModel = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, average_price } = req.body;
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

    let brandFind= await brandService.findById(id)
    if(brandFind==null){
      console.error(new Date().toString(), " VALIDACIÓN: No existe una marca con el ID:"+id);
      res.status(400).send({ message: "No existe una marca con el ID:"+id });
    }else{
      let brandData= brandFind.dataValues
      let modelFind= await modelService.findByName(name)
      if(modelFind!=null){
        console.error(new Date().toString(), " VALIDACIÓN: El modelo ya se encuentra registrado:"+name);
        res.status(400).send({ message: "El modelo ya se encuentra registrado:"+name });
      }else{
        let newModel={
          name:name,
          average_price:average_price,
          idBran:brandData.id
        }
        let result= await modelService.create(newModel)
        res.status(200).send(result);
      }
    }

  } catch (error) {
    console.error(new Date().toString(), " ERROR: ", error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor." });
  }
}



module.exports = {
  Fill,
  getAll,
  getByIdBrand,
  addBrand,
  addModel
};
