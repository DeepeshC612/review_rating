const compSchema = require("../models/compModelSchema");
const reviewSchema = require("../models/reviewModelSchema");

const createCompany = async (req, res) => {
  const regCompData = new compSchema(req.body);
  const isCompNameExists = await compSchema.findOne({
    companyName: req.body.companyName,
  });
  if (isCompNameExists) {
    return res.status(409).json({
      success: "failure",
      error: "Company is already exists with this name",
    });
  } else {
    try {
      regCompData.userId = req.params.id;
      const filePath = `uploads${req.file.filename}`;
      regCompData.companyLogo = filePath;
      await regCompData.save();
      res.status(201).json({
        success: "success",
        message: "Company is created succesfully",
      });
    } catch (err) {
      res.status(400).json({
        status: "failure",
        error: "Error occure " + err.message,
      });
    }
  }
};

const ListComp = async (req, res) => {
  try {
    const existsComp = await compSchema.find();
    res.status(200).json({
      success: "success",
      data: existsComp,
    });
  } catch (error) {
    res.status(404).json({
      success: "failure",
      error: "Company not exists " + error,
    });
  }
};

const detailsComp = async (req, res) => {
  try {
    const CompData = await reviewSchema
      .find({ CompanyId: req.params.id })
      .populate({
        path: "userId",
        select: "userName profilePic",
      })
      .populate({
        path: "CompanyId",
        select: "companyName location city foundedOn companyLogo",
      });
    res.status(201).json({
      success: "success",
      message: "Company found ",
      CompanyData: CompData,
    });
  } catch (err) {
    res.status(401).json({
      success: "failure",
      error: "Company is not found" + err.message,
    });
  }
};

const searchComp = async (req, res) => {
  const searchQuery = await compSchema.find({ city: req.body.city });
  try {
    if (searchQuery != null) {
      res.status(201).json({
        success: "success",
        message: "Company found",
        data: searchQuery,
      });
    } else {
      res.status(402).json({
        success: "failure",
        error: "Company not found",
      });
    }
  } catch (err) {
    res.status(402).json({
      success: "failure",
      error: "Error occure " + err.message,
    });
  }
};

module.exports = {
  createCompany,
  ListComp,
  detailsComp,
  searchComp,
};
