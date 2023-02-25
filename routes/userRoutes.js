const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth_middleware");
const user = require("../controllers/userControllers");
const { upload } = require('../middlewares/multiStoreMiddleware')
const valitdation = require("../validation/users/userValidation");


router.post(
  "/signup",
  upload.single("profilePic"),
  valitdation.registerUserValidation,
  user.userSignup
);
router.post("/login", valitdation.LoginUserValidation, user.userLogin);
router.post("/reset_pass", user.emailForResetPass);
router.post("/new_pass/:id/:token", user.userResetPass);

module.exports = router;
