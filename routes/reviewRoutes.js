const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewRatingController");
const validation = require("../validation/reviewRating/reviewValidation");

router.post(
  "/giveReview/:uid/:cid",
  validation.giveReviewValidation,
  review.giveReview
);

module.exports = router;
