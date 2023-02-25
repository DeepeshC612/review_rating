const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewRatingController");
const validation = require("../validation/reviewRating/reviewValidation");

router.post(
  "/giveReview/:uid/:cid",
  validation.giveReviewValidation,
  review.addReview
);
router.patch("/update/:id", review.editReview);
router.delete("/delete/:id", review.deleteReview);
router.get("/list", review.allReview);
router.get("/details/:id", review.detailsReview);

module.exports = router;
