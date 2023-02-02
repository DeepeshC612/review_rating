const reviewModelSchema = require("../models/reviewModelSchema");
const review = require("../models/reviewModelSchema");

const giveReview = async (req, res) => {
  const reviewData = new reviewModelSchema(req.body);
  try {
    reviewData.userId = req.params.uid 
    reviewData.CompanyId = req.params.cid
    let data = await reviewData.save();
    res.status(201).json({
      status: "success",
      message: "Review is created",
      res: data,
    });
  } catch(err){
    res.status(400).json({
      status: "Failure",
      data: "Error Occure" + err.message,
    });
  }
};

module.exports = {
  giveReview,
};
