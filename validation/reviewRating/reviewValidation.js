const review = require('./reviewSchema');

module.exports = {
  giveReviewValidation: async (req, res, next) => {
    const values = await review.giveReview.validate(req.body, {
      abortEarly: false,
    });
    if (values.error) {
      res.status(400).json({
        success: 0,
        message: values.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
