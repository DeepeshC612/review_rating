const compSchema = require('../models/compModelSchema');
const userModelSchema = require('../models/userModelSchema');

const createCompany = async (req, res) => {
    const regCompData = new compSchema(req.body);
    const isCompNameExists = await compSchema.findOne({
      companyName: req.body.companyName,
    });
    if (isCompNameExists) {
      return res.status(409).json({
        status: "Conflict",
        message: "Company is already Exists",
      });
    } else {
      try {
        // regCompData.userId = req.params
        let data = await regCompData.save();
        res.status(201).json({
          status: "success",
          message: "Company is created Succesfully",
          res: data,
        });
      } catch (err) {
        res.status(400).json({
          status: "Failure",
          data: "Error Occure" + err.message,
        });
      }
    }
  };

  module.exports = {
    createCompany,
  }