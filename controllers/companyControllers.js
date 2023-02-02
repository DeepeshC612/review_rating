const compSchema = require("../models/compModelSchema");
const userModelSchema = require("../models/userModelSchema");

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
      const filePath = `uploads/${req.file.filename}`;
      regCompData.profilePic=filePath;
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

const allComp = async (req, res) => {
 try{ 
  const existsComp = await compSchema.find()
  res.status(200).json({
    status: "Success",
    data: existsComp,
  })
}catch(error){
  console.log(error.message);
}
};

const detailsComp = async (req, res) => {
  try{
    const getComp = req.params.id
      const CompData = await compSchema.findById({CompData: req.params.id})
      res.staus(201).json({
        status: "success",
        CompanyData: CompData,
      })
  }catch(err){
    res.status(401).json({
      status: "failure",
      message: "Company is not found" + err.message
    })
  }
}

module.exports = {
  createCompany,
  allComp,
  detailsComp
};
