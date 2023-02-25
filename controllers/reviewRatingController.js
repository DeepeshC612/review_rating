const reviewModelSchema = require("../models/reviewModelSchema");

const addReview = async (req, res) => {
  const reviewData = await reviewModelSchema(req.body);
  try {
    reviewData.userId = req.params.uid;
    reviewData.CompanyId = req.params.cid;
    await reviewData.save();
    res.status(201).json({
      success: "success",
      message: "Review is created successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: "Error occure" + err.message,
    });
  }
};

const allReview = async (req, res) => {
  const listReview = await reviewModelSchema.find();
  try {
    res.status(201).json({
      success: "success",
      message: "Here is the list of reviews",
      Review: listReview,
    });
  } catch (err) {
    res.status(404).json({
      success: "failure",
      error: "Reviews not found" + err.message,
    });
  }
};

const editReview = async (req, res) => {
  try {
    const editData = await reviewModelSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      success: "success",
      message: "Review is updated successfully",
      updatedData: editData,
    });
  } catch (err) {
    res.status(204).json({
      success: "failure",
      error: "Review is not updated" + err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  await reviewModelSchema.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({
      success: "success",
      message: "Review is deleted successfully",
    });
  } catch (err) {
    res.status(403).json({
      success: "failure",
      error: "Unable to delete" + err,
    });
  }
};

const detailsReview = async (req, res) => {
  const detailedReview = await reviewModelSchema
    .findById(req.params.id)
    .populate({
      path: "userId",
      select: "userName profilePic",
    })
    .populate({
      path: "CompanyId",
      select: "companyName",
    });
  try {
    res.status(201).json({
      success: "success",
      message: "Here is the review",
      ReviewData: detailedReview,
    });
  } catch (err) {
    res.status(404).json({
      success: "failure",
      error: "Review is not found" + err.message,
    });
  }
};

module.exports = {
  addReview,
  editReview,
  deleteReview,
  allReview,
  detailsReview,
};
